import { INFO_CONTENT_TYPE } from './constants';

//======= WARNING: All keys are REQUIRED for chatbot text in any language ========
//----- means keys should be common in all language text.
//----- copy englishText for any new language text and update the value only.

export const english = {
  brandName: "Vodafone",
  online: "online",
  offline: "offline",
  connecting: "connecting...",
  endChat: "End chat",
  poweredBy: "Powered by",
  typeYourQuery: "Type your query...",
  listening: "Listening...",
  menu: "Menu",
  clearChat: "Clear chat",
  privacyPolicy: "Privacy Policy",
  feedback: "Feedback",
  termsAndConditions: "Terms & Conditions",
  connectionLost: "connection lost",
  feedbackGreeting: "How happy are you with our support?",
  feedbackLowRatedStatus: "Please tell us what went wrong.",
  feedbackHighRatedStatus: "Please suggest how can we make your next visit awesome.",
  feedbackSuccess: "Thank you for giving us feedback",
  feedbackFailed: "Some error occured please try again later",
  downtimeStatusPrefix: "we will try to fix it before",
  downtimeStatusPostfix: ". sorry for the inconvenience.",
  sessionCloseConfirmation: "Do you want to close this session?",
  resolveChatInfo: "Agent has ended the conversation.",
  writeYourComment: "Write your comment…",
  fileSelected: "File has been selected",
  confirm: "Confirm",
  cancel: "Cancel",
  ok: "Ok",
  skip: "Skip",
  submit: "Submit",
  success: "Success",
  failed: "Failed",
  close: "Close",
  send: "Send",
  show_more: "Show more",
  show_less: "Show less",
  security_prompt: "This is a confidential URL. To access this URL please enter your security code.",
  typewriter_data: ['Click here to type your query...'],
  info_content: {
    [INFO_CONTENT_TYPE.PRIVACY_POLICY]: { // define privacy policy content here
      header: 'Privacy Policy',
      data: [
        {
          title: "",
          subtitle: "", // add subtitle key only if requires
          content: ""
        }
      ]
    },
    [INFO_CONTENT_TYPE.TERMS_AND_CONDITIONS]: { // define terms & conditions content here
      header: 'Terms and Conditions',
      data: [
        {
          title: "",
          content: ""
        }
      ]
    }
  }
}

export const arabic = {
  brandName: "Vodafone",
  online: "online",
  offline: "offline",
  connecting: "connecting...",
  endChat: "End chat",
  poweredBy: "Powered by",
  typeYourQuery: "Type your query...",
  listening: "Listening...",
  menu: "Menu",
  clearChat: "Clear chat",
  privacyPolicy: "Privacy Policy",
  feedback: "Feedback",
  termsAndConditions: "Terms & Conditions",
  connectionLost: "connection lost",
  feedbackGreeting: "How happy are you with our support?",
  feedbackLowRatedStatus: "Please tell us what went wrong.",
  feedbackHighRatedStatus: "Please suggest how can we make your next visit awesome.",
  feedbackSuccess: "Thank you for giving us feedback",
  feedbackFailed: "Some error occured please try again later",
  downtimeStatusPrefix: "we will try to fix it before",
  downtimeStatusPostfix: ". sorry for the inconvenience.",
  sessionCloseConfirmation: "Do you want to close this session?",
  resolveChatInfo: "Agent has ended the conversation.",
  writeYourComment: "Write your comment…",
  fileSelected: "File has been selected",
  confirm: "Confirm",
  cancel: "Cancel",
  ok: "Ok",
  skip: "Skip",
  submit: "Submit",
  success: "Success",
  failed: "Failed",
  close: "Close",
  send: "Send",
  show_more: "إظهار المزيد",
  show_less: "تظهر أقل",
  security_prompt: "This is a confidential URL. To access this URL please enter your security code.",
  info_content: {
    [INFO_CONTENT_TYPE.PRIVACY_POLICY]: { // define privacy policy content here
      header: 'Privacy Policy',
      data: [
        {
          title: "",
          subtitle: "", // add subtitle key only if requires
          content: ""
        }
      ]
    },
    [INFO_CONTENT_TYPE.TERMS_AND_CONDITIONS]: { // define terms & conditions content here
      header: 'Terms and Conditions',
      data: [
        {
          title: "",
          content: ""
        }
      ]
    }
  }
}