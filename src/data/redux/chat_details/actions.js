import actionTypes from '../actiontypes';
import { chatbot_default_messages } from '../../config/urls';
import { LOCAL_STORAGE, getDataFromLocalStorage } from '../../config/utils';

export const updateState = (key, payload) => {
  return {
    type: actionTypes.UPDATE_STATE,
    payload,
    key
  }
};

export const updateEndChat = payload => {
  return {
    type: actionTypes.UPDATE_END_CHAT,
    payload,
  }
};

export const makeSocketConnection = () => {
  return {
    type: actionTypes.MAKE_SOCKET_CONNECTION,
  }
};

export const socketDisconnect = () => {
  return {
    type: actionTypes.SOCKET_DISCONNECT,
  };
};

export const callSocketMethod = payload => {
  return {
    type: actionTypes.CALL_SOCKET_METHOD,
    payload
  };
};

export const handleBotPopupRequest = payload => {
  return {
    type: actionTypes.BOT_POPUP_REQUEST,
    payload
  };
};

export const emitCustomEvent = (event, payload, callback) => {
  return {
    type: actionTypes.EMIT_CUSTOM_EVENT,
    payload,
    event,
    callback
  };
};

export const emitNewMessageToServer = payload => {
  return {
    type: actionTypes.EMIT_NEW_MESSAGE,
    payload
  };
};

export const pushSenderMessage = message => {
  return {
    type: actionTypes.PUSH_SENDER_MESSAGE,
    payload: { message },
  };
};

export const updateMessage = (payload, key) => {
  return {
    type: actionTypes.UPDATE_MESSAGE,
    payload,
    key
  };
};

export const onMessageVoting = payload => {
  return {
    type: actionTypes.MESSAGE_VOTING,
    payload
  };
};

export const resetChat = (payload, callback) => {
  return {
    type: actionTypes.RESET_CHAT,
    payload,
    callback
  };
};

export const sendFeedback = (payload, callback) => {
  return {
    type: actionTypes.SEND_FEEDBACK,
    payload,
    callback
  };
};

export const handleChatbotInterface = payload => {
  return {
    type: actionTypes.HANDLE_CHATBOT_INTERFACE,
    payload,
  };
};

export const setDefaultState = () => {
  const defaultMsg = chatbot_default_messages.getDefaultMessages()
  let payload = {
    messages: getDataFromLocalStorage(LOCAL_STORAGE.MESSAGES(), defaultMsg),
  };
  return {
    type: actionTypes.SET_DEFAULT_STATE,
    payload,
  };
};

export const updateFileUploadMessage = (payload) => {
  return {
    type: actionTypes.UPDATE_FILE_UPLOAD_MESSAGE,
    payload
  };
};
