import * as CONSTANTS from '../../config/constants';
import { isAndroid, getPsid, getLocalMessage, getLocalUnseenMessage, getLocalChatOpenStatus, getLocalNotificationCount, getDefaultMessages, getDataFromLocalStorage, LOCAL_STORAGE } from '../../config/utils'

const psid = getPsid();
const messages = getLocalMessage();

const getPreviousMessageData = (key, defaultData) => {
  let data = defaultData
  const senders = [CONSTANTS.MESSAGE_SENDER.ADMIN, CONSTANTS.MESSAGE_SENDER.CHATBOT, CONSTANTS.MESSAGE_SENDER.SYSTEM]
  if (messages && messages.length > 0 && senders.includes(messages[messages.length - 1].sender) && messages[messages.length - 1][key] !== undefined)
    data = messages[messages.length - 1][key]
  return data
}

const unseen_messages = getLocalUnseenMessage();
const is_chat_open = getLocalChatOpenStatus();
const notification_count = getLocalNotificationCount();
const quick_replies = getPreviousMessageData('quickReplies', []);
const is_input_lock = getPreviousMessageData('inputLock', false);
const input_lock_text = getPreviousMessageData('inputLockMessage', 'please select any option to proceed');
const skipLS = getPreviousMessageData('skipLS', false);
const send_variable_to_apiai = getPreviousMessageData('send_variable_to_apiai', false);
const sendVariableToLS = getPreviousMessageData('sendVariableToLS', false);
const variable_name = getPreviousMessageData('variable_name', '');
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
    quick_replies,
    is_input_lock,
    input_lock_text,
    skipLS,
    send_variable_to_apiai,
    sendVariableToLS,
    variable_name,
    end_chat: getDataFromLocalStorage(LOCAL_STORAGE.END_CHAT, default_end_chat),
    notification: {
      visible: false,
      message: ""
    }
  },
};

export default states;
