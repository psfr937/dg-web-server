
export const SELECT_PM = 'SELECT_PM';

const initialState = {
  selectedPmId: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SELECT_PM:
      return {...state,
        selectedPmId: action.data
      }
    default:
      return state
  }
};
