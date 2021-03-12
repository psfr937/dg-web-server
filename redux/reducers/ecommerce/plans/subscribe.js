export const SUBSCRIBE_INVALID = 'SUBSCRIBE_INVALID';
export const SUBSCRIBE_REQUESTING = 'SUBSCRIBE_REQUESTING';
export const SUBSCRIBE_FAILURE = 'SUBSCRIBE_FAILURE';
export const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS';

const initialState = {
  planId: null,
  readyStatus: SUBSCRIBE_INVALID,
  err: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SUBSCRIBE_INVALID:
      return {...state,
        readyStatus:  SUBSCRIBE_INVALID,
        err: null
      }
    case SUBSCRIBE_REQUESTING:
      return {...state,
        readyStatus:  SUBSCRIBE_REQUESTING,
        err: action.err
      }
    case SUBSCRIBE_SUCCESS:
      return {...state,
        readyStatus: SUBSCRIBE_SUCCESS,
      }
    case SUBSCRIBE_FAILURE:
      return {...state,
        readyStatus:  SUBSCRIBE_FAILURE,
        err: action.err
      }
    default:
      return state
  }
};
