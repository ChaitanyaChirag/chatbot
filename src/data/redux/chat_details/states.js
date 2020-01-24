import * as CONSTANTS from '../../config/constants';
import { isAndroid, getPsid, getLocalMessage, getLocalUnseenMessage, getLocalChatOpenStatus, getLocalNotificationCount, getDefaultMessages, getDataFromLocalStorage, LOCAL_STORAGE } from '../../config/utils'

const psid = getPsid();
const messages = getLocalMessage();
const unseen_messages = getLocalUnseenMessage();
const is_chat_open = getLocalChatOpenStatus();
const notification_count = getLocalNotificationCount();
const default_end_chat = {
  visible: false,
  show_confirmation_card: false,
  show_resolved_card: false,
  show_form_card: false,
  form: [],
  description: null,
};

const states = {
  chat_details: {
    is_socket_connected: false,
    is_internet_connected: false,
    messages: isAndroid() ? getDefaultMessages() : messages,
    psid,
    unseen_messages,
    notification_count,
    is_chat_open,
    downtime: {},
    is_typing: false,
    typing_text: "",
    quick_replies: messages && messages.length > 0 && messages[messages.length - 1].sender === CONSTANTS.MESSAGE_SENDER.SERVER && messages[messages.length - 1].quickReplies ? messages[messages.length - 1].quickReplies : [],
    is_input_lock: messages && messages.length > 0 && messages[messages.length - 1].sender === CONSTANTS.MESSAGE_SENDER.SERVER && messages[messages.length - 1].inputLock ? messages[messages.length - 1].inputLock : false,
    input_lock_text: messages && messages.length > 0 && messages[messages.length - 1].sender === CONSTANTS.MESSAGE_SENDER.SERVER && messages[messages.length - 1].inputLockMessage ? messages[messages.length - 1].inputLockMessage : "please select any option to proceed",
    skipLS: messages && messages.length > 0 && messages[messages.length - 1].sender === CONSTANTS.MESSAGE_SENDER.SERVER && messages[messages.length - 1].skipLS ? messages[messages.length - 1].skipLS : false,
    send_variable_to_apiai: messages && messages.length > 0 && messages[messages.length - 1].sender === CONSTANTS.MESSAGE_SENDER.SERVER && messages[messages.length - 1].send_variable_to_apiai ? messages[messages.length - 1].send_variable_to_apiai : false,
    sendVariableToLS: messages && messages.length > 0 && messages[messages.length - 1].sender === CONSTANTS.MESSAGE_SENDER.SERVER && messages[messages.length - 1].sendVariableToLS ? messages[messages.length - 1].sendVariableToLS : false,
    variable_name: messages && messages.length > 0 && messages[messages.length - 1].sender === CONSTANTS.MESSAGE_SENDER.SERVER && messages[messages.length - 1].variable_name ? messages[messages.length - 1].variable_name : '',
    end_chat: getDataFromLocalStorage(LOCAL_STORAGE.END_CHAT, default_end_chat),
    notification: {
      visible: false,
      message: ""
    }
  },
};

export default states;
