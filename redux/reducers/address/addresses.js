
export const FETCH_ADDRESSES_INVALID = 'FETCH_ADDRESSES_INVALID';
export const FETCH_ADDRESSES_REQUESTING = 'FETCH_ADDRESSES_REQUESTING';
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const FETCH_ADDRESSES_FAILURE = 'FETCH_ADDRESSES_FAILURE';
export const APPEND_NEW_ADDRESS = 'APPEND_NEW_ADDRESS';
export const SELECT_ADDRESS_ID = 'SELECT_ADDRESS_ID';

const time = new Date();
time.setDate(time.getDate() + 2);
time.setHours(6);
time.setMinutes(0);
time.setMilliseconds(0);

const initialState = {
  selectedAddressId: null,
  pickupTime: {
    year: time.getFullYear(), month: time.getMonth() + 1, date: time.getDate(),
    hours: time.getHours(), minutes: time.getMinutes()
  },
  readyStatus: FETCH_ADDRESSES_INVALID,
  err: null,
  data: {}
};


export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_ADDRESSES_REQUESTING:
      return {
        ...state,
        readyStatus:  FETCH_ADDRESSES_REQUESTING,
        err: null
      }
    case FETCH_ADDRESSES_FAILURE:
      return {
        ...state,
        readyStatus:  FETCH_ADDRESSES_FAILURE,
        err: action.err
      }
    case FETCH_ADDRESSES_SUCCESS:
      let firstId = parseInt(Object.keys(action.data)[0]);
      return {
        ...state,
        readyStatus:  FETCH_ADDRESSES_SUCCESS,
        data: action.data,
        selectedAddressId: firstId
      };
    case APPEND_NEW_ADDRESS:
      return {
        ...state,
        readyStatus:  APPEND_NEW_ADDRESS,
        data: { ...state.data, [action.data.id]: action.data}
      };
    case SELECT_ADDRESS_ID:
      return { ...state, selectedAddressId: action.id };
    default:
      return state;
  }
};
