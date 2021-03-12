

export const SAVE_SERVICES_INVALID = 'SAVE_SERVICES_INVALID'
export const SAVE_SERVICES_REQUESTING = 'SAVE_SERVICES_REQUESTING'
export const SAVE_SERVICES_SUCCESS = 'SAVE_SERVICES_SUCCESS'
export const SAVE_SERVICES_FAILURE = 'SAVE_SERVICES_FAILURE'

const initialState = {
  readyStatus: SAVE_SERVICES_INVALID,
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
    case SAVE_SERVICES_REQUESTING:
      return {
        readyStatus:  SAVE_SERVICES_REQUESTING,
        err: null
      }
    case SAVE_SERVICES_FAILURE:
      return {
        readyStatus:  SAVE_SERVICES_FAILURE,
        err: action.err
      }
    case SAVE_SERVICES_SUCCESS:
      return {
        readyStatus:  SAVE_SERVICES_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
