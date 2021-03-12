/* @flow */

import fp from 'lodash/fp';

export const SET_EDIT_CLIENT_COPY = 'SET_EDIT_CLIENT_COPY'
export const ADD_EDIT_CLIENT_ROW = 'SET_EDIT_CLIENT_ROW'
export const EDIT_CLIENT_ROW = 'EDIT_CLIENT_ROW'
export const UPDATE = 'UPDATE'
export const CREATE = 'CREATE'
export const DELETE = 'DELETE'

const initialState =  {}

const deleteProperty = ({[key]: _, ...newObj}, key) => newObj;

export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SET_EDIT_CLIENT_COPY:
      return action.data
    case ADD_EDIT_CLIENT_ROW:
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
    case EDIT_CLIENT_ROW:
      console.log(state)
      console.log(action)
      const item = state[action.id]
      if(action.field === 'removed'){
        return {...state,
          [action.id]: {
            ...item,
            removed: action.value,
            action: DELETE
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
