import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SuccessIcon from 'react-icons/lib/io/android-checkmark-circle';
import ChainBreak from 'react-icons/lib/fa/chain-broken';
import FailedIcon from 'react-icons/lib/md/cancel';

import DelayComponent from '../delaycomponent';

class ShowMessageComponent extends React.PureComponent {
  render() {
    const { message, title, color, fontSize, fontLight, size, isMounted, delayUnmountTime, success, failed, chainBreak } = this.props;

    return (
      <div className={classNames("ori-animated ori-full-parent-height ori-pad-20 ori-flex-column ori-flex-center", { "ori-fade-in": isMounted, "ori-fade-out": !isMounted })} style={{ animationDuration: `${delayUnmountTime}ms` }}>
        <div className={classNames("ori-animated ori-b-mrgn-10", { "ori-font-primary": color === "primary", "ori-font-green": color === "green", "ori-font-warning": color === "warning", "ori-font-danger": color === "danger", "ori-zoom-in": isMounted, "ori-zoom-out": !isMounted })} style={{ animationDuration: `${delayUnmountTime}ms` }}>
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
          <p className={classNames("ori-no-b-mrgn ori-capitalize", { "ori-font-xs": fontSize === "xxs", "ori-font-sm": fontSize === "xs", "ori-font-md": fontSize === "sm", "ori-font-lg": fontSize === "md" })}>{title}</p>
        }
        <p className={classNames("ori-no-b-mrgn", { "ori-font-xxs": fontSize === "xxs", "ori-font-xs": fontSize === "xs", "ori-font-sm": fontSize === "sm", "ori-font-md": fontSize === "md", "ori-font-light": fontLight })}>{message}</p>
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
