import {HYDRATE} from 'next-redux-wrapper';

export const FETCH_ONE_INVENTORY_REQUESTING = 'FETCH_ONE_INVENTORY_REQUESTING';
export const FETCH_ONE_INVENTORY_SUCCESS = 'FETCH_ONE_INVENTORY_SUCCESS';
export const FETCH_ONE_INVENTORY_FAILURE = 'FETCH_ONE_INVENTORY_FAILURE';
export const FETCH_ONE_INVENTORY_INVALID = 'FETCH_ONE_INVENTORY_INVALID';
export const FETCH_ONE_INVENTORY = 'FETCH_ONE_INVENTORY'
export const SELECT_INVENTORY_ID = 'SELECT_INVENTORY_ID'

const initialState = {
  selectedInventoryId: null,
  readyStatus: FETCH_ONE_INVENTORY_INVALID,
  err: null,
  data: {}
};



export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.payload.oneInventory};
    case FETCH_ONE_INVENTORY_REQUESTING:
      return {
          readyStatus: FETCH_ONE_INVENTORY_REQUESTING,
          err: null,
          data: null
      };
    case FETCH_ONE_INVENTORY_FAILURE:
      return {
          readyStatus: FETCH_ONE_INVENTORY_FAILURE,
          err: action.err,
          data: null
      };

    case FETCH_ONE_INVENTORY_SUCCESS:
      return {
        readyStatus: FETCH_ONE_INVENTORY_SUCCESS,
        err: null,
        data: action.data
      };
    case SELECT_INVENTORY_ID:
      return {
        ...state,
        selectedInventoryId: action.id
      };
    default:
      return state;
  }
};
