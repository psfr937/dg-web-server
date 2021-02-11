export const CHECKOUT_INVALID = 'CHECKOUT_INVALID'
export const CHECKOUT_REQUESTING = 'CHECKOUT_REQUESTING'
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const SELECT_PLAN = 'SELECT_PLAN'

const initialState = {
  planId: null,
  readyStatus: CHECKOUT_INVALID,
  err: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case CHECKOUT_INVALID:
      return {...state,
        readyStatus:  CHECKOUT_INVALID,
        err: null
      }
    case CHECKOUT_REQUESTING:
      return {...state,
        readyStatus:  CHECKOUT_REQUESTING,
        err: action.err
      }
    case CHECKOUT_SUCCESS:
      return {...state,
        readyStatus: CHECKOUT_SUCCESS,
      }
    case CHECKOUT_FAILURE:
      return {...state,
        readyStatus:  CHECKOUT_FAILURE,
        err: action.err
      }
    case SELECT_PLAN:
      return {...state,
        planId: action.data
      }
    default:
      return state;
  }
};
