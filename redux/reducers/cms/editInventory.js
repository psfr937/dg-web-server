import {HYDRATE} from "next-redux-wrapper";

export const SET_INVENTORY_VALUE = 'SET_INVENTORY_VALUE';
export const SET_ATTACHMENT = 'SET_ATTACHMENT';
export const CLONE_INVENTORY = 'CLONE_INVENTORY';
export const REMOVE_ATTACHMENT = 'REMOVE_ATTACHMENT';
export const SET_PRICE = 'SET_PRICE';
export const SET_TEXT = 'SET_TEXT';
export const SET_BRAND = 'SET_BRAND';
const initState = {
};

export default (state = initState, action) => {
  switch(action.type) {
    case HYDRATE:
      return {...state, ...action.payload.editInventory};
    case SET_TEXT:
      const languageIdx = state.text.findIndex(t => t.language === action.language);
      const language = state.text[languageIdx]= {
        ...state.text[languageIdx],
        [action.key]: action.value
      }
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
    case SET_PRICE:
      return {
        ...state,
        price: action.value
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
    case REMOVE_ATTACHMENT:
      if(!('images' in state)) return state;
      console.log(state.images)
      console.log(action.idx);
      const newImages = state.images.slice(0, action.idx).concat(state.images.slice( action.idx + 1));
      console.log(newImages)
      return {
        ...state,
        images: newImages
      };
    default:
      return state
  }
};
