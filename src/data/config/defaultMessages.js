import { MESSAGE_SENDER, MESSAGE_TYPES, BUTTON_TYPES } from './constants'

export const webDefault = [
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

export const androidDefault = [
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
