
import { pushErrors } from './errorAction';
import { arrayOfPlans } from "../../schemas";
import { normalize } from "normalizr";
import planAPI from '../../api/plans'

import { FETCH_PLANS_SUCCESS } from "../reducers/fetchPlans";
import {SUBSCRIBE_FAILURE, SUBSCRIBE_INVALID, SUBSCRIBE_REQUESTING} from "../reducers/plans/subscribe";
import { SELECT_PLAN } from "../reducers/plans/selectPlan";
import paymentAPI from "../../api/carts";
import router from "next/dist/client/router";

export const fetchPlans = () => async (
  dispatch,
  getState,
  apiEngine
) => {

  if(getState().fetchPlans.readyStatus === FETCH_PLANS_SUCCESS) return;
  try {
    const json = await planAPI(apiEngine).list()
    const normalizedData = await normalize(json.data.data, arrayOfPlans);
    console.log(normalizedData)
    let plans = normalizedData.entities.plans
    if(typeof plans === 'undefined') plans = {}

    dispatch({type: FETCH_PLANS_SUCCESS, data: plans})
  } catch (err) {
    dispatch(pushErrors(err))
  }
};

export const subscribe = (pmId, token) => async (
  dispatch,
  getState,
  apiEngine
) => {
  const planId = getState().subscribe.planId;
  const pmId = getState().subscribe.pmId;
  const readyStatus = getState().subscribe.readyStatus;
  console.log(readyStatus)
  if (readyStatus !== SUBSCRIBE_INVALID &&
    readyStatus !== SUBSCRIBE_FAILURE
  ) return

  dispatch({type: SUBSCRIBE_REQUESTING});
  const json = await paymentAPI(apiEngine).subscribe({pmId, token});
  console.log(json.data.data);

  return json.data.data
};

export const selectPlan = (id) => async( dispatch,
                                         getState,
                                         apiEngine,
) => {
  dispatch({type: SELECT_PLAN, data: id});
  router.push('/subscribe')
};

