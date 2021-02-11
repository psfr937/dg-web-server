

export const FETCH_QUESTIONS_INVALID = 'FETCH_QUESTIONS_INVALID'
export const FETCH_QUESTIONS_REQUESTING = 'FETCH_QUESTIONS_REQUESTING'
export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS'
export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE'

const initialState = {
  readyStatus: FETCH_QUESTIONS_INVALID,
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
    case FETCH_QUESTIONS_REQUESTING:
      return {
        readyStatus:  FETCH_QUESTIONS_REQUESTING,
        err: null
      }
    case FETCH_QUESTIONS_FAILURE:
      return {
        readyStatus:  FETCH_QUESTIONS_FAILURE,
        err: action.err
      }
    case FETCH_QUESTIONS_SUCCESS:
      return {
        readyStatus:  FETCH_QUESTIONS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
