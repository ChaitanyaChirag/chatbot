import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ThumbUpIcon from 'react-icons/lib/fa/thumbs-o-up';
import SentIcon from 'react-icons/lib/io/android-done';
import DeliverIcon from 'react-icons/lib/io/android-done-all';
import SeenIcon from 'react-icons/lib/md/remove-red-eye';
import SendingIcon from 'react-icons/lib/md/access-time';
import Avatar from 'antd/lib/avatar';
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
  RechargeHistory
} from 'message-types';

import './index.scss';

import {
  MESSAGE_SENDER,
  MESSAGE_TYPES,
  MESSAGE_SUBTYPES,
  MESSAGE_READ_STATUS
} from '../../data/config/constants';
import { chatbot_setting } from '../../data/config/urls';
import { formatTime, formatDate } from '../../data/config/utils';
import { logo } from '../../data/assets';

import DotsLoader from '../dotsloader';
import ErrorBoundary from '../errorboundary';

class ChatBotConversation extends React.PureComponent {
  constructor(props) {
    super(props)
    this.scrollRef = React.createRef();
    this.chatbodyRef = React.createRef();
  }

  componentDidMount() {
    this.chatbodyRef.current.scrollTop = this.chatbodyRef.current.scrollHeight
  }

  componentDidUpdate(prevProps) {
    const { messages } = this.props;
    if (prevProps.messages.length !== messages.length)
      this.scrollRef.current.scrollIntoView({ behavior: "smooth" })
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
    const { onMessageVoting } = this.props;
    const payload = { chatlogId: message.chatlogId, voteType };
    onMessageVoting(payload);
  };

  onClickChatbody = () => {
    const { stack_view, onClickStackBubble } = this.props
    if (stack_view)
      onClickStackBubble()
  }

  renderReadStatusIcon = readStatus => {
    if (readStatus === MESSAGE_READ_STATUS.SENDING)
      return <SendingIcon size={13} className="ori-l-mrgn-5" />
    else if (readStatus === MESSAGE_READ_STATUS.SENT)
      return <SentIcon size={13} className="ori-l-mrgn-5" />
    else if (readStatus === MESSAGE_READ_STATUS.DELIVERED)
      return <DeliverIcon size={13} className="ori-l-mrgn-5" />
    else if (readStatus === MESSAGE_READ_STATUS.SEEN)
      return <SeenIcon size={13} className="ori-l-mrgn-5" />
  };

  render() {
    const { messages, is_typing, typing_text, handleMsgBtnClick, onChangeCheckbox, notification_bot, stack_view, btn_disabled, handleFileUpload } = this.props;

    return (
      <div
        className={classNames("ori-t-pad-10 ori-b-pad-40 oriChatBotConversationContainer",
          {
            "ori-cursor-ptr ori-no-b-pad": stack_view,
            "ori-lr-pad-20": !chatbot_setting.chat_interface.show_avatar,
            "ori-lr-pad-50": chatbot_setting.chat_interface.show_avatar,
          }
        )}
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

            const show_textMessage = message.type === MESSAGE_TYPES.TEXT;
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

            let sender_title = "U";
            let sender_img_url = "";
            if (message.senderInfo) {
              sender_title = message.senderInfo.pseudoName ? message.senderInfo.pseudoName : "agent";
              sender_img_url = message.senderInfo.imgUrl && message.senderInfo.imgUrl.trim().length > 0 ? message.senderInfo.imgUrl : "";
            }

            const show_timestamp_tag = notification_bot ? false : (index === 0 ? true : (message.timestamp ? this.isTimeStampTagVisible(message.timestamp, messages[index - 1].timestamp) : false));

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

            return (
              <ErrorBoundary key={index}>
                <div className="ori-full-width">
                  {
                    show_timestamp_tag &&
                    <div className="ori-flex-row ori-flex-jc ori-pad-5">
                      <div className="ori-font-xs ori-border-radius-20 ori-lr-pad-10 ori-bg-header ori-box-shadow">{this.displayTimeStamp(message.timestamp)}</div>
                    </div>
                  }
                  <div className={classNames("ori-relative ori-flex-row msgContainer",
                    {
                      "receiverMsgContainer": admin || chatbot,
                      "senderMsgContainer": customer
                    }
                  )}
                  >
                    {
                      first_msg && admin &&
                      <p className="ori-absolute ori-font-xxs ori-capitalize ori-align-top" >{sender_title}</p>
                    }
                    {
                      chatbot_setting.chat_interface.show_avatar && first_msg && chatbot &&
                      <div className={classNames("ori-absolute ori-animated ori-fade-in msgAvatar")}>
                        <Avatar src={sender_img_url !== "" ? sender_img_url : logo} />
                      </div>
                    }
                    {
                      chatbot_setting.chat_interface.show_avatar && first_msg && admin &&
                      <div className={classNames("ori-absolute ori-animated ori-fade-in msgAvatar")}>
                        <Avatar src={sender_img_url} className="ori-font-default ori-capitalize ori-bg-white">{sender_title.charAt(0)}</Avatar>
                      </div>
                    }
                    {
                      (show_textMessage || show_listMessage || show_textWithMedia || show_checkboxWithMedia || show_recharge || show_rechargeDetails || show_offers || show_rechargeHistory || show_carousel || show_promptmsg || show_uploadfile) &&
                      <div
                        className={classNames("ori-pad-7 ori-b-mrgn-5 ori-border-radius-10 msgBox",
                          {
                            "ori-t-mrgn-15 firstMsg": first_msg,
                            "defaultMsgBox": !notification_bot,
                            "notificationMsgBox": notification_bot && !stack_view,
                            "notificationStackMsgBox": notification_bot && stack_view,
                            "oriOffers": show_offers,
                            "ori-full-width oriRechargeHistory": show_rechargeHistory,
                            "ori-full-width oriCarousel": show_carousel,
                            "ori-l-pad-15": show_listMessage
                          }
                        )}
                      >
                        {
                          show_textMessage &&
                          <TextMessage message={message} disable_html_parser={customer} />
                        }
                        {
                          show_listMessage &&
                          <ListMessage message={message} />
                        }
                        {
                          show_textWithMedia &&
                          <TextWithMedia message={message} handleMsgBtnClick={handleMsgBtnClick} btn_hidden={stack_view} btn_disabled={btn_disabled} />
                        }
                        {
                          show_checkboxWithMedia &&
                          <CheckboxWithMedia message={message} handleMsgBtnClick={handleMsgBtnClick} onChangeCheckbox={onChangeCheckbox} checkbox_disabled={index !== (messages.length - 1)} btn_hidden={stack_view || index !== (messages.length - 1)} btn_disabled={btn_disabled} />
                        }
                        {
                          show_recharge &&
                          <Recharge message={message} handleMsgBtnClick={handleMsgBtnClick} btn_hidden={stack_view} btn_disabled={btn_disabled} />
                        }
                        {
                          show_rechargeDetails &&
                          <RechargeDetails message={message} handleMsgBtnClick={handleMsgBtnClick} btn_hidden={stack_view} btn_disabled={btn_disabled} />
                        }
                        {
                          show_offers &&
                          <Offers message={message} handleMsgBtnClick={handleMsgBtnClick} handleOfferSelection={this.props.handleOfferSelection} disable_offer={index !== (messages.length - 1) || stack_view} btn_disabled={btn_disabled} />
                        }
                        {
                          show_rechargeHistory &&
                          <RechargeHistory message={message} handleMsgBtnClick={handleMsgBtnClick} btn_hidden={stack_view} btn_disabled={btn_disabled} />
                        }
                        {
                          show_carousel &&
                          <CarouselWithButtons message={message} handleMsgBtnClick={handleMsgBtnClick} btn_hidden={stack_view} btn_disabled={btn_disabled} />
                        }
                        {
                          show_promptmsg &&
                          <PromptMsg message={message} handleMsgBtnClick={handleMsgBtnClick} btn_disabled={index !== (messages.length - 1) || btn_disabled} btn_hidden={stack_view} />
                        }
                        {
                          show_uploadfile &&
                          <UploadFile message={message} handleMsgBtnClick={handleMsgBtnClick} btn_disabled={btn_disabled} handleFileUpload={handleFileUpload} disabled={index !== (messages.length - 1) || stack_view} />
                        }
                        {
                          (message.timestamp || message.chatlogId) &&
                          <div className={classNames("ori-flex-row ori-line-height-1 ori-t-mrgn-3 ori-flex-jsb", { "ori-font-white": customer, "ori-font-light": chatbot || admin })}>
                            <div className="ori-flex-row">
                              {
                                message.chatlogId && (chatbot || admin) &&
                                <React.Fragment>
                                  <div className={classNames("ori-flex ori-cursor-ptr ori-r-pad-5", { "ori-font-primary": message.voteType && message.voteType === "upvote" })} onClick={this.onClickMessageVoting.bind(this, message, "upvote")} >
                                    <ThumbUpIcon size={12} />
                                  </div>
                                  <div className={classNames("ori-flex ori-cursor-ptr ori-l-pad-5 ori-rotate-180", { "ori-font-primary": message.voteType && message.voteType === "downvote" })} onClick={this.onClickMessageVoting.bind(this, message, "downvote")}>
                                    <ThumbUpIcon size={12} />
                                  </div>
                                </React.Fragment>
                              }
                            </div>
                            {
                              (message.timestamp || message.readStatus) &&
                              <div className="ori-flex-row">
                                {
                                  message.timestamp &&
                                  <span className="ori-font-xxs ori-flex-column ori-flex-jfe ori-uppercase">{formatTime(message.timestamp, { hour: "2-digit", minute: "2-digit" })}</span>
                                }
                                {
                                  customer && message.readStatus && !stack_view &&
                                  this.renderReadStatusIcon(message.readStatus)
                                }
                              </div>
                            }
                          </div>
                        }
                      </div>
                    }
                  </div>
                </div>
              </ErrorBoundary>
            );
          })
        }
        {
          is_typing &&
          <div className="msgContainer receiverMsgContainer ori-flex-row ori-t-pad-5">
            <div className={classNames("ori-flex-row ori-border-radius-10 ori-pad-7", { "defaultMsgBox": !notification_bot, "notificationMsgBox": notification_bot && !stack_view, "notificationStackMsgBox": notification_bot && stack_view })}>
              {
                typing_text !== "" &&
                <div className="ori-font-xs ori-font-primary ori-capitalize-first ori-r-pad-5">{typing_text}</div>
              }
              <div className="ori-flex-column ori-flex-jc">
                <DotsLoader />
              </div>
            </div>
          </div>
        }
        <div ref={this.scrollRef} />
      </div>
    )
  }
}

ChatBotConversation.propTypes = {
  messages: PropTypes.array,
  onClickStackBubble: PropTypes.func,
  handleMsgBtnClick: PropTypes.func,
  handleFileUpload: PropTypes.func,
  onChangeCheckbox: PropTypes.func,
  handleOfferSelection: PropTypes.func,
  onMessageVoting: PropTypes.func,
  is_typing: PropTypes.bool,
  typing_text: PropTypes.string,
  notification_bot: PropTypes.bool,
  stack_view: PropTypes.bool,
  btn_disabled: PropTypes.bool,
};

ChatBotConversation.defaultProps = {
  notification_bot: false,
  typing_text: "",
  is_typing: false,
  stack_view: false,
  btn_disabled: false,
};

export default ChatBotConversation;
