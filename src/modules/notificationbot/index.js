import React, { lazy, Suspense } from "react"
import PropTypes from "prop-types"
import CloseIcon from "react-icons/lib/md/close"

import "./index.scss"

import { brand_features, chatbot_setting } from "../../data/config/brandSetup"
import { LOCAL_STORAGE, EVENTS } from "../../data/config/constants"
import { getPreviousMessageData } from "../../data/config/utils"
import chatbotStyle from "../../data/config/chatbotStyle"

const NotificationBotHeader = lazy(() => import("./notificationbotheader"))
const ChatBotConversation = lazy(() => import("../../components/chatbotconversation"))
const InputComposer = lazy(() => import("../../components/inputcomposer"))

class NotificationBot extends React.PureComponent {
  state = {
    show_header: false,
  }

  showHeader = () => {
    this.setState({
      show_header: true
    })
  }

  hideHeader = () => {
    this.setState({
      show_header: false
    })
  }

  handleNotificationBotClose = () => {
    const { actions, chat_details } = this.props
    localStorage.removeItem(LOCAL_STORAGE.UNSEEN_MESSAGES + chat_details.psid)
    actions.updateChatsState({ unseen_messages: [] })
  }

  handleViewMore = () => {
    const { actions, chat_details } = this.props
    localStorage.removeItem(LOCAL_STORAGE.UNSEEN_MESSAGES + chat_details.psid)
    actions.updateChatsState({ unseen_messages: [] })
    brand_features.doSomethingBeforeLoadChatbotThenContinue(() => {
      actions.handleChatbotInterface(true)
      if (chatbot_setting.emit_unread_msg_seen)
        actions.emitCustomEvent(EVENTS.UNREAD_MESSAGE_SEEN, { clientPsid: chat_details.psid })
    })
  }

  render() {
    const { page_details, chat_details, sendTextToServer, handleMsgBtnClick, handleOfferSelection, stack_view, actions } = this.props
    const { show_header } = this.state
    const mobile = page_details.device_data.screen_width && page_details.device_data.screen_width < 481
    const input_lock_text = getPreviousMessageData(chat_details.messages, "inputLockMessage", undefined)
    return (
      <div
        className="ori-fixed oriNotificationBotContainer"
        style={{
          bottom: mobile ? `${chatbot_setting.notification_bot.bottom_height_sm}px` : `${chatbot_setting.notification_bot.bottom_height_lg}px`,
          ...(stack_view ? chatbotStyle.stackViewNotificationBot : {})
        }}
      >
        <div
          className={`ori-relative ori-flex-column oriNotificationBotContentContainer ${stack_view ? "ori-no-tb-pad" : ""}`}
          style={{
            maxHeight: mobile ? `calc(100vh - ${chatbot_setting.notification_bot.bottom_height_sm + 20}px)` : `calc(100vh - ${chatbot_setting.notification_bot.bottom_height_lg + 20}px)`
          }}
          onMouseOver={this.showHeader}
          onMouseOut={this.hideHeader}
        >
          {
            !stack_view &&
            <Suspense fallback={null}>
              <div className={`ori-absolute notificationBotHeader ${show_header ? "" : "ori-display-none"}`}>
                <NotificationBotHeader
                  handleNotificationBotClose={this.handleNotificationBotClose}
                  handleViewMore={this.handleViewMore}
                />
              </div>
            </Suspense>
          }
          {
            stack_view &&
            <div
              className={`ori-absolute ${chatbotStyle.stackViewCloseIconClass}`}
              onClick={this.handleNotificationBotClose}
            >
              <CloseIcon size={18} />
            </div>
          }
          <Suspense fallback={null}>
            <ChatBotConversation
              psid={chat_details.psid}
              btn_disabled={!chat_details.is_internet_connected}
              disable_msg_after_reply={chat_details.disable_msg_after_reply}
              messages={chat_details.unseen_messages}
              onMessageVoting={actions.onMessageVoting}
              handleMsgBtnClick={handleMsgBtnClick}
              handleOfferSelection={handleOfferSelection}
              onClickStackBubble={this.handleViewMore}
              is_typing={chat_details.is_typing}
              typing_text={chat_details.typing_text}
              stack_view={stack_view}
              notification_bot
            />
          </Suspense>
          {
            !stack_view &&
            <Suspense fallback={null}>
              <div className="ori-absolute oriNotificationFooter">
                <div className="inputComposerContainer">
                  <InputComposer
                    psid={chat_details.psid}
                    sendTextToServer={sendTextToServer}
                    is_input_lock={getPreviousMessageData(chat_details.messages, "inputLock", false)}
                    input_lock_text={input_lock_text ? input_lock_text : undefined}
                    emitCustomEvent={actions.emitCustomEvent}
                    notification_bot
                  />
                </div>
              </div>
            </Suspense>
          }
        </div>
      </div>
    )
  }
}

NotificationBot.propTypes = {
  chat_details: PropTypes.object,
  page_details: PropTypes.object,
  actions: PropTypes.object,
  sendTextToServer: PropTypes.func,
  handleMsgBtnClick: PropTypes.func,
  handleOfferSelection: PropTypes.func,
  stack_view: PropTypes.bool
}

NotificationBot.defaultProps = {
  stack_view: false,
}

export default NotificationBot
