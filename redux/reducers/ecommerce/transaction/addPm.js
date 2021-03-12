export const ADD_PM_INVALID = 'ADD_PM_INVALID';
export const ADD_PM_REQUESTING = 'ADD_PM_REQUESTING';
export const ADD_PM_FAILURE = 'ADD_PM_FAILURE';
export const ADD_PM_SUCCESS = 'ADD_PM_SUCCESS';
export const ADD_PM = 'ADD_PM';

const initialState = {
  readyStatus: ADD_PM_INVALID,
  err: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case ADD_PM_INVALID:
      return {...state,
        readyStatus:  ADD_PM_INVALID,
        err: null
      }
    case ADD_PM_REQUESTING:
      return {...state,
        readyStatus:  ADD_PM_REQUESTING,
        err: action.err
      }
    case ADD_PM_SUCCESS:
      return {...state,
        readyStatus: ADD_PM_SUCCESS,
      }
    case ADD_PM_FAILURE:
      return {...state,
        readyStatus:  ADD_PM_FAILURE,
        err: action.err
      }
    default:
      return state
  }
};
