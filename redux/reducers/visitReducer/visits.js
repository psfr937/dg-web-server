/* @flow */

import fp from 'lodash/fp';

export const FETCH_VISITS_INVALID = 'FETCH_VISITS_INVALID'
export const FETCH_VISITS_REQUESTING = 'FETCH_VISITS_REQUESTING'
export const FETCH_VISITS_SUCCESS = 'FETCH_VISITS_SUCCESS'
export const FETCH_VISITS_FAILURE = 'FETCH_VISITS_FAILURE'

const initialState = {}
// {  1: {
//   readyStatus: FETCH_VISITS_INVALID,
//   err: null,
//   data: {}
//  }
// }


export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_VISITS_REQUESTING:
      return {...state,
        [action.clientId]: {
          readyStatus: FETCH_VISITS_REQUESTING,
          err: null
        }
      }
    case FETCH_VISITS_FAILURE:
      return {...state,
        [action.clientId]: {
          readyStatus:  FETCH_VISITS_FAILURE,
          err: action.err
        }
      }
    case FETCH_VISITS_SUCCESS:
      return {...state,
        [action.clientId]: {
          readyStatus:  FETCH_VISITS_SUCCESS,
          data: action.data
        }
      }
    case FETCH_VISITS_INVALID:
      return {...state,
        [action.clientId]: {
          readyStatus:  FETCH_VISITS_INVALID,
          data: action.data
        }
      }
    default:
      return state;
  }
};
