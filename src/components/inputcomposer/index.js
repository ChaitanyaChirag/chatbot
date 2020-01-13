import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SpeechRecognition from 'react-speech-recognition';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Upload from 'antd/lib/upload';
// import { Button, Form, Input, Upload } from 'antd';
import SendIcon from 'react-icons/lib/md/send';
import MicIcon from 'react-icons/lib/md/mic';
import MenuIcon from 'react-icons/lib/md/menu';
import CircleDotIcon from 'react-icons/lib/md/adjust';
import AddFileIcon from 'react-icons/lib/md/add-circle';

import './index.scss';

import { isAndroid } from '../../data/config/utils';
import { EVENTS } from '../../data/config/constants';

const { TextArea } = Input;

class InputComposer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.typingTimer = null;
    this.state = {
      input_message: "",
      typing: false,
      file: null,
      fileUrl: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { transcript, listening } = this.props;
    if (listening && prevProps.transcript !== transcript) {
      this.setState({ input_message: transcript });
    }
  }

  handleInputChange = event => {
    const input_message = event.target.value;
    this.setState({ input_message });
  };

  stopTypingIndicator = () => {
    if (this.state.typing) {
      this.setState({ typing: false }, () => {
        const { emitCustomEvent, psid } = this.props;
        const payload = {
          clientPsid: psid,
          isTyping: false,
        };
        emitCustomEvent(EVENTS.TYPING_STATUS, payload);
      });
    }
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

  render() {
    const { is_input_lock, input_lock_text, onClickMenu, onInputFocus, browserSupportsSpeechRecognition, listening, notification_bot, beforeUpload, onRemove } = this.props;
    const { input_message } = this.state;
    // const android = isAndroid();
    return (
      <div className={classNames("ori-relative ori-full-width oriInputComposerContainer", { "ori-placeholder-primary": is_input_lock || listening })}>
        {
          !notification_bot && !listening &&
          <div className="ori-animated ori-fade-in ori-absolute ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc alignMenuIcon" onClick={onClickMenu}>
            <MenuIcon size={20} />
          </div>
        }
        {
          listening &&
          <div className={classNames("ori-absolute ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc ori-font-danger", { "alignCircleDotIcon": notification_bot, "alignMenuIcon": !notification_bot })} onClick={this.stopSpeechListening}>
            <CircleDotIcon size={18} className="ori-animated ori-ripple ori-infinite" />
          </div>
        }
        {
          !notification_bot &&
          <div className="ori-animated ori-fade-in ori-absolute ori-pad-5 ori-cursor-ptr ori-flex-column ori-flex-jc alignAddFileIcon">
            <Upload accept="image/*" showUploadList={false} beforeUpload={beforeUpload} onRemove={onRemove}>
              <AddFileIcon size={20} className="ori-font-light-hover-default" />
            </Upload>
          </div>
        }
        <Form onSubmit={this.handleMessageSend}>
          <TextArea
            placeholder={is_input_lock ? input_lock_text : (listening ? "Listening..." : "send your query...")}
            className="ori-font-md ori-line-height-1 inputField"
            autosize={{ minRows: 1, maxRows: 3 }}
            value={input_message}
            name="input_message"
            disabled={is_input_lock}
            onKeyDown={this.inputKeyDown}
            onFocus={onInputFocus}
            onChange={this.handleInputChange}
          />
          {
            (input_message.trim().length > 0 || !browserSupportsSpeechRecognition) &&
            <Button className={classNames("ori-animated ori-fade-in ori-absolute ori-pad-5 ori-flex-column ori-flex-jc alignSendButton", { "sendBtnActive": input_message.trim().length > 0 })} htmlType="submit" disabled={input_message.trim().length === 0 || is_input_lock}>
              <SendIcon size={20} />
            </Button>
          }
          {
            input_message.trim().length === 0 && browserSupportsSpeechRecognition &&
            <Button className={classNames("ori-animated ori-fade-in ori-absolute ori-pad-5 ori-flex-column ori-flex-jc alignSendButton")} disabled={is_input_lock} onClick={this.onClickMic}>
              <MicIcon size={20} className={classNames("ori-font-light btnIcon", { "ori-font-primary ori-animated ori-pulse ori-infinite": listening })} />
            </Button>
          }
        </Form>
      </div>
    );
  }
}

InputComposer.propTypes = {
  psid: PropTypes.string,
  is_input_lock: PropTypes.bool,
  input_lock_text: PropTypes.string,
  onClickMenu: PropTypes.func,
  sendTextToServer: PropTypes.func,
  onInputFocus: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  transcript: PropTypes.string,
  emitCustomEvent: PropTypes.func,
};

InputComposer.defaultProps = {
  is_input_lock: false,
  notification_bot: false,
  emitCustomEvent: () => { },
};

const options = {
  autoStart: false,
};

export default SpeechRecognition(options)(InputComposer);
