export const CREATE_SETUP_INTENT_INVALID = 'CREATE_SETUP_INTENT_INVALID';
export const CREATE_SETUP_INTENT_REQUESTING = 'CREATE_SETUP_INTENT_REQUESTING';
export const CREATE_SETUP_INTENT_FAILURE = 'CREATE_SETUP_INTENT_FAILURE';
export const CREATE_SETUP_INTENT_SUCCESS = 'CREATE_SETUP_INTENT_SUCCESS';

const initialState = {
  planId: null,
  readyStatus: CREATE_SETUP_INTENT_INVALID,
  err: null,
  clientSecret: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case CREATE_SETUP_INTENT_INVALID:
      return {...state,
        readyStatus:  CREATE_SETUP_INTENT_INVALID,
        err: null
      }
    case CREATE_SETUP_INTENT_REQUESTING:
      return {...state,
        readyStatus:  CREATE_SETUP_INTENT_REQUESTING,
        err: null
      }
    case CREATE_SETUP_INTENT_SUCCESS:
      return {...state,
        readyStatus: CREATE_SETUP_INTENT_SUCCESS,
        clientSecret: action.data
      }
    case CREATE_SETUP_INTENT_FAILURE:
      return {...state,
        readyStatus:  CREATE_SETUP_INTENT_FAILURE,
        err: action.err
      }
    default:
      return state
  }
};
