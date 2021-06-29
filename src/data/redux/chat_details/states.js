import { MESSAGE_SENDER, DEFAULT_END_CHAT_STATE, LOCAL_STORAGE } from '../../config/constants';
import { chatbot_setting, chatbot_default_messages, chatbot_psids } from '../../config/brandSetup';
import {
  isAndroid,
  getDataFromLocalStorage
} from '../../config/utils'

const psid = chatbot_psids.getPsid()
const default_msg = chatbot_default_messages.getDefaultMessages()

const messages = getDataFromLocalStorage(LOCAL_STORAGE.MESSAGES + psid, [])

const getPreviousMessageData = (key, defaultData) => {
  let data = defaultData
  const senders = [MESSAGE_SENDER.ADMIN, MESSAGE_SENDER.CHATBOT, MESSAGE_SENDER.SYSTEM]
  if (messages && messages.length > 0 && senders.includes(messages[messages.length - 1].sender) && messages[messages.length - 1][key] !== undefined)
    data = messages[messages.length - 1][key]
  return data
}

const states = {
  chat_details: {
    secure: !chatbot_setting.security.enable,
    socket_request_processing: false,
    is_socket_connected: false,
    internet_connection_checking: false,
    is_internet_connected: false,
    disable_msg_after_reply: getDataFromLocalStorage(LOCAL_STORAGE.DISABLE_MESSAGE_AFTER_USER_REPLY + psid, {}),
    messages: (isAndroid() || messages.length === default_msg.length) ? [] : messages,
    psid,
    unseen_messages: getDataFromLocalStorage(LOCAL_STORAGE.UNSEEN_MESSAGES + psid, []),
    notification_count: getDataFromLocalStorage(LOCAL_STORAGE.NOTIFICATION_COUNT + psid, 0),
    is_chat_open: getDataFromLocalStorage(LOCAL_STORAGE.IS_CHAT_OPEN + psid, false),
    end_chat: getDataFromLocalStorage(LOCAL_STORAGE.END_CHAT + psid, DEFAULT_END_CHAT_STATE),
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
    },
    loading: false,
    upload_file: getDataFromLocalStorage(LOCAL_STORAGE.UPLOAD_FILE + psid, chatbot_setting.upload_file),
  },
};

export default states;
