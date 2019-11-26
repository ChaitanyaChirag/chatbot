import actionTypes from '../actiontypes';

export const setDeviceData = device_data => {
  return {
    type: actionTypes.DEVICE_DATA_LOADED,
    payload: {
      device_data: device_data
    }
  };
}

export const enableAdsterBot = () => {
  return {
    type: actionTypes.ENABLE_ADSTER_BOT,
    payload: true
  };
}