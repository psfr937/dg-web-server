export const CREATE_PAYMENT_INTENT_INVALID = 'CREATE_PAYMENT_INTENT_INVALID';
export const CREATE_PAYMENT_INTENT_REQUESTING = 'CREATE_PAYMENT_INTENT_REQUESTING';
export const CREATE_PAYMENT_INTENT_FAILURE = 'CREATE_PAYMENT_INTENT_FAILURE';
export const CREATE_PAYMENT_INTENT_SUCCESS = 'CREATE_PAYMENT_INTENT_SUCCESS';
export const CREATE_PAYMENT_INTENT = 'CREATE_PAYMENT_INTENT'

const initialState = {
  planId: null,
  readyStatus: CREATE_PAYMENT_INTENT_INVALID,
  err: null,
  clientSecret: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case CREATE_PAYMENT_INTENT_INVALID:
      return {...state,
        readyStatus:  CREATE_PAYMENT_INTENT_INVALID,
        err: null
      }
    case CREATE_PAYMENT_INTENT_REQUESTING:
      return {...state,
        readyStatus:  CREATE_PAYMENT_INTENT_REQUESTING,
        err: null
      }
    case CREATE_PAYMENT_INTENT_SUCCESS:
      return {...state,
        readyStatus: CREATE_PAYMENT_INTENT_SUCCESS,
        clientSecret: action.data
      }
    case CREATE_PAYMENT_INTENT_FAILURE:
      return {...state,
        readyStatus:  CREATE_PAYMENT_INTENT_FAILURE,
        err: action.err
      }
    default:
      return state
  }
};
