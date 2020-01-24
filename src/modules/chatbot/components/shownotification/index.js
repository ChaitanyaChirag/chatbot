import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DelayComponent from '../../../../components/delaycomponent';

class ShowNotification extends React.PureComponent {
  render() {
    const { message, isMounted, delayUnmountTime } = this.props;
    return (
      <div className={classNames("ori-animated ori-absolute ori-z-index-1 ori-box-shadow ori-border-radius-3 ori-text-center ori-font-notification-popup ori-bg-notification-popup ori-bg-card ori-font-13 ori-border-light ori-lr-pad-10 ori-tb-pad-5", { "ori-fade-in": isMounted, "ori-fade-out": !isMounted })} style={{ animationDuration: `${delayUnmountTime}ms`, top: 75, left: 5, right: 5 }}>
        {message}
      </div>
    );
  }
}

ShowNotification.propTypes = {
  message: PropTypes.string,
  isMounted: PropTypes.bool,
  delayUnmountTime: PropTypes.number
};

ShowNotification.defaultProps = {
  delayUnmountTime: 500,
  message: ""
};

export default DelayComponent(ShowNotification);
