import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import CloseIcon from "react-icons/lib/md/close";

import "./index.scss";

import { chatbot_setting } from "../../data/config/brandSetup";
import { LOCAL_STORAGE } from "../../data/config/constants";
import chatbotStyle from "../../data/config/chatbotStyle"

import NotificationBotHeader from "./components/notificationbotheader";
import ChatBotConversation from "../../components/chatbotconversation";
import InputComposer from "../../components/inputcomposer";

class NotificationBot extends React.PureComponent {
  state = {
    show_header: false,
  };

  showHeader = () => {
    this.setState({
      show_header: true
    });
  };

  hideHeader = () => {
    this.setState({
      show_header: false
    });
  };

  handleNotificationBotClose = () => {
    const { actions, chat_details } = this.props;
    localStorage.removeItem(LOCAL_STORAGE.UNSEEN_MESSAGES + chat_details.psid);
    actions.updateChatsState({ unseen_messages: [] });
  };

  handleViewMore = () => {
    const { actions, chat_details } = this.props;
    localStorage.removeItem(LOCAL_STORAGE.UNSEEN_MESSAGES + chat_details.psid);
    actions.updateChatsState({ unseen_messages: [] });
    actions.handleChatbotInterface(true);
  };

  render() {
    const { page_details, chat_details, sendTextToServer, handleMsgBtnClick, handleOfferSelection, stack_view, actions } = this.props;
    const { show_header } = this.state;
    const mobile = page_details.device_data.screen_width && page_details.device_data.screen_width < 481;
    return (
      <div
        className="ori-fixed oriNotificationBotContainer"
        style={{
          bottom: mobile ? `${chatbot_setting.notification_bot.bottom_height_sm}px` : `${chatbot_setting.notification_bot.bottom_height_lg}px`,
          ...(stack_view ? chatbotStyle.stackViewNotificationBot : {})
        }}
      >
        <div
          className={classNames("ori-relative ori-flex-column oriNotificationBotContentContainer",
            {
              "ori-no-tb-pad": stack_view
            })}
          style={{
            maxHeight: mobile ? `calc(100vh - ${chatbot_setting.notification_bot.bottom_height_sm + 20}px)` : `calc(100vh - ${chatbot_setting.notification_bot.bottom_height_lg + 20}px)`
          }}
          onMouseOver={this.showHeader}
          onMouseOut={this.hideHeader}
        >
          {
            !stack_view &&
            <div className={classNames("ori-absolute notificationBotHeader", { "ori-display-none": !show_header })}>
              <NotificationBotHeader handleNotificationBotClose={this.handleNotificationBotClose} handleViewMore={this.handleViewMore} />
            </div>
          }
          {
            stack_view &&
            <div className="ori-absolute ori-animated ori-zoom-in ori-cursor-ptr ori-font-white stackCloseContainer" onClick={this.handleNotificationBotClose}>
              <CloseIcon size={16} className="ori-border-circle ori-bg-black-light alignStackClose" />
            </div>
          }
          <ChatBotConversation
            psid={chat_details.psid}
            btn_disabled={!chat_details.is_socket_connected}
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
          <div className={classNames("ori-absolute oriNotificationFooter", { "ori-display-none": stack_view })}>
            <div className={"inputComposerContainer"}>
              <InputComposer
                psid={chat_details.psid}
                sendTextToServer={sendTextToServer}
                is_online={chat_details.is_socket_connected}
                is_input_lock={chat_details.messages && chat_details.messages.length > 0 && chat_details.messages[chat_details.messages.length - 1].inputLock}
                input_lock_text={chat_details.messages && chat_details.messages.length > 0 && chat_details.messages[chat_details.messages.length - 1].inputLockMessage}
                emitCustomEvent={actions.emitCustomEvent}
                notification_bot
              />
            </div>
          </div>
        </div>
      </div>
    );
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
};

NotificationBot.defaultProps = {
  stack_view: false,
};

export default NotificationBot;
