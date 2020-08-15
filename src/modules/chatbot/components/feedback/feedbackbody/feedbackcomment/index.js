import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';

import { translator } from '../../../../../../data/config/urls';

import { LangContext } from '../../../../../context';

const { TextArea } = Input;

class FeedbackComment extends React.PureComponent {
  state = {
    comment: "",
  };

  handleCommentChange = event => {
    this.setState({ comment: event.target.value });
  };

  onClickSubmitComment = () => {
    const { handleFeedbackComment } = this.props;
    const { comment } = this.state;
    handleFeedbackComment(comment);
  };

  render() {
    let { comment } = this.state;
    let { isMounted, delayUnmountTime } = this.props;
    return (
      <LangContext.Consumer>
        {
          lang => (
            <div className={classNames("ori-animated", { "ori-fade-in-up": isMounted, "ori-fade-out-down": !isMounted })} style={{ animationDuration: `${delayUnmountTime}ms` }}>
              <TextArea placeholder="Write your comment…" className="feedbackCommentInput" autosize={{ minRows: 3, maxRows: 8 }} value={comment} onChange={this.handleCommentChange} />
              <Button className="ori-animated ori-zoom-in ori-btn-fill-primary ori-full-width ori-t-mrgn-15" onClick={this.onClickSubmitComment}>{translator.text[lang].submit}</Button>
            </div>
          )
        }
      </LangContext.Consumer>
    );
  }
}

FeedbackComment.propTypes = {
  handleFeedbackComment: PropTypes.func,
  isMounted: PropTypes.bool,
  delayUnmountTime: PropTypes.number,
};

export default FeedbackComment;
