

export const FETCH_ONE_INVENTORY_REQUESTING = 'FETCH_ONE_INVENTORY_REQUESTING';
export const FETCH_ONE_INVENTORY_SUCCESS = 'FETCH_ONE_INVENTORY_SUCCESS';
export const FETCH_ONE_INVENTORY_FAILURE = 'FETCH_ONE_INVENTORY_FAILURE';

const initialState = {};
/*
{
  1: {
    readyStatus: FETCH_ONE_INVENTORY_INVALID,
    err: null,
    data: {}
  }
}
 */


export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case FETCH_ONE_INVENTORY_REQUESTING:
      return {
        ...state,
        [action.pid]: {
          status: FETCH_ONE_INVENTORY_REQUESTING,
          err: null,
          data: null
        }
      };

    case FETCH_ONE_INVENTORY_FAILURE:
      return {
        ...state,
        [action.pid]: {
          status: FETCH_ONE_INVENTORY_FAILURE,
          err: action.err,
          data: null
        }
      };

    case FETCH_ONE_INVENTORY_SUCCESS:
      return {
        ...state,
        [action.pid]: {
          status: FETCH_ONE_INVENTORY_SUCCESS,
          err: null,
          data: action.data
        }
      };
    default:
      return state;
  }
};
