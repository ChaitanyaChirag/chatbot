export const ERROR_BOUNDARY_TYPE = {
  ERROR: "error",
};

export const CHATBOT_TYPE = {
  DEFAULT: 'default',
  FULL_SCREEN: 'fullScreen',
  ADSTER: 'adster'
}

export const CHAT_STATE = {
  PENDING: "Pending",
  AGENT_HANDLING: "AgentHandling",
  BOT_HANDLING: "BotHandling",
  IN_QUEUE: "Inqueue"
}

export const TYPES = {
  DEFAULT: "default",
  STAR: "star",
  FIXED: "fixed",
  ACTUAL:"actual",
  SKIP: "skip",
  FORM_SUBMIT: "formSubmit",
  END_CHAT: "endChat",
  LOTTIE: "lottie",
  IMAGE: "image",
  CHAT_STATE: "chatState"
}

export const DEFAULT_END_CHAT_STATE = {
  visible: false,
  show_confirmation_card: false,
  show_resolved_card: false,
  show_form_card: false,
  form: [],
  formTitle: "",
  formSubTitle: ""
}

export const INFO_CONTENT_TYPE = {
  PRIVACY_POLICY: "privacy_policy",
  TERMS_AND_CONDITIONS: "terms_and_conditions"
};

export const LOCAL_STORAGE = {
  PSID_MAP: 'psids',
  MESSAGES: 'msgs_',
  UNSEEN_MESSAGES: "unSeen_",
  NOTIFICATION_COUNT: "nCount_",
  LAST_EMIT: "lEmit_",
  IS_CHAT_OPEN: "isOpen_",
  APP_PARAMS: "appParams_",
  END_CHAT: "endChat_",
  DISABLE_MESSAGE_AFTER_USER_REPLY: "disMsgAftRply_",
  UPLOAD_FILE: "uploadFile_",
  CHAT_STATE: "chatState_"
}

export const PLATFORM = {
  ANDROID: "android",
  IOS: "ios",
  WEBSITE: "website"
}

export const EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",
  ERROR: "error",
  RESPONSE: "response",
  NEW_MESSAGE: "new_message",
  RESET_CHAT: "reset_chat",
  SHOW_TYPING: "show_typing",
  BOT_AUTO_POPUP_REQUEST: "botAutoPopupRequest",
  RECORD_FEEDBACK: "recordFeedback",
  GET_WEBSITE_DATA: "getWebsiteData",
  WEBSITE_DATA: "websiteData",
  CHATLOG_FEEDBACK: "chatlogFeedback",
  TYPING_STATUS: "typingStatus",
  UPDATE_MESSAGE: "updateMessage",
  UPDATE_ADMIN_MESSAGE: "updateAdminMessage",
  MESSAGE_SEEN: "messageSeen",
  END_CONVERSATION: "end_conversation",
  END_CONVERSATION_FORM_SUBMIT: "end_conversation_form_submit",
  DOWN_TIME: 'downTime',
  SHOW_NOTIFICATION: 'showNotification',
  COMMON_UPDATE: 'commonUpdate',
  UNREAD_MESSAGE_SEEN: 'unreadMessageSeen'
};

export const MESSAGE_TYPES = {
  TEXT: "text",
  LIST: "list",
  TEXT_WITH_BUTTONS: "text_with_buttons",
  IMAGE_WITH_BUTTONS: "image_with_buttons",
  CHECKBOX_WITH_MEDIA: "checkbox_with_media",
  VIDEO: "video",
  TIMER: "timer",
  CAROUSEL: "carousel",
  CUSTOM_MSG: "customMsg",
  NOTIFICATION: "notification",
  UPLOAD_FILE: "uploadFile",
  FILE: "file",
  SYSTEM_TEXT: "systemText",
  LOCATION: "location"
};

export const ALLOWED_MESSAGE_TYPES = [
  MESSAGE_TYPES.TEXT,
  MESSAGE_TYPES.LIST,
  MESSAGE_TYPES.TEXT_WITH_BUTTONS,
  MESSAGE_TYPES.IMAGE_WITH_BUTTONS,
  MESSAGE_TYPES.CHECKBOX_WITH_MEDIA,
  MESSAGE_TYPES.VIDEO,
  MESSAGE_TYPES.TIMER,
  MESSAGE_TYPES.CAROUSEL,
  MESSAGE_TYPES.CUSTOM_MSG,
  MESSAGE_TYPES.NOTIFICATION,
  MESSAGE_TYPES.UPLOAD_FILE,
  MESSAGE_TYPES.FILE,
  MESSAGE_TYPES.SYSTEM_TEXT,
  MESSAGE_TYPES.LOCATION
]

export const MESSAGE_SUBTYPES = {
  DISH_RECHARGE: "dishRecharge",
  DISH_RECHARGE_DETAILS: "dishRechargeDetails",
  DISH_OFFERS: "dishOffers",
  DISH_RECHARGE_HISTORY: "dishRechargeHistory"
};

export const MESSAGE_READ_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  SEEN: 'seen',
  FAILED: 'failed',
};

export const BUTTON_TYPES = {
  LINK: "link",
  DEFAULT: "default",
  CUSTOM: "custom",
  CUSTOM_SOCKET_EVENT: "customSocketEvent",
  POST_BACK_RESPONSE: "postbackRes",
};

export const BUTTON_SUB_TYPES = {
  DISH_OFFERS: "dishOffers",
  CHECKBOX_SUBMIT: "checkboxSubmit",
  SHARE_LOCATION: "shareLocation",
};

export const MESSAGE_SENDER = {
  SYSTEM: "system",
  CUSTOMER: "customer",
  ADMIN: "admin",
  CHATBOT: "chatbot",
};

export const LANGUAGES = {
  ENGLISH: 'en',
  ARABIC: 'ar',
};

export const GOOGLE_ENABLER_EVENTS = {
  BANNER: "Banner",
  END_CHAT: "End Chat",
  PRIVACY_POLICY: "Privacy Policy",
  TERMS_AND_CONDITIONS: "TnC",
  CHAT_RESET: "Chat Reset"
}
