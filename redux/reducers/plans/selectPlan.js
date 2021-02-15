
export const SELECT_PLAN = 'SELECT_PLAN';

const initialState = {
  selectedPlanId: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SELECT_PLAN:
      return {...state,
        selectedPlanId: action.data
      }
    default:
      return state
  }
};
