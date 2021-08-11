import React from "react"
import PropTypes from "prop-types"

import DelayComponent from "../delaycomponent"

const CustomModal = ({ isMounted, children }) => {
  return (
    <div
      className={
        `ori-animated ori-animation-half ori-absolute ori-align-full ori-z-index-99995  ori-pad-20 ori-bg-black-light ori-flex-column ori-overflow-x-hidden ori-overflow-y-auto ${isMounted ? "ori-fade-in" : "ori-fade-out"}`}
    >
      {children}
    </div>
  )
}

CustomModal.propTypes = {
  isMounted: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default DelayComponent(CustomModal)
