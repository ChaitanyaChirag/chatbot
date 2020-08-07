import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import DelayComponent from '../delaycomponent'

class CustomModal extends React.PureComponent {
  render() {
    const { isMounted, children } = this.props;
    return (
      <div
        className={
          classNames("ori-animated ori-animation-half ori-absolute ori-align-full ori-z-index-99995  ori-pad-20 ori-bg-black-light ori-flex-column ori-overflow-x-hidden ori-overflow-y-auto",
            {
              "ori-fade-in": isMounted,
              "ori-fade-out": !isMounted
            }
          )
        }
      >
        {children}
      </div>
    );
  }
}

CustomModal.propTypes = {
  isMounted: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default DelayComponent(CustomModal);
