/* eslint-disable no-eval */
import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from 'react-icons/lib/md/close';
import Button from 'antd/lib/button';

import { chatbot_setting, chatbot_client_info, chatbot_default_messages } from '../../data/config/urls';
import {
  LOCAL_STORAGE,
  isAndroid,
  isIOS,
  fileToBase64,
  checkImageTypeFile,
  showMessage,
  checkMultipleExtension
} from '../../data/config/utils';
import { EVENTS, DEFAULT_END_CHAT_STATE } from '../../data/config/constants';
import { background } from '../../data/assets'

import './index.scss';

import Header from './components/Header';
import ChatBotConversation from '../../components/chatbotconversation';
import InputComposer from '../../components/inputcomposer';

const HeaderTag = React.lazy(() => import('./components/HeaderTag'))
const Menu = React.lazy(() => import('./components/menu'));
const QuickReply = React.lazy(() => import('./components/quickreply'));
const Feedback = React.lazy(() => import('./components/feedback'));
const EndChat = React.lazy(() => import('./components/endchat'));
const PreviewFile = React.lazy(() => import('./components/previewfile'));
const DownTime = React.lazy(() => import('./components/downtime'));
const CustomModal = React.lazy(() => import('../../components/custommodal'));
const ShowNotification = React.lazy(() => import('./components/shownotification'));
const InfoContent = React.lazy(() => import('./components/InfoContent'));
const PoweredBy = React.lazy(() => import('../../components/poweredby'))

const androidTabletStyle = {
  width: '100%',
  height: '100%',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  maxHeight: 'none',
  minHeight: 'none',
  borderRadius: '1px'
};

class ChatBot extends Component {
  state = {
    show_menu: false,
    show_feedback: false,
    info_content_type: null,
    end_chat_form_data: {},
    file: null,
    fileUrl: "",
    show_file_preview: false,
  };

  is_app = isAndroid() || isIOS();
  is_msg_updating = false

  componentWillMount() {
    this.setDefaultMessages()
  }

  componentDidUpdate() {
    const { messages } = this.props.chat_details
    if (this.is_msg_updating && messages.length !== 0)
      this.is_msg_updating = false
    this.setDefaultMessages()
  }

  setDefaultMessages = () => {
    const { actions } = this.props
    const { is_socket_connected, messages } = this.props.chat_details
    if (!this.is_msg_updating && messages.length === 0 && is_socket_connected) {
      this.is_msg_updating = true
      const default_messages = chatbot_default_messages.getDefaultMessages();
      default_messages.forEach((message, index) => {
        const delay = chatbot_default_messages.delay * (index + 1)
        setTimeout(actions.pushResponseMessage, delay, message)
      })
    }
  }

  openMenu = () => {
    this.setState({ show_menu: true });
  };

  closeMenu = () => {
    const { show_menu } = this.state;
    if (show_menu)
      this.setState({ show_menu: false });
  };

  handleResetChat = () => {
    const { psid, is_socket_connected } = this.props.chat_details;
    const { actions } = this.props;
    if (is_socket_connected) {
      const payload = { psid };
      actions.resetChat(payload, () => {
        actions.updateChatsState({ messages: [] })
        localStorage.setItem(LOCAL_STORAGE.MESSAGES(), JSON.stringify([]));
        localStorage.setItem(LOCAL_STORAGE.LAST_EMIT, null);
        this.closeMenu();
      });
    }
  };

  showFeedback = () => {
    this.setState({ show_menu: false }, () => {
      setTimeout(() => {
        this.setState({ show_feedback: true })
      }, 500)
    });
  };

  showInfoContent = type => {
    this.setState({ show_menu: false }, () => {
      setTimeout(() => {
        this.setState({ info_content_type: type })
      }, 500)
    });
  }

  closeFeedback = () => {
    this.setState({ show_feedback: false });
  };

  closeInfoContent = () => {
    this.setState({ info_content_type: null })
  }

  minimizeChatbotInterface = () => {
    this.props.actions.handleChatbotInterface(false);
  };

  onClickCloseIcon = () => {
    const { end_chat } = this.props.chat_details;
    const { actions } = this.props;
    const payload = end_chat.visible ? DEFAULT_END_CHAT_STATE :
      {
        ...DEFAULT_END_CHAT_STATE,
        visible: true,
        show_confirmation_card: true
      };
    actions.updateChatsState({ end_chat: payload });
  };

  handleFormInputChange = event => {
    this.setState({
      end_chat_form_data: {
        ...this.state.end_chat_form_data,
        [event.target.name]: event.target.value,
      }
    });
  };

  handleFormSelectChange = (value, option) => {
    if (option && option.props && option.props.name) {
      this.setState({
        end_chat_form_data: {
          ...this.state.end_chat_form_data,
          [option.props.name]: value,
        }
      });
    }
  };

