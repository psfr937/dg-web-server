

export const FETCH_SERVICES_INVALID = 'FETCH_SERVICES_INVALID'
export const FETCH_SERVICES_REQUESTING = 'FETCH_SERVICES_REQUESTING'
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS'
export const FETCH_SERVICES_FAILURE = 'FETCH_SERVICES_FAILURE'

const initialState = {
  readyStatus: FETCH_SERVICES_INVALID,
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
    case FETCH_SERVICES_REQUESTING:
      return {
        readyStatus:  FETCH_SERVICES_REQUESTING,
        err: null
      }
    case FETCH_SERVICES_FAILURE:
      return {
        readyStatus:  FETCH_SERVICES_FAILURE,
        err: action.err
      }
    case FETCH_SERVICES_SUCCESS:
      return {
        readyStatus:  FETCH_SERVICES_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
