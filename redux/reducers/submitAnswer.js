/* @flow */


export const SUBMIT_ANSWER_INVALID = 'SUBMIT_ANSWER_INVALID';
export const SUBMIT_ANSWER_REQUESTING = 'SUBMIT_ANSWER_REQUESTING';
export const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS';
export const SUBMIT_ANSWER_FAILURE = 'SUBMIT_ANSWER_FAILURE';

const initialState = {
  readyStatus: SUBMIT_ANSWER_INVALID,
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
    case SUBMIT_ANSWER_REQUESTING:
      return {
        readyStatus:  SUBMIT_ANSWER_REQUESTING,
        err: null
      }
    case SUBMIT_ANSWER_FAILURE:
      return {
        readyStatus:  SUBMIT_ANSWER_FAILURE,
        err: action.err
      }
    case SUBMIT_ANSWER_SUCCESS:
      return {
        readyStatus:  SUBMIT_ANSWER_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
