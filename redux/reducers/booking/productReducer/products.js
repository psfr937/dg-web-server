

export const FETCH_PRODUCTS_INVALID = 'FETCH_PRODUCTS_INVALID'
export const FETCH_PRODUCTS_REQUESTING = 'FETCH_PRODUCTS_REQUESTING'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

const initialState = {
  readyStatus: FETCH_PRODUCTS_INVALID,
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
    case FETCH_PRODUCTS_REQUESTING:
      return {
        readyStatus:  FETCH_PRODUCTS_REQUESTING,
        err: null
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        readyStatus:  FETCH_PRODUCTS_FAILURE,
        err: action.err
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        readyStatus:  FETCH_PRODUCTS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
