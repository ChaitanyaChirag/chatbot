import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SpeechRecognition from 'react-speech-recognition';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Upload from 'antd/lib/upload';

import SendIcon from 'react-icons/lib/md/send';
import MicIcon from 'react-icons/lib/md/mic';
import MicOffIcon from 'react-icons/lib/md/mic-off';
import CircleDotIcon from 'react-icons/lib/md/adjust';
import AddFileIcon from 'react-icons/lib/md/add-circle';

import './index.scss';

import { isAndroid, isIOS } from '../../data/config/utils';
import { EVENTS } from '../../data/config/constants';
import { chatbot_setting, translator } from '../../data/config/brandSetup';
import chatbotStyle from "../../data/config/chatbotStyle"

import { LangContext } from '../../modules/context'

const TypeWriter = lazy(() => import('../TypeWriter'))

const { TextArea } = Input;

class InputComposer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.typingTimer = null;
    this.android_input_max_rows_updated = false;
    this.is_android = isAndroid();
    this.is_ios = isIOS();
    this.state = {
      input_message: "",
      typing: false,
      file: null,
      fileUrl: "",
      showTypeWriter: chatbot_setting.chat_interface.type_writer.enable
    };
  }

  componentDidUpdate(prevProps) {
    const { transcript, listening } = this.props;
    if (chatbot_setting.speech_recognition && listening && prevProps.transcript !== transcript) {
      this.setState({ input_message: transcript });
    }
  }

  handleInputChange = event => {
    const input_message = event.target.value;
    if (!this.android_input_max_rows_updated) {
      this.android_input_max_rows_updated = true;
    }
    this.setState({ input_message });
  };

  stopTypingIndicator = () => {
    this.setState({ typing: false }, () => {
      const { emitCustomEvent, psid } = this.props;
      const payload = {
        clientPsid: psid,
        isTyping: false,
      };
      emitCustomEvent(EVENTS.TYPING_STATUS, payload);
    });
  };

  inputKeyDown = e => {
    const { input_message, typing } = this.state;
    const { psid, emitCustomEvent } = this.props;
    if (e.keyCode === 13 && !e.shiftKey && input_message.trim().length > 0) {
      this.handleMessageSend(e);
    } else {
      if (!typing) {
        this.setState({ typing: true }, () => {
          const payload = {
            clientPsid: psid,
            isTyping: true,
          };
          emitCustomEvent(EVENTS.TYPING_STATUS, payload);
        });
        this.typingTimer = setTimeout(this.stopTypingIndicator, 3000);
      } else {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(this.stopTypingIndicator, 3000);
      }
    }
  };

  onClickMic = () => {
    const { listening, startListening, stopListening, resetTranscript } = this.props;
    if (listening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  stopSpeechListening = () => {
    const { listening, stopListening } = this.props;
    this.setState({ input_message: "" });
    if (listening) {
      stopListening();
    }
  };

  handleMessageSend = e => {
    e.preventDefault();
    const text = this.state.input_message.trim();
    this.props.sendTextToServer(text);
    this.stopSpeechListening();
    this.stopTypingIndicator();
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
  };

  onRemove = file => {
    this.setState({
      file: null,
      fileUrl: "",
    });
  };

  hideTypeWriter = () => {
    this.setState({ showTypeWriter: false })
  }

  render() {
    const { is_input_lock, input_lock_text, onClickMenu, browserSupportsSpeechRecognition, listening, notification_bot, beforeUpload, onRemove } = this.props;
    const { input_message, showTypeWriter } = this.state;
    return (
      <LangContext.Consumer>
        {
          lang => (
            <div
              className={
                classNames("ori-relative ori-full-width oriInputComposerContainer",
                  {
                    "ori-placeholder-primary": is_input_lock || listening,
                    "notificationBotInputComposer": notification_bot,
                    "chatbotInputComposer": !notification_bot
                  }
                )
              }
            >
              {
                !notification_bot && !listening && chatbot_setting.menu.visible &&
                <div className="ori-animated ori-fade-in ori-absolute ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc alignMenuIcon" onClick={onClickMenu}>
                  <chatbotStyle.MenuIcon />
                </div>
              }
              {
                listening &&
                <div
                  className="ori-absolute ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc ori-font-primary alignMenuIcon"
                  onClick={this.stopSpeechListening}
                >
                  <CircleDotIcon size={18} className="ori-animated ori-ripple ori-infinite" />
                </div>
              }
              {
                showTypeWriter ?
                  <Suspense fallback={null}>
                    <TypeWriter
                      className="ori-l-mrgn-10 ori-font-md ori-t-pad-3"
                      textData={translator.text[lang].typewriter_data}
                      onClick={this.hideTypeWriter}
                    />
                  </Suspense> :
                  <Form className="ori-lr-pad-10" onSubmit={this.handleMessageSend}>
                    <TextArea
                      placeholder={
                        is_input_lock ? input_lock_text : (listening ? translator.text[lang].listening : translator.text[lang].typeYourQuery)
                      }
                      className="inputField"
                      autosize={{
                        minRows: 1,
                        maxRows: this.is_android && !this.android_input_max_rows_updated ? 1 : 3
                      }}
                      value={input_message}
                      disabled={is_input_lock}
                      onKeyDown={this.inputKeyDown}
                      onChange={this.handleInputChange}
                      autoFocus={!(this.is_android || this.is_ios)}
                    />
                    <div className="ori-animated ori-fade-in ori-absolute ori-flex-row ori-flex-jfe alignRightIcons">
                      {
                        (input_message.trim().length > 0 || !browserSupportsSpeechRecognition) &&
                        <Button className={classNames("ori-pad-5 sendButton",
                          {
                            "sendBtnActive": input_message.trim().length > 0
                          }
                        )}
                          htmlType="submit"
                          disabled={input_message.trim().length === 0 || is_input_lock}
                        >
                          <SendIcon size={20} />
                        </Button>
                      }
                      {
                        chatbot_setting.speech_recognition && input_message.trim().length === 0 && browserSupportsSpeechRecognition &&
                        <Button className={classNames("ori-pad-5 sendButton",
                          {
                            "sendBtnActive": listening
                          }
                        )}
                          disabled={is_input_lock}
                          onClick={this.onClickMic}
                        >
                          {
                            listening ? <MicOffIcon size={20} /> : <MicIcon size={20} />
                          }
                        </Button>
                      }
                      {
                        !notification_bot &&  chatbot_setting.upload_file &&
                        <div className="ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc">
                          <Upload accept="image/*" showUploadList={false} beforeUpload={beforeUpload} onRemove={onRemove}>
                            <AddFileIcon size={20} className="ori-font-light-hover-default" />
                          </Upload>
                        </div>
                      }
                    </div>
                  </Form>
              }
            </div>
          )
        }
      </LangContext.Consumer>
    );
  }
}

InputComposer.propTypes = {
  psid: PropTypes.string,
  is_input_lock: PropTypes.bool,
  input_lock_text: PropTypes.string,
  onClickMenu: PropTypes.func,
  sendTextToServer: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  transcript: PropTypes.string,
  emitCustomEvent: PropTypes.func,
};

InputComposer.defaultProps = {
  is_input_lock: false,
  notification_bot: false,
  input_lock_text: 'please select any option to proceed',
  emitCustomEvent: () => { },
};

const options = {
  autoStart: false,
};

export default SpeechRecognition(options)(InputComposer);
