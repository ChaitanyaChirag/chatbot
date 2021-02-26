import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Badge from 'antd/lib/badge';
import classNames from 'classnames';
import merge from 'lodash/merge';
import SendingIcon from 'react-icons/lib/md/rotate-right';

import './index.scss';

import { LangContext } from './context'

import * as chatActions from '../data/redux/chat_details/actions';
import * as pageActions from '../data/redux/page_details/actions';

import {
  LANGUAGES,
  MESSAGE_TYPES,
  BUTTON_TYPES,
  BUTTON_SUB_TYPES,
  MESSAGE_SENDER,
  MESSAGE_READ_STATUS,
  EVENTS,
  CHATBOT_TYPE
} from '../data/config/constants';
import {
  LOCAL_STORAGE,
  PLATFORM,
  checkDevice,
  isAndroid,
  isIOS,
  uniqueId,
  fetchWithTimeout,
  showMessage
} from '../data/config/utils';
import {
  chatbot_setting,
  translator,
  chatbot_default_messages,
  brand_features
} from '../data/config/brandSetup';
import { networkCheckUrl, senderId } from '../data/config/urls'
// import { outerBackground } from '../data/assets'

import TriggerChatBot from '../components/triggerchatbot';

const ChatBot = React.lazy(() => import('./chatbot'));
const NotificationBot = React.lazy(() => import('./notificationbot'));

const defaultMessageLength = chatbot_default_messages.getDefaultMessages().length

class AppContainer extends Component {
  constructor(props) {
    super(props);
    window.androidObj = function AndroidClass() { };
    this.timeout = false;
    this.chatbotRef = React.createRef();
    this.userFirstEmit = false;
    this.state = {
      lang: LANGUAGES.ENGLISH,
      render_chatbot: props.chat_details.is_chat_open,
      selected_offer: {
        offer_id: null,
        offer_name: null
      }
    }
  }

