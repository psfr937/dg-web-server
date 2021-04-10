export const OFFLINE_ADD_WISH_ITEM = 'OFFLINE_ADD_WISH_ITEM';
export const OFFLINE_REMOVE_WISH_ITEM = 'OFFLINE_REMOVE_WISH_ITEM';

const initialState = [];

export default (state, action) => {
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case OFFLINE_ADD_WISH_ITEM:
      return [...state, action.id];
    case OFFLINE_REMOVE_WISH_ITEM:
      return [...state.filter(d => d !== action.id)];
    default:
      return state
  }
};