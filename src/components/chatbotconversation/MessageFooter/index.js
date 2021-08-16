import React from "react"
import PropTypes from "prop-types"
import ThumbUpIcon from "react-icons/lib/fa/thumbs-o-up"
import SentIcon from "react-icons/lib/io/android-done"
import DeliverIcon from "react-icons/lib/io/android-done-all"
import SeenIcon from "react-icons/lib/md/remove-red-eye"
import SendingIcon from "react-icons/lib/md/access-time"

import { chatbot_setting } from "../../../data/config/brandSetup"
import { MESSAGE_READ_STATUS } from "../../../data/config/constants"
import { formatTime } from "../../../data/config/utils"

const MessageFooter = ({
  message,
  show_voting,
  show_timestamp,
  show_status,
  onClickMessageVoting
}) => {
  const renderReadStatusIcon = readStatus => {
    if (readStatus === MESSAGE_READ_STATUS.SENDING)
      return <SendingIcon size={13} className="ori-l-mrgn-5" />
    else if (readStatus === MESSAGE_READ_STATUS.SENT)
      return <SentIcon size={13} className="ori-l-mrgn-5" />
    else if (readStatus === MESSAGE_READ_STATUS.DELIVERED)
      return <DeliverIcon size={13} className="ori-l-mrgn-5" />
    else if (readStatus === MESSAGE_READ_STATUS.SEEN)
      return <SeenIcon size={13} className="ori-l-mrgn-5" />
  }

  if (message)
    return (
      <div className="ori-animated ori-fade-in ori-flex-row ori-line-height-1 ori-t-mrgn-3 ori-flex-jsb messageFooter">
        <div className="ori-flex-row">
          {
            chatbot_setting.message_footer.voting && show_voting &&
            <React.Fragment>
              <div
                className={`ori-flex ori-cursor-ptr ori-r-pad-5 ${message.voteType && message.voteType === "upvote" ? "ori-font-primary" : ""}`}
                onClick={() => onClickMessageVoting(message, "upvote")}
              >
                <ThumbUpIcon size={12} />
              </div>
              <div
                className={`ori-flex ori-cursor-ptr ori-l-pad-5 ori-rotate-180 ${message.voteType && message.voteType === "downvote" ? "ori-font-primary" : ""}`}
                onClick={() => onClickMessageVoting(message, "downvote")}
              >
                <ThumbUpIcon size={12} />
              </div>
            </React.Fragment>
          }
        </div>
        {
          (show_timestamp || show_status) &&
          <div className="ori-flex-row">
            {
              chatbot_setting.message_footer.timestamp && show_timestamp &&
              <span className="ori-font-xxs ori-flex-column ori-flex-jfe ori-uppercase">
                {formatTime(message.timestamp, { hour: "2-digit", minute: "2-digit" })}
              </span>
            }
            {
              chatbot_setting.message_footer.read_status && show_status &&
              renderReadStatusIcon(message.readStatus)
            }
          </div>
        }
      </div>
    )
  return null
}

MessageFooter.propTypes = {
  message: PropTypes.object.isRequired,
  show_voting: PropTypes.bool,
  show_timestamp: PropTypes.bool,
  show_status: PropTypes.bool,
  onClickMessageVoting: PropTypes.func
}

MessageFooter.defaultProps = {
  message: null,
  show_status: false,
  show_voting: false,
  show_timestamp: false
}

export default MessageFooter
