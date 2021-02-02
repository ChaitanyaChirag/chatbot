import message from 'antd/lib/message';

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export const guid = () => {
  return s4() + s4() +
    s4() + s4();
};

export const uniqueId = () => {
  let time = new Date().getTime();
  return `${time}_${guid()}`;
};

export const log = (...arg) => {
  if (process.env.NODE_ENV === 'development')
    console.log(...arg)
}

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

export const getAuthSocketData = publicIP => {
  const auth_socket_data = {
    query: {
      role: 'user',
      brandName: 'vodafone',
      botName: 'vodafone',
      ver: 1.1,
      psid: getPsid(),
      channelName: getPlatform(),
      sessionInitiatedUrl: window.location.href,
      publicIP
    },
    // timeout: 10000
  };
  return auth_socket_data;
}

export const showMessage = (type, msg) => {
  const node = document.getElementById('chatbotContentContainer');
  if (node) {
    message.config({
      duration: 2,
      maxCount: 1,
      top: 75,
      getContainer: () => node
    });
    message[type](msg);
  }
};

export const getRandomIntegerInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //Both max and min are inclusive
}

export const fetchWithTimeout = (url, options, timeout = 5000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ])
}

export const checkMultipleExtension = filename => {
  let numberOfExtensions = filename.split('.');
  return (numberOfExtensions.length > 2 ? false : true)
}

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

export const getCookie = name => {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null
};



export const isAndroid = () => {
  let platform = getPlatform();
  return (platform === PLATFORM.ANDROID);
};

export const isIOS = () => {
  let platform = getPlatform();
  return (platform === PLATFORM.IOS);
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
