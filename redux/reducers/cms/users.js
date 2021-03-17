export const FETCH_USERS_INVALID = 'FETCH_USERS_INVALID';
export const FETCH_USERS_REQUESTING = 'FETCH_USERS_REQUESTING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const initialState = {
  readyStatus: FETCH_USERS_INVALID,
  err: null,
  data: {}
}


export default (state, action) => {
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_USERS_REQUESTING:
      return {
        ...state,
        readyStatus:  FETCH_USERS_REQUESTING,
        err: null
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        readyStatus:  FETCH_USERS_FAILURE,
        err: action.err
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        readyStatus:  FETCH_USERS_SUCCESS,
        data: action.data
      }


    default:
      return state;
  }
};