  componentDidMount() {
    const { chat_details, actions } = this.props;
    const android = isAndroid();
    const ios = isIOS();
    const mobile = window.innerWidth < 768
    let self = this;
    const lang = translator.getLanguage()
    this.setState({ lang })
    if (chatbot_setting.security.enable && !chat_details.secure) {
      const security_code = window.prompt(translator.text[lang].security_prompt)
      if (security_code && security_code === chatbot_setting.security.code)
        actions.updateChatsState({ secure: true })
    }

    window.bot_popup = this.botPopup;
    actions.updatePageState({ device_data: checkDevice.deviceStatus() });
    window.addEventListener("resize", () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        self.props.actions.updatePageState({ device_data: checkDevice.deviceStatus() });
      }, 300);
    });
    this.checkInternetConnection();
    window.addEventListener('online', this.checkInternetConnection);
    window.addEventListener('offline', this.checkInternetConnection);
    document.addEventListener("visibilitychange", this.onScreenVisibilityChange);
    document.addEventListener("focusin", this.onScreenVisibilityChange);
    if (android || ios) {
      window.androidObj.updateFromAndroid = (type, data) => {
        const update_type = type.toLowerCase();
        if (update_type === PLATFORM.ANDROID) {
          localStorage.removeItem(PLATFORM.IOS);
        } else if (update_type === PLATFORM.IOS) {
          localStorage.removeItem(PLATFORM.ANDROID);
        }
        if (update_type === PLATFORM.ANDROID || update_type === PLATFORM.IOS) {
          localStorage.setItem(update_type, JSON.stringify(true));
        } else if (update_type === 'psid') {
          data = JSON.parse(data);
          if (data.psid) {
            localStorage.setItem(LOCAL_STORAGE.PSID, data.psid);
            actions.updateChatsState({ psid: data.psid });
          }
          if (data.params) {
            localStorage.setItem(LOCAL_STORAGE.APP_PARAMS, JSON.stringify(data.params));
          }
          if (!chat_details.is_socket_connected) {
            actions.updateChatsState({ messages: [] })
            actions.makeSocketConnection();
          }
        } else if (update_type === 'endchat' && this.chatbotRef && this.chatbotRef.current && this.chatbotRef.current.onClickCloseIcon) {
          this.chatbotRef.current.onClickCloseIcon();
        }
      }
      actions.handleChatbotInterface(true);
    } else if (!chat_details.is_socket_connected) {
      const query_params = new URLSearchParams(window.location.search);
      if (chatbot_setting.chatbot_type === CHATBOT_TYPE.FULL_SCREEN) {
        actions.makeSocketConnection();
      } else if (chatbot_setting.auto_open_chatbot.enable && query_params.has(chatbot_setting.auto_open_chatbot.query_param_key)) {
        const query_param_value = query_params.get(chatbot_setting.auto_open_chatbot.query_param_key)
        if (query_param_value === "true")
          this.handleSocketConnection(true)
        else if (query_param_value === "false")
          actions.handleChatbotInterface(false)
      } else {
        actions.handleChatbotInterface(false);
      }

      let last_emit = localStorage.getItem(LOCAL_STORAGE.LAST_EMIT) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.LAST_EMIT)) : null;
      if (last_emit) {
        let current_time = new Date().getTime();
        let time_gap = (current_time - last_emit) / 1000;
        if (!(mobile ? chatbot_setting.auto_close_chatbot_on_refresh.mobile_enable : chatbot_setting.auto_close_chatbot_on_refresh.web_enable) && time_gap < chatbot_setting.automate_connection_time)
          actions.makeSocketConnection();
        else
          actions.handleChatbotInterface(false);
        if (time_gap > chatbot_setting.automate_reset_chat_time) {
          actions.updateChatsState({ messages: [] })
          localStorage.setItem(LOCAL_STORAGE.MESSAGES, JSON.stringify([]));
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { actions } = this.props;
    const { is_socket_connected, is_internet_connected, is_chat_open } = this.props.chat_details;
    if (prevProps.chat_details.is_chat_open && !is_chat_open) {
      setTimeout(() => this.setState({ render_chatbot: false }), 400);
    } else if (!prevProps.chat_details.is_chat_open && is_chat_open) {
      this.setState({ render_chatbot: true })
    }
    if (!prevProps.chat_details.is_internet_connected && is_internet_connected && !is_socket_connected)
      actions.callSocketMethod('open')
    else if (prevProps.chat_details.is_internet_connected && !is_internet_connected && is_socket_connected)
      actions.callSocketMethod('close')
    if (prevProps.chat_details.is_socket_connected !== is_socket_connected)
      this.checkInternetConnection()
  }

  componentWillUnmount() {
    const { actions } = this.props;
    window.removeEventListener('online', this.checkInternetConnection);
    window.removeEventListener('offline', this.checkInternetConnection);
    document.removeEventListener("visibilitychange", this.onScreenVisibilityChange);
    document.removeEventListener("focusin", this.onScreenVisibilityChange);
    actions.socketDisconnect();
  }

  onScreenVisibilityChange = () => {
    const { chat_details, actions } = this.props;
    if (document.visibilityState === 'visible' && chat_details.is_chat_open) {
      const payload = {
        clientPsid: chat_details.psid,
        senderPsid: chat_details.psid,
      };
      actions.emitCustomEvent(EVENTS.MESSAGE_SEEN, payload);
    }
  }

  checkInternetConnection = () => {
    const { actions, chat_details } = this.props;
    if (navigator.onLine) {
      if (!chat_details.internet_connection_checking) {
        actions.updateChatsState({ internet_connection_checking: true })
        fetchWithTimeout(networkCheckUrl, {
          mode: 'no-cors',
        }).then(() => {
          actions.updateChatsState({
            internet_connection_checking: false,
            is_internet_connected: true
          })
        }).catch(error => {
          actions.updateChatsState({ internet_connection_checking: false })
          if (error && error.message === "timeout") {
            actions.updateChatsState({ is_internet_connected: false })
            showMessage('error', 'You are currently offline')
          }
        })
      }
    } else {
      actions.updateChatsState({ is_internet_connected: false })
      showMessage('error', 'You are currently offline')
    }
  }

  botPopup = (case_data, params) => {
    const { chat_details, actions } = this.props;
    let payload = {
      case: case_data,
      params: params,
      psid: chat_details.psid
    };
    actions.handleBotPopupRequest(payload);
  };

  handleSocketConnection = bool => {
    const { chat_details, actions } = this.props;
    const android = isAndroid();
    const ios = isIOS();
    actions.handleChatbotInterface(bool);
    if (bool && chat_details.is_socket_connected) {
      const payload = {
        clientPsid: chat_details.psid,
        senderPsid: chat_details.psid,
      };
      actions.emitCustomEvent(EVENTS.MESSAGE_SEEN, payload);
    }
    if (bool && !chat_details.is_socket_connected && !android && !ios) {
      actions.makeSocketConnection();
    }
  };

  handleOfferSelection = (offer_id, offer_name) => {
    this.setState({
      selected_offer: {
        ...this.state.selected_offer,
        offer_id,
        offer_name
      }
    });
  };

  setDefaultOfferState = () => {
    this.setState({
      selected_offer: {
        ...this.state.selected_offer,
        offer_id: null,
        offer_name: null,
      }
    });
  };

  onSubmitCheckbox = data => {
    console.log(data)
    if (data.list && data.list.length > 0) {
      const cmid = uniqueId();
      const response = {
        type: MESSAGE_TYPES.LIST,
        list: data.list,
        relayData: data.relayData,
        cmid
      };
      const obj = {
        payload: { list: data.list },
        cmid,
      };
      this.pushSenderNewMsgToChatbot(MESSAGE_TYPES.LIST, obj);
      this.emitResponseToServer(response);
    }
  }

  emitResponseToServer = response => {
    const { chat_details, actions } = this.props;
    const android = isAndroid();
    const ios = isIOS();
    const data = {
      ...response,
      sender_id: senderId,
      navigator_userAgent: navigator.userAgent,
      navigator_platform: navigator.platform,
      variable_name: chat_details.variable_name,
      send_variable_to_apiai: chat_details.send_variable_to_apiai,
      sendVariableToLS: chat_details.sendVariableToLS,
      skipLS: chat_details.skipLS
    };
    if (!this.userFirstEmit && (chat_details.messages.length <= defaultMessageLength || chatbot_setting.send_brand_data_on_user_first_msg)) {
      this.userFirstEmit = true
      data.brandData = brand_features.getBrandData()
    }
    if ((android || ios) && localStorage.getItem(LOCAL_STORAGE.APP_PARAMS)) {
      data.lockedParams = JSON.parse(localStorage.getItem(LOCAL_STORAGE.APP_PARAMS));
      localStorage.removeItem(LOCAL_STORAGE.APP_PARAMS);
    }
    actions.emitNewMessageToServer(data);
    let emit_time = new Date().getTime();
    localStorage.setItem(LOCAL_STORAGE.LAST_EMIT, JSON.stringify(emit_time));
  };

  pushSenderNewMsgToChatbot = (type, data) => {
    const { actions } = this.props;
    const user_message = {
      type,
      sender_id: senderId,
      timestamp: new Date(),
      sender: MESSAGE_SENDER.CUSTOMER,
      readStatus: MESSAGE_READ_STATUS.SENDING,
      ...data,
    };
    actions.pushSenderMessage(user_message);
  };

  sendTextToServer = text => {
    const cmid = uniqueId();
    const response = {
      type: MESSAGE_TYPES.TEXT,
      text,
      cmid
    };
    const data = {
      payload: { text },
      cmid
    };
    this.emitResponseToServer(response);
    this.pushSenderNewMsgToChatbot(MESSAGE_TYPES.TEXT, data);
  };

  handleButtonSubTypes = data => {
    switch (data.button.subtype) {
      case BUTTON_SUB_TYPES.DISH_OFFERS:
        const { selected_offer } = this.state;
        const cmid = uniqueId();
        const response = {
          type: MESSAGE_TYPES.TEXT,
          text: selected_offer.offer_id,
          cmid
        };
        const payload_data = {
          payload: { text: selected_offer.offer_name },
          cmid,
        };
        this.pushSenderNewMsgToChatbot(MESSAGE_TYPES.TEXT, payload_data);
        this.emitResponseToServer(response);
        if (selected_offer.offer_id) {
          this.setDefaultOfferState();
        }
        break;

      // case BUTTON_SUB_TYPES.CHECKBOX_SUBMIT:
      //   if (data.message && data.message.payload && data.message.payload.options) {
      //     const { selected_checkbox_values } = this.state;
      //     const selected_checkbox_items = data.message.payload.options.filter((item) => {
      //       return selected_checkbox_values.findIndex(value => value === item.value) !== -1;
      //     });
      //     if (selected_checkbox_items.length > 0) {
      //       const cmid = uniqueId();
      //       const response = {
      //         type: MESSAGE_TYPES.LIST,
      //         list: selected_checkbox_items,
      //         relayData: data.button.relayData,
      //         cmid
      //       };
      //       const obj = {
      //         payload: { list: selected_checkbox_items },
      //         cmid,
      //       };
      //       this.pushSenderNewMsgToChatbot(MESSAGE_TYPES.LIST, obj);
      //       this.emitResponseToServer(response);
      //     }
      //   }
      //   break;

      case BUTTON_SUB_TYPES.SHARE_LOCATION:
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const cmid = uniqueId();
            const response = {
              type: MESSAGE_TYPES.LOCATION,
              lat: lat.toString(),
              long: long.toString(),
              cmid
            };
            const payload_data = {
              payload: { text: "You shared your location." },
              cmid,
            };
            this.pushSenderNewMsgToChatbot(MESSAGE_TYPES.TEXT, payload_data);
            this.emitResponseToServer(response);
          });
        }
        break;

      default:
        return;
    }
  };

  handleMsgBtnClick = data => {
    if (data.button) {
      switch (data.button.type) {
        case BUTTON_TYPES.LINK:
          if (data.button.url) {
            if (isAndroid() && window.androidObj && window.androidObj.textToAndroid) {
              window.androidObj.textToAndroid(JSON.stringify(data));
            } else if (isIOS()) {
              if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.textToIosForWebkit)
                window.webkit.messageHandlers.textToIosForWebkit.postMessage({ data })
              else
                eval("if(textToIos) textToIos(data)");
            } else {
              window.open(data.button.url, '_blank');
            }
          }
          break;

        case BUTTON_TYPES.CUSTOM:
          if (data.button.subtype) {
            this.handleButtonSubTypes(data);
          }
          break;

        case BUTTON_TYPES.CUSTOM_SOCKET_EVENT: {
          const { actions } = this.props;
          const cmid = uniqueId();
          if (data.button.text) {
            const obj = {
              payload: { text: data.button.text },
              cmid
            };
            this.pushSenderNewMsgToChatbot(MESSAGE_TYPES.TEXT, obj);
          }

          if (data.button.eventName) {
            let payload = {
              relayData: merge({}, data.message.relayData, data.button.relayData),
              text: data.button.text,
              type: data.message.payload && data.message.payload.expectedClientResponseType ? data.message.payload.expectedClientResponseType : MESSAGE_TYPES.TEXT,
              cmid
            };
            this.props.actions.emitCustomEvent(data.button.eventName, payload, (err, res) => {
              if (err) {
                const payload = {
                  cmid,
                  changedValue: { readStatus: MESSAGE_READ_STATUS.FAILED }
                };
                actions.updateMessage(payload, 'cmid');
              } else if (!err && res && res.data && res.data.cmid && res.data.changedValue) {
                actions.updateMessage(res.data, 'cmid');
              }
            });
          }
        }
          break;

        case BUTTON_TYPES.POST_BACK_RESPONSE: {
          const cmid = uniqueId();
          if (data.button.text) {
            const obj = {
              payload: { text: data.button.text },
              cmid
            };
            this.pushSenderNewMsgToChatbot(MESSAGE_TYPES.TEXT, obj);
          }
          if (data.button.postbackRes) {
            const response = {
              type: MESSAGE_TYPES.TEXT,
              text: data.button.postbackRes,
              cmid
            };
            this.emitResponseToServer(response);
          }
        }
          break;

        default:
          if (data.button.text) {
            this.sendTextToServer(data.button.text);
          }
      }
    }
  };

  handleFileUpload = (data, message) => {
    if (data && data.fileUrl && data.file) {
      console.log('upload data', data);
      if (message) {
        const payload = {
          data,
          message,
        };
        this.props.actions.updateFileUploadMessage(payload);
      }
      const cmid = uniqueId();
      const response = {
        type: MESSAGE_TYPES.FILE,
        relayData: message && message.payload ? message.payload.relayData : null,
        fileBase64: data.fileUrl,
        cmid
      };
      this.emitResponseToServer(response);
      const obj = {
        payload: { title: data.file.name, imageUrl: data.fileUrl },
        cmid
      };
      this.pushSenderNewMsgToChatbot(MESSAGE_TYPES.IMAGE_WITH_BUTTONS, obj);
    }
  };

  render() {
    const { page_details, chat_details, actions } = this.props;
    if (chatbot_setting.security.enable && !chat_details.secure)
      return null
    if (chatbot_setting.chatbot_type === CHATBOT_TYPE.FULL_SCREEN)
      return (
        <LangContext.Provider value={this.state.lang}>
          <div
            className="ori-app-container ori-ant-design-container oriFullScreenBot oriAppContainer"
            style={{
              backgroundImage: `url(${translator.assets[this.state.lang].outerBackground})`,
            }}
          >
            <Suspense fallback={null}>
              <div
                className={classNames("ori-animate ori-fade-in ori-overflow-hidden",
                  {
                    "ori-full-width ori-full-parent-height": page_details.device_data.screen_width < 768,
                    "ori-box-shadow-dark ori-border-light ori-border-radius-10 ori-mrgn-auto": page_details.device_data.screen_width >= 768
                  }
                )}
                style={
                  page_details.device_data.screen_width >= 768 ?
                    {
                      height: '85%',
                      minHeight: '500px',
                      maxHeight: '700px',
                      width: '550px',
                    } : {}
                }
              >
                <ChatBot
                  ref={this.chatbotRef}
                  screen_height={page_details.device_data.screen_height}
                  chat_details={chat_details}
                  actions={actions}
                  sendTextToServer={this.sendTextToServer}
                  handleMsgBtnClick={this.handleMsgBtnClick}
                  handleFileUpload={this.handleFileUpload}
                  handleOfferSelection={this.handleOfferSelection}
                  onSubmitCheckbox={this.onSubmitCheckbox}
                />
              </div>
            </Suspense>
          </div>
        </LangContext.Provider>
      )
    return (
      <LangContext.Provider value={this.state.lang}>
        <div className="ori-app-container ori-ant-design-container oriAppContainer">
          {
            (page_details.device_data.screen_width > 480 || (page_details.device_data.screen_width < 481 && !chat_details.is_chat_open)) &&
            <Badge
              count={chat_details.notification_count}
              overflowCount={9}
              className="ori-animated ori-fade-in notificationBadge"
            >
              <TriggerChatBot
                mobile={page_details.device_data.screen_width < 481}
                is_chat_open={chat_details.is_chat_open}
                handleSocketConnection={this.handleSocketConnection}
              />
            </Badge>
          }
          <Suspense fallback={<SendingIcon className="ori-l-mrgn-5 ori-animated ori-rotate ori-infinite" />}>
            {
              this.state.render_chatbot &&
              <div
                className={classNames("ori-fixed ori-animated ori-animation-half ori-z-index-99992 ori-overflow-hidden chatbotContainer",
                  {
                    [chatbot_setting.chat_interface.container_style.in_animation]: chat_details.is_chat_open,
                    [chatbot_setting.chat_interface.container_style.out_animation]: !chat_details.is_chat_open
                  })}
                style={
                  page_details.device_data.screen_width < 481 ? chatbot_setting.chat_interface.container_style.mobile : chatbot_setting.chat_interface.container_style.web
                }
              >
                <ChatBot
                  ref={this.chatbotRef}
                  screen_height={page_details.device_data.screen_height}
                  chat_details={chat_details}
                  actions={actions}
                  sendTextToServer={this.sendTextToServer}
                  handleMsgBtnClick={this.handleMsgBtnClick}
                  handleFileUpload={this.handleFileUpload}
                  handleOfferSelection={this.handleOfferSelection}
                  onSubmitCheckbox={this.onSubmitCheckbox}
                />
              </div>
            }
            {
              chatbot_setting.notification_bot.visibility && !chat_details.is_chat_open && chat_details.unseen_messages.length > 0 &&
              <NotificationBot
                page_details={page_details}
                chat_details={chat_details}
                actions={actions}
                sendTextToServer={this.sendTextToServer}
                handleMsgBtnClick={this.handleMsgBtnClick}
                handleFileUpload={this.handleFileUpload}
                handleOfferSelection={this.handleOfferSelection}
                stack_view={chatbot_setting.notification_bot.stack_view}
                onSubmitCheckbox={this.onSubmitCheckbox}
              />
            }
          </Suspense>
        </div>
      </LangContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    chat_details: state.chat_details,
    page_details: state.page_details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign({}, pageActions, chatActions), dispatch)
  };
};

AppContainer.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
