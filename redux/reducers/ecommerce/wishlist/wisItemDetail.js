export const FETCH_WIDS_INVALID = 'FETCH_WIDS_INVALID';
export const FETCH_WIDS_REQUESTING = 'FETCH_WIDS_REQUESTING';
export const FETCH_WIDS_FAILURE = 'FETCH_WIDS_FAILURE';
export const FETCH_WIDS_SUCCESS = 'FETCH_WIDS_SUCCESS';

const initialState = {
  readyStatus: FETCH_WIDS_INVALID,
  err: null,
  data: null
};

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_WIDS_REQUESTING:
      return {...state,
        readyStatus:  FETCH_WIDS_REQUESTING,
      };
    case FETCH_WIDS_SUCCESS:
      return {...state,
        readyStatus: FETCH_WIDS_SUCCESS,
        data: action.data
      };
    case FETCH_WIDS_FAILURE:
      return {...state,
        readyStatus:  FETCH_WIDS_FAILURE,
        err: action.err
      };
    default:
      return state
  }
};
