/* @flow */

import fp from 'lodash/fp';

export const FETCH_CLIENTS_INVALID = 'FETCH_CLIENTS_INVALID'
export const FETCH_CLIENTS_REQUESTING = 'FETCH_CLIENTS_REQUESTING'
export const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS'
export const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE'

const initialState = {
    readyStatus: FETCH_CLIENTS_INVALID,
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
    case FETCH_CLIENTS_REQUESTING:
      return {
          readyStatus:  FETCH_CLIENTS_REQUESTING,
          err: null
        }
    case FETCH_CLIENTS_FAILURE:
      return {
          readyStatus:  FETCH_CLIENTS_FAILURE,
          err: action.err
        }
    case FETCH_CLIENTS_SUCCESS:
      return {
          readyStatus:  FETCH_CLIENTS_SUCCESS,
          data: action.data
      }

    default:
      return state;
  }
};
