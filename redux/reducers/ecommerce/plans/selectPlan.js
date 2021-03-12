
export const SELECT_PLAN = 'SELECT_PLAN';
export const SELECT_PLAN_SAGA = 'SELECT_PLAN_SAGA'

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
