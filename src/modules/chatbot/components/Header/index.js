import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Avatar from 'antd/lib/avatar'

import { translator } from '../../../../data/config/urls'
import { logo } from '../../../../data/assets';

import { LangContext } from '../../../context'

const Header = React.memo(({ is_internet_connected, is_socket_connected }) => (
  <LangContext.Consumer>
    {
      lang => (
        <div
          className="ori-overflow-hidden ori-bg-header ori-box-shadow-dark"
          style={{
            padding: '15px 45px 15px 20px',
            height: '70px',
          }}
        >
          <div className="ori-flex-row">
            <Avatar src={logo} size="large" />
            <div className="ori-l-pad-10 ori-flex-column ori-flex-jc" style={{ lineHeight: 1.3 }}>
              <p className="ori-capitalize ori-font-md ori-font-medium ori-no-b-mrgn ori-font-header">{translator.text[lang].brandName}
              </p>
              <span className="ori-font-header-light ori-font-xs">
                <span
                  className={classNames(
                    "ori-r-mrgn-5 ori-border-circle ori-display-inline-block ",
                    {
                      "ori-bg-danger": !is_internet_connected,
                      "ori-bg-warning": is_internet_connected && !is_socket_connected,
                      "ori-bg-green": is_internet_connected && is_socket_connected
                    }
                  )}
                  style={{
                    verticalAlign: 'middle',
                    height: '6px',
                    width: '6px'
                  }}
                />
                {!is_internet_connected ? translator.text[lang].offline : (!is_socket_connected ? translator.text[lang].connecting : translator.text[lang].online)}
              </span>
            </div>
          </div>
        </div>
      )
    }
  </LangContext.Consumer>
))

const mapStateToProps = state => {
  return {
    is_internet_connected: state.chat_details.is_internet_connected,
    is_socket_connected: state.chat_details.is_socket_connected
  }
}

Header.propTypes = {
  is_socket_connected: PropTypes.bool,
  is_internet_connected: PropTypes.bool,
}

export default connect(mapStateToProps)(Header)
