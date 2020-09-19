import { MESSAGE_SENDER, MESSAGE_TYPES, BUTTON_TYPES } from './constants'

export const web = [
  {
    type: MESSAGE_TYPES.TEXT,
    sender: MESSAGE_SENDER.CHATBOT,
    inputLock: false,
    quickReplies: [],
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
    type: MESSAGE_TYPES.TEXT_WITH_BUTTONS,
    sender: MESSAGE_SENDER.CHATBOT,
    inputLock: false,
    quickReplies: [
      'Book Now',
      'Launch Date',
      'Covid Safe Test Drives',
      'Finance Options'
    ],
    skipLS: true,
    send_variable_to_apiai: false,
    sendVariableToLS: false,
    variable_name: 'subscription',
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
    type: MESSAGE_TYPES.TEXT,
    sender: MESSAGE_SENDER.CHATBOT,
    inputLock: false,
    quickReplies: [],
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
    type: MESSAGE_TYPES.TEXT_WITH_BUTTONS,
    sender: MESSAGE_SENDER.CHATBOT,
    inputLock: false,
    quickReplies: [],
    skipLS: true,
    send_variable_to_apiai: false,
    sendVariableToLS: false,
    variable_name: 'subscription',
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

export const hindi = [
  {
    type: MESSAGE_TYPES.TEXT,
    sender: MESSAGE_SENDER.CHATBOT,
    inputLock: false,
    quickReplies: [],
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
    type: MESSAGE_TYPES.TEXT_WITH_BUTTONS,
    sender: MESSAGE_SENDER.CHATBOT,
    inputLock: false,
    quickReplies: [],
    skipLS: true,
    send_variable_to_apiai: false,
    sendVariableToLS: false,
    variable_name: 'subscription',
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
