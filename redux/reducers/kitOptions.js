export const SELECT_BAG = 'SELECT_BAG';
export const SELECT_RECYCLE_POLICY = 'SELECT_RECYCLE_POLICY';


const initialState = {
  bagTypeId: null,
  recycleUnused: true
};

export default (state, action) => {
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SELECT_BAG:
      return {
        ...state,
        bagTypeId: action.data
      };
    case SELECT_RECYCLE_POLICY:
      return {
        ...state,
        recycleUnused: action.data
      };
    default:
      return state;
  }
};
