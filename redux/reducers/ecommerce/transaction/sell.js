export const SELL_INVALID = 'SELL_INVALID';
export const SELL_REQUESTING = 'SELL_REQUESTING';
export const SELL_FAILURE = 'SELL_FAILURE';
export const SELL_SUCCESS = 'SELL_SUCCESS';

const initialState = {
  planId: null,
  readyStatus: SELL_INVALID,
  err: null,
  clientSecret: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SELL_INVALID:
      return {...state,
        readyStatus:  SELL_INVALID,
        err: null
      }
    case SELL_REQUESTING:
      return {...state,
        readyStatus:  SELL_REQUESTING,
        err: null
      }
    case SELL_SUCCESS:
      return {...state,
        readyStatus: SELL_SUCCESS,
        clientSecret: action.data
      }
    case SELL_FAILURE:
      return {...state,
        readyStatus:  SELL_FAILURE,
        err: action.err
      }
    default:
      return state
  }
};
