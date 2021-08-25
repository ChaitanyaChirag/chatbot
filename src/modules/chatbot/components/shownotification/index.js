import React from "react"
import PropTypes from "prop-types"

import DelayComponent from "../../../../components/delaycomponent"

const ShowNotification = ({ message, isMounted, delayUnmountTime }) => {
  return (
    <div
      className={`ori-animated ori-absolute ori-z-index-1 ori-box-shadow ori-border-radius-3 ori-text-center ori-font-notification-popup ori-bg-notification-popup ori-bg-card ori-border-light ori-lr-pad-10 ori-tb-pad-5 ${isMounted ? "ori-fade-in" : "ori-fade-out"}`}
      style={{
        animationDuration: `${delayUnmountTime}ms`,
        top: 75,
        left: 5,
        right: 5
      }}
    >
      {message}
    </div>
  )
}

ShowNotification.propTypes = {
  message: PropTypes.string,
  isMounted: PropTypes.bool,
  delayUnmountTime: PropTypes.number
}

ShowNotification.defaultProps = {
  delayUnmountTime: 500,
  message: ""
}

export default DelayComponent(ShowNotification)
