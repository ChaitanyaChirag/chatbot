import React from "react"
import MinimizeIcon from "react-icons/lib/md/remove"
import MenuIcon from "react-icons/lib/md/menu"

import "./chatbotStyle.scss"
import { translator } from "./brandSetup"

const chatbotStyle = {
  containerMobileClass: "containerMobile",
  containerWebClass: "containerWeb",
  containerInAnimationClass: "ori-fade-in",
  containerOutAnimationClass: "ori-fade-out",
  chatbotContainer: {
    backgroundImage: `url(${translator.assets[translator.getLanguage()].background})`
  },
  endChatContainer: {
    backgroundImage: `url(${translator.assets[translator.getLanguage()].background})`
  },
  headerContainer: {},
  headerBorder: {},
  footerBorder: {},
  conversationContainer: {},
  receiverBubbleContainer: {},
  senderBubbleContainer: {},
  msgBubbleClass: "ori-pad-7 ori-b-mrgn-5 ori-border-radius-10",
  stackViewNotificationBot: {
    width: "320px",
    bottom: "100px"
  },
  EndChatIcon: () => (
    <div className="ori-lr-pad-8 ori-border-radius-3 endChatIcon">
      {translator.text[translator.getLanguage()].endChat}
    </div>
  ),
  MinimizeIcon: () => <MinimizeIcon size={20} className="headerIcon" />,
  MenuIcon: () => <MenuIcon size={20} />
}

export default chatbotStyle
