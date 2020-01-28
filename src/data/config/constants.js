export const ERROR_BOUNDARY_TYPE = {
  ERROR: "error",
};

export const DEFAULT_END_CHAT_STATE = {
  visible: false,
  show_confirmation_card: false,
  show_resolved_card: false,
  show_form_card: false,
  form: [],
  description: null,
}

export const INFO_CONTENT_TYPE = {
  PRIVACY_POLICY: "privacy_policy",
  TERMS_AND_CONDITIONS: "terms_and_conditions"
};

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
  SHOW_NOTIFICATION: 'showNotification'
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
};

export const MESSAGE_SUBTYPES = {
  DISH_RECHARGE: "dishRecharge",
  DISH_RECHARGE_DETAILS: "dishRechargeDetails",
  DISH_OFFERS: "dishOffers",
  DISH_RECHARGE_HISTORY: "dishRechargeHistory",
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
<<<<<<< HEAD
  DISH_OFFERS: "dishOffers",
  CHECKBOX_SUBMIT: "checkboxSubmit",
=======
    DISH_OFFERS: "dishOffers",
    CHECKBOX_SUBMIT: "checkboxSubmit",
    SHARE_LOCATION: "shareLocation",
>>>>>>> Added Location feature
};

export const MESSAGE_SENDER = {
  SYSTEM: "system",
  CUSTOMER: "customer",
  ADMIN: "admin",
  CHATBOT: "chatbot",
};

<<<<<<< HEAD
export const LANGUAGES = {
  ENGLISH: 'en',
  ARABIC: 'arabic',
  HINDI: 'hindi'
};
=======
export const default_messages = [
    {
        sender: MESSAGE_SENDER.CHATBOT,
        type: MESSAGE_TYPES.TEXT,
        inputLock: false,
        quickReply: [],
        skipLS: false,
        send_variable_to_apiai: false,
        sendVariableToLS: false,
        variable_name: '',
        delay: 0,
        payload: {
            text: "Hi, I'm ADI, Your Personal DishTV Assistant."
        },
        timestamp: new Date(),
    },
    {
        sender: MESSAGE_SENDER.CHATBOT,
        inputLock: false,
        skipLS: false,
        send_variable_to_apiai: false,
        sendVariableToLS: false,
        variable_name: '',
        quickReplies: [],
        type: MESSAGE_TYPES.TEXT_WITH_BUTTONS,
        delay: 0,
        payload: {
            title: "",
            subtitle: "What can I help you with today?",
            buttons: [
                {
                    type: BUTTON_TYPES.DEFAULT,
                    text: "Recharge My Dish TV",
                    url: ""
                },
                {
                    type: BUTTON_TYPES.DEFAULT,
                    text: "Recharge Offers",
                    url: ""
                },
                {
                    type: BUTTON_TYPES.DEFAULT,
                    text: "Current Balance",
                    url: ""
                },
                {
                    type: BUTTON_TYPES.DEFAULT,
                    text: "Other Queries",
                    url: ""
                },
                {
                    type: BUTTON_TYPES.CUSTOM,
                    text: "Share Location",
                    subtype: BUTTON_SUB_TYPES.SHARE_LOCATION,    
                },
            ]
        },
        timestamp: new Date(),
    },
    // {

    //     sender: MESSAGE_SENDER.CHATBOT,
    //     inputLock: false,
    //     skipLS: false,
    //     send_variable_to_apiai: false,
    //     sendVariableToLS: false,
    //     variable_name: '',
    //     quickReplies: [],
    //     type: MESSAGE_TYPES.CHECKBOX_WITH_MEDIA,
    //     delay: 0,
    //     payload: {
    //         title: "Ori Serve",
    //         subtitle: "Please Select following options and proceed",
    //         options: [{
    //             "value": "Banking",
    //             "label": "Banking"
    //         }, {
    //             "value": "Real Estate",
    //             "label": "Real Estate"
    //         }, {
    //             "value": "Education",
    //             "label": "Education"
    //         }, {
    //             "value": "Health",
    //             "label": "Health"
    //         }, {
    //             "value": "Consumer Goods",
    //             "label": "Consumer Goods"
    //         }, {
    //             "value": "Entertainment",
    //             "label": "Entertainment"
    //         }, {
    //             "value": "Tourism",
    //             "label": "Tourism"
    //         }],
    //         buttons: [
    //             {
    //                 type: BUTTON_TYPES.CUSTOM,
    //                 subtype: BUTTON_SUB_TYPES.CHECKBOX_SUBMIT,
    //                 text: "Submit",
    //                 relayData: {
    //                     "entity": "dndCategories"
    //                 }
    //             },
    //             {
    //                 type: BUTTON_TYPES.DEFAULT,
    //                 text: "Cancel",
    //                 url: ""
    //             },
    //         ]
    //     },
    //     timestamp: new Date()
    // }
];

export const android_default_messages = [
    {
        sender: MESSAGE_SENDER.CHATBOT,
        type: MESSAGE_TYPES.TEXT,
        inputLock: false,
        quickReply: [],
        skipLS: false,
        send_variable_to_apiai: false,
        sendVariableToLS: false,
        variable_name: '',
        delay: 0,
        payload: {
            text: "Hi, I'm ADI, Your Personal DishTV Assistant."
        },
        timestamp: new Date(),
    },
    {
        sender: MESSAGE_SENDER.CHATBOT,
        inputLock: false,
        skipLS: false,
        send_variable_to_apiai: false,
        sendVariableToLS: false,
        variable_name: '',
        quickReplies: [],
        type: MESSAGE_TYPES.TEXT_WITH_BUTTONS,
        delay: 0,
        payload: {
            title: "",
            subtitle: "What can I help you with today?",
            buttons: [
                {
                    type: BUTTON_TYPES.DEFAULT,
                    text: "My DishTV is not working",
                    url: ""
                },
                {
                    type: BUTTON_TYPES.DEFAULT,
                    text: "Recharge Offers",
                    url: ""
                },
                {
                    type: BUTTON_TYPES.DEFAULT,
                    text: "Current Balance",
                    url: ""
                },
                {
                    type: BUTTON_TYPES.DEFAULT,
                    text: "Package details",
                    url: ""
                },
                {
                    type: BUTTON_TYPES.DEFAULT,
                    text: "Other Queries",
                    url: ""
                },
            ],

        },
        timestamp: new Date()
    }
];
>>>>>>> Added Location feature
