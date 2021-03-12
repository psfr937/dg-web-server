/* @flow */

import fp from 'lodash/fp';

export const SET_EDIT_STAFF_COPY = 'SET_EDIT_STAFF_COPY'
export const ADD_EDIT_STAFF_ROW = 'SET_EDIT_STAFF_ROW'
export const EDIT_STAFF_ROW = 'EDIT_STAFF_ROW'
export const DELETE_STAFF_ROW = 'DELETE_STAFF_ROW'
export const UPDATE = 'UPDATE'
export const CREATE = 'CREATE'
export const DELETE = 'DELETE'

const initialState =  {}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SET_EDIT_STAFF_COPY:
      return action.data
    case ADD_EDIT_STAFF_ROW:
      const maxId = Math.max.apply(null, Object.keys(state))
      return {...state, [maxId+1]: {
        id: [maxId+1],
        name: 'No name',
        age: null,
        gender: '',
        phone: '',
        email: '',
        hkid: '',
        referrer: '',
        address: '',
        registered_at: null,
        action: CREATE
    }}
    case EDIT_STAFF_ROW:
      const item = state[action.id]
      if(action.field === 'removed'){
        return {...state,
          [action.id]: {
            ...item,
            removed: action.value
          }}
      }
      return {...state,
        [action.id]: {
          ...item,
          [action.field]: action.value,
          action: item.action === CREATE ? CREATE : UPDATE
        }}

    default:
      return state;
  }
};
