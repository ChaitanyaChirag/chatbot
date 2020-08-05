import React from 'react';
import PropTypes from 'prop-types';

import Rating from '../rating';
import FeedbackComment from './feedbackcomment';
import DelayComponent from '../../../../../components/delaycomponent';

class FeedbackBodyComponent extends React.PureComponent {
  render() {
    let { handleSelectedRating, handleFeedbackComment, show_feedback_comment, isMounted, delayUnmountTime } = this.props;

    return (
      <div className="ori-t-pad-20 ori-overflow-hidden">
        <Rating handleSelectedRating={handleSelectedRating} />
        {
          show_feedback_comment &&
          <FeedbackComment handleFeedbackComment={handleFeedbackComment} isMounted={isMounted} delayUnmountTime={delayUnmountTime} />
        }
      </div>
    );
  }
}

const FeedbackBody = DelayComponent(FeedbackBodyComponent);

FeedbackBody.propTypes = {
  handleSelectedRating: PropTypes.func,
  handleFeedbackComment: PropTypes.func,
  isMounted: PropTypes.bool,
  delayUnmountTime: PropTypes.number,
  show_feedback_comment: PropTypes.bool
};

export default FeedbackBody;