export const SET_EDIT_SERVICE_COPY = 'SET_EDIT_SERVICE_COPY'
export const ADD_EDIT_SERVICE_ROW = 'SET_EDIT_SERVICE_ROW'
export const EDIT_SERVICE_ROW = 'EDIT_SERVICE_ROW'
export const REMOVE_SERVICE_ROW = 'REMOVE_SERVICE_ROW'
export const UPDATE = 'UPDATE'
export const CREATE = 'CREATE'
export const DELETE = 'DELETE'
export const EDIT_SERVICE_ATTACHMENT= 'EDIT_SERVICE_ATTACHMENT'

const initialState =  {}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }
  let item
  switch (action.type) {
    case SET_EDIT_SERVICE_COPY:
      return action.data
    case ADD_EDIT_SERVICE_ROW:
      const maxId = Math.max.apply(null, Object.keys(state))
      return {...state, [maxId+1]: {
          id: [maxId+1],
          name: 'No name',
          age: null,
          picture_url: null,
          gender: '',
          phone: '',
          email: '',
          hkid: '',
          referrer: '',
          address: '',
          registered_at: '',
          action: CREATE
        }}
    case EDIT_SERVICE_ROW:
      item = state[action.id]
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
    case EDIT_SERVICE_ATTACHMENT:
      item = state[action.id]
      return {...state,
        [action.id]: {
          ...item,
          ...action.data,
          action: item.action === CREATE ? CREATE : UPDATE,
          pictureUpdated: true
        }
      }
    default:
      return state;
  }
};
