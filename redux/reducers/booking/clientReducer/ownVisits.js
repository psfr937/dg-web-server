/* @flow */

import fp from 'lodash/fp';

export const FETCH_OWN_VISITS_INVALID = 'FETCH_OWN_VISITS_INVALID'
export const FETCH_OWN_VISITS_REQUESTING = 'FETCH_OWN_VISITS_REQUESTING'
export const FETCH_OWN_VISITS_SUCCESS = 'FETCH_OWN_VISITS_SUCCESS'
export const FETCH_OWN_VISITS_FAILURE = 'FETCH_OWN_VISITS_FAILURE'

const initialState = {
  readyStatus: FETCH_OWN_VISITS_INVALID,
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
    case FETCH_OWN_VISITS_REQUESTING:
      return {
        readyStatus:  FETCH_OWN_VISITS_REQUESTING,
        err: null
      }
    case FETCH_OWN_VISITS_FAILURE:
      return {
        readyStatus:  FETCH_OWN_VISITS_FAILURE,
        err: action.err
      }
    case FETCH_OWN_VISITS_SUCCESS:
      return {
        readyStatus:  FETCH_OWN_VISITS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
