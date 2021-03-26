import {HYDRATE} from "next-redux-wrapper";

export const SIZE_LOG_SWAP = 'LOG_SWAP';
export const SIZE_LOG_ADD = 'LOG_ADD';
export const SIZE_LOG_REMOVE = 'LOG_REMOVE';
export const SIZE_LOG_EDIT = 'LOG_EDIT';
export const SIZE_LOG_CLEAR = 'CLEAR_LOG';

const initState = [];

export default (state = initState, action) => {
  switch(action.type) {
    case HYDRATE:
      return {...state, ...action.payload.editInventory};
    case LOG_SWAP:
      return [
        ...state,
        {
          item: action.item, // 'size' 'measurement'
          operation: 'swap', // 'remove'
          from: action.from,
          to: action.to
        }
      ];
    case LOG_ADD:
      return [
        ...state,
        {
          item: action.item, // 'size' 'measurement'
          operation: 'add', // 'remove'
          name: action.name,
          position: action.position
        }
      ];
    case LOG_REMOVE:
      return [
        ...state,
        {
          item: action.item, // 'size' 'measurement'
          operation: 'remove', // 'remove'
          position: action.position
        }
      ];
    case LOG_EDIT:
      return [
        ...state,
        {
          item: action.item, // 'size' 'measurement'
          operation: 'edit', // 'remove'
          position: action.position,
          name: action.name
        }
      ];
    case CLEAR_LOG:
      return initState;
    default:
      return state
  }
};
