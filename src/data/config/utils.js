import message from 'antd/lib/message';

import { default_messages, android_default_messages } from './constants';

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

const DEV_VAR = {
  ENABLE_CONSOLE: true,
};

export const guid = () => {
  return s4() + s4() +
    s4() + s4();
};

export const uniqueId = () => {
  let time = new Date().getTime();
  return `${time}_${guid()}`;
};

export const log = (str, value) => {
  if (DEV_VAR.ENABLE_CONSOLE) {
    value ? console.log(str, value) : console.log(str);
  }
};

export const showMessage = (type, msg) => {
  const node = document.getElementById('chatbotContentContainer');
  if (node) {
    message.config({
      top: 75,
      getContainer: () => node,
    });
    message[type](msg);
  }
};

export const checkImageTypeFile = filename => {
  return (/\.(gif|jpg?g|jpeg|svg|tiff|png)$/i).test(filename)
};

export const fileToBase64 = file => {
  return new Promise(resolve => {
    var reader = new FileReader();
    reader.onload = event => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
};

export const getCookie = (name) => {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null
};

export const PLATFORM = {
  ANDROID: "android",
  IOS: "ios",
  WEBSITE: "website",
};

export const getPlatform = () => {
  let platform = PLATFORM.WEBSITE;
  if (window.ori_platform && window.ori_platform !== undefined) {
    platform = window.ori_platform.toLowerCase();
  }
  return platform;
};

export const isAndroid = () => {
  let platform = getPlatform();
  return (platform === PLATFORM.ANDROID);
};

export const isIOS = () => {
  let platform = getPlatform();
  return (platform === PLATFORM.IOS);
};

export const getPsid = () => {
  let psid = null;
  if (localStorage.getItem('psid')) {
    psid = localStorage.getItem('psid');
  } else {
    psid = uniqueId();
    localStorage.setItem('psid', psid);
  }
  return psid;
};

export const LOCAL_STORAGE = {
  MESSAGES: getPsid,
  UNSEEN_MESSAGES: "unseen_messages",
  NOTIFICATION_COUNT: "notification_count",
  LAST_EMIT: "last_emit",
  PSID: "psid",
  IS_CHAT_OPEN: "is_chat_open",
  ANDROID: "android",
  APP_PARAMS: "app_params",
  END_CHAT: "end_chat"
};

// export const hasAndroidInterface = () => { //the java JS interface exists for android
//   let android = localStorage.getItem(LOCAL_STORAGE.ANDROID) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.ANDROID)) : false;
//   return (android);
// };

export const getDataFromLocalStorage = (key, undefined_return_value) => {
  const data = localStorage.getItem(key);
  return (data && data !== undefined ? JSON.parse(data) : undefined_return_value);
};

export const setDataInLocalStorage = (key, data) => {
  try {
    const json_data = JSON.stringify(data);
    localStorage.setItem(key, json_data);
  }
  catch (e) {
    if (e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
      localStorage.removeItem(key);
      console.log('localStorage error:-', e.code, e.name);
    }
  }
};

export const getDefaultMessages = () => {
  const is_android = isAndroid();
  if (is_android) {
    return android_default_messages;
  }
  return default_messages;
};

export const getLocalMessage = () => {
  const messages = localStorage.getItem(LOCAL_STORAGE.MESSAGES()) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.MESSAGES())) : getDefaultMessages();
  return messages;
};

export const getLocalUnseenMessage = () => {
  let unseen_messages = localStorage.getItem(LOCAL_STORAGE.UNSEEN_MESSAGES) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.UNSEEN_MESSAGES)) : [];
  return unseen_messages;
};

export const getLocalNotificationCount = () => {
  let count = localStorage.getItem(LOCAL_STORAGE.NOTIFICATION_COUNT) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.NOTIFICATION_COUNT)) : 0;
  return count;
};

export const getLocalChatOpenStatus = () => {
  let is_chat_open = localStorage.getItem(LOCAL_STORAGE.IS_CHAT_OPEN) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.IS_CHAT_OPEN)) : false;
  return is_chat_open;
};

export const formatDate = (value, options) => {
  let date = new Date(value);
  return date.toLocaleDateString('en-In', options);
};

export const formatTime = (value, options) => {
  let date = new Date(value);
  return date.toLocaleTimeString('en-In', options);
};

export const scrollToBottom = node => {
  if (node) {
    node.scrollTop = node.scrollHeight;
  }
};

export const checkDevice = {
  screen_data: function () {
    return (
      {
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        screen_orientation: this.screen_orientation(),
        screen_type: this.screen_type()
      }
    );
  },
  screen_orientation: function () {
    if (window.matchMedia("(orientation:landscape)").matches) {
      return 'landscape';
    } else {
      return 'portrait';
    }
  },
  screen_type: function () {
    if (window.innerWidth <= 480) {
      return 'xs';
    } else if (window.innerWidth <= 768) {
      return 'sm';
    } else if (window.innerWidth <= 992) {
      return 'md';
    } else if (window.innerWidth <= 1200) {
      return 'lg';
    } else if (window.innerWidth <= 1600) {
      return 'hd';
    } else if (window.innerWidth <= 2560) {
      return 'fhd';
    } else {
      return 'uhd';
    }
  },
  deviceStatus: function () {
    return ({
      ...this.screen_data()
    });
  }
};
