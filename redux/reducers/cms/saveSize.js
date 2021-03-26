

export const SAVE_SIZE_INVALID = 'SAVE_SIZE_INVALID'
export const SAVE_SIZE_REQUESTING = 'SAVE_SIZE_REQUESTING'
export const SAVE_SIZE_SUCCESS = 'SAVE_SIZE_SUCCESS'
export const SAVE_SIZE_FAILURE = 'SAVE_SIZE_FAILURE'

const initialState = {
  readyStatus: SAVE_SIZE_INVALID,
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
    case SAVE_SIZE_REQUESTING:
      return {
        readyStatus:  SAVE_SIZE_REQUESTING,
        err: null
      }
    case SAVE_SIZE_FAILURE:
      return {
        readyStatus:  SAVE_SIZE_FAILURE,
        err: action.err
      }
    case SAVE_SIZE_SUCCESS:
      return {
        readyStatus:  SAVE_SIZE_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
