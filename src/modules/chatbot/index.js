/* eslint-disable no-eval */
import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';

import { chatbot_setting, chatbot_default_messages, brand_features } from '../../data/config/brandSetup';
import chatbotStyle from "../../data/config/chatbotStyle"
import {
  isAndroid,
  isIOS,
  fileToBase64,
  checkImageTypeFile,
  showMessage,
  checkMultipleExtension
} from '../../data/config/utils';
import {
  EVENTS,
  DEFAULT_END_CHAT_STATE,
  CHATBOT_TYPE,
  TYPES,
  LOCAL_STORAGE
} from '../../data/config/constants';

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
const PoweredBy = React.lazy(() => import('../../components/poweredby'));
const DotsLoader = React.lazy(() => import('../../components/dotsloader'))


class ChatBot extends Component {
  state = {
    show_menu: false,
    show_feedback: false,
    show_clear_chat_popconfirm: false,
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
    const { is_socket_connected, messages, is_chat_open } = this.props.chat_details
    if (!this.is_msg_updating && messages.length === 0 && is_socket_connected && (chatbot_setting.chatbot_type === CHATBOT_TYPE.DEFAULT ? is_chat_open : true)) {
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
        actions.updateChatsState({
          messages: [],
          disable_msg_after_reply: {}
        })
        localStorage.removeItem(LOCAL_STORAGE.DISABLE_MESSAGE_AFTER_USER_REPLY + psid)
        localStorage.removeItem(LOCAL_STORAGE.MESSAGES + psid);
        localStorage.removeItem(LOCAL_STORAGE.LAST_EMIT + psid);
      });
      this.closeClearChatPopConfirm()
    }
  };

  showClearChatPopConfirm = () => {
    this.setState({ show_menu: false }, () => {
      setTimeout(() => {
        this.setState({ show_clear_chat_popconfirm: true })
      }, 500)
    });
  }

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
  };

  closeClearChatPopConfirm = () => {
    this.setState({ show_clear_chat_popconfirm: false })
  };

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

  handleFormItemChange = (key, value) => {
    this.setState({
      end_chat_form_data: {
        ...this.state.end_chat_form_data,
        [key]: value,
      }
    });
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
      actions.updateChatsState({
        messages: [],
        disable_msg_after_reply: {}
      })
      localStorage.removeItem(LOCAL_STORAGE.DISABLE_MESSAGE_AFTER_USER_REPLY)
      localStorage.removeItem(LOCAL_STORAGE.MESSAGES());
      localStorage.removeItem(LOCAL_STORAGE.LAST_EMIT);
      actions.handleChatbotInterface(false);
      this.onClickCloseIcon();
      this.closeWebView('endChatSubmit', {})
      brand_features.doBrandLogicOnEndChat(TYPES.END_CHAT)
    } else {
      actions.updateChatsState({ loading: true })
      actions.emitCustomEvent(EVENTS.END_CONVERSATION, payload, (err, res) => {
        console.log(payload, err, res);
        actions.updateChatsState({ loading: false })
        if (!err) {
          this.handleResetChat();
          if (res && res.data && res.data.formData)
            actions.updateChatsState({
              end_chat: {
                ...DEFAULT_END_CHAT_STATE,
                visible: true,
                show_form_card: true,
                form: res.data.formData,
                formTitle: res.data.formTitle ? res.data.formTitle : '',
                formSubTitle: res.data.formSubTitle ? res.data.formSubTitle : '',
              }
            });
          else {
            actions.handleChatbotInterface(false);
            this.onClickCloseIcon();
            this.closeWebView('endChatSubmit', {})
            brand_features.doBrandLogicOnEndChat(TYPES.END_CHAT)
          }
        }
      });
    }
  };

  submitEndChatFormData = () => {
    const { end_chat_form_data } = this.state;
    const { actions, chat_details } = this.props;
    const index = chat_details.end_chat.form.findIndex(item => item.input_props && item.input_props.required && !end_chat_form_data.hasOwnProperty(item.input_props.name))
    if (index === -1) {
      const payload = {
        psid: chat_details.psid,
        formData: end_chat_form_data
      };
      actions.updateChatsState({ loading: true })
      actions.emitCustomEvent(EVENTS.END_CONVERSATION_FORM_SUBMIT, payload, () => {
        actions.handleChatbotInterface(false);
        actions.updateChatsState({ loading: false })
        this.onClickCloseIcon();
        this.closeWebView('endChatSubmit', {})
        brand_features.doBrandLogicOnEndChat(TYPES.FORM_SUBMIT)
      });
    } else {
      showMessage('error', 'All fields are required')
    }
  };

  skipEndChatForm = () => {
    const { actions } = this.props
    this.onClickCloseIcon();
    this.closeWebView('endChatSubmit', {})
    actions.handleChatbotInterface(false);
    brand_features.doBrandLogicOnEndChat(TYPES.SKIP)
  }

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
      fileUrl,
      show_clear_chat_popconfirm
    } = this.state;
    const {
      chat_details,
      sendTextToServer,
      handleMsgBtnClick,
      handleFileUpload,
      handleOfferSelection,
      onSubmitCheckbox,
      actions,
      screen_height
    } = this.props;

    return (
      <div
        id="chatbotContentContainer"
        className="ori-relative ori-flex-column oriChatBotContainer"
        style={chatbot_setting.chat_interface.show_bg_image ? chatbot_setting.chat_interface.chatbot_container_bg_style : {}}
      >
        {
          chat_details.loading &&
          <div className="ori-absolute ori-z-index-99995 ori-align-full ori-flex-column ori-flex-center ori-bg-black-light">
            <Suspense fallback={null}>
              <DotsLoader container_class="ori-bg-white ori-pad-15 ori-border-radius-3" />
            </Suspense>
          </div>
        }
        <div className="ori-absolute ori-z-index-99994 ori-flex-row " style={{ top: '22px', right: '10px' }}>
          {
            chatbot_setting.minimize_bot && !this.is_app && !chat_details.end_chat.visible &&
            <div className="ori-pad-5" onClick={this.minimizeChatbotInterface}>
              <chatbotStyle.MinimizeIcon />
            </div>
          }
          <div className="ori-lr-pad-5 ori-cursor-ptr" onClick={this.onClickCloseIcon}>
            <chatbotStyle.EndChatIcon />
          </div>
        </div>
        <Suspense fallback={null}>
          <ShowNotification isMounted={chat_details.notification.visible} message={chat_details.notification.message} />
          <CustomModal
            isMounted={chat_details.downtime.isDownTime || info_content_type !== null || show_clear_chat_popconfirm}
            delayUnmountTime={400}
          >
            {
              chat_details.downtime.isDownTime &&
              <div className="ori-pad-10 ori-bg-white ori-border-radius-3 ori-mrgn-auto">
                <DownTime
                  downtime={chat_details.downtime}
                  onDowntimeComplete={this.onDowntimeComplete}
                />
              </div>
            }
            {
              info_content_type &&
              <InfoContent
                type={info_content_type}
                onClose={this.closeInfoContent}
              />
            }
            {
              show_clear_chat_popconfirm &&
              <div className="ori-pad-10 ori-bg-white ori-border-radius-3 ori-mrgn-auto">
                Are you sure you want to clear the chat?
                  <div className="ori-flex ori-flex-jfe ori-t-pad-10">
                  <Button
                    size="small"
                    className="ori-btn-default"
                    onClick={this.closeClearChatPopConfirm}
                  >
                    No
                    </Button>
                  <Button
                    size="small"
                    className="ori-btn-fill-primary ori-l-mrgn-10"
                    onClick={this.handleResetChat}
                  >
                    Yes
                    </Button>
                </div>
              </div>
            }
          </CustomModal>
          <EndChat
            isMounted={chat_details.end_chat.visible}
            delayUnmountTime={400}
            is_socket_connected={chat_details.is_socket_connected}
            end_chat={chat_details.end_chat}
            cancelEndConversation={this.onClickCloseIcon}
            confirmEndConversation={this.confirmEndConversation}
            handleFormItemChange={this.handleFormItemChange}
            submitForm={this.submitEndChatFormData}
            skipForm={this.skipEndChatForm}
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
            handleResetChat={this.showClearChatPopConfirm}
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
            chatbot_setting.chat_interface.header_tag && screen_height < 420 &&
            <HeaderTag />
          }
        </Suspense>
        {
          screen_height >= 420 &&
          <Header />
        }
        <ChatBotConversation
          psid={chat_details.psid}
          btn_disabled={!chat_details.is_socket_connected}
          disable_msg_after_reply={chat_details.disable_msg_after_reply}
          messages={chat_details.messages}
          onMessageVoting={actions.onMessageVoting}
          handleMsgBtnClick={handleMsgBtnClick}
          handleFileUpload={handleFileUpload}
          handleOfferSelection={handleOfferSelection}
          onSubmitCheckbox={onSubmitCheckbox}
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
            chat_details.messages && chat_details.messages.length > 0 && chat_details.messages[chat_details.messages.length - 1].quickReplies && chat_details.messages[chat_details.messages.length - 1].quickReplies.length > 0 &&
            <Suspense fallback={null}>
              <div className="ori-absolute ori-align-left ori-align-right ori-align-bottom-full">
                <QuickReply
                  quick_replies={chat_details.messages[chat_details.messages.length - 1].quickReplies}
                  sendTextToServer={sendTextToServer}
                />
              </div>
            </Suspense>
          }
          <InputComposer
            psid={chat_details.psid}
            sendTextToServer={sendTextToServer}
            is_input_lock={chat_details.messages && chat_details.messages.length > 0 && chat_details.messages[chat_details.messages.length - 1].inputLock}
            input_lock_text={chat_details.messages && chat_details.messages.length > 0 ? chat_details.messages[chat_details.messages.length - 1].inputLockMessage : ''}
            onClickMenu={this.openMenu}
            emitCustomEvent={actions.emitCustomEvent}
            beforeUpload={this.beforeFileUpload}
            onRemove={this.onFileRemove}
          />
        </div>
      </div>
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
  onSubmitCheckbox: PropTypes.func,
};

export default ChatBot;
