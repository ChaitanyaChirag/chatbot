import findLastIndex from 'lodash/findLastIndex';

import actionTypes from '../actiontypes';
import states from './states';
import { LOCAL_STORAGE, setDataInLocalStorage, isEmptyObject } from '../../config/utils';
import { MESSAGE_READ_STATUS, MESSAGE_SENDER } from '../../config/constants';

const chat_details = (state = states.chat_details, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CHATS_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }

    case actionTypes.UPDATE_END_CHAT: {
      const end_chat = {
        ...state.end_chat,
        ...action.payload
      };
      setDataInLocalStorage(LOCAL_STORAGE.END_CHAT, end_chat);
      return {
        ...state,
        end_chat
      };
    }

    case actionTypes.HANDLE_CHATBOT_INTERFACE: {
      setDataInLocalStorage(LOCAL_STORAGE.IS_CHAT_OPEN, action.payload);
      localStorage.removeItem(LOCAL_STORAGE.UNSEEN_MESSAGES);
      localStorage.removeItem(LOCAL_STORAGE.NOTIFICATION_COUNT);
      return {
        ...state,
        is_chat_open: action.payload,
        notification_count: action.payload ? 0 : state.notification_count,
        unseen_messages: []
      };
    }

    case actionTypes.PUSH_SENDER_MESSAGE: {
      setDataInLocalStorage(LOCAL_STORAGE.MESSAGES(), [...state.messages, action.payload.message]);
      let unseen_messages = [...state.unseen_messages];
      let notification_count = state.notification_count;
      let disable_msg_after_reply = { ...state.disable_msg_after_reply };
      if (!state.is_chat_open) {
        unseen_messages = [...state.unseen_messages, action.payload.message];
        notification_count = 0;
        setDataInLocalStorage(LOCAL_STORAGE.UNSEEN_MESSAGES, unseen_messages);
        setDataInLocalStorage(LOCAL_STORAGE.NOTIFICATION_COUNT, notification_count);
      }
      if (!isEmptyObject(state.disable_msg_after_reply)) {
        Object.keys(disable_msg_after_reply).forEach(key => {
          disable_msg_after_reply[key] = true
        })
        setDataInLocalStorage(LOCAL_STORAGE.DISABLE_MESSAGE_AFTER_USER_REPLY, disable_msg_after_reply)
      }

      return {
        ...state,
        unseen_messages,
        notification_count,
        disable_msg_after_reply,
        messages: [...state.messages, action.payload.message],
        skipLS: false,
        send_variable_to_apiai: false,
        sendVariableToLS: false,
        variable_name: '',
      };
    }

    case actionTypes.PUSH_RESPONSE_MESSAGE: {
      setDataInLocalStorage(LOCAL_STORAGE.MESSAGES(), [...state.messages, action.payload.message]);
      let notification_count = state.notification_count;
      let unseen_messages = [...state.unseen_messages];
      let disable_msg_after_reply = { ...state.disable_msg_after_reply };
      if (action.payload.message.disableAfterUserReply) {
        disable_msg_after_reply[action.payload.message.chatlogId] = false
        setDataInLocalStorage(LOCAL_STORAGE.DISABLE_MESSAGE_AFTER_USER_REPLY, disable_msg_after_reply);
      }
      if (!state.is_chat_open) {
        notification_count++;
        unseen_messages = [...state.unseen_messages, action.payload.message];
        setDataInLocalStorage(LOCAL_STORAGE.UNSEEN_MESSAGES, unseen_messages);
        setDataInLocalStorage(LOCAL_STORAGE.NOTIFICATION_COUNT, notification_count);
      }

      return {
        ...state,
        notification_count,
        unseen_messages,
        disable_msg_after_reply,
        messages: [...state.messages, action.payload.message],
        skipLS: action.payload.message.skipLS,
        sendVariableToLS: action.payload.message.sendVariableToLS,
        send_variable_to_apiai: action.payload.message.send_variable_to_apiai,
        variable_name: action.payload.message.variable_name,
      };
    }

    case actionTypes.UPDATE_TYPING_INFO: {
      return {
        ...state,
        is_typing: action.payload.isTyping,
        typing_text: action.payload.typingMessage ? action.payload.typingMessage : ""
      };
    }

    case actionTypes.UPDATE_FILE_UPLOAD_MESSAGE: {
      let messages = [...state.messages];
      let index = -1;
      index = findLastIndex(messages, message => message.chatlogId === action.payload.message.chatlogId);
      if (index !== -1) {
        messages = [
          ...messages.slice(0, index),
          {
            ...messages[index],
            payload: {
              ...messages[index].payload,
              ...action.payload.data,
            }
          },
          ...messages.slice(index + 1)
        ];
        setDataInLocalStorage(LOCAL_STORAGE.MESSAGES(), messages);
      }
      return {
        ...state,
        messages,
      };
    }

    case actionTypes.UPDATE_MESSAGE: {
      let messages = [...state.messages];
      let index = -1;
      index = findLastIndex(messages, message => message[action.key] === action.payload[action.key]);
      if (index !== -1) {
        messages = [
          ...messages.slice(0, index),
          {
            ...messages[index],
            ...action.payload.changedValue,
          },
          ...messages.slice(index + 1)
        ];
        setDataInLocalStorage(LOCAL_STORAGE.MESSAGES(), messages);
      }
      return {
        ...state,
        messages,
      };
    }

    case actionTypes.MESSAGE_SEEN: {
      let messages = [...state.messages];
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].readStatus === MESSAGE_READ_STATUS.DELIVERED && messages[i].sender === MESSAGE_SENDER.CUSTOMER) {
          messages[i] = {
            ...messages[i],
            readStatus: MESSAGE_READ_STATUS.SEEN,
          };
        }
      }
      return {
        ...state,
        messages,
      };
    }

    default:
      return state;
  }
}

export default chat_details;
