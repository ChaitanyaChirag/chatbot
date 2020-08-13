import { MESSAGE_SENDER } from '../../config/constants';
import { chatbot_setting, chatbot_default_messages } from '../../config/urls';
import {
  isAndroid,
  getPsid,
  getDataFromLocalStorage,
  LOCAL_STORAGE
} from '../../config/utils'

const default_msg = chatbot_default_messages.getDefaultMessages()

const messages = getDataFromLocalStorage(LOCAL_STORAGE.MESSAGES(), default_msg)

const getPreviousMessageData = (key, defaultData) => {
  let data = defaultData
  const senders = [MESSAGE_SENDER.ADMIN, MESSAGE_SENDER.CHATBOT, MESSAGE_SENDER.SYSTEM]
  if (messages && messages.length > 0 && senders.includes(messages[messages.length - 1].sender) && messages[messages.length - 1][key] !== undefined)
    data = messages[messages.length - 1][key]
  return data
}

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
    secure: !chatbot_setting.security.enable,
    is_socket_connected: false,
    is_internet_connected: false,
    messages: isAndroid() ? default_msg : messages,
    psid: getPsid(),
    unseen_messages: getDataFromLocalStorage(LOCAL_STORAGE.UNSEEN_MESSAGES, []),
    notification_count: getDataFromLocalStorage(LOCAL_STORAGE.NOTIFICATION_COUNT, 0),
    is_chat_open: getDataFromLocalStorage(LOCAL_STORAGE.IS_CHAT_OPEN, false),
    end_chat: getDataFromLocalStorage(LOCAL_STORAGE.END_CHAT, default_end_chat),
    quick_replies: getPreviousMessageData('quickReplies', []),
    is_input_lock: getPreviousMessageData('inputLock', false),
    input_lock_text: getPreviousMessageData('inputLockMessage', 'please select any option to proceed'),
    skipLS: getPreviousMessageData('skipLS', false),
    send_variable_to_apiai: getPreviousMessageData('send_variable_to_apiai', false),
    sendVariableToLS: getPreviousMessageData('sendVariableToLS', false),
    variable_name: getPreviousMessageData('variable_name', ''),
    downtime: {},
    is_typing: false,
    typing_text: "",
    notification: {
      visible: false,
      message: ""
    }
  },
};

export default states;
