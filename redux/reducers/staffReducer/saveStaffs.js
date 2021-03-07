

export const SAVE_STAFFS_INVALID = 'SAVE_STAFFS_INVALID'
export const SAVE_STAFFS_REQUESTING = 'SAVE_STAFFS_REQUESTING'
export const SAVE_STAFFS_SUCCESS = 'SAVE_STAFFS_SUCCESS'
export const SAVE_STAFFS_FAILURE = 'SAVE_STAFFS_FAILURE'

const initialState = {
  readyStatus: SAVE_STAFFS_INVALID,
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
    case SAVE_STAFFS_REQUESTING:
      return {
        readyStatus:  SAVE_STAFFS_REQUESTING,
        err: null
      }
    case SAVE_STAFFS_FAILURE:
      return {
        readyStatus:  SAVE_STAFFS_FAILURE,
        err: action.err
      }
    case SAVE_STAFFS_SUCCESS:
      return {
        readyStatus:  SAVE_STAFFS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
