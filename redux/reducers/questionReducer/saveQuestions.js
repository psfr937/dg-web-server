

export const SAVE_QUESTIONS_INVALID = 'SAVE_QUESTIONS_INVALID'
export const SAVE_QUESTIONS_REQUESTING = 'SAVE_QUESTIONS_REQUESTING'
export const SAVE_QUESTIONS_SUCCESS = 'SAVE_QUESTIONS_SUCCESS'
export const SAVE_QUESTIONS_FAILURE = 'SAVE_QUESTIONS_FAILURE'

const initialState = {
  readyStatus: SAVE_QUESTIONS_INVALID,
  err: null,
  data: []
}


export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SAVE_QUESTIONS_REQUESTING:
      return {
        readyStatus:  SAVE_QUESTIONS_REQUESTING,
        err: null
      }
    case SAVE_QUESTIONS_FAILURE:
      return {
        readyStatus:  SAVE_QUESTIONS_FAILURE,
        err: action.err
      }
    case SAVE_QUESTIONS_SUCCESS:
      return {
        readyStatus:  SAVE_QUESTIONS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
