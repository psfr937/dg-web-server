
export const FETCH_INVENTORIES = 'FETCH_INVENTORIES'
export const FETCH_INVENTORIES_INVALID = 'FETCH_INVENTORIES_INVALID'
export const FETCH_INVENTORIES_REQUESTING = 'FETCH_INVENTORIES_REQUESTING'
export const FETCH_INVENTORIES_SUCCESS = 'FETCH_INVENTORIES_SUCCESS'
export const FETCH_INVENTORIES_FAILURE = 'FETCH_INVENTORIES_FAILURE'

const initialState = {
  readyStatus: FETCH_INVENTORIES_INVALID,
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
    case FETCH_INVENTORIES_REQUESTING:
      return {
        ...state,
        readyStatus:  FETCH_INVENTORIES_REQUESTING,
        err: null
      }
    case FETCH_INVENTORIES_FAILURE:
      return {
        ...state,
        readyStatus:  FETCH_INVENTORIES_FAILURE,
        err: action.err
      }
    case FETCH_INVENTORIES_SUCCESS:
      return {
        ...state,
        readyStatus:  FETCH_INVENTORIES_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
