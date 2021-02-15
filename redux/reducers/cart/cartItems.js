export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'

const initialState = [
  {
    id: '1',
    name: 'Ironman suit',
    unit_price: 200,
    size: 41,
    picture_url: 'https://checkout.stripe.dev/static/media/powdur.26f881f1.jpg',
  },
  {
    id: '2',
    name: 'Batman suit',
    unit_price: 300,
    size: 42,
    picture_url: 'https://checkout.stripe.dev/static/media/powdur.26f881f1.jpg',
  },
  {
    id: '3',
    name: 'Bibibo suit',
    unit_price: 400,
    size: 41,
    picture_url: 'https://checkout.stripe.dev/static/media/powdur.26f881f1.jpg',
  }
]

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case ADD_CART_ITEM:
      return [...state, action.data];
    case REMOVE_CART_ITEM:
      return [...state.filter(d => d.id !== action.id)];
    case UPDATE_CART_ITEM:
      return [...state.filter(d => d.id !== action.id), action.data];

    default:
      return state
  }
};
