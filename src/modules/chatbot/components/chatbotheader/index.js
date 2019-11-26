import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.scss';

import { chatbot_client_info } from '../../../../data/config/urls';

class ChatBotHeader extends React.PureComponent {
  render() {
    const { is_internet_connected, is_socket_connected } = this.props;
    return (
      <div className="oriChatBotHeaderContainer">
        <div className="ori-flex-row">
          <div className="ori-animated ori-fade-in ori-r-mrgn-15 avatarContainer">
            <img src={chatbot_client_info.icon_url} alt="" className="ori-img-contain" />
          </div>
          <div className="titleContainer">
            <p className="ori-capitalize ori-font-md ori-font-medium ori-no-b-mrgn">{chatbot_client_info.brand_name}</p>
            <div className="ori-flex-row">
              <div className="ori-flex-column ori-flex-jc ">
                <div className={classNames("onlineBadge", { "active": is_internet_connected && is_socket_connected })}>&nbsp;</div>
              </div>
              <div className="ori-l-mrgn-5 onlineStatus">
                {!is_internet_connected ? "Offline" : (!is_socket_connected ? "Connecting..." : "Online")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChatBotHeader.propTypes = {
  is_socket_connected: PropTypes.bool,
  is_internet_connected: PropTypes.bool,
};

export default ChatBotHeader;
