import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { chatbot_client_info } from '../../../../data/config/urls'

const HeaderTag = React.memo(({ is_internet_connected, is_socket_connected }) => {
  return (
    <div
      className="ori-absolute ori-z-index-99994 ori-bg-header ori-lr-pad-10 ori-tb-pad-3 ori-box-shadow"
      style={{ borderBottomRightRadius: '10px' }}
    >
      <span>
        <span
          className={classNames(
            "ori-r-mrgn-5 ori-border-light ori-border-circle ori-display-inline-block ori-height-10 ori-width-10",
            {
              "ori-bg-danger": !is_internet_connected,
              "ori-bg-warning": is_internet_connected && !is_socket_connected,
              "ori-bg-green": is_internet_connected && is_socket_connected
            }
          )}
          style={{ verticalAlign: 'middle' }}
        />
        {chatbot_client_info.brand_name}
      </span>
    </div>
  )
})

const mapStateToProps = state => {
  return {
    is_internet_connected: state.chat_details.is_internet_connected,
    is_socket_connected: state.chat_details.is_socket_connected
  }
}

HeaderTag.propTypes = {
  is_socket_connected: PropTypes.bool,
  is_internet_connected: PropTypes.bool,
}

export default connect(mapStateToProps)(HeaderTag)