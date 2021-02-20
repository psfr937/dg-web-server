export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

const initialState = [];

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case ADD_CART_ITEM:
      return [...state, action.data];
    case REMOVE_CART_ITEM:
      return [...state.filter(d => d !== action.id)];
    default:
      return state
  }
};
