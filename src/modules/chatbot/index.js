/* eslint-disable no-eval */
import React, { lazy, Component, Suspense } from "react";
import PropTypes from "prop-types";
import Button from "antd/lib/button"
import ReactGA from "react-ga4"

import {
  chatbot_setting,
  chatbot_default_messages,
  brand_features,
  adster_settings
} from "../../data/config/brandSetup";
import chatbotStyle from "../../data/config/chatbotStyle"
import {
  isAndroid,
  isIOS,
  fileToBase64,
  isImageExist,
  showMessage,
  checkMultipleExtension,
  getQueryParamsValue,
  getPreviousMessageData,
  getImageMetaData
} from "../../data/config/utils";
import {
  EVENTS,
  DEFAULT_END_CHAT_STATE,
  CHATBOT_TYPE,
  TYPES,
  LOCAL_STORAGE,
  GOOGLE_ENABLER_EVENTS
} from "../../data/config/constants";

import "./index.scss";

import DotsLoader from "../../components/dotsloader"

const Header = lazy(() => import("./components/Header"))
const HeaderTag = lazy(() => import("./components/HeaderTag"))
const ChatBotConversation = lazy(() => import("../../components/chatbotconversation"))
const InputComposer = lazy(() => import("../../components/inputcomposer"))
const Menu = lazy(() => import("./components/menu"))
const QuickReply = lazy(() => import("./components/quickreply"))
const Feedback = lazy(() => import("./components/feedback"))
const EndChat = lazy(() => import("./components/endchat"))
const PreviewFile = lazy(() => import("./components/previewfile"))
const DownTime = lazy(() => import("./components/downtime"))
const CustomModal = lazy(() => import("../../components/custommodal"))
const ShowNotification = lazy(() => import("./components/shownotification"))
const InfoContent = lazy(() => import("./components/InfoContent"))
const PoweredBy = lazy(() => import("../../components/PoweredBy"))

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
    show_banner: true,
  }

  is_app = isAndroid() || isIOS();
  is_msg_updating = false
  delay_push_messages = false
  push_default_msg_timer = null
  bannerTimer = null

  componentDidMount() {
    const { actions } = this.props;
    const timestamp = new Date().getTime()
    ReactGA.send({
      hitType:'event',
      eventCategory: 'InitialBotLoad',
      eventAction: 'InitialBotLoadEnd',
      eventLabel: 'InitialBotLoadEnd',
      eventValue: timestamp
      });
    if (chatbot_setting.chatbot_type === CHATBOT_TYPE.ADSTER && adster_settings.banner) {
      const chatbotElement = document.getElementById("chatbotContentContainer")
      console.log('bannerSize', chatbotElement.clientWidth, chatbotElement.clientHeight)
      const aspectRatio = chatbotElement.clientWidth / chatbotElement.clientHeight
      const query_params = new URLSearchParams(window.location.search)
      const banner_key = query_params.get(adster_settings.banner_query_params_key)
      const banner_url = adster_settings.getBannerByAspectRatio(aspectRatio, banner_key)
      actions.updatePageState({ banner_url, banner_key })
      getImageMetaData(banner_url, data => actions.updatePageState({
        banner_width: data.width,
        banner_height: data.height
      }))
      this.bannerTimer = setTimeout(this.hideBannerImage, adster_settings.banner_initial_transtion_delay)
    }
    this.pushDefaultMessages()
  }

  componentDidUpdate(prevProps) {
    const { messages, is_socket_connected } = this.props.chat_details
    if (this.is_msg_updating && messages.length !== 0)
      this.is_msg_updating = false
    if (this.delay_push_messages && messages.length !== 0)
      this.delay_push_messages = false

    if (chatbot_setting.auto_emit_message.enable && !prevProps.chat_details.is_socket_connected && is_socket_connected) {
      const will_auto_emit = getQueryParamsValue(chatbot_setting.auto_emit_message.query_param_key, null)
      if (will_auto_emit) {
        this.delay_push_messages = true
        if (this.push_default_msg_timer)
          clearTimeout(this.push_default_msg_timer)
        this.push_default_msg_timer = setTimeout(this.pushDefaultMessages, chatbot_setting.auto_emit_message.initial_delay_for_default_msg)
      }
    }
    if (!this.delay_push_messages)
      this.pushDefaultMessages()
  }

  componentWillUnmount() {
    if (this.push_default_msg_timer)
      clearTimeout(this.push_default_msg_timer)
    if (this.bannerTimer)
      clearTimeout(this.bannerTimer)
  }

  pushDefaultMessages = () => {
    const { actions } = this.props
    const { is_socket_connected, messages, is_chat_open } = this.props.chat_details
    let cond = is_socket_connected
    if (chatbot_setting.chatbot_type === CHATBOT_TYPE.DEFAULT)
      cond = is_socket_connected && is_chat_open
    else if (chatbot_setting.chatbot_type === CHATBOT_TYPE.ADSTER)
      cond = !this.state.show_banner
    if (!this.is_msg_updating && messages.length === 0 && cond) {
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
    const { psid } = this.props.chat_details;
    const { actions } = this.props;
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
    if (chatbot_setting.chatbot_type === CHATBOT_TYPE.ADSTER && window.parent)
      window.parent.postMessage({
        type: 'counter',
        func: GOOGLE_ENABLER_EVENTS.CHAT_RESET,
        message: ""
      }, '*')
  };

  showClearChatPopConfirm = () => {
    this.setState({ show_menu: false }, () => {
      setTimeout(() => {
        this.setState({ show_clear_chat_popconfirm: true })
      }, 500)
    });
  }

  handleEndChatMenuItem = () => {
    this.setState({ show_menu: false }, () => {
      setTimeout(this.onClickCloseIcon, 500)
    })
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
    const { end_chat, psid } = this.props.chat_details;
    const { actions } = this.props;
    if (chatbot_setting.chatbot_type === CHATBOT_TYPE.ADSTER) {
      this.setState({ show_banner: true })
      this.handleResetChat()
      const payload = { psid }
      actions.emitCustomEvent(EVENTS.END_CONVERSATION, payload)
      if (window.parent)
        window.parent.postMessage({
          type: 'counter',
          func: GOOGLE_ENABLER_EVENTS.END_CHAT,
          message: ""
        }, '*')
    } else {
      const payload = end_chat.visible ? DEFAULT_END_CHAT_STATE :
        {
          ...DEFAULT_END_CHAT_STATE,
          visible: true,
          show_confirmation_card: true
        };
      actions.updateChatsState({ end_chat: payload });
    }
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
      localStorage.removeItem(LOCAL_STORAGE.DISABLE_MESSAGE_AFTER_USER_REPLY + chat_details.psid)
      localStorage.removeItem(LOCAL_STORAGE.MESSAGES + chat_details.psid);
      localStorage.removeItem(LOCAL_STORAGE.LAST_EMIT + chat_details.psid);
      actions.handleChatbotInterface(false);
      this.onClickCloseIcon();
      this.closeWebView("endChatSubmit", {})
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
                formTitle: res.data.formTitle ? res.data.formTitle : "",
                formSubTitle: res.data.formSubTitle ? res.data.formSubTitle : "",
              }
            });
          else {
            actions.handleChatbotInterface(false);
            this.onClickCloseIcon();
            this.closeWebView("endChatSubmit", {})
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
        this.closeWebView("endChatSubmit", {})
        brand_features.doBrandLogicOnEndChat(TYPES.FORM_SUBMIT)
      });
    } else {
      showMessage("error", "All fields are required")
    }
  };

  skipEndChatForm = () => {
    const { actions } = this.props
    this.onClickCloseIcon();
    this.closeWebView("endChatSubmit", {})
    actions.handleChatbotInterface(false);
    brand_features.doBrandLogicOnEndChat(TYPES.SKIP)
  }

  beforeFileUpload = file => {
    const is_allowed_image_type = brand_features.allowedImageTypeUpload(file.name)
    if (file && file.name && checkMultipleExtension(file.name) && is_allowed_image_type && file.size <= chatbot_setting.max_upload_file_size) {
      fileToBase64(file).then(fileUrl => {
        isImageExist(fileUrl).then(isValidUrl => {
          if (isValidUrl)
            this.setState({
              file,
              fileUrl,
              show_file_preview: true
            });
          else
            showMessage("warning", "selected file is not a valid image")
        })
      })
    } else {
      const warn_msg = file.size > chatbot_setting.max_upload_file_size ?
        "image size is large" :
        (
          !checkMultipleExtension(file.name) ?
            "Multi extension file can't be uploaded" :
            (
              !is_allowed_image_type ?
                "selected file is not an image" :
                "something went wrong."
            )
        );
      showMessage("warning", warn_msg);
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

  hideBannerImage = () => {
    if (this.bannerTimer)
      clearTimeout(this.bannerTimer)
    this.setState({ show_banner: false })
  }

  onClickBannerImage = () => {
    this.hideBannerImage()
    if (chatbot_setting.chatbot_type === CHATBOT_TYPE.ADSTER && window.parent)
      window.parent.postMessage({
        type: 'counter',
        func: GOOGLE_ENABLER_EVENTS.BANNER,
        message: 'Banner Clicked'
      }, '*')
  }

  render() {
    const {
      show_menu,
      show_feedback,
      show_file_preview,
      info_content_type,
      file,
      fileUrl,
      show_clear_chat_popconfirm,
      show_banner
    } = this.state;
    const {
      chat_details,
      sendTextToServer,
      handleMsgBtnClick,
      handleFileUpload,
      handleOfferSelection,
      onSubmitCheckbox,
      actions,
      screen_height,
      banner_url
    } = this.props;
    const input_lock_text = getPreviousMessageData(chat_details.messages, "inputLockMessage", undefined)

    return (
      <div
        id="chatbotContentContainer"
        className="ori-relative ori-flex-column oriChatBotContainer"
        style={chatbotStyle.chatbotContainer}
      >
        {
          chat_details.loading &&
          <div className="ori-absolute ori-z-index-99995 ori-align-full ori-flex-column ori-flex-center ori-bg-black-light">
            <DotsLoader container_class="ori-bg-white ori-pad-15 ori-border-radius-3" />
          </div>
        }
        {
          chatbot_setting.chatbot_type === CHATBOT_TYPE.ADSTER && adster_settings.banner && banner_url &&
          <div
            className={`ori-absolute ori-align-left ori-align-right ori-full-width ori-full-parent-height ori-transition-ease ori-z-index-99996 ori-overflow-hidden ori-bg-white ori-cursor-ptr ori-bg-no-repeat ori-bg-size-cover ori-bg-position-center ${show_banner ? "ori-align-bottom" : "ori-align-bottom-full"}`}
            style={{
              backgroundImage: `url(${banner_url})`,
            }}
            onClick={this.onClickBannerImage}
          />
        }
        <div
          className="ori-absolute ori-z-index-99994 ori-flex-row "
          style={{
            top: "22px",
            right: "10px"
          }}
        >
          {
            chatbot_setting.minimize_bot && !this.is_app && !chat_details.end_chat.visible &&
            <div className="ori-pad-5 ori-cursor-ptr" onClick={this.minimizeChatbotInterface}>
              <chatbotStyle.MinimizeIcon />
            </div>
          }
          {
            chatbot_setting.header_end_chat &&
            <div className="ori-lr-pad-5 ori-cursor-ptr" onClick={this.onClickCloseIcon}>
              <chatbotStyle.EndChatIcon />
            </div>
          }
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
              <div className="ori-pad-10 ori-bg-popup ori-font-popup ori-border-radius-3 ori-mrgn-auto">
                Are you sure you want to clear the chat?
                <div className="ori-flex ori-flex-jfe ori-t-pad-10">
                  <Button
                    size="small"
                    className="ori-btn-ghost-primary"
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
            is_internet_connected={chat_details.is_internet_connected}
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
            handleEndChat={this.handleEndChatMenuItem}
            showFeedback={this.showFeedback}
            showInfoContent={this.showInfoContent}
          />
          <Feedback
            isMounted={show_feedback}
            delayUnmountTime={650}
            is_internet_connected={chat_details.is_internet_connected}
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
          <Suspense
            fallback={
              <div className="ori-pad-20 ori-bg-header ori-flex-row">
                <div className="ori-card-loading ori-lr-mrgn-10" style={{ height: "32px", width: "32px" }} />
                <p className="ori-card-loading" style={{ height: "15px", width: "100px" }} />
              </div>
            }
          >
            <Header />
          </Suspense>
        }
        <Suspense
          fallback={
            <div className="ori-full-flex ori-flex-column ori-flex-center">
              <DotsLoader container_class="ori-box-shadow ori-bg-white ori-pad-15 ori-border-radius-3" />
            </div>
          }
        >
          <ChatBotConversation
            psid={chat_details.psid}
            btn_disabled={!chat_details.is_internet_connected}
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
        </Suspense>
        <div
          className="ori-relative ori-flex-column ori-flex-jc chatFooterContainer"
          style={{
            paddingRight: "65px",
            paddingLeft: chatbot_setting.menu.visible ? "30px" : "10px",
            ...chatbotStyle.footerContainer
          }}
        >
          <span
            className="ori-absolute ori-bg-border-light"
            style={{
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              ...chatbotStyle.footerBorder
            }}
          />
          {
            chat_details.messages && chat_details.messages.length > 0 && chat_details.messages[chat_details.messages.length - 1].quickReplies && chat_details.messages[chat_details.messages.length - 1].quickReplies.length > 0 &&
            <Suspense fallback={null}>
              <div className={chatbotStyle.quickReplyWrapperClass}>
                <QuickReply
                  quick_replies={chat_details.messages[chat_details.messages.length - 1].quickReplies}
                  sendTextToServer={sendTextToServer}
                />
              </div>
            </Suspense>
          }
          <Suspense fallback={<p className="ori-card-loading" style={{ height: "15px", width: "50%" }} />}>
            <InputComposer
              psid={chat_details.psid}
              sendTextToServer={sendTextToServer}
              is_input_lock={getPreviousMessageData(chat_details.messages, "inputLock", false)}
              input_lock_text={input_lock_text ? input_lock_text : undefined}
              onClickMenu={this.openMenu}
              emitCustomEvent={actions.emitCustomEvent}
              beforeUpload={this.beforeFileUpload}
              onRemove={this.onFileRemove}
              upload_enabled={chat_details.upload_file}
            />
          </Suspense>
        </div>
        {
          chatbot_setting.powered_by.visibility &&
          <Suspense fallback={null}>
            <PoweredBy container_class="ori-absolute ori-align-left ori-align-right ori-align-bottom ori-text-center" />
          </Suspense>
        }
      </div>
    )
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
  banner_url: PropTypes.string
};

export default ChatBot;
