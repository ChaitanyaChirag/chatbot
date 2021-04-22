import React from "react"
import MinimizeIcon from "react-icons/lib/md/remove"
import MenuIcon from "react-icons/lib/md/menu"

import "./chatbotStyle.scss"
import { translator } from "./brandSetup"

const chatbotStyle = {
  headerContainer: {},
  headerClass: "",
  receiverBubbleContainer: {},
  senderBubbleContainer: {},
  EndChatIcon: () => (
    <div className="ori-lr-pad-8 ori-border-radius-3 endChatIcon">
      {translator.text[translator.getLanguage()].endChat}
    </div>
  ),
  MinimizeIcon: () => <MinimizeIcon size={20} className="headerIcon" />,
  MenuIcon: () => <MenuIcon size={20} />
}

export default chatbotStyle
