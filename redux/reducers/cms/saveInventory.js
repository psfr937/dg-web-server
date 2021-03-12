

export const SAVE_INVENTORY_INVALID = 'SAVE_INVENTORY_INVALID'
export const SAVE_INVENTORY_REQUESTING = 'SAVE_INVENTORY_REQUESTING'
export const SAVE_INVENTORY_SUCCESS = 'SAVE_INVENTORY_SUCCESS'
export const SAVE_INVENTORY_FAILURE = 'SAVE_INVENTORY_FAILURE'

const initialState = {
  readyStatus: SAVE_INVENTORY_INVALID,
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
    case SAVE_INVENTORY_REQUESTING:
      return {
        readyStatus:  SAVE_INVENTORY_REQUESTING,
        err: null
      }
    case SAVE_INVENTORY_FAILURE:
      return {
        readyStatus:  SAVE_INVENTORY_FAILURE,
        err: action.err
      }
    case SAVE_INVENTORY_SUCCESS:
      return {
        readyStatus:  SAVE_INVENTORY_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
