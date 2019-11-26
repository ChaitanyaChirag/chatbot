import actionTypes from '../actiontypes';
import states from './states';

export default function page_details(state = states.page_details, action) {
    switch (action.type) {
        case actionTypes.DEVICE_DATA_LOADED:
            return {
                ...state,
                device_data: action.payload.device_data
            };

        case actionTypes.ENABLE_ADSTER_BOT:
            return {
                ...state,
                is_adster_bot: action.payload
            }; 

        default:
            return state;
    }
}
