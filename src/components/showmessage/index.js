import React from 'react';
import PropTypes from 'prop-types';
import SuccessIcon from 'react-icons/lib/io/android-checkmark-circle';
import ChainBreak from 'react-icons/lib/fa/chain-broken';
import FailedIcon from 'react-icons/lib/md/cancel';

import DelayComponent from '../delaycomponent';

class ShowMessageComponent extends React.PureComponent {
  render() {
    const { message, title, color, fontSize, fontLight, size, isMounted, delayUnmountTime, success, failed, chainBreak } = this.props;

    return (
      <div className={`ori-animated ori-full-parent-height ori-pad-20 ori-flex-column ori-flex-center ${isMounted ? "ori-fade-in": "ori-fade-out"}`} style={{ animationDuration: `${delayUnmountTime}ms` }}>
        <div className={`ori-animated ori-b-mrgn-10 ${color === "primary" ? "ori-font-primary" : ""} ${color === "green" ? "ori-font-green": ""} ${ color === "warning" ? "ori-font-warning": ""} ${color === "danger" ? "ori-font-danger": ""} ${isMounted? "ori-zoom-in" : "ori-zoom-out"}`} style={{ animationDuration: `${delayUnmountTime}ms` }}>
          {
            chainBreak &&
            <ChainBreak size={size} />
          }
          {
            success &&
            <SuccessIcon size={size} />
          }
          {
            failed &&
            <FailedIcon size={size} />
          }
        </div>
        {
          title && title.trim().length > 0 &&
          <p className={`ori-no-b-mrgn ori-capitalize ${fontSize === "xxs" ? "ori-font-xs" : ""} ${fontSize === "xs" ? "ori-font-sm" : ""} ${fontSize === "sm" ? "ori-font-md" : ""} ${ fontSize === "md" ? "ori-font-lg" : "" }`}>{title}</p>
        }
        <p className={`ori-no-b-mrgn ori-text-center ${fontSize === "xxs" ? "ori-font-xxs" : ""} ${fontSize === "xs" ? "ori-font-xs" : ""} ${fontSize === "sm" ? "ori-font-sm" : ""} ${fontSize === "md" ? "ori-font-md" : ""} ${fontLight ? "ori-font-light": ""}`}>{message}</p>
      </div>
    );
  }
}

const ShowMessage = DelayComponent(ShowMessageComponent);

ShowMessage.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  fontSize: PropTypes.string,
  fontLight: PropTypes.bool,
  success: PropTypes.bool,
  chainBreak: PropTypes.bool,
  failed: PropTypes.bool,
  isMounted: PropTypes.bool,
  delayUnmountTime: PropTypes.number
};

ShowMessage.defaultProps = {
  title: null,
  size: 30,
  fontSize: "sm",
  fontLight: false,
  success: false,
  failed: false,
  chainBreak: false,
  delayUnmountTime: 500,
  delayMountTime: 0
};

export default ShowMessage;
