import { getPsid, getPlatform, isAndroid } from './utils';
import { CHATBOT_TYPE, LANGUAGES } from './constants';
import * as defaultMessages from './defaultMessages';
import * as chatbotText from './chatbotText'

// const version = 1.1;
// const brandName = 'vodafone';
// const url = "https://vodafone-dev.oriserve.in";
export const socket_url = "https://vodafone-dev.oriserve.in/liveConversations";
export const network_check_url = "https://google.com/";

// export const getSocketUrl = () => {
//   const socket_url = `${url}/liveConversations?psid=${getPsid()}&ver=${version}&role=user&brandName=${brandName}&botName=${brandName}&channelName=${getPlatform()}`;
//   return socket_url;
// };

export const chatbot_client_info = {
  sentry_dsn: "https://fa80a3e669cc4ee78bcb94c405adecba@sentry.io/1512125",
  sender_id: "dish_chat_client",
  trigger: {
    visibility: false, //to enable custom trigger
    icon_height: 70, //in number only
    mobile_icon_height: 70, //in number only
    animation_duration: 2000, // in milliseceond only
    lottie_visibility: true, // to enable lottie icon
    lottie_icon_height: 70,
    lottie_icon_width: 70,
    show_close_icon: true,
  }
};

export const chatbot_setting = {
  chatbot_type: CHATBOT_TYPE.DEFAULT, // default, fullScreen, adster
  auto_close_feedback_form: 5 * 1000,
  auto_close_chatbot_on_refresh: {
    web_enable: false,
    mobile_enable: false
  },//in milliseconds only
  automate_connection_time: 3600, //in seceond only
  automate_reset_chat_time: 3600 * 24 * 4, //in second only
  security: {
    enable: false,
    code: "123456",
  },
  gradient: {
    sender_bubble: false,
    trigger: false,
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
    show_feedback_avatar: true,
    show_feedback_emoji: true,
    bubble_shadow: true,
    bubble_border: false,
    avatar_shape: "square", // circle || square
    quick_reply_bg_transparent: true,
    scroll_upto_first_response_only: true,
    carousel_msg_display_type: 'default', // default, fixed, actual
    header_tag: true, //to hide and show tag type header for small screen
    query_params: {
      enable: true,
      query_param_key: 'chatbotopen'
    },
    type_writer: {
      enable: false,
      deleting_speed: 30,
      typing_speed: 150
    },
    
    container_style: {
      mobile: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      web: {
        right: '20px',
        bottom: '110px',
        height: `calc(100% - 130px)`,
        maxHeight: '600px',
        width: '375px',
        boxShadow: "0 5px 40px 0 rgba(0, 0, 0, 0.15)",
        borderRadius: '3px'
      },
      in_animation: 'ori-fade-in',
      out_animation: 'ori-fade-out'
    }
  },
  auto_emit_message: {
    enable: true,
    query_param_key: 'oribotmessage',
    send_brand_data: false
  },
  speech_recognition: true,
  minimize_bot: false,
  menu: {
    visible: true,
    children: {
      privacy_policy: true,
      terms_and_conditions: true,
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

export const chatbot_default_messages = {
  enable: true,
  query_param_key: "msg",
  delay: 1000, // in ms
  messages: {
    android: defaultMessages.android,
    web: defaultMessages.web,
    hindi: defaultMessages.hindi // testing purpose only
  },
  getDefaultMessages() {
    let defaultMsgs = this.messages.web
    if (isAndroid())
      defaultMsgs = this.messages.android
    if (this.enable) {
      //=========== BRAND SPECIFIC LOGIC ==========
      const query_params = new URLSearchParams(window.location.search);
      if (query_params.has(this.query_param_key)) {
        const key = query_params.get(this.query_param_key)
        const msgs = this.messages[key]
        if (msgs)
          defaultMsgs = msgs
      }
      //=================== END ===================
    }
    return defaultMsgs
  }
}

export const translator = {
  enable: true,
  query_param_key: 'lang',
  text: {
    [LANGUAGES.ENGLISH]: chatbotText.english,
    [LANGUAGES.ARABIC]: chatbotText.arabic,
    [LANGUAGES.HINDI]: chatbotText.hindi
  },
  getLanguage() {
    let lang = LANGUAGES.ENGLISH
    if (this.enable) {
      //=========== BRAND SPECIFIC LOGIC ==========
      const query_params = new URLSearchParams(window.location.search);
      if (query_params.has(this.query_param_key)) {
        const key = query_params.get(this.query_param_key)
        if (this.text[key])
          lang = key
      }
      //=================== END ===================
    }
    return lang
  }
}

export const brand_features = {
  getBrandData() {
    const data = {}
    //=========== BRAND SPECIFIC LOGIC ==========

    //=================== END ===================
    return data
  },
  doBrandLogicOnEndChat() {
    if (chatbot_setting.chatbot_type === CHATBOT_TYPE.FULL_SCREEN) {
      window.top.close()
    }
  }
}
