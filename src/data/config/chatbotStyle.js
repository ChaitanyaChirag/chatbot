import React from "react"

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
      <div
        className="ori-cursor-ptr minimizeIcon"
        style={{
          height: "16px",
          width: "13px"
        }}
      />
    )
  }
}

export default chatbotStyle
