

export const GET_QUOTATION_INVALID = 'GET_QUOTATION_INVALID';
export const GET_QUOTATION_REQUESTING = 'GET_QUOTATION_REQUESTING';
export const GET_QUOTATION_SUCCESS = 'GET_QUOTATION_SUCCESS';
export const GET_QUOTATION_FAILURE = 'GET_QUOTATION_FAILURE';
export const GET_QUOTATION = 'GET_QUOTATION';
export const SAVE_ADDRESS_GET_QUOTATION = 'SAVE_ADDRESS_GET_QUOTATION'

const initialState = {
  readyStatus: GET_QUOTATION_INVALID,
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
    case GET_QUOTATION_REQUESTING:
      return {
        readyStatus:  GET_QUOTATION_REQUESTING,
        err: null
      };
    case GET_QUOTATION_FAILURE:
      return {
        readyStatus:  GET_QUOTATION_FAILURE,
        err: action.err
      };
    case GET_QUOTATION_SUCCESS:
      return {
        readyStatus:  GET_QUOTATION_SUCCESS,
        data: action.data,
      };
    default:
      return state;
  }
};
