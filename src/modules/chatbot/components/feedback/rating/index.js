import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StarIcon from 'react-icons/lib/fa/star';

import { chatbot_status } from '../../../../../data/config/urls';

class Rating extends React.PureComponent {
  state = {
    hover_star: 0,
    selected_rating: 0
  };

  handleRatingClick = rating => {
    const { handleSelectedRating } = this.props;
    this.setState({ selected_rating: rating }, () => handleSelectedRating(rating));
  };

  render() {
    const { hover_star, selected_rating } = this.state;

    return (
      <div className="ori-text-center ori-b-mrgn-10 ori-overflow-hidden">
        {
          [1, 2, 3, 4, 5].map(rating => {
            return (
              <StarIcon key={rating} size={24} className={classNames("ori-animated ori-zoom-in ori-cursor-ptr ori-font-light ratingStar", { "ori-font-yellow": hover_star >= rating || selected_rating >= rating })} onMouseOver={() => this.setState({ hover_star: rating })} onMouseOut={() => this.setState({ hover_star: 0 })} onClick={() => { this.handleRatingClick(rating); }} />
            );
          })
        }
        {
          selected_rating === 0 &&
          <p className="ori-animated ori-fade-in-up ori-t-mrgn-10 ori-no-b-mrgn ori-text-center ori-font-light"> {chatbot_status.feedback.greeting} </p>
        }
        {
          selected_rating > 0 && selected_rating < 4 &&
          <p className="ori-animated ori-fade-in-up ori-t-mrgn-10 ori-no-b-mrgn ori-text-center ori-font-light"> {chatbot_status.feedback.low_rated} </p>
        }
        {
          selected_rating > 3 &&
          <p className="ori-animated ori-fade-in-up ori-t-mrgn-10 ori-no-b-mrgn ori-text-center ori-font-light"> {chatbot_status.feedback.high_rated}</p>
        }
      </div>
    );
  }
}

Rating.propTypes = {
  handleSelectedRating: PropTypes.func,
};

export default Rating;
