import React from "react"
import MinimizeIcon from "react-icons/lib/md/remove"

import "./chatbotStyle.scss"
import { translator } from "./brandSetup"

const chatbotStyle = {
  headerContainer: {},
  headerClass: "",
  receiverBubbleContainer: {},
  senderBubbleContainer: {},
  EndChatIcon() {
    return (
      <div className="ori-lr-pad-8 ori-border-radius-3 endChatIcon">
        {translator.text[translator.getLanguage()].endChat}
      </div>
    )
  },
  MinimizeIcon() {
    return (
      <MinimizeIcon size={20} className="headerIcon" />
    )
  }
}

export default chatbotStyle
