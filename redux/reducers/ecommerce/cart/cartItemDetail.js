export const FETCH_CIDS_INVALID = 'FETCH_CIDS_INVALID';
export const FETCH_CIDS_REQUESTING = 'FETCH_CIDS_REQUESTING';
export const FETCH_CIDS_FAILURE = 'FETCH_CIDS_FAILURE';
export const FETCH_CIDS_SUCCESS = 'FETCH_CIDS_SUCCESS';
export const FETCH_CIDS = 'FETCH_CIDS';

const initialState = {
  readyStatus: FETCH_CIDS_INVALID,
  err: null,
  data: null
};

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_CIDS_REQUESTING:
      return {...state,
        readyStatus:  FETCH_CIDS_REQUESTING,
      };
    case FETCH_CIDS_SUCCESS:
      return {...state,
        readyStatus: FETCH_CIDS_SUCCESS,
        data: action.data
      };
    case FETCH_CIDS_FAILURE:
      return {...state,
        readyStatus:  FETCH_CIDS_FAILURE,
        err: action.err
      };
    default:
      return state
  }
};
