export const FETCH_PMS_INVALID = 'FETCH_PMS_INVALID';
export const FETCH_PMS_REQUESTING = 'FETCH_PMS_REQUESTING';
export const FETCH_PMS_FAILURE = 'FETCH_PMS_FAILURE';
export const FETCH_PMS_SUCCESS = 'FETCH_PMS_SUCCESS';
export const FETCH_PMS = 'FETCH_PMS';

const initialState = {
  readyStatus: FETCH_PMS_INVALID,
  err: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_PMS_INVALID:
      return {...state,
        readyStatus:  FETCH_PMS_INVALID,
        err: null
      }
    case FETCH_PMS_REQUESTING:
      return {...state,
        readyStatus:  FETCH_PMS_REQUESTING,
        err: action.err
      }
    case FETCH_PMS_SUCCESS:
      return {...state,
        readyStatus: FETCH_PMS_SUCCESS,
      }
    case FETCH_PMS_FAILURE:
      return {...state,
        readyStatus:  FETCH_PMS_FAILURE,
        err: action.err
      }
    default:
      return state
  }
};
