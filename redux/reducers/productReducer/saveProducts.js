

export const SAVE_PRODUCTS_INVALID = 'SAVE_PRODUCTS_INVALID'
export const SAVE_PRODUCTS_REQUESTING = 'SAVE_PRODUCTS_REQUESTING'
export const SAVE_PRODUCTS_SUCCESS = 'SAVE_PRODUCTS_SUCCESS'
export const SAVE_PRODUCTS_FAILURE = 'SAVE_PRODUCTS_FAILURE'

const initialState = {
  readyStatus: SAVE_PRODUCTS_INVALID,
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
    case SAVE_PRODUCTS_REQUESTING:
      return {
        readyStatus:  SAVE_PRODUCTS_REQUESTING,
        err: null
      }
    case SAVE_PRODUCTS_FAILURE:
      return {
        readyStatus:  SAVE_PRODUCTS_FAILURE,
        err: action.err
      }
    case SAVE_PRODUCTS_SUCCESS:
      return {
        readyStatus:  SAVE_PRODUCTS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
