
export const FETCH_TAGS_INVALID = 'FETCH_TAGS_INVALID';
export const FETCH_TAGS_REQUESTING = 'FETCH_TAGS_REQUESTING';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

const initialState = {
  readyStatus: FETCH_TAGS_INVALID,
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
    case FETCH_TAGS_REQUESTING:
      return {
        ...state,
        readyStatus:  FETCH_TAGS_REQUESTING,
        err: null
      };
    case FETCH_TAGS_FAILURE:
      return {
        ...state,
        readyStatus:  FETCH_TAGS_FAILURE,
        err: action.err
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        readyStatus:  FETCH_TAGS_SUCCESS,
        data: action.data
      };

    default:
      return state;
  }
};
