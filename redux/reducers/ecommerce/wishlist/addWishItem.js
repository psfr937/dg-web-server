

export const ADD_WISH_ITEM_INVALID = 'ADD_WISH_ITEM_INVALID';
export const ADD_WISH_ITEM_REQUESTING = 'ADD_WISH_ITEM_REQUESTING';
export const ADD_WISH_ITEM_FAILURE = 'ADD_WISH_ITEM_FAILURE';
export const ADD_WISH_ITEM_SUCCESS = 'ADD_WISH_ITEM_SUCCESS';
const initialState = {
  readyStatus: ADD_WISH_ITEM_INVALID,
  err: null,
  data: null
};

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case ADD_WISH_ITEM_REQUESTING:
      return {...state,
        readyStatus:  ADD_WISH_ITEM_REQUESTING,
      };
    case ADD_WISH_ITEM_SUCCESS:
      return {...state,
        readyStatus: ADD_WISH_ITEM_SUCCESS,
        data: action.data
      };
    case ADD_WISH_ITEM_FAILURE:
      return {...state,
        readyStatus:  ADD_WISH_ITEM_FAILURE,
        err: action.err
      };
    default:
      return state
  }
};
