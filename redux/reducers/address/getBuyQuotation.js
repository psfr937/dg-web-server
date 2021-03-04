

export const GET_BUY_QUOTATION_INVALID = 'GET_BUY_QUOTATION_INVALID';
export const GET_BUY_QUOTATION_REQUESTING = 'GET_BUY_QUOTATION_REQUESTING';
export const GET_BUY_QUOTATION_SUCCESS = 'GET_BUY_QUOTATION_SUCCESS';
export const GET_BUY_QUOTATION_FAILURE = 'GET_BUY_QUOTATION_FAILURE';

const initialState = {
  readyStatus: GET_BUY_QUOTATION_INVALID,
  err: null,
  data: null
};

export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case GET_BUY_QUOTATION_REQUESTING:
      return {
        readyStatus:  GET_BUY_QUOTATION_REQUESTING,
        err: null
      };
    case GET_BUY_QUOTATION_FAILURE:
      return {
        readyStatus:  GET_BUY_QUOTATION_FAILURE,
        err: action.err
      };
    case GET_BUY_QUOTATION_SUCCESS:
      return {
        readyStatus:  GET_BUY_QUOTATION_SUCCESS,
        data: action.data,
      };
    default:
      return state;
  }
};
