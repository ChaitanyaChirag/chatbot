import React, { Suspense, lazy } from "react"
import PropTypes from "prop-types"
import Avatar from "antd/lib/avatar"
import {
  TextMessage,
  TextWithMedia,
  CarouselWithButtons,
  PromptMsg,
  CheckboxWithMedia,
  ListMessage,
  UploadFile,
  Recharge,
  RechargeDetails,
  Offers,
  RechargeHistory,
  // FormMessage,
} from "message-types"

import "./index.scss"

import {
  MESSAGE_SENDER,
  MESSAGE_TYPES,
  MESSAGE_SUBTYPES,
} from "../../data/config/constants"
import { chatbot_setting, chatbot_default_messages, translator } from "../../data/config/brandSetup"
import { formatTime, formatDate } from "../../data/config/utils"
import { LangContext } from "../../modules/context"
import chatbotStyle from "../../data/config/chatbotStyle"

import ErrorBoundary from "../errorboundary"

const Buttons = lazy(() => import("../Buttons"))
const DotsLoader = lazy(() => import("../dotsloader"))
const MessageFooter = lazy(() => import("./MessageFooter"))

const defaultMessageLength = chatbot_default_messages.getDefaultMessages().length

class ChatBotConversation extends React.PureComponent {
  constructor(props) {
    super(props)
    this.scrollRef = React.createRef();
    this.chatbodyRef = React.createRef();
    this.firstResChildIndex = null
  }

