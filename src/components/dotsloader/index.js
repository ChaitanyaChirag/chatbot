import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class DotsLoader extends React.PureComponent {
  render() {
    const { dot_color } = this.props;
    return (
      <div className="ori-flex-row oriDotsLoaderContainer">
        <div className={`dot one ${dot_color}`}>&nbsp;</div>
        <div className={`dot two ${dot_color}`}>&nbsp;</div>
        <div className={`dot three ${dot_color}`}>&nbsp;</div>
      </div>
    );
  };
}

DotsLoader.propTypes = {
  dot_color: PropTypes.string,
};

DotsLoader.defaultProps = {
  dot_color: "ori-bg-primary",
}

export default DotsLoader;
