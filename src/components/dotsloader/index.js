import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const DotsLoader = ({ container_class }) => {
  return (
    <div className={"oriDotsLoaderContainer " + container_class}>
      <span className={`dot one ori-bg-primary`}>&nbsp;</span>
      <span className={`dot two ori-bg-primary`}>&nbsp;</span>
      <span className={`dot three ori-bg-primary`}>&nbsp;</span>
    </div>
  )
}

DotsLoader.propTypes = {
  container_class: PropTypes.string
};

DotsLoader.defaultProps = {
  container_class: "",
}

export default DotsLoader;
