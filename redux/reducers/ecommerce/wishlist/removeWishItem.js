
export const REMOVE_WISH_ITEM_INVALID = 'REMOVE_WISH_ITEM_INVALID';
export const REMOVE_WISH_ITEM_REQUESTING = 'REMOVE_WISH_ITEM_REQUESTING';
export const REMOVE_WISH_ITEM_FAILURE = 'REMOVE_WISH_ITEM_FAILURE';
export const REMOVE_WISH_ITEM_SUCCESS = 'REMOVE_WISH_ITEM_SUCCESS';
const initialState = {
  readyStatus: REMOVE_WISH_ITEM_INVALID,
  err: null,
  data: null
};

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case REMOVE_WISH_ITEM_REQUESTING:
      return {...state,
        readyStatus:  REMOVE_WISH_ITEM_REQUESTING,
      };
    case REMOVE_WISH_ITEM_SUCCESS:
      return {...state,
        readyStatus: REMOVE_WISH_ITEM_SUCCESS,
        data: action.data
      };
    case REMOVE_WISH_ITEM_FAILURE:
      return {...state,
        readyStatus:  REMOVE_WISH_ITEM_FAILURE,
        err: action.err
      };
    default:
      return state
  }
};
