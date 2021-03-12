

export const SAVE_CLIENTS_INVALID = 'SAVE_CLIENTS_INVALID'
export const SAVE_CLIENTS_REQUESTING = 'SAVE_CLIENTS_REQUESTING'
export const SAVE_CLIENTS_SUCCESS = 'SAVE_CLIENTS_SUCCESS'
export const SAVE_CLIENTS_FAILURE = 'SAVE_CLIENTS_FAILURE'

const initialState = {
  readyStatus: SAVE_CLIENTS_INVALID,
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
    case SAVE_CLIENTS_REQUESTING:
      return {
        readyStatus:  SAVE_CLIENTS_REQUESTING,
        err: null
      }
    case SAVE_CLIENTS_FAILURE:
      return {
        readyStatus:  SAVE_CLIENTS_FAILURE,
        err: action.err
      }
    case SAVE_CLIENTS_SUCCESS:
      return {
        readyStatus:  SAVE_CLIENTS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
