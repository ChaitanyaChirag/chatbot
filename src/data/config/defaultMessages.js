import { MESSAGE_SENDER, MESSAGE_TYPES, BUTTON_TYPES } from './constants'

export const web = [
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
      text: "Hi, I'm VIC, Your Personal Vodafone Idea Assistant."
    },
    timestamp: new Date(),
  },
  {
    sender: MESSAGE_SENDER.CHATBOT,
    inputLock: false,
    quickReplies: [],
    skipLS: true,
    send_variable_to_apiai: false,
    sendVariableToLS: false,
    variable_name: 'subscription',
    type: MESSAGE_TYPES.TEXT_WITH_BUTTONS,
    delay: 0,
    payload: {
      title: "",
      subtitle: "What would you like to explore today?",
      buttons: [
        {
          type: BUTTON_TYPES.DEFAULT,
          text: "Prepaid",
          url: ""
        },
        {
          type: BUTTON_TYPES.DEFAULT,
          text: "Postpaid",
          url: ""
        },
        {
          type: BUTTON_TYPES.DEFAULT,
          text: "Join Vodafone Idea Family",
          url: ""
        }
      ]
    },
    timestamp: new Date(),
  }
];

export const android = [
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
      text: "Hi, I'm VIC, Your Personal Vodafone Idea Assistant."
    },
    timestamp: new Date(),
  },
  {
    sender: MESSAGE_SENDER.CHATBOT,
    inputLock: false,
    quickReplies: [],
    skipLS: true,
    send_variable_to_apiai: false,
    sendVariableToLS: false,
    variable_name: 'subscription',
    type: MESSAGE_TYPES.TEXT_WITH_BUTTONS,
    delay: 0,
    payload: {
      title: "",
      subtitle: "What would you like to explore today?",
      buttons: [
        {
          type: BUTTON_TYPES.DEFAULT,
          text: "Prepaid",
          url: ""
        },
        {
          type: BUTTON_TYPES.DEFAULT,
          text: "Postpaid",
          url: ""
        },
        {
          type: BUTTON_TYPES.DEFAULT,
          text: "Join Vodafone Idea Family",
          url: ""
        }
      ]
    },
    timestamp: new Date(),
  },
];

export const hindi = [
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
      text: "नमस्ते, मैं वीआईसी, आपका व्यक्तिगत वोडाफोन आइडिया असिस्टेंट हूं।"
    },
    timestamp: new Date(),
  },
  {
    sender: MESSAGE_SENDER.CHATBOT,
    inputLock: false,
    quickReplies: [],
    skipLS: true,
    send_variable_to_apiai: false,
    sendVariableToLS: false,
    variable_name: 'subscription',
    type: MESSAGE_TYPES.TEXT_WITH_BUTTONS,
    delay: 0,
    payload: {
      title: "",
      subtitle: "आप आज क्या तलाशना चाहेंगे?",
      buttons: [
        {
          type: BUTTON_TYPES.DEFAULT,
          text: "प्रीपेड",
          url: ""
        },
        {
          type: BUTTON_TYPES.DEFAULT,
          text: "पोस्टपेड",
          url: ""
        },
        {
          type: BUTTON_TYPES.DEFAULT,
          text: "वोडाफोन आइडिया परिवार में शामिल हों",
          url: ""
        }
      ]
    },
    timestamp: new Date(),
  },
];

