export const BUY_INVALID = 'BUY_INVALID';
export const BUY_REQUESTING = 'BUY_REQUESTING';
export const BUY_FAILURE = 'BUY_FAILURE';
export const BUY_SUCCESS = 'BUY_SUCCESS';

const initialState = {
  planId: null,
  readyStatus: BUY_INVALID,
  err: null,
  clientSecret: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case BUY_INVALID:
      return {...state,
        readyStatus:  BUY_INVALID,
        err: null
      }
    case BUY_REQUESTING:
      return {...state,
        readyStatus:  BUY_REQUESTING,
        err: null
      }
    case BUY_SUCCESS:
      return {...state,
        readyStatus: BUY_SUCCESS,
        clientSecret: action.data
      }
    case BUY_FAILURE:
      return {...state,
        readyStatus:  BUY_FAILURE,
        err: action.err
      }
    default:
      return state
  }
};
