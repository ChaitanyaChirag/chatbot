import React from "react"
import PropTypes from "prop-types"
import CloseIcon from "react-icons/lib/md/close"

import "./index.scss"

const NotificationBotHeader = ({ handleNotificationBotClose, handleViewMore }) => {
  return (
    <div className="ori-relative ori-animated ori-fade-in ori-flex-row ori-flex-center ori-pad-5 oriNotificationBotHeaderContainer">
      <div className="ori-absolute ori-cursor-ptr ori-font-white alignHeaderCloseButton" onClick={handleNotificationBotClose}>
        <CloseIcon size={26} className="ori-pad-5 ori-border-circle ori-bg-black-light headerItem" />
      </div>
      <div className="ori-bg-black-light ori-cursor-ptr ori-font-white ori-tb-pad-3 ori-lr-pad-20 ori-border-radius-20 ori-box-shadow-dark headerItem" onClick={handleViewMore}>
        <span>view all</span>
      </div>
    </div>
  )
}

NotificationBotHeader.propTypes = {
  handleNotificationBotClose: PropTypes.func,
  handleViewMore: PropTypes.func,
}

export default NotificationBotHeader
