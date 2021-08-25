import React from "react"
import PropTypes from "prop-types"
import SuccessIcon from "react-icons/lib/io/android-checkmark-circle"
import ChainBreak from "react-icons/lib/fa/chain-broken"
import FailedIcon from "react-icons/lib/md/cancel"

import DelayComponent from "../delaycomponent"

const ShowMessageComponent = ({
  message,
  title,
  iconClass,
  size,
  isMounted,
  delayUnmountTime,
  success,
  failed,
  chainBreak
}) => {

  return (
    <div
      className={`ori-animated ori-full-parent-height ori-pad-20 ori-flex-column ori-flex-center ${isMounted ? "ori-fade-in" : "ori-fade-out"}`}
      style={{ animationDuration: `${delayUnmountTime}ms` }}
    >
      {
        chainBreak &&
        <ChainBreak
          size={size}
          className={`ori-animated ori-fade-in ${iconClass}`}
        />
      }
      {
        success &&
        <SuccessIcon
          size={size}
          className={`ori-animated ori-fade-in ${iconClass}`}
        />
      }
      {
        failed &&
        <FailedIcon
          size={size}
          className={`ori-animated ori-fade-in ${iconClass}`}
        />
      }
      {
        title &&
        <p className="ori-no-b-mrgn ori-capitalize ori-font-md">{title}</p>
      }
      <p className="ori-no-b-mrgn ori-text-center ori-font-sm ori-font-light">{message}</p>
    </div>
  )
}

const ShowMessage = DelayComponent(ShowMessageComponent)

ShowMessage.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  iconClass: PropTypes.string,
  size: PropTypes.number,
  success: PropTypes.bool,
  chainBreak: PropTypes.bool,
  failed: PropTypes.bool,
  isMounted: PropTypes.bool,
  delayUnmountTime: PropTypes.number
}

ShowMessage.defaultProps = {
  title: "",
  iconClass: "",
  size: 45,
  success: false,
  failed: false,
  chainBreak: false,
  delayUnmountTime: 500,
  delayMountTime: 500
}

export default ShowMessage
