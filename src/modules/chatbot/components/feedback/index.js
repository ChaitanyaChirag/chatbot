import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from 'react-icons/lib/md/close';

import './index.scss';

import { chatbot_status } from '../../../../data/config/urls';
import { uniqueId } from '../../../../data/config/utils';
import logoImage from '../../../../data/assets/images/logo.png';

import DelayComponent from '../../../../components/delaycomponent';
import FeedbackBody from './feedbackbody';
import ShowMessage from '../../../../components/showmessage';

class FeedbackComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      rating: null,
      customFeedbackId: uniqueId(),
      feedback_success: false,
      feedback_failed: false,
    };
  }

  handleSelectedRating = rating => {
    const { psid, sendFeedback } = this.props;
    const { customFeedbackId } = this.state;
    const payload = {
      psid,
      feedback: { rating, customFeedbackId },
    };
    this.setState({ rating });
    sendFeedback(payload);
  };

  handleFeedbackComment = comments => {
    console.log('comment:', comments);
    const { psid, closeFeedback, sendFeedback } = this.props;
    const { rating, customFeedbackId } = this.state;
    const payload = {
      psid,
      feedback: { rating, comments, customFeedbackId },
    };
    sendFeedback(payload, err => {
      if (!err) {
        this.setState({
          feedback_success: true,
          feedback_failed: false
        }, () => setTimeout(closeFeedback, 2500));
      } else {
        this.setState({
          feedback_failed: true,
          feedback_success: false,
        }, () => setTimeout(closeFeedback, 2500));
      }
    });

  };

  render() {
    const { isMounted, closeFeedback, is_socket_connected, delayUnmountTime } = this.props;
    const { rating, feedback_success, feedback_failed } = this.state;

    return (
      <div className={classNames("ori-absolute ori-flex-column ori-flex-center ori-pad-10 oriFeedbackOverlayContainer", { "ori-fade-in": isMounted, "ori-fade-out": !isMounted })} style={{ animationDuration: `${delayUnmountTime}ms` }}>
        <div className="ori-relative ori-bg-white ori-border-radius-3 ori-pad-15 feedbackContainer">
          <div className="ori-absolute avatarContainer">
            <img src={logoImage} alt="" className="ori-img-contain" />
          </div>
          <div className="ori-absolute ori-pad-5 flex alignFeedbackClose" onClick={closeFeedback}>
            <CloseIcon size={16} className="ori-font-white" />
          </div>
          <ShowMessage isMounted={!feedback_failed && !feedback_success && !is_socket_connected && isMounted} delayMountTime={500} delayUnmountTime={500} size={45} color="danger" message={chatbot_status.common.socket_connection_lost} title="error" chainBreak fontLight />
          <FeedbackBody handleSelectedRating={this.handleSelectedRating} handleFeedbackComment={this.handleFeedbackComment} isMounted={!feedback_failed && !feedback_success && is_socket_connected && isMounted} delayMountTime={500} delayUnmountTime={500} show_feedback_comment={rating && rating > 0} />
          <ShowMessage title="success" message={chatbot_status.feedback.success} isMounted={feedback_success && isMounted} delayMountTime={500} delayUnmountTime={500} size={45} color="green" success fontLight />
          <ShowMessage title="Failed" message={chatbot_status.feedback.failed} isMounted={feedback_failed && isMounted} delayMountTime={500} delayUnmountTime={500} size={45} color="danger" failed fontLight />
        </div>
      </div>
    );
  }
}

const Feedback = DelayComponent(FeedbackComponent);

Feedback.propTypes = {
  is_socket_connected: PropTypes.bool,
  psid: PropTypes.string,
  isMounted: PropTypes.bool,
  delayUnmountTime: PropTypes.number,
  closeFeedback: PropTypes.func,
  sendFeedback: PropTypes.func,
};

export default Feedback;
