import { getPsid, getPlatform } from './utils';
import { MESSAGE_TYPES, INFO_CONTENT_TYPE } from './constants';

const version = 1.1;
const brandName = 'vodafone';
const url = "https://vodafone-dev.oriserve.in";

export const getSocketUrl = () => {
  const socket_url = `${url}/liveConversations?psid=${getPsid()}&ver=${version}&role=user&brandName=${brandName}&botName=${brandName}&channelName=${getPlatform()}`;
  return socket_url;
};

export const chatbot_client_info = {
  sentry_dsn: "https://fa80a3e669cc4ee78bcb94c405adecba@sentry.io/1512125",
  brand_name: "Vodafone",
  sender_id: "dish_chat_client",
  trigger: {
    visibility: false, //to enable custom trigger
    icon_height: 70, //in number only
    mobile_icon_width: 70, //in number only
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
  security: {
    enable: false,
    code: "123456",
  },
  gradient: {
    sender_bubble: true,
    trigger: true,
  },
  powered_by: {
    visibility: true, // to enable powered by tag
    target_url: "http://oriserve.com/"
  },
  notification_bot: {
    visibility: true, // to enable notification popup (set value false in android and ios )
    stack_view: false, // to show to stack view of notification bot
  },
  chat_interface: {
    show_bg_image: true, // to enable chatinterface background
    show_avatar: true,
    query_params: {
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
    enable: false,
    query_param_key: 'oribotmessage',
    payload: {
      type: MESSAGE_TYPES.TEXT,
      text: "first emit message",
    }
  },
  menu: {
    visible: true,
    children: {
      privacy_policy: false,
      terms_and_conditions: false,
      feedback: true,
      clear_chat: true,
    }
  },
  add_file: {
    web_enable: true,
    android_enable: true,
    ios_enable: false,
    max_file_size_allowed: 500000,
  }
};

export const chatbot_status = {
  common: {
    socket_connection_lost: "connection lost"
  },
  feedback: {
    greeting: "How happy are you with our support?",
    low_rated: "Please tell us what went wrong.",
    high_rated: "Please suggest how can we make your next visit awesome.",
    success: "Thank you for giving us feedback",
    failed: "Some error occured please try again later"
  },
  security_prompt: "This is custom message. please change this",
  info_content: {
    [INFO_CONTENT_TYPE.PRIVACY_POLICY]: { // define privacy policy content here
      header: 'Privacy Policy',
      data: [
        {
          title: "How do we protect the information we receive?",
          subtitle: "This is subtitle", // add subtitle key only if requires
          content: "Our site is reviewed on a regular basis for security vulnerabilities in order to make your visit to our site as safe as possible.Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology. We do not store credit/debit card information on our systems.We implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information.All transactions are processed through a gateway provider and are not stored or processed on our servers."
        },
        {
          title: "How do we protect the information we receive?",
          content: "Our site is reviewed on a regular basis for security vulnerabilities in order to make your visit to our site as safe as possible.Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential."
        }
      ]
    },
    [INFO_CONTENT_TYPE.TERMS_AND_CONDITIONS]: { // define terms & conditions content here
      header: 'Terms and Conditions',
      data: [
        {
          title: "How do we protect the information we receive?",
          content: "Our site is reviewed on a regular basis for security vulnerabilities in order to make your visit to our site as safe as possible.Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology. We do not store credit/debit card information on our systems.We implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information.All transactions are processed through a gateway provider and are not stored or processed on our servers."
        }
      ]
    }
  }
};
