import { getPsid, getPlatform } from './utils';
import { MESSAGE_TYPES } from './constants';

const version = 1.1;
const brandName = 'vodafone';
// const brandName = 'dishtv';

// const url = "https://webtest.vodafone-elb.oriserve.in";
// const url = "https://dishtestbackend.oriserve.in";
// const url = "https://tata-altroz-staging-backend.oriserve.in";
// const url = "http://localhost:8095";
// const url = "https://piramal-backend.oriserve.in";
// const url = "https://dishtv-testing-backend.oriserve.in";
const url = "https://vodafone-dev.oriserve.in";

export const getSocketUrl = () => {
  const socket_url = `${url}/liveConversations?psid=${getPsid()}&ver=${version}&role=user&brandName=${brandName}&botName=${brandName}&channelName=${getPlatform()}`;
  return socket_url;
};

export const chatbot_client_info = {
  sentry_dsn: "https://fa80a3e669cc4ee78bcb94c405adecba@sentry.io/1512125",
  icon_url: "https://d113ddgi4j6d7k.cloudfront.net/dashboard/ava.png",
  brand_name: "Vodafone",
  sender_id: "dish_chat_client",
  trigger: {
    visibility: false, //to enable custom trigger
    icon_url: "https://d113ddgi4j6d7k.cloudfront.net/dashboard/ava.png",
    icon_height: 90, //in number only
    mobile_icon_width: 80, //in number only
    animation_duration: 2000, // in milliseceond only
    lottie_visibility: true, // to enable lottie icon
    lottie_path: "https://d113ddgi4j6d7k.cloudfront.net/dashboard/cue.json",
    lottie_icon_height: 70,
    lottie_icon_width: 70,
    show_close_icon: true,
  }
};

export const chatbot_setting = {
  automate_connection_time: 3600, //in seceond only
  automate_reset_chat_time: 3600 * 24 * 4, //in second only
  powered_by: {
    visibility: true, // to enable powered by tag
    target_url: "http://oriserve.com/",
    icon_url: "https://d113ddgi4j6d7k.cloudfront.net/ori_logo.png"
  },
  notification_bot: {
    visibility: true, // to enable notification popup
    stack_view: false, // to show to stack view of notification bot
  },
  chat_interface: {
    show_bg_image: true, // to enable chatinterface background
    bg_image_url: "https://d113ddgi4j6d7k.cloudfront.net/dashboard/chat_interface.jpg",
    query_params:{
      enable: true,
      query_param_key: 'chatbotopen',
    },
    speech_recognition: {
      enable: true,
    }
  },
  adster_bot: {
    query_param_key: 'ischatbotopen', // query parameter key
    visibility: true, // to enable iframe require changes
  },
  auto_emit_response: {
    enable: true,
    payload: {
      type: MESSAGE_TYPES.TEXT,
      text: "first emit message",
    }
  },
  menu: {
    visible: true,
    children: {
      feedback: true,
      clear_chat: true,
    }
  }
};

export const chatbot_status = {
  common: {
    socket_connection_lost: "connection has been lost"
  },
  feedback: {
    greeting: "How happy are you with our support ?",
    low_rated: "Please tell us what went wrong.",
    high_rated: "Please suggest how can we make your next visit awesome.",
    success: "Thank you for giving us feedback",
    failed: "Some error occured please try again later"
  }
};

