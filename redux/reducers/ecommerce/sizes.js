
export const FETCH_SIZES_INVALID = 'FETCH_SIZES_INVALID';
export const FETCH_SIZES_REQUESTING = 'FETCH_SIZES_REQUESTING';
export const FETCH_SIZES_SUCCESS = 'FETCH_SIZES_SUCCESS';
export const FETCH_SIZES_FAILURE = 'FETCH_SIZES_FAILURE';

const initialState = {
  readyStatus: FETCH_SIZES_INVALID,
  err: null,
  data: {}
}


export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_SIZES_REQUESTING:
      return {
        ...state,
        readyStatus:  FETCH_SIZES_REQUESTING,
        err: null
      }
    case FETCH_SIZES_FAILURE:
      return {
        ...state,
        readyStatus:  FETCH_SIZES_FAILURE,
        err: action.err
      }
    case FETCH_SIZES_SUCCESS:
      return {
        ...state,
        readyStatus:  FETCH_SIZES_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
