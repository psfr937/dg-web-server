export const FETCH_PLANS_INVALID = 'FETCH_PLANS_INVALID';
export const FETCH_PLANS_REQUESTING = 'FETCH_PLANS_REQUESTING';
export const FETCH_PLANS_FAILURE = 'FETCH_PLANS_FAILURE';
export const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS';
export const FETCH_PLANS = 'FETCH_PLANS';

const initialState = {
  readyStatus: FETCH_PLANS_INVALID,
  err: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_PLANS_INVALID:
      return {...state,
        readyStatus:  FETCH_PLANS_INVALID,
        err: null
      }
    case FETCH_PLANS_REQUESTING:
      return {...state,
        readyStatus:  FETCH_PLANS_REQUESTING,
        err: action.err
      }
    case FETCH_PLANS_SUCCESS:
      return {...state,
        readyStatus: FETCH_PLANS_SUCCESS,
      }
    case FETCH_PLANS_FAILURE:
      return {...state,
        readyStatus:  FETCH_PLANS_FAILURE,
        err: action.err
      }
    default:
      return state
  }
};
