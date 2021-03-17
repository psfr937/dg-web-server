import {HYDRATE} from "next-redux-wrapper";

export const SET_INVENTORY_VALUE = 'SET_INVENTORY_VALUE';
export const SET_ATTACHMENT = 'SET_ATTACHMENT';
export const CLONE_INVENTORY = 'CLONE_INVENTORY';
export const REMOVE_ATTACHMENT = 'REMOVE_ATTACHMENT';
export const SET_PRICE = 'SET_PRICE';
export const SET_TEXT = 'SET_TEXT';
export const SET_BRAND = 'SET_BRAND';
export const SET_SELLER = 'SET_SELLER';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const INV_ADD_SIZE = 'INV_ADD_SIZE';
export const INV_REMOVE_SIZE = 'INV_REMOVE_SIZE';
export const INV_SET_SIZE = 'INV_SET_SIZE';
const initState = {
};

export default (state = initState, action) => {
  let idx;
  switch(action.type) {
    case HYDRATE:
      return {...state, ...action.payload.editInventory};
    case SET_TEXT:
      const languageIdx = state.text.findIndex(t => t.language === action.language);
      const language = state.text[languageIdx]= {
        ...state.text[languageIdx],
        [action.key]: action.value
      };
      const text = state.text.slice(0, languageIdx).concat(language, ...state.text.slice(languageIdx + 1));

      return {
        ...state,
        text
      };
    case SET_BRAND:
      return {
        ...state,
        brand: action.value
      };
    case SET_SELLER:
      return {
        ...state,
        seller: action.value
      };
    case SET_PRICE:
      return {
        ...state,
        price: action.value
      };
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, action.add]
      };
    case REMOVE_TAG:
      idx = state.tags.findIndex(t => t.id === action.id);
      return {
        ...state,
        tags: state.tags
          .slice(0, idx)
          .concat(state.tags.slice( idx + 1))
      };
    case CLONE_INVENTORY:
      console.log(action.data);
      return action.data;
    case SET_ATTACHMENT:
      if(!('images' in state)) return state;
      return {
        ...state,
        images: [
          ...state.images, ...action.data
        ]
      };
    case INV_ADD_SIZE:
      return {
        ...state,
        sizes: [
          ...state.sizes, action.data
        ]
      };
    case INV_REMOVE_SIZE:
      console.log(idx)
      return {
        ...state,
        sizes: state.sizes
          .slice(0, action.idx)
          .concat(state.sizes.slice( action.idx + 1))
      };
    case INV_SET_SIZE:
      console.log(idx)
      return {
        ...state,
        sizes: state.sizes
          .slice(0, action.idx)
          .concat(action.value, state.sizes.slice( action.idx + 1))
      };
    case REMOVE_ATTACHMENT:
      if(!('images' in state)) return state;
      console.log(state.images);
      console.log(action.idx);
      const newImages = state.images
        .slice(0, action.idx)
        .concat(state.images.slice( action.idx + 1));
      console.log(newImages);
      return {
        ...state,
        images: newImages
      };
    default:
      return state
  }
};
