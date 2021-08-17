import {
  isAndroid,
  uniqueId,
  getDataFromLocalStorage,
  setDataInLocalStorage,
  clearAllDataFromLocalStorage
} from "./utils";
import {
  TYPES,
  CHATBOT_TYPE,
  LANGUAGES,
  LOCAL_STORAGE,
  // CHAT_STATE 
} from "./constants";
import * as defaultMessages from "./defaultMessages";
import * as chatbotText from "./chatbotText"
import * as assets from "../assets"
// import { updateChatsState } from "../redux/chat_details/actions"

export const translator = {
  enable: false,
  query_param_key: "lang",
  text: {
    [LANGUAGES.ENGLISH]: chatbotText.english,
    [LANGUAGES.ARABIC]: chatbotText.arabic
  },
  assets: {
    [LANGUAGES.ENGLISH]: assets.english,
    [LANGUAGES.ARABIC]: assets.arabic
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

export const chatbot_setting = {
  chatbot_type: CHATBOT_TYPE.DEFAULT, // default, fullScreen, adster
  trigger_type: TYPES.DEFAULT,
  show_trigger_close: true,
  image_type_brand_name: false,
  security: {
    enable: false,
    code: "123456",
  }, 
  message_footer: {
    enable: true,
    voting: true,
    read_status: true,
    timestamp: true
  },
  emit_unread_msg_seen: true,
  auto_close_feedback_form: 2 * 1000 * 60, //in milisecond only
  feedback_form_rating_type: TYPES.DEFAULT, // default or star
  show_feedback_rating_linebar: true,
  hide_buttons_in_msg_bubble: false, // to hide the buttons inside the message bubbles
  default_btn_display_count: 7,
  auto_close_chatbot_on_refresh: false,//in milliseconds only
  automate_connection_time: 3600, //in seceond only
  automate_reset_chat_time: 3600 * 24 * 4, //in second only
  auto_open_chatbot: {
    enable: false,
    query_param_key: "chatbotopen"
  },
  send_brand_data_on_user_first_msg: false,
  auto_emit_message: {
    enable: false,
    query_param_key: "oribotmessage",
    send_brand_data: false,
    update_last_emit: false,
    initial_delay_for_default_msg: 5000
  },
  speech_recognition: true,
  minimize_bot: true,
  header_end_chat: true,
  header_avatar_shape: "circle", // circle || square
  header_avatar_size: "large",
  powered_by: {
    visibility: true, // to enable powered by tag
    target_url: "http://oriserve.com/"
  },
  menu: {
    visible: true,
    children: {
      privacy_policy: true,
      terms_and_conditions: true,
      feedback: true,
      clear_chat: true,
      end_chat: false
    }
  },
  upload_file: true,
  max_upload_file_size: 500000,
  new_window_positon_and_size: {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
    left: window.innerWidth / 8,
    top: window.innerHeight / 8,
  },
  chat_interface: {
    show_sender_avatar: false,
    show_receiver_avatar: true,
    avatar_shape: "circle", // circle || square
    avatar_size: "default",
    show_feedback_avatar: true,
    show_feedback_emoji: false,
    quick_reply_bg_transparent: true,
    scroll_upto_first_response_only: true,
    carousel_msg_display_type: TYPES.DEFAULT, // default, fixed, actual
    text_with_media_img_popup_disable: false,
    carousel_img_popup_disable: false,
    type_writer: {
      enable: false,
      deleting_speed: 150,
      typing_speed: 30
    },
  },
  notification_bot: {
    visibility: true, // to enable notification popup (set value false in android and ios )
    stack_view: true, // to show to stack view of notification bot
    bottom_height_lg: 110,
    bottom_height_sm: 100
  },
  trigger: {
    lottie: {
      height: 70,
      width: 70
    },
    lottie_style_lg: {
      right: "20px",
      bottom: "20px"
    },
    lottie_style_sm: {
      right: "20px",
      bottom: "20px"
    },
    image_style_lg: {
      right: "20px",
      bottom: "20px",
      animationDuration: "2000ms",
      animationIterationCount: "infinite",
      height: "70px"
    },
    image_style_sm: {
      right: "20px",
      bottom: "20px",
      animationDuration: "2000ms",
      animationIterationCount: "infinite",
      height: "60px"
    },
    close_style: {
      right: "20px",
      bottom: "20px",
      height: "70px",
      width: "70px",
      borderRadius: "50%"
    }
  },
  auto_hide_notification_bubbles: {
    enable: false,
    delay: 10000 // in ms
  }
};

export const chatbot_default_messages = {
  enable: false,
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

export const chatbot_psids = {
  primary_key_enable: false,
  primary_key: "psid",
  secondary_key_enable: false,
  secondary_key: "sKey",
  psid_ttl: 24 * 3600 * 1000, // psid time to live = 1 days
  brandLogicToGetPrimaryValue() {
    let primary_value = null
    if (this.primary_key_enable) {
      //=========== BRAND SPECIFIC LOGIC TO FINDOUT PSID VALUE==========
      const query_params = new URLSearchParams(window.location.search)
      if (query_params.has(this.primary_key)) {
        primary_value = query_params.get(this.primary_key)
      }
      //=================== END ===================
    }
    return primary_value
  },
  brandLogicToGetSecondaryValue() {
    let secondary_value = "default"
    if (this.secondary_key_enable) {
      //=========== BRAND SPECIFIC LOGIC TO FINDOUT SECONDARY KEY VALUE==========
      const query_params = new URLSearchParams(window.location.search)
      if (query_params.has(this.secondary_key)) {
        secondary_value = query_params.get(this.secondary_key)
      }
      //=================== END ===================
    }
    return secondary_value
  },
  getPsid() {
    const psidMap = getDataFromLocalStorage(LOCAL_STORAGE.PSID_MAP, {})
    let isSomethingExpired = false
    Object.keys(psidMap).forEach(sKey => {
      if (psidMap[sKey].psid && psidMap[sKey].expiry && new Date().getTime() > psidMap[sKey].expiry) {
        clearAllDataFromLocalStorage(psidMap[sKey].psid)
        psidMap[sKey].expiry = new Date().getTime() + this.psid_ttl
        if (!isSomethingExpired)
          isSomethingExpired = true
      }
    })
    if (isSomethingExpired)
      setDataInLocalStorage(LOCAL_STORAGE.PSID_MAP, psidMap)
    const key = this.brandLogicToGetSecondaryValue()
    const primary_value = this.brandLogicToGetPrimaryValue()
    if ((this.primary_key_enable && primary_value && psidMap[key] && psidMap[key].psid && psidMap[key].psid === primary_value) || (!(this.primary_key_enable && primary_value) && psidMap[key] && psidMap[key].psid))
      return psidMap[key].psid
    psidMap[key] = {
      psid: primary_value ? primary_value : uniqueId(),
      expiry: new Date().getTime() + this.psid_ttl
    }
    setDataInLocalStorage(LOCAL_STORAGE.PSID_MAP, psidMap)
    return psidMap[key].psid
  },
  setPsid(psid) {
    const psidMap = getDataFromLocalStorage(LOCAL_STORAGE.PSID_MAP, {})
    const key = this.brandLogicToGetSecondaryValue()
    psidMap[key] = { psid, expiry: new Date().getTime() + this.psid_ttl }
    setDataInLocalStorage(LOCAL_STORAGE.PSID_MAP, psidMap)
  }
}

export const brand_features = {
  enable_trigger_brand_logic: false,
  enable_onload_brand_logic: false,
  getBrandData() {
    const data = {}
    //=========== BRAND SPECIFIC LOGIC ==========

    //=================== END ===================
    return data
  },
  doBrandLogicOnEndChat() {
    if (chatbot_setting.chatbot_type === CHATBOT_TYPE.FULL_SCREEN) {

    }
  },
  allowedImageTypeUpload(filename) {
    let bool = false
    //=========== BRAND SPECIFIC LOGIC ==========
    bool = (/\.(gif|jpg?g|jpeg|svg|tiff|png)$/i).test(filename)
    //=================== END ===================
    return bool
  },
  showTriggerByBrandLogic() {
    let show_trigger = true
    //=========== BRAND SPECIFIC LOGIC TO FINDOUT TRIGGER  VALUE==========

    //=================== END ===================
    return show_trigger
  },
  doBrandLogicOnChatStateChange(data, dispatch) {
    if (dispatch) {
      //=========== BRAND SPECIFIC LOGIC ON CHAT STATE CHANGE ==========
      // const upload_file = data.chatState === CHAT_STATE.AGENT_HANDLING ? true : chatbot_setting.upload_file
      // setDataInLocalStorage(LOCAL_STORAGE.UPLOAD_FILE + data.psid, upload_file)
      // dispatch(updateChatsState({ upload_file }))
      //=================== END ===================
    }
  },
  doBrandLogicOnLoadChatbotApp() {
    //=========== BRAND SPECIFIC LOGIC ON LOAD CHATBOT APP ==========

    //=================== END ===================
  },
}

export const adster_settings = {
  banner: true, // to add banner image code
  banner_initial_transtion_delay: 5000, // in ms
  banner_query_params_key: "segment",
  banner_images: {
    "default": {
      default: "https://dummyimage.com/420x200/000/fff.png&text=default-default",
      ad1: "https://dummyimage.com/420x200/000/fff.png&text=ad1-default",
      ad2: "https://dummyimage.com/420x200/000/fff.png&text=ad2-default",
    },
    "0-0.25": {
      default: "https://dummyimage.com/150x600/000/fff.png&text=default-0-0.25",
      ad1: "https://dummyimage.com/150x600/000/fff.png&text=ad1-0-0.25",
      ad2: "https://dummyimage.com/150x625/000/fff.png&text=ad2-0-0.25",
    },
    "0.26-0.5": {
      default: "https://dummyimage.com/320x650/000/fff.png&text=default-0.26-0.5",
      ad1: "https://dummyimage.com/320x650/000/fff.png&text=ad1-0.26-0.5",
      ad2: "https://dummyimage.com/300x600/000/fff.png&text=ad2-0.26-0.5",
    },
    "0.51-0.75": {
      default: "https://dummyimage.com/320x480/000/fff.png&text=default-0.51-0.75",
      ad1: "https://dummyimage.com/320x568/000/fff.png&text=ad1-0.51-0.75",
      ad2: "https://dummyimage.com/320x568/000/fff.png&text=ad2-0.51-0.75",
    },
    "0.76-1": {
      default: "https://dummyimage.com/380x500/000/fff.png&text=default-0.76-1",
      ad1: "https://dummyimage.com/380x500/000/fff.png&text=ad1-0.76-1",
      ad2: "https://dummyimage.com/380x500/000/fff.png&text=ad2-0.76-1",
    },
    "1.1-1.25": {
      default: "https://dummyimage.com/336x280/383438/fff.png&text=default-1.1-1.25",
      ad1: "https://dummyimage.com/336x280/383438/fff.png&text=ad1-1.1-1.25",
      ad2: "https://dummyimage.com/336x280/383438/fff.png&text=ad2-1.1-1.25"
    },
    "1.26-1.5": {
      default: "https://dummyimage.com/300x250/383438/fff.png&text=default-1.26-1.5",
      ad1: "https://dummyimage.com/1024x768/383438/fff.png&text=ad1-1.26-1.5",
      ad2: "https://dummyimage.com/1024x768/383438/fff.png&text=ad2-1.26-1.5"
    },
    "1.51-1.75": {
      default: "https://dummyimage.com/480x300/383438/fff.png&text=default-1.51-1.75",
      ad1: "https://dummyimage.com/480x300/383438/fff.png&text=ad1-1.51-1.75",
      ad2: "https://dummyimage.com/480x300/383438/fff.png&text=ad2-1.51-1.75"
    },
    "1.76-2": {
      default: "https://dummyimage.com/568x320/000/fff.png&text=default-1.75-2",
      ad1: "https://dummyimage.com/568x320/000/fff.png&text=ad1-1.75-2",
      ad2: "https://dummyimage.com/568x320/000/fff.png&text=ad1-1.75-2"
    }
  },
  getBannerByRange(range, key) {
    if (this.banner_images[range][key])
      return this.banner_images[range][key]
    return this.banner_images[range].default
  },
  getBannerByAspectRatio(aspectRatio, key) {
    if (aspectRatio <= 0.25)
      return this.getBannerByRange("0-0.25", key)
    else if (aspectRatio <= 0.5)
      return this.getBannerByRange("0.26-0.5", key)
    else if (aspectRatio <= 0.75)
      return this.getBannerByRange("0.51-0.75", key)
    else if (aspectRatio <= 1)
      return this.getBannerByRange("0.76-1", key)
    else if (aspectRatio <= 1.25)
      return this.getBannerByRange("1.1-1.25", key)
    else if (aspectRatio <= 1.5)
      return this.getBannerByRange("1.26-1.5", key)
    else if (aspectRatio <= 1.75)
      return this.getBannerByRange("1.51-1.75", key)
    else if (aspectRatio <= 2)
      return this.getBannerByRange("1.76-2", key)
    else
      return this.getBannerByRange("default", key)
  }
}
