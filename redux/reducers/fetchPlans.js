/* @flow */

import fp from 'lodash/fp';

export const FETCH_PLANS_INVALID = 'FETCH_PLANS_INVALID'
export const FETCH_PLANS_REQUESTING = 'FETCH_PLANS_REQUESTING'
export const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS'
export const FETCH_PLANS_FAILURE = 'FETCH_PLANS_FAILURE'


const initialState = {
  readyStatus: FETCH_PLANS_INVALID,
  err: null,
  data: {},
  selectedPlanId: null
}


export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_PLANS_REQUESTING:
      return {
        readyStatus:  FETCH_PLANS_REQUESTING,
        err: null
      }
    case FETCH_PLANS_FAILURE:
      return {
        readyStatus:  FETCH_PLANS_FAILURE,
        err: action.err
      }
    case FETCH_PLANS_SUCCESS:
      return {
        readyStatus:  FETCH_PLANS_SUCCESS,
        data: action.data
      }


    default:
      return state;
  }
};