  closeWebView = (type, data) => {
    if (isAndroid() && window.androidObj && window.androidObj.updateFromWeb) {
      window.androidObj.updateFromWeb(type, data);
    } else if (isIOS()) {
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.updateFromWebForWebkit)
        window.webkit.messageHandlers.updateFromWebForWebkit.postMessage({ type, data })
      else
        eval("if(updateFromWeb) updateFromWeb(type, data)");
    }
  }

  confirmEndConversation = () => {
    const { actions, chat_details } = this.props;
    const payload = {
      psid: chat_details.psid,
    };
    if (!chat_details.is_socket_connected) {
      actions.updateChatsState({ messages: [] })
      localStorage.setItem(LOCAL_STORAGE.MESSAGES(), JSON.stringify([]));
      localStorage.setItem(LOCAL_STORAGE.LAST_EMIT, null);
      this.closeWebView('endChatSubmit', {})
      actions.handleChatbotInterface(false);
      this.onClickCloseIcon();
    } else {
      actions.emitCustomEvent(EVENTS.END_CONVERSATION, payload, (err, res) => {
        console.log(payload, err, res);
        if (!err) {
          this.handleResetChat();
          if (res && res.data && res.data.formData)
            actions.updateChatsState({
              end_chat: {
                ...DEFAULT_END_CHAT_STATE,
                visible: true,
                show_form_card: true,
                form: res.data.formData,
                description: res.data.formTitle ? res.data.formTitle : null,
              }
            });
          else {
            this.closeWebView('endChatSubmit', {})
            actions.handleChatbotInterface(false);
            this.onClickCloseIcon();
          }
        }
      });
    }
  };

  submitEndFormFormData = () => {
    const { end_chat_form_data } = this.state;
    const { actions, chat_details } = this.props;
    const payload = {
      psid: chat_details.psid,
      formData: end_chat_form_data
    };
    actions.emitCustomEvent(EVENTS.END_CONVERSATION_FORM_SUBMIT, payload, () => {
      this.closeWebView('endChatSubmit', {})
      actions.handleChatbotInterface(false);
      this.onClickCloseIcon();
    });
  };

  beforeFileUpload = file => {
    console.log('file', file);
    if (file && file.name && checkMultipleExtension(file.name) && checkImageTypeFile(file.name) && file.size <= chatbot_setting.add_file.max_file_size_allowed) {
      fileToBase64(file).then(fileUrl => {
        this.setState({
          file,
          fileUrl,
          show_file_preview: true
        });
      })
    } else {
      console.log('selected file is not compatiable');
      const warn_msg = file.size > chatbot_setting.add_file.max_file_size_allowed ? "image size is large" : (!checkMultipleExtension(file.name) ? "Multi extension file can't be uploaded" : !checkImageTypeFile(file.name) ? "selected file is not an image" : "something went wrong.");
      showMessage('warning', warn_msg);
    }
    return false;
  };

  onFileRemove = () => {
    this.setState({
      file: null,
      fileUrl: "",
    });
  };

  onFilePreviewCancel = () => {
    this.setState({
      show_file_preview: false,
    });
  };

  onClickFileSend = () => {
    const { file, fileUrl } = this.state;
    const { handleFileUpload } = this.props;
    handleFileUpload({ file, fileUrl });
    this.onFilePreviewCancel();
  };

  onDowntimeComplete = () => {
    const { actions } = this.props;
    actions.updateChatsState({ downtime: {} });
    setTimeout(actions.makeSocketConnection, 1000);
  };

  render() {
    const {
      show_menu,
      show_feedback,
      show_file_preview,
      info_content_type,
      file,
      fileUrl
    } = this.state;
    const {
      chat_details,
      sendTextToServer,
      handleMsgBtnClick,
      handleFileUpload,
      handleOfferSelection,
      onChangeCheckbox,
      actions,
      screen_height
    } = this.props;

    let containerStyle = {
      bottom: chatbot_client_info.trigger.show_close_icon ? 'calc(20px + 70px + 20px)' : 0,
      borderRadius: chatbot_client_info.trigger.show_close_icon ? '8px' : '8px 8px 0px 0px',
    };
    if (this.is_app)
      containerStyle = { ...containerStyle, ...androidTabletStyle };

    return (
      <div
        className={classNames("ori-fixed ori-animated ori-z-index-99992 oriChatBotContainer",
          {
            "ori-fade-in-up": !chatbot_client_info.trigger.show_close_icon && !this.is_app,
            "ori-fade-in": (chatbot_client_info.trigger.show_close_icon || this.is_app)
          }
        )}
        style={containerStyle}
      >
        <div
          id="chatbotContentContainer"
          className="ori-relative ori-flex-column chatBotContentContainer"
          style={{
            backgroundImage: chatbot_setting.chat_interface.show_bg_image ? `url(${background})` : 'none'
          }}
        >
          <div className="ori-absolute ori-z-index-99994 ori-flex-row " style={{ top: '22px', right: '10px' }}>
            {
              !this.is_app && !chat_details.end_chat.visible &&
              <div className="ori-pad-5" onClick={this.minimizeChatbotInterface}>
                <div className="minimizeIcon" style={{ height: '16px', width: '13px' }} />
              </div>
            }
            <div className="ori-lr-pad-5 ori-cursor-ptr chatIcons" onClick={this.onClickCloseIcon}>
              {
                chat_details.end_chat.visible ?
                  <div className="ori-font-default-hover-white">
                    <CloseIcon size={18} />
                  </div>
                  :
                  <Button className="ori-font-xs ori-btn-default" size="small">End chat</Button>
              }
            </div>
          </div>
          <Suspense fallback={null}>
            <ShowNotification isMounted={chat_details.notification.visible} message={chat_details.notification.message} />
            <CustomModal
              isMounted={chat_details.downtime.isDownTime || info_content_type !== null}
              delayUnmountTime={400}
            >
              {
                chat_details.downtime.isDownTime &&
                <div className="ori-pad-10 ori-bg-white ori-border-radius-3 ori-mrgn-auto">
                  <DownTime downtime={chat_details.downtime} onDowntimeComplete={this.onDowntimeComplete} />
                </div>
              }
              {
                info_content_type &&
                <InfoContent type={info_content_type} onClose={this.closeInfoContent} />
              }
            </CustomModal>
            <EndChat
              isMounted={chat_details.end_chat.visible}
              delayUnmountTime={400}
              is_socket_connected={chat_details.is_socket_connected}
              end_chat={chat_details.end_chat}
              closeEndChatPopup={this.onClickCloseIcon}
              confirmEndConversation={this.confirmEndConversation}
              handleFormInputChange={this.handleFormInputChange}
              handleFormSelectChange={this.handleFormSelectChange}
              submitFormData={this.submitEndFormFormData}
            />
            <PreviewFile
              isMounted={show_file_preview}
              delayUnmountTime={400}
              is_socket_connected={chat_details.is_socket_connected}
              file={file}
              fileUrl={fileUrl}
              onClickCancel={this.onFilePreviewCancel}
              onClickSend={this.onClickFileSend}
              onFileRemove={this.onFileRemove}
            />
            <Menu
              isMounted={show_menu}
              delayUnmountTime={400}
              closeMenu={this.closeMenu}
              handleResetChat={this.handleResetChat}
              showFeedback={this.showFeedback}
              showInfoContent={this.showInfoContent}
            />
            <Feedback
              isMounted={show_feedback}
              delayUnmountTime={650}
              is_socket_connected={chat_details.is_socket_connected}
              closeFeedback={this.closeFeedback}
              psid={chat_details.psid}
              sendFeedback={actions.sendFeedback}
            />
            {
              screen_height < 420 &&
              <HeaderTag />
            }
          </Suspense>
          {
            screen_height >= 420 &&
            <Header />
          }
          <ChatBotConversation
            btn_disabled={!chat_details.is_socket_connected}
            messages={chat_details.messages}
            onMessageVoting={actions.onMessageVoting}
            handleMsgBtnClick={handleMsgBtnClick}
            handleFileUpload={handleFileUpload}
            handleOfferSelection={handleOfferSelection}
            onChangeCheckbox={onChangeCheckbox}
            is_typing={chat_details.is_typing}
            typing_text={chat_details.typing_text}
          />
          <div
            className="ori-relative ori-flex-column ori-flex-jc chatFooterContainer"
            style={{
              paddingRight: '65px',
              paddingLeft: chatbot_setting.menu.visible ? '30px' : '10px'
            }}
          >
            {
              chatbot_setting.powered_by.visibility &&
              <Suspense fallback={null}>
                <PoweredBy container_class="ori-absolute ori-align-left ori-align-right ori-align-bottom ori-text-center" />
              </Suspense>
            }
            {
              chat_details.quick_replies && chat_details.quick_replies.length > 0 &&
              <Suspense fallback={null}>
                <div className="ori-absolute ori-align-left ori-align-right ori-align-bottom-full">
                  <QuickReply
                    quick_replies={chat_details.quick_replies}
                    sendTextToServer={sendTextToServer}
                  />
                </div>
              </Suspense>
            }
            <InputComposer
              psid={chat_details.psid}
              sendTextToServer={sendTextToServer}
              is_input_lock={chat_details.is_input_lock}
              input_lock_text={chat_details.input_lock_text}
              onClickMenu={this.openMenu}
              emitCustomEvent={actions.emitCustomEvent}
              beforeUpload={this.beforeFileUpload}
              onRemove={this.onFileRemove}
            />
          </div>
        </div>
      </div >
    );
  }
}

ChatBot.propTypes = {
  chat_details: PropTypes.object,
  actions: PropTypes.object,
  sendTextToServer: PropTypes.func,
  handleMsgBtnClick: PropTypes.func,
  handleFileUpload: PropTypes.func,
  handleOfferSelection: PropTypes.func,
  onChangeCheckbox: PropTypes.func,
};

export default ChatBot;
