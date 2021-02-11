
import { pushErrors } from './errorAction';
import { arrayOfPlans } from "../../schemas";
import { normalize } from "normalizr";
import planAPI from '../../api/plans'

import { FETCH_PLANS_SUCCESS } from "../reducers/fetchPlans";

export const fetchPlans = () => async (
  dispatch,
  getState,
  apiEngine
) => {

  if(getState().fetchPlans.readyStatus === FETCH_PLANS_SUCCESS) return
  try {
    const json = await planAPI(apiEngine).list()
    const normalizedData = await normalize(json.data.data, arrayOfPlans)
    console.log(normalizedData)
    let plans = normalizedData.entities.plans
    if(typeof plans === 'undefined') plans = {}

    dispatch({type: FETCH_PLANS_SUCCESS, data: plans})
  } catch (err) {
    dispatch(pushErrors(err))
  }
};