  componentDidMount() {
    this.chatbodyRef.current.scrollTop = this.chatbodyRef.current.scrollHeight
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props;
    if (prevProps.messages.length > 0 && messages.length > 0 && prevProps.messages.length !== messages.length) {
      if (chatbot_setting.chat_interface.scroll_upto_first_response_only && messages.length > defaultMessageLength) {
        const block = messages[messages.length - 1].quickReplies && messages[messages.length - 1].quickReplies.length > 0 ? "start" : "end"
        if (messages[messages.length - 1].sender === MESSAGE_SENDER.CUSTOMER || prevProps.messages[prevProps.messages.length - 1].sender === MESSAGE_SENDER.CUSTOMER) {
          if (messages[messages.length - 1].sender === MESSAGE_SENDER.CUSTOMER)
            this.firstResChildIndex = null
          else if (prevProps.messages[prevProps.messages.length - 1].sender === MESSAGE_SENDER.CUSTOMER)
            this.firstResChildIndex = prevProps.messages.length
          this.scrollRef.current.scrollIntoView({ behavior: "smooth", block })
        } else if (messages[messages.length - 1].sender !== MESSAGE_SENDER.CUSTOMER && prevProps.messages[prevProps.messages.length - 1].sender !== MESSAGE_SENDER.CUSTOMER) {
          const container = document.getElementById('oriChatbotConversationContainer')
          const firstResChild = document.getElementById(`index-${this.firstResChildIndex}`)
          if (container && firstResChild) {
            const unscrolledHeight = container.scrollHeight - container.offsetHeight - container.scrollTop
            const offset = firstResChild.offsetTop - container.scrollTop
            if (offset >= unscrolledHeight)
              this.scrollRef.current.scrollIntoView({ behavior: "smooth", block })
            else if (block === 'start')
              container.scrollBy(0, 40)
          }
        }
      } else {
        this.scrollRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  isTimeStampTagVisible = (timestamp, prev_timestamp) => {
    const t1 = new Date(timestamp).getTime();
    const t2 = new Date(prev_timestamp).getTime();
    if ((t1 - t2) > 24 * 3600 * 1000) {
      return true;
    } else {
      return false;
    }
  };

  displayTimeStamp = timestamp => {
    const current_time = new Date().getTime();
    const message_time = new Date(timestamp).getTime();
    if ((current_time - message_time) < 24 * 3600 * 1000)
      return "Today";
    else if ((current_time - message_time) < 2 * 24 * 3600 * 1000)
      return "Yesterday";
    else
      return formatDate(timestamp, { year: "numeric", month: "short", day: "numeric" });
  };

  onClickMessageVoting = (message, voteType) => {
    const { onMessageVoting, psid } = this.props;
    const payload = { chatlogId: message.chatlogId, voteType, psid };
    onMessageVoting(payload);
  };

  onClickChatbody = () => {
    const { stack_view, onClickStackBubble } = this.props
    if (stack_view)
      onClickStackBubble()
  }

  render() {
    const { messages, disable_msg_after_reply, is_typing, typing_text, handleMsgBtnClick, handleDataSubmit, notification_bot, stack_view, btn_disabled, handleFileUpload } = this.props;

    return (
      <LangContext.Consumer>
        {
          lang => (
            <div
              id="oriChatbotConversationContainer"
              className="ori-t-pad-10 ori-b-pad-40 ori-lr-pad-50 oriChatBotConversationContainer"
              style={stack_view ? chatbotStyle.stackViewConversationContainer : chatbotStyle.conversationContainer}
              ref={this.chatbodyRef}
              onClick={this.onClickChatbody}
            >
              {
                messages.map((message, index) => {
                  const first_msg = (index === 0) || (index > 0 && ((messages[index - 1].sender !== message.sender) || (messages[index - 1].senderInfo && message.senderInfo && messages[index - 1].senderInfo.psid !== message.senderInfo.psid)));

                  const customer = message.sender === MESSAGE_SENDER.CUSTOMER;
                  const system = message.sender === MESSAGE_SENDER.SYSTEM;
                  const admin = message.sender === MESSAGE_SENDER.ADMIN;
                  const chatbot = message.sender === MESSAGE_SENDER.CHATBOT;

                  const show_textMessage = message.type === MESSAGE_TYPES.TEXT && message.payload && message.payload.text;
                  const show_listMessage = message.type === MESSAGE_TYPES.LIST;
                  const show_textWithButtons = message.type === MESSAGE_TYPES.TEXT_WITH_BUTTONS;
                  const show_checkboxWithMedia = message.type === MESSAGE_TYPES.CHECKBOX_WITH_MEDIA;
                  const show_imageWithButtons = message.type === MESSAGE_TYPES.IMAGE_WITH_BUTTONS;
                  const show_textWithVideo = message.type === MESSAGE_TYPES.VIDEO;
                  const show_carousel = message.type === MESSAGE_TYPES.CAROUSEL;
                  const show_textWithMedia = show_textWithButtons || show_imageWithButtons || show_textWithVideo;
                  const show_promptmsg = message.type === MESSAGE_TYPES.NOTIFICATION;
                  const show_uploadfile = message.type === MESSAGE_TYPES.UPLOAD_FILE;
                  const show_recharge = message.type === MESSAGE_TYPES.CUSTOM_MSG && message.payload.subtype === MESSAGE_SUBTYPES.DISH_RECHARGE;
                  const show_rechargeDetails = message.type === MESSAGE_TYPES.CUSTOM_MSG && message.payload.subtype === MESSAGE_SUBTYPES.DISH_RECHARGE_DETAILS;
                  const show_offers = message.type === MESSAGE_TYPES.CUSTOM_MSG && message.payload.subtype === MESSAGE_SUBTYPES.DISH_OFFERS;
                  const show_rechargeHistory = message.type === MESSAGE_TYPES.CUSTOM_MSG && message.payload.subtype === MESSAGE_SUBTYPES.DISH_RECHARGE_HISTORY;
                  // const show_form_message = message.type === MESSAGE_TYPES.FORM

                  let sender_title = "U";
                  let sender_img_url = "";
                  if (message.senderInfo) {
                    sender_title = message.senderInfo.pseudoName ? message.senderInfo.pseudoName : "agent";
                    sender_img_url = message.senderInfo.imgUrl && message.senderInfo.imgUrl.trim().length > 0 ? message.senderInfo.imgUrl : "";
                  }

                  const show_timestamp_tag = notification_bot || !chatbot_setting.timestamp_tag ? false : (index === 0 ? true : (message.timestamp ? this.isTimeStampTagVisible(message.timestamp, messages[index - 1].timestamp) : false));

                  if (system && message.type === MESSAGE_TYPES.SYSTEM_TEXT) {
                    return (
                      <ErrorBoundary key={index}>
                        <div className="ori-pad-10 ori-text-center">
                          <p className="ori-font-medium ori-font-xs">{message.payload.text}</p>
                          {
                            message.timestamp &&
                            <p className="ori-font-xxs ori-font-light ori-lr-pad-10">{formatTime(message.timestamp, { hour: "2-digit", minute: "2-digit" })}</p>
                          }
                        </div>
                      </ErrorBoundary>
                    );
                  }

                  if (
                    show_textMessage
                    || show_listMessage
                    || show_textWithMedia
                    || show_checkboxWithMedia
                    || show_recharge
                    || show_rechargeDetails
                    || show_offers
                    || show_rechargeHistory
                    || show_carousel
                    || show_promptmsg
                    || show_uploadfile
                    // || show_form_message
                  ) {
                    return (
                      <ErrorBoundary key={index}>
                        <div id={`index-${index}`} className="ori-animated ori-fade-in">
                          {
                            show_timestamp_tag &&
                            <div className="ori-flex-row ori-flex-jc ori-pad-5">
                              <div className="ori-font-xs ori-border-radius-20 ori-lr-pad-10 ori-box-shadow timestampTag">{this.displayTimeStamp(message.timestamp)}</div>
                            </div>
                          }
                          <div
                            className={`ori-relative msgContainer ${customer ? "senderMsgContainer" : "receiverMsgContainer"} ${customer && stack_view ? "ori-display-none" : ""} ${stack_view ? "" : "ori-flex-row"}`}
                            style={
                              customer ? chatbotStyle.senderBubbleContainer : chatbotStyle.receiverBubbleContainer
                            }
                          >
                            {
                              first_msg && admin && !stack_view &&
                              <p className="ori-absolute ori-font-xxs ori-capitalize ori-align-top" >{sender_title}</p>
                            }
                            {
                              chatbot_setting.chat_interface.show_sender_avatar && first_msg && customer && !stack_view &&
                              <Avatar
                                className={`ori-absolute ori-animated ori-fade-in ${chatbotStyle.senderAvatarClass}`}
                                src={translator.assets[lang].user}
                                shape="square"
                                size={chatbot_setting.chat_interface.avatar_size}
                              />
                            }
                            {
                              chatbot_setting.chat_interface.show_receiver_avatar && first_msg && chatbot && !stack_view &&
                              <Avatar
                                className={`ori-absolute ori-animated ori-fade-in ${chatbotStyle.receiverAvatarClass}`}
                                src={sender_img_url !== "" ? sender_img_url : translator.assets[lang].logo}
                                shape={chatbot_setting.chat_interface.avatar_shape}
                                size={chatbot_setting.chat_interface.avatar_size}
                              />
                            }
                            {
                              chatbot_setting.chat_interface.show_avatar && first_msg && admin && !stack_view &&
                              <Avatar
                                src={sender_img_url}
                                className={`ori-font-default ori-capitalize ori-bg-white ori-absolute ori-animated ori-fade-in ${chatbotStyle.receiverAvatarClass}`}
                                shape={chatbot_setting.chat_interface.avatar_shape}
                                size={chatbot_setting.chat_interface.avatar_size}
                              >
                                {sender_title.charAt(0)}
                              </Avatar>
                            }
                            <div
                              className={`msgBox ${notification_bot ? (stack_view ? "notificationStackMsgBox" : "notificationMsgBox") : "defaultMsgBox"} ${show_offers ? "oriOffers" : ""} ${show_rechargeHistory ? "ori-full-width oriRechargeHistory" : ""} ${show_carousel ? "ori-full-width oriCarousel" : ""} ${show_listMessage ? "ori-l-pad-15" : ""} ${first_msg ? chatbotStyle.firstBubbleClass : ""} ${customer ? (notification_bot ? chatbotStyle.notificationSenderBubbleClass : chatbotStyle.senderBubbleClass) : (notification_bot ? (stack_view ? chatbotStyle.stackViewNotificationBubbleClass : chatbotStyle.notificationReceiverBubbleClass) : chatbotStyle.receiverBubbleClass)} ${chatbotStyle.msgBubbleClass}`}
                            >
                              {
                                show_textMessage &&
                                <TextMessage
                                  message={message}
                                  disable_html_parser={customer}
                                />
                              }
                              {
                                show_listMessage &&
                                <ListMessage message={message} />
                              }
                              {/* {
                                show_form_message &&
                                <FormMessage
                                  message={message}
                                  onSubmit={handleDataSubmit}
                                  disabled={index !== (messages.length - 1)}
                                  btn_hidden={chatbot_setting.hide_buttons_in_msg_bubble}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                />
                              } */}
                              {
                                show_textWithMedia &&
                                <TextWithMedia
                                  message={message}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                  default_btn_display_count={chatbot_setting.default_btn_display_count}
                                  btn_hidden={chatbot_setting.hide_buttons_in_msg_bubble}
                                  btn_disabled={btn_disabled || disable_msg_after_reply[message.chatlogId]}
                                  img_popup_disable={chatbot_setting.chat_interface.text_with_media_img_popup_disable}
                                />
                              }
                              {
                                show_checkboxWithMedia &&
                                <CheckboxWithMedia
                                  message={message}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                  onSubmitCheckbox={handleDataSubmit}
                                  checkbox_disabled={index !== (messages.length - 1)}
                                  default_btn_display_count={chatbot_setting.default_btn_display_count}
                                  btn_hidden={chatbot_setting.hide_buttons_in_msg_bubble || index !== (messages.length - 1)}
                                  btn_disabled={btn_disabled}
                                />
                              }
                              {
                                show_recharge &&
                                <Recharge
                                  message={message}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                  default_btn_display_count={chatbot_setting.default_btn_display_count}
                                  btn_hidden={chatbot_setting.hide_buttons_in_msg_bubble}
                                  btn_disabled={btn_disabled}
                                />
                              }
                              {
                                show_rechargeDetails &&
                                <RechargeDetails
                                  message={message}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                  default_btn_display_count={chatbot_setting.default_btn_display_count}
                                  btn_hidden={chatbot_setting.hide_buttons_in_msg_bubble}
                                  btn_disabled={btn_disabled}
                                />
                              }
                              {
                                show_offers &&
                                <Offers
                                  message={message}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                  handleOfferSelection={this.props.handleOfferSelection}
                                  default_btn_display_count={chatbot_setting.default_btn_display_count}
                                  disable_offer={index !== (messages.length - 1) || stack_view}
                                  btn_disabled={btn_disabled}
                                />
                              }
                              {
                                show_rechargeHistory &&
                                <RechargeHistory
                                  message={message}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                  default_btn_display_count={chatbot_setting.default_btn_display_count}
                                  btn_hidden={chatbot_setting.hide_buttons_in_msg_bubble}
                                  btn_disabled={btn_disabled}
                                />
                              }
                              {
                                show_carousel &&
                                <CarouselWithButtons
                                  message={message}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                  default_btn_display_count={chatbot_setting.default_btn_display_count}
                                  btn_hidden={chatbot_setting.hide_buttons_in_msg_bubble}
                                  btn_disabled={btn_disabled || disable_msg_after_reply[message.chatlogId]}
                                  display_type={chatbot_setting.chat_interface.carousel_msg_display_type}
                                  img_popup_disable={chatbot_setting.chat_interface.carousel_img_popup_disable}
                                />
                              }
                              {
                                show_promptmsg &&
                                <PromptMsg
                                  message={message}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                  default_btn_display_count={chatbot_setting.default_btn_display_count}
                                  btn_disabled={index !== (messages.length - 1) || btn_disabled}
                                  btn_hidden={chatbot_setting.hide_buttons_in_msg_bubble}
                                />
                              }
                              {
                                show_uploadfile &&
                                <UploadFile
                                  message={message}
                                  handleMsgBtnClick={handleMsgBtnClick}
                                  default_btn_display_count={chatbot_setting.default_btn_display_count}
                                  btn_disabled={btn_disabled || disable_msg_after_reply[message.chatlogId]}
                                  handleFileUpload={handleFileUpload}
                                  disabled={index !== (messages.length - 1) || stack_view}
                                />
                              }
                              {
                                (message.timestamp || message.chatlogId) && chatbot_setting.message_footer.enable &&
                                <ErrorBoundary>
                                  <Suspense fallback={null}>
                                    <MessageFooter
                                      message={message}
                                      show_timestamp={!!message.timestamp}
                                      show_status={customer && message.readStatus && !notification_bot}
                                      show_voting={!notification_bot && message.chatlogId && (chatbot || admin)}
                                      onClickMessageVoting={this.onClickMessageVoting}
                                    />
                                  </Suspense>
                                </ErrorBoundary>
                              }
                            </div>
                          </div>
                        </div>
                        {
                          chatbot_setting.hide_buttons_in_msg_bubble && !stack_view && message.payload && message.payload.buttons &&
                          <ErrorBoundary>
                            <Suspense fallback={null}>
                              <Buttons
                                message={message}
                                disabled={btn_disabled}
                                onClick={handleMsgBtnClick}
                              />
                            </Suspense>
                          </ErrorBoundary>
                        }
                      </ErrorBoundary>
                    );
                  }
                  return null
                })
              }
              {
                is_typing && !stack_view &&
                <div className="msgContainer receiverMsgContainer ori-flex-row ori-t-pad-5">
                  <div className={`ori-flex-row ori-border-radius-10 ori-pad-7 ${!notification_bot ? "defaultMsgBox" : (stack_view ? "notificationStackMsgBox" : "notificationMsgBox")}`}>
                    {
                      typing_text !== "" &&
                      <div className="ori-font-xs ori-font-primary ori-capitalize-first ori-r-pad-5">{typing_text}</div>
                    }
                    <div className="ori-flex-column ori-flex-jc">
                      <ErrorBoundary>
                        <Suspense fallback={null}>
                          <DotsLoader />
                        </Suspense>
                      </ErrorBoundary>
                    </div>
                  </div>
                </div>
              }
              <div ref={this.scrollRef} />
            </div>
          )
        }
      </LangContext.Consumer>
    )
  }
}

ChatBotConversation.propTypes = {
  psid: PropTypes.string,
  messages: PropTypes.array,
  disable_msg_after_reply: PropTypes.object,
  onClickStackBubble: PropTypes.func,
  handleMsgBtnClick: PropTypes.func,
  handleFileUpload: PropTypes.func,
  handleDataSubmit: PropTypes.func,
  handleOfferSelection: PropTypes.func,
  onMessageVoting: PropTypes.func,
  is_typing: PropTypes.bool,
  typing_text: PropTypes.string,
  notification_bot: PropTypes.bool,
  stack_view: PropTypes.bool,
  btn_disabled: PropTypes.bool,
};

ChatBotConversation.defaultProps = {
  disable_msg_after_reply: {},
  notification_bot: false,
  typing_text: "",
  is_typing: false,
  stack_view: false,
  btn_disabled: false,
};

export default ChatBotConversation;
