export const FETCH_PLTS_INVALID = 'FETCH_PLTS_INVALID'
export const FETCH_PLTS_REQUESTING = 'FETCH_PLTS_REQUESTING'
export const FETCH_PLTS_SUCCESS = 'FETCH_PLTS_SUCCESS'
export const FETCH_PLTS_FAILURE = 'FETCH_PLTS_FAILURE'


const initialState = {
  mailLabel: true,
  recycleUnused: false,
  packList: []
};


export default (state, action) => {
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_PLTS_REQUESTING:
      return {
        readyStatus:  FETCH_PLTS_REQUESTING,
        err: null
      }
    case FETCH_PLTS_FAILURE:
      return {
        readyStatus:  FETCH_PLTS_FAILURE,
        err: action.err
      }
    case FETCH_PLTS_SUCCESS:
      return {
        readyStatus:  FETCH_PLTS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
