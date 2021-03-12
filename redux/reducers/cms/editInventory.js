import fp from "lodash/fp";

export const SET_INVENTORY_VALUE = 'SET_INVENTORY_VALUE';
export const SET_ATTACHMENT = 'SET_ATTACHMENT';
export const CLONE_INVENTORY = 'CLONE_INVENTORY';
const initState = {
  title: '',
  body: '',
  tags: [],
  price: 0,
  brand: '',
  descriptionEn: '',
  attachment: {
    pictures: [],
    files: [],
    fileErrors: []
  },
};

export default (state = initState, action) => {
  console.log(action);
  switch(action.type) {
    case SET_INVENTORY_VALUE:
      return {
        ...state,
        [action.name]: action.value
      };
    case CLONE_INVENTORY:
      return action.data;
    case SET_ATTACHMENT:
      return {
        ...state,
        attachment: {
          ...state.attachment, ...action.value
        }
      };
    default:
      return state
  }
};
