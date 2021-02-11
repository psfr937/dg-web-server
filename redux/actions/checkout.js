

import paymentAPI from '../../api/payments'
import { SELECT_PLAN,
  CHECKOUT_FAILURE, CHECKOUT_INVALID, CHECKOUT_REQUESTING} from "../reducers/checkout";
import router from 'next/router'

export const checkout = (token) => async (
  dispatch,
  getState,
  apiEngine
) => {
  const planId = getState().checkout.planId
  const readyStatus = getState().checkout.readyStatus
  console.log(readyStatus)
  if (readyStatus !== CHECKOUT_INVALID &&
    readyStatus !== CHECKOUT_FAILURE
  ) return

  dispatch({type: CHECKOUT_REQUESTING})
  const json = await paymentAPI(apiEngine).charge({planId, token})
  console.log(json.data.data)

  return json.data.data

};

export const selectPlan = (id) => async( dispatch,
                                         getState,
                                         apiEngine,
) => {
  dispatch({type: SELECT_PLAN, data: id})
  router.push('/checkout')
};
