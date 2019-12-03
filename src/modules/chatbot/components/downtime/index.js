import React from 'react'
import PropTypes from 'prop-types'

import DotsLoader from '../../../../components/dotsloader'

class DownTime extends React.PureComponent {
  state = { loading: true }
  render() {
    const { loading } = this.state;
    return (
      <div className="ori-animated ori-fade-in ori-pad-10 ori-bg-white ori-border-radius-3">
        <p className="ori-font-13">due to some issue, currently chatbot is under maintaince</p>
        <div className="ori-flex-row ori-flex-jc">
          {
            loading ? <DotsLoader /> :
              <div>timer</div>
          }
        </div>
      </div>
    );
  }
}

DownTime.propTypes = {
  downtime: PropTypes.object
};

export default DownTime;
