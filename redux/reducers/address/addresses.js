
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
export const FETCH_ADDRESSES_INVALID = 'FETCH_ADDRESSES_INVALID';
export const FETCH_ADDRESSES_REQUESTING = 'FETCH_ADDRESSES_REQUESTING';
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const FETCH_ADDRESSES_FAILURE = 'FETCH_ADDRESSES_FAILURE';
export const APPEND_NEW_ADDRESS = 'APPEND_NEW_ADDRESS';

const initialState = {
  selectedAddress: null,
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
      return {
        ...state,
        readyStatus:  FETCH_ADDRESSES_SUCCESS,
        data: action.data
      };
    case APPEND_NEW_ADDRESS:
      return {
        ...state,
        readyStatus:  APPEND_NEW_ADDRESS,
        data: { ...state.data, [action.data.id]: action.data}
      };

    default:
      return state;
  }
};
