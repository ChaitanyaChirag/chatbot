import io from 'socket.io-client';

import { EVENTS, MESSAGE_READ_STATUS } from '../../config/constants';
import {
  getSocketUrl,
  chatbot_setting,
  chatbot_client_info,
  chatbot_default_messages
} from '../../config/urls';
import { log, getCookie, uniqueId } from '../../config/utils';
import { updateChatsState, emitCustomEvent, socketDisconnect, updateMessage } from './actions';
import actionTypes from '../actiontypes';

const registerSocketListener = (store, socket) => {
  var notificationTimer = null;
  socket.on(EVENTS.CONNECT, () => {
    log('socket connected', socket);
    const chat_details = store.getState().chat_details;
    store.dispatch(updateChatsState({
      is_socket_connected: socket.connected,
      socket_request_processing: false
    }));
    const default_messages = chatbot_default_messages.getDefaultMessages();
    if (chatbot_setting.auto_emit_response.enable && chat_details.messages.length <= default_messages.length) {
      const query_params = new URLSearchParams(window.location.search);
      const data = {
        ...chatbot_setting.auto_emit_response.payload,
        session_id: socket.io.engine.id,
        current_session_id: socket.io.engine.id,
        sender_id: chatbot_client_info.sender_id,
        navigator_userAgent: navigator.userAgent,
        navigator_platform: navigator.platform,
        variable_name: chat_details.variable_name,
        send_variable_to_apiai: chat_details.send_variable_to_apiai,
        sendVariableToLS: chat_details.sendVariableToLS,
        skipLS: chat_details.skipLS
      };
      if (query_params.has(chatbot_setting.auto_emit_response.query_param_key)) {
        const text = query_params.get(chatbot_setting.auto_emit_response.query_param_key);
        data.text = text;
      }
      console.log('first emit data', data);
      socket.emit(EVENTS.NEW_MESSAGE, data);
    }
    if (chat_details.psid) {
      const payload = {
        clientPsid: chat_details.psid,
        senderPsid: chat_details.psid,
      };
      store.dispatch(emitCustomEvent(EVENTS.MESSAGE_SEEN, payload));
    }
  });

  socket.on(EVENTS.CONNECT_ERROR, error => {
    log('socket connect error', error);
    store.dispatch(updateChatsState({ is_socket_connected: socket.connected }));
  });

  socket.on(EVENTS.ERROR, error => {
    log('socket error', error);
    store.dispatch(updateChatsState({ is_socket_connected: socket.connected }));
  });

  socket.on(EVENTS.DISCONNECT, reason => {
    if (reason === 'io server disconnect') {
      socket.connect();
    }
    store.dispatch(updateChatsState({ is_socket_connected: socket.connected }));
  });

  socket.on(EVENTS.DOWN_TIME, res => {
    log('downtime res', res);
    if (res.downTime) {
      store.dispatch(updateChatsState({ downtime: res.downTime }));
      if (res.downTime.isDownTime)
        store.dispatch(socketDisconnect());
    }
  });

  socket.on(EVENTS.RESPONSE, res => {
    log('response', res);
    const chat_details = store.getState().chat_details;
    if (res && res.psid && res.psid === chat_details.psid) {
      const payload = {
        message: res.result && res.result.bot_messages && res.result.bot_messages.length > 0 ? res.result.bot_messages[0] : null
      };
      if (payload.message) {
        payload.message.cmid = uniqueId();
        if (res.chatlogId) {
          const updated_message_data = {
            readStatus: MESSAGE_READ_STATUS.DELIVERED,
            clientPsid: chat_details.psid,
            senderPsid: chat_details.psid,
            chatlogId: res.chatlogId,
            timestamp: new Date().getTime()
          };
          socket.emit(EVENTS.UPDATE_ADMIN_MESSAGE, updated_message_data, err => {
            if (!err && document.visibilityState === 'visible' && chat_details.is_chat_open && document.hasFocus()) {
              const message_seen_payload = {
                clientPsid: chat_details.psid,
                senderPsid: chat_details.psid,
              };
              socket.emit(EVENTS.MESSAGE_SEEN, message_seen_payload);
            }
          });
        }
        store.dispatch({
          type: actionTypes.PUSH_RESPONSE_MESSAGE,
          payload
        });
      } else {
        log('response data format is not correct', res);
      }
    }
  });

  socket.on(EVENTS.GET_WEBSITE_DATA, data => {
    const chat_details = store.getState().chat_details;
    if (data && data.length > 0) {
      const websiteData = {};
      data.forEach(item => {
        if (item.source === 'cookie') {
          websiteData[item.newKey] = getCookie(item.key);
        } else if (item.source === 'localstorage') {
          websiteData[item.newKey] = localStorage.getItem(item.key);
        }
      });
      socket.emit(EVENTS.WEBSITE_DATA, { websiteData, psid: chat_details.psid });
    }
  });

  socket.on(EVENTS.TYPING_STATUS, data => {
    const chat_details = store.getState().chat_details;
    if (data && data.typingInfo && data.typingInfo.senderPsid !== chat_details.psid) {
      store.dispatch({
        type: actionTypes.UPDATE_TYPING_INFO,
        payload: data.typingInfo
      });
    }
  });

  socket.on(EVENTS.UPDATE_MESSAGE, data => {
    // log('update message event', data);
    const chat_details = store.getState().chat_details;
    if (data && data.updateChatlogId && data.updateChatlogId.changedValue && data.updateChatlogId.psid && data.updateChatlogId.psid === chat_details.psid) {
      store.dispatch({
        type: actionTypes.UPDATE_MESSAGE,
        payload: data.updateChatlogId,
        key: 'cmid'
      });
    } else if (data && data.updatedCustomerMessage && data.updatedCustomerMessage.changedValue && data.updatedCustomerMessage.clientPsid === chat_details.psid) {
      // log('dispatch update customer message');
      store.dispatch({
        type: actionTypes.UPDATE_MESSAGE,
        payload: data.updatedCustomerMessage,
        key: 'chatlogId'
      });
    } else if (data && data.messageSeen && data.messageSeen.clientPsid === chat_details.psid && data.messageSeen.senderPsid !== chat_details.psid) {
      store.dispatch({
        type: actionTypes.MESSAGE_SEEN,
      });
    }
  });

  socket.on(EVENTS.END_CONVERSATION, data => {
    log('end conversation listener', data);
    const chat_details = store.getState().chat_details;
    if (data.psid === chat_details.psid) {
      store.dispatch({
        type: actionTypes.UPDATE_END_CHAT,
        payload: {
          visible: true,
          show_resolved_card: true,
        }
      });
    }
  });

  socket.on(EVENTS.SHOW_NOTIFICATION, data => {
    log('show notification listener', data);
    if (data && data.message)
      store.dispatch(updateChatsState({
        notification: {
          visible: true,
          message: data.message
        }
      }))
    if (notificationTimer)
      clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => {
      store.dispatch(updateChatsState({
        notification: {
          visible: false,
          message: ""
        }
      }))
    }, 8000)
  });
};

const middleware = () => {
  let socket = null;
  return store => next => action => {
    switch (action.type) {
      case actionTypes.MAKE_SOCKET_CONNECTION: {
        if (!store.getState().chat_details.socket_request_processing) {
          store.dispatch(updateChatsState({ socket_request_processing: true }))
          if (socket)
            socket.close()
          const socket_url = getSocketUrl();
          fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(data => {
              const url = `${socket_url}&publicIP=${data.ip}`
              socket = io(url);
              registerSocketListener(store, socket);
            })
            .catch(() => {
              socket = io(socket_url);
              registerSocketListener(store, socket);
            })
        }
        break;
      }

      case actionTypes.CALL_SOCKET_METHOD:
        if (socket)
          socket[action.payload]()
        break;

      case actionTypes.EMIT_CUSTOM_EVENT: {
        if (socket && action.event) {
          log(`emit custom event- ${action.event}:`, action.payload);
          if (action.callback)
            socket.emit(action.event, action.payload, action.callback);
          else
            socket.emit(action.event, action.payload);
        }
        break;
      }

      case actionTypes.EMIT_NEW_MESSAGE: {
        if (socket) {
          action.payload.session_id = socket.io.engine.id;
          action.payload.current_session_id = socket.io.engine.id;
          socket.emit(EVENTS.NEW_MESSAGE, action.payload, (err, res) => {
            if (err) {
              log('emit new message event error', err);
              const payload = {
                cmid: action.payload.cmid,
                changedValue: {
                  readStatus: MESSAGE_READ_STATUS.FAILED
                }
              };
              store.dispatch(updateMessage(payload, 'cmid'));
            } else if (!err && res && res.data && res.data.cmid && res.data.changedValue) {
              store.dispatch(updateMessage(res.data, 'cmid'));
            }
          });
        }
        break;
      }

      case actionTypes.BOT_POPUP_REQUEST: {
        if (socket) {
          socket.emit(EVENTS.BOT_AUTO_POPUP_REQUEST, action.payload, (err, res) => {
            if (!err && res && res.data && res.data.displayMessage) {
              log('bot auto popup request response', res);
              const message = res.data.displayMessage;
              store.dispatch({
                type: actionTypes.PUSH_SENDER_MESSAGE,
                payload: { message },
              });
            } else {
              log('bot auto popup request error', err);
            }
          });
        }
        break;
      }

      case actionTypes.MESSAGE_VOTING: {
        if (socket) {
          socket.emit(EVENTS.CHATLOG_FEEDBACK, action.payload, res => {
            log('chatlog feedback res', res);
            if (!res.error && res.data && res.data.chatlogId && res.data.voteType) {
              const payload = {
                chatlogId: res.data.chatlogId,
                changedValue: { voteType: res.data.voteType },
              };
              store.dispatch({
                type: actionTypes.UPDATE_MESSAGE,
                key: 'chatlogId',
                payload
              });
            } else {
              log('chatlog feedback event request error');
            }
          });
        }
        break;
      }

      case actionTypes.RESET_CHAT: {
        if (socket) {
          socket.emit(EVENTS.RESET_CHAT, action.payload, res => {
            log('chatlog feedback res', res);
            if (res.ok) {
              action.callback();
            } else if (res.error) {
              log('reset chat event error');
            }
          });
        }
        break;
      }

      case actionTypes.SEND_FEEDBACK: {
        if (socket) {
          socket.emit(EVENTS.RECORD_FEEDBACK, action.payload, (err, data) => {
            if (action.callback) {
              action.callback(err);
            }
          });
        }
        break;
      }

      case actionTypes.SOCKET_DISCONNECT:
        if (socket) {
          log('socket disconnected', socket);
          socket.close();
        }
        socket = null;
        break;

      default:
        return next(action);
    }
  };
};

export default middleware();
