import { combineReducers } from 'redux';

import chat_details from './chat_details/reducers';
import page_details from './page_details/reducers';

const rootReducer = combineReducers({
    chat_details,
    page_details
});

export default rootReducer;