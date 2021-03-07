

export const SAVE_VISITS_INVALID = 'SAVE_VISITS_INVALID'
export const SAVE_VISITS_REQUESTING = 'SAVE_VISITS_REQUESTING'
export const SAVE_VISITS_SUCCESS = 'SAVE_VISITS_SUCCESS'
export const SAVE_VISITS_FAILURE = 'SAVE_VISITS_FAILURE'

const initialState = {
  readyStatus: SAVE_VISITS_INVALID,
  err: null,
  data: []
}


export default (state, action) => {
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SAVE_VISITS_REQUESTING:
      return {
        readyStatus:  SAVE_VISITS_REQUESTING,
        err: null
      }
    case SAVE_VISITS_FAILURE:
      return {
        readyStatus:  SAVE_VISITS_FAILURE,
        err: action.err
      }
    case SAVE_VISITS_SUCCESS:
      return {
        readyStatus:  SAVE_VISITS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
