export const PURCHASE_INVALID = 'PURCHASE_INVALID';
export const PURCHASE_REQUESTING = 'PURCHASE_REQUESTING';
export const PURCHASE_FAILURE = 'PURCHASE_FAILURE';
export const PURCHASE_SUCCESS = 'PURCHASE_SUCCESS';
export const PURCHASE = 'PURCHASE'

const initialState = {
  planId: null,
  readyStatus: PURCHASE_INVALID,
  err: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case PURCHASE_INVALID:
      return {...state,
        readyStatus:  PURCHASE_INVALID,
        err: null
      }
    case PURCHASE_REQUESTING:
      return {...state,
        readyStatus:  PURCHASE_REQUESTING,
        err: action.err
      }
    case PURCHASE_SUCCESS:
      return {...state,
        readyStatus: PURCHASE_SUCCESS,
      }
    case PURCHASE_FAILURE:
      return {...state,
        readyStatus:  PURCHASE_FAILURE,
        err: action.err
      }
    default:
      return state
  }
};
