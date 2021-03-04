export const FETCH_BTS_INVALID = 'FETCH_BTS_INVALID';
export const FETCH_BTS_REQUESTING = 'FETCH_BTS_REQUESTING';
export const FETCH_BTS_SUCCESS = 'FETCH_BTS_SUCCESS';
export const FETCH_BTS_FAILURE = 'FETCH_BTS_FAILURE';

const initialState = {
  readyStatus: FETCH_BTS_INVALID,
  err: null,
  data: {}
};


export default (state, action) => {
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_BTS_REQUESTING:
      return {
        readyStatus: FETCH_BTS_REQUESTING,
        err: null
      };
    case FETCH_BTS_FAILURE:
      return {
        readyStatus:  FETCH_BTS_FAILURE,
        err: action.err
      };
    case FETCH_BTS_SUCCESS:
      return {
        readyStatus:  FETCH_BTS_SUCCESS,
        data: action.data
      };
    default:
      return state;
  }
};
