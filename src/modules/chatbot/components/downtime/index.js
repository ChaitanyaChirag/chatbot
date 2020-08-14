import React from 'react'
import PropTypes from 'prop-types'
import WarningIcon from 'react-icons/lib/io/android-warning'

import { formatDate } from '../../../../data/config/utils'
import { translator } from '../../../../data/config/urls'

import { LangContext } from '../../../context'

import DotsLoader from '../../../../components/dotsloader'

class DownTime extends React.PureComponent {
  state = { loading: false }
  componentDidMount() {
    const { downtime } = this.props;
    if (downtime.timestamp) {
      this.timer = setInterval(this.downtimeTimer, 1000);
    }
  }

  downtimeTimer = () => {
    const { downtime, onDowntimeComplete } = this.props;
    const now = new Date().getTime();
    const distance = downtime.timestamp - now;
    if (distance < 0) {
      this.setState({ loading: true })
      clearInterval(this.timer);
      console.log('timeout')
      onDowntimeComplete();
    }
  }

  render() {
    const { loading } = this.state;
    const { downtime } = this.props;
    return (
      <LangContext.Consumer>
        {
          lang => (
            <div className="ori-animated ori-fade-in ori-pad-10 ori-bg-white ori-border-radius-3">
              <div className="ori-flex-row ori-flex-jc ori-b-mrgn-10 ori-font-warning">
                <WarningIcon size={60} />
              </div>
              {
                downtime.title &&
                <p className="ori-b-mrgn-10 ori-text-center ori-font-md">{downtime.title}</p>
              }
              {
                downtime.message &&
                <p className="ori-b-mrgn-10 ori-text-center">{downtime.message}</p>
              }
              <div className="ori-flex-row ori-flex-jc">
                {
                  loading ? <DotsLoader /> :
                    <div className="ori-font-xs ori-font-light ori-text-center">{translator.text[lang].downtimeStatusPrefix} <span className="ori-font-bold ori-font-default"> {formatDate(downtime.timestamp, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span> {translator.text[lang].downtimeStatusPostfix}</div>
                }
              </div>
            </div>
          )
        }
      </LangContext.Consumer>
    );
  }
}

DownTime.propTypes = {
  downtime: PropTypes.object,
  onDowntimeComplete: PropTypes.func,
};

DownTime.defaultProps = {
  downtime: {}
}

export default DownTime;
