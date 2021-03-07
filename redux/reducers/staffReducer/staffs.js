/* @flow */

import fp from 'lodash/fp';

export const FETCH_STAFFS_INVALID = 'FETCH_STAFFS_INVALID'
export const FETCH_STAFFS_REQUESTING = 'FETCH_STAFFS_REQUESTING'
export const FETCH_STAFFS_SUCCESS = 'FETCH_STAFFS_SUCCESS'
export const FETCH_STAFFS_FAILURE = 'FETCH_STAFFS_FAILURE'

const initialState = {
  readyStatus: FETCH_STAFFS_INVALID,
  err: null,
  data: {}
}


export default (state, action) => {
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_STAFFS_REQUESTING:
      return {
        readyStatus:  FETCH_STAFFS_REQUESTING,
        err: null
      }
    case FETCH_STAFFS_FAILURE:
      return {
        readyStatus:  FETCH_STAFFS_FAILURE,
        err: action.err
      }
    case FETCH_STAFFS_SUCCESS:
      return {
        readyStatus:  FETCH_STAFFS_SUCCESS,
        data: action.data
      }

    default:
      return state;
  }
};
