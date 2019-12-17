import findLastIndex from 'lodash/findLastIndex';

import actionTypes from '../actiontypes';
import states from './states';
import { LOCAL_STORAGE, setDataInLocalStorage } from '../../config/utils';
import { MESSAGE_READ_STATUS, MESSAGE_SENDER } from '../../config/constants';

const chat_details = (state = states.chat_details, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STATE: {
      return {
        ...state,
        [action.key]: action.payload
      };
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
      if (!state.is_chat_open) {
        unseen_messages = [...state.unseen_messages, action.payload.message];
        notification_count = 0;
        setDataInLocalStorage(LOCAL_STORAGE.UNSEEN_MESSAGES, unseen_messages);
        setDataInLocalStorage(LOCAL_STORAGE.NOTIFICATION_COUNT, notification_count);
      }

      return {
        ...state,
        unseen_messages,
        notification_count,
        messages: [...state.messages, action.payload.message],
        skipLS: false,
        send_variable_to_apiai: false,
        sendVariableToLS: false,
        variable_name: '',
        quick_replies: [],
        is_input_lock: false,
      };
    }

    case actionTypes.PUSH_RESPONSE_MESSAGE: {
      setDataInLocalStorage(LOCAL_STORAGE.MESSAGES(), [...state.messages, action.payload.message]);
      let notification_count = state.notification_count;
      let unseen_messages = [...state.unseen_messages];
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
        messages: [...state.messages, action.payload.message],
        quick_replies: action.payload.message.quickReplies ? action.payload.message.quickReplies : [],
        is_input_lock: action.payload.message.inputLock ? action.payload.message.inputLock : false,
        input_lock_text: action.payload.message.inputLockMessage ? action.payload.message.inputLockMessage : "please select any option to proceed",
        skipLS: action.payload.message.skipLS,
        sendVariableToLS: action.payload.message.sendVariableToLS,
        send_variable_to_apiai: action.payload.message.send_variable_to_apiai,
        variable_name: action.payload.message.variable_name,
      };
    }

    case actionTypes.SET_DEFAULT_STATE: {
      let msg_length = action.payload.messages.length;
      let messages = action.payload.messages;

      return {
        ...state,
        messages: messages,
        skipLS: messages && msg_length > 0 && messages[msg_length - 1].skipLS ? messages[msg_length - 1].skipLS : false,
        send_variable_to_apiai: messages && msg_length > 0 && messages[msg_length - 1].send_variable_to_apiai ? messages[msg_length - 1].send_variable_to_apiai : false,
        sendVariableToLS: messages && msg_length > 0 && messages[msg_length - 1].sendVariableToLS ? messages[msg_length - 1].sendVariableToLS : false,
        variable_name: messages && msg_length > 0 && messages[msg_length - 1].variable_name ? messages[msg_length - 1].variable_name : '',
        quick_replies: messages && msg_length > 0 && messages[msg_length - 1].quickReplies ? messages[msg_length - 1].quickReplies : [],
        is_input_lock: messages && msg_length > 0 && messages[msg_length - 1].inputLock ? messages[msg_length - 1].inputLock : false,
        input_lock_text: messages && msg_length > 0 && messages[msg_length - 1].inputLockMessage ? messages[msg_length - 1].inputLockMessage : "please select any option to proceed",
        is_typing: false,
        typing_text: "",
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
