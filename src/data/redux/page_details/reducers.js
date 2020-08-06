import actionTypes from '../actiontypes';
import states from './states';

export default function page_details(state = states.page_details, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PAGE_STATE:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
}
