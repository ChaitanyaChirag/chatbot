import { INFO_CONTENT_TYPE } from './constants';

//======= WARNING: All keys are REQUIRED for chatbot text in any language ========
//----- means keys should be common in all language text.
//----- copy englishText for any new language text and update the value in that language.

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
  skip: "Skip",
  submit:"Submit",
  success: "Success",
  failed: "Failed",
  close: "Close",
  send: "Send",
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

export const hindi = {
  brandName: "वोडाफोन",
  online: "ऑनलाइन",
  offline: "ऑफ़लाइन",
  connecting: "जोड़ रहे है...",
  endChat: "बातचीत बंद करें",
  poweredBy: "द्वारा संचालित-",
  typeYourQuery: "अपने सवाल यहाँ लिखें...",
  listening: "सुन रहे हैं...",
  menu: "सूचि",
  clearChat: "बातचीत मिटाये",
  privacyPolicy: "गोपनीयता नीति",
  feedback: "प्रतिपुष्टि",
  termsAndConditions: "नियम और शर्तें",

  connectionLost: "संपर्क टूट गया",
  feedbackGreeting: "आप हमारे समर्थन से कितने खुश हैं?",
  feedbackLowRatedStatus: "कृपया हमें बताएं कि क्या गलत हुआ।",
  feedbackHighRatedStatus: "कृपया सुझाव दें कि हम आपकी अगली यात्रा को कैसे शानदार बना सकते हैं।",
  feedbackSuccess: "हमें अपनी प्रतिक्रिया देने के लिए धन्यवाद",
  feedbackFailed: "कुछ त्रुटि हुई, कृपया बाद में पुनः प्रयास करें",

  downtimeStatusPrefix: "हम इसे",
  downtimeStatusPostfix: "से पहले ठीक करने का प्रयास करेंगे। असुविधा के लिए खेद है।",

  sessionCloseConfirmation: "क्या आप इस सत्र को बंद करना चाहते हैं?",
  resolveChatInfo: "एजेंट ने बातचीत खत्म कर दी है।",
  writeYourComment: "अपनी टिप्पणी लिखें…",
  fileSelected: "फ़ाइल का चयन कर लिया गया है",
  confirm: "पुष्टि करें",
  cancel: "रद्द करे",
  skip: "छोड़ें",
  submit:"प्रस्तुत",
  success: "सफल",
  failed: "असफल",
  close: "बंद करे",
  send: "भेजें",
  security_prompt: "यह एक गोपनीय URL है। इस URL तक पहुँचने के लिए कृपया अपना सुरक्षा कोड दर्ज करें।",
  info_content: {
    [INFO_CONTENT_TYPE.PRIVACY_POLICY]: { // define privacy policy content here
      header: "गोपनीयता नीति",
      data: [
        {
          title: "",
          subtitle: "", // add subtitle key only if requires
          content: ""
        }
      ]
    },
    [INFO_CONTENT_TYPE.TERMS_AND_CONDITIONS]: { // define terms & conditions content here
      header: "नियम और शर्तें",
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
  
}