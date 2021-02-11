/* @flow */

import fp from 'lodash/fp';

export const FETCH_DATA_INVALID = 'FETCH_DATA_INVALID'
export const FETCH_DATA_REQUESTING = 'FETCH_DATA_REQUESTING'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

const initialState = {
  readyStatus: FETCH_DATA_INVALID,
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
    case FETCH_DATA_REQUESTING:
      return {
        readyStatus:  FETCH_DATA_REQUESTING,
        err: null
      }
    case FETCH_DATA_FAILURE:
      return {
        readyStatus:  FETCH_DATA_FAILURE,
        err: action.err
      }
    case FETCH_DATA_SUCCESS:
      return {
        readyStatus:  FETCH_DATA_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
