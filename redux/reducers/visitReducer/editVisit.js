import fp from 'lodash/fp';

export const SET_EDIT_VISIT_COPY = 'SET_EDIT_VISIT_COPY'
export const ADD_EDIT_VISIT_ROW = 'SET_EDIT_VISIT_ROW'
export const EDIT_VISIT_ROW = 'EDIT_VISIT_ROW'
export const DELETE_VISIT_ROW = 'DELETE_VISIT_ROW'
export const UPDATE = 'UPDATE'
export const CREATE = 'CREATE'
export const DELETE = 'DELETE'
export const ADD_SERVICE = 'ADD_SERVICE'
export const REMOVE_SERVICE = 'REMOVE_SERVICE'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const initialState =  {}

const deleteProperty = ({[key]: _, ...newObj}, key) => newObj;

export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }
  let item;

  switch (action.type) {
    case SET_EDIT_VISIT_COPY:
      return action.data
    case ADD_EDIT_VISIT_ROW:
      const minId =  Math.min.apply(null, Object.keys(state))
      let id = (minId >= 0) ? -1 : minId -1
      console.log(id)
      return {...state, [id]: {
          id: id,
          products: [],
          title: `Visit no. ${Object.keys(state).length + 1}`,
          staff_id: null,
          main_description: "",
          evidence: "",
          history: "",
          services: [],
          action: CREATE
        }}
    case EDIT_VISIT_ROW:
      item = state[action.id]
      console.log(action)
      return {...state,
        [action.id]: {
          ...item,
          [action.field]: action.value,
          action: item.action === CREATE ? CREATE : UPDATE
        }}
    case DELETE_VISIT_ROW:
      return deleteProperty(state, [action.id])
    case ADD_SERVICE:
    
      if(!(action.visitId in state)){
        return state
      }
      item = state[action.visitId]

      const originalServiceData = 'services' in item
      ? item.services : []
      return {
        ...state,
        [action.visitId]: {
          ...item,
          services: [ ...originalServiceData, {
            ...action.value,
            action: CREATE
          }
          ],
          action: item.action === CREATE ? CREATE : UPDATE
        }
      }
    case REMOVE_SERVICE:
      return {
        ...state,
        [action.visitId]: {
          ...item,
          services: [ ...state[action.visitId].services, {
            ...action.value,
            removed: true,
            action: DELETE
          }],
          action: item.action === CREATE ? CREATE : UPDATE
        }
      }
    case ADD_PRODUCT:

      if(!(action.visitId in state)){
        return state
      }
      item = state[action.visitId]

      const originalProductData = 'products' in item
        ? item.products : []
      return {
        ...state,
        [action.visitId]: {
          ...item,
          products: [
            ...originalProductData,
            {
              ...action.value,
              action: CREATE
            }
          ],
          action: item.action === CREATE ? CREATE : UPDATE
        }
      }
    case REMOVE_PRODUCT:
      return {
        ...state,
        [action.visitId]: {
          ...item,
          products: [ ...state[action.visitId].products, {
            ...action.value,
            removed: true,
            action: DELETE
          }],
          action: item.action === CREATE ? CREATE : UPDATE
        }
      }
    default:
      return state;
  }
};
