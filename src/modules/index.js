import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Badge from 'antd/lib/badge';
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
  EVENTS
} from '../data/config/constants';
import {
  LOCAL_STORAGE,
  PLATFORM,
  checkDevice,
  isAndroid,
  isIOS,
  uniqueId
} from '../data/config/utils';
import {
  chatbot_client_info,
  chatbot_setting,
  chatbot_default_messages,
  translator
} from '../data/config/urls';

import TriggerChatBot from '../components/triggerchatbot';

const ChatBot = React.lazy(() => import('./chatbot'));
const NotificationBot = React.lazy(() => import('./notificationbot'));

class AppContainer extends Component {
  constructor(props) {
    super(props);
    window.androidObj = function AndroidClass() { };
    //props.actions.setDeviceData(checkDevice.deviceStatus());
    this.timeout = false;
    this.chatbotRef = React.createRef();
    this.state = {
      lang: LANGUAGES.ENGLISH,
      selected_checkbox_values: [],
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
    let self = this;
    const lang = translator.getLanguage()
    this.setState({ lang })
    if (chatbot_setting.security.enable && !chat_details.secure) {
      const security_code = window.prompt(translator.text[lang].security_prompt)
      if (security_code && security_code === chatbot_setting.security.code)
        actions.updateState('secure', true)
    }

    window.bot_popup = this.botPopup;
    actions.updatePageState({ device_data: checkDevice.deviceStatus() });
    window.addEventListener("resize", () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        self.props.actions.updatePageState({ device_data: checkDevice.deviceStatus() });
      }, 300);
    });
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
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
            actions.updateState('psid', data.psid);
          }
          if (data.params) {
            localStorage.setItem(LOCAL_STORAGE.APP_PARAMS, JSON.stringify(data.params));
          }
          if (!chat_details.is_socket_connected) {
            actions.makeSocketConnection();
            actions.setDefaultState();
          }
        } else if (update_type === 'endchat' && this.chatbotRef && this.chatbotRef.current && this.chatbotRef.current.onClickCloseIcon) {
          this.chatbotRef.current.onClickCloseIcon();
        }
      }
      actions.handleChatbotInterface(true);
    } else if (!chat_details.is_socket_connected) {
      let last_emit = localStorage.getItem(LOCAL_STORAGE.LAST_EMIT) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.LAST_EMIT)) : null;
      const query_params = new URLSearchParams(window.location.search);
      if (chatbot_setting.chat_interface.query_params.enable && query_params.has(chatbot_setting.chat_interface.query_params.query_param_key)) {
        if (query_params.get(chatbot_setting.chat_interface.query_params.query_param_key)) {
          this.handleSocketConnection(true);
        }
      } else if (last_emit) {
        let current_time = new Date().getTime();
        let time_gap = (current_time - last_emit) / 1000;
        if (time_gap < chatbot_setting.automate_connection_time) {
          actions.makeSocketConnection();
        } else {
          actions.handleChatbotInterface(false);
        }
        if (time_gap > chatbot_setting.automate_reset_chat_time) {
          const default_messages = chatbot_default_messages.getDefaultMessages();
          localStorage.setItem(LOCAL_STORAGE.MESSAGES, JSON.stringify(default_messages));
          actions.setDefaultState();
        }
      } else {
        actions.handleChatbotInterface(false);
      }
      if (chatbot_setting.adster_bot.visibility) {
        if (query_params.get(chatbot_setting.adster_bot.query_param_key)) {
          this.handleSocketConnection(true);
          actions.updatePageState({ is_adster_bot: true });
        }
      }
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
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

  handleConnectionChange = () => {
    const { actions } = this.props;
    actions.updateState('is_internet_connected', navigator.onLine);
    if (navigator.onLine)
      actions.callSocketMethod('open')
    else
      actions.callSocketMethod('close')
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

  onChangeCheckbox = (selected_checkbox_values) => {
    this.setState({ selected_checkbox_values });
  };

  emitResponseToServer = response => {
    const { chat_details, actions } = this.props;
    const android = isAndroid();
    const ios = isIOS();
    const data = {
      ...response,
      sender_id: chatbot_client_info.sender_id,
      navigator_userAgent: navigator.userAgent,
      navigator_platform: navigator.platform,
      variable_name: chat_details.variable_name,
      send_variable_to_apiai: chat_details.send_variable_to_apiai,
      sendVariableToLS: chat_details.sendVariableToLS,
      skipLS: chat_details.skipLS
    };
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
      sender_id: chatbot_client_info.sender_id,
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

      case BUTTON_SUB_TYPES.CHECKBOX_SUBMIT:
        if (data.message && data.message.payload && data.message.payload.options) {
          const { selected_checkbox_values } = this.state;
          const selected_checkbox_items = data.message.payload.options.filter((item) => {
            return selected_checkbox_values.findIndex(value => value === item.value) !== -1;
          });
          if (selected_checkbox_items.length > 0) {
            const cmid = uniqueId();
            const response = {
              type: MESSAGE_TYPES.LIST,
              list: selected_checkbox_items,
              relayData: data.button.relayData,
              cmid
            };
            const obj = {
              payload: { list: selected_checkbox_items },
              cmid,
            };
            this.pushSenderNewMsgToChatbot(MESSAGE_TYPES.LIST, obj);
            this.emitResponseToServer(response);
          }
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
          if (data.button.url && data.button.url.trim().length > 0) {
            const is_app = isAndroid() || isIOS();
            if (is_app && window.androidObj && window.androidObj.textToAndroid) {
              window.androidObj.textToAndroid(JSON.stringify(data));
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
    return (
      <LangContext.Provider value={this.state.lang}>
        <div className="ori-app-container ori-ant-design-container oriAppContainer">
          <Badge count={chat_details.notification_count} overflowCount={9} className="ori-animated ori-fade-in notificationBadge">
            <TriggerChatBot is_chat_open={chat_details.is_chat_open} handleSocketConnection={this.handleSocketConnection} />
          </Badge>
          <Suspense fallback={<SendingIcon className="ori-l-mrgn-5 ori-animated ori-rotate ori-infinite" />}>
            {
              chat_details.is_chat_open &&
              <ChatBot ref={this.chatbotRef} screen_height={page_details.device_data.screen_height} is_adster_bot={page_details.is_adster_bot} chat_details={chat_details} actions={actions} sendTextToServer={this.sendTextToServer} handleMsgBtnClick={this.handleMsgBtnClick} handleFileUpload={this.handleFileUpload} handleOfferSelection={this.handleOfferSelection} onChangeCheckbox={this.onChangeCheckbox} />
            }
            {
              chatbot_setting.notification_bot.visibility && !chat_details.is_chat_open && chat_details.unseen_messages.length > 0 &&
              <NotificationBot page_details={page_details} chat_details={chat_details} actions={actions} sendTextToServer={this.sendTextToServer} handleMsgBtnClick={this.handleMsgBtnClick} handleFileUpload={this.handleFileUpload} handleOfferSelection={this.handleOfferSelection} stack_view={chatbot_setting.notification_bot.stack_view} onChangeCheckbox={this.onChangeCheckbox} />
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
