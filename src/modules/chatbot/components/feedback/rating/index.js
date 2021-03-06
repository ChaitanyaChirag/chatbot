import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from 'react-icons/lib/fa/star';

import { translator } from '../../../../../data/config/brandSetup';

import { LangContext } from '../../../../context';

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
      <LangContext.Consumer>
        {
          lang => (
            <div className="ori-text-center ori-b-mrgn-10 ori-overflow-hidden">
              {
                [1, 2, 3, 4, 5].map(rating => {
                  return (
                    <StarIcon key={rating} size={24} className={`ori-animated ori-zoom-in ori-cursor-ptr ori-font-light ratingStar ${hover_star >= rating || selected_rating >= rating ? "ori-font-yellow" : ""}`} onMouseOver={() => this.setState({ hover_star: rating })} onMouseOut={() => this.setState({ hover_star: 0 })} onClick={() => { this.handleRatingClick(rating); }} />
                  );
                })
              }
              {
                selected_rating === 0 &&
                <p className="ori-animated ori-fade-in-up ori-t-mrgn-10 ori-no-b-mrgn ori-text-center"> {translator.text[lang].feedbackGreeting} </p>
              }
              {
                selected_rating > 0 && selected_rating < 4 &&
                <p className="ori-animated ori-fade-in-up ori-t-mrgn-10 ori-no-b-mrgn ori-text-center"> {translator.text[lang].feedbackLowRatedStatus} </p>
              }
              {
                selected_rating > 3 &&
                <p className="ori-animated ori-fade-in-up ori-t-mrgn-10 ori-no-b-mrgn ori-text-center"> {translator.text[lang].feedbackHighRatedStatus}</p>
              }
            </div>
          )
        }
      </LangContext.Consumer>
    );
  }
}

Rating.propTypes = {
  handleSelectedRating: PropTypes.func,
};

export default Rating;
