import { arrayOfPlans } from "../../schemas";
import { normalize } from "normalizr";
import planAPI from '../../api/plans'

import { FETCH_PLANS_FAILURE, FETCH_PLANS_SUCCESS, FETCH_PLANS } from "../reducers/plans/plans";
import {SUBSCRIBE_FAILURE, SUBSCRIBE_SUCCESS, SUBSCRIBE_INVALID, SUBSCRIBE_REQUESTING} from "../reducers/plans/subscribe";
import { SELECT_PLAN, SELECT_PLAN_SAGA } from "../reducers/plans/selectPlan";
import paymentAPI from "../../api/carts";
import router from "next/dist/client/router";

import {call, select, put, takeEvery} from 'redux-saga/effects'
import {FETCH_INVENTORIES} from "../reducers/inventories";
import {FETCH_ONE_INVENTORY} from "../reducers/oneInventory";

function* fetchPlans(){
  const readyStatus = select(state => state.fetchPlans.readyStatus)
  if(readyStatus === FETCH_PLANS_SUCCESS) return;
  try {
    const json = yield call(planAPI.list)
    const normalizedData = yield call (normalize,json.data.data, arrayOfPlans);
    console.log(normalizedData)
    let plans = normalizedData.entities.plans
    if(typeof plans === 'undefined') plans = {}

    yield put({type: FETCH_PLANS_SUCCESS, data: plans})
  } catch (err) {
    yield put({type: FETCH_PLANS_FAILURE, err: err})
  }
}

function *subscribe({pmId, token}){
  const readyStatus = select(state => state.subscribe.readyStatus);
  if (readyStatus !== SUBSCRIBE_INVALID &&
    readyStatus !== SUBSCRIBE_FAILURE
  ) return

  yield put({type: SUBSCRIBE_REQUESTING});
  try {
    const json = yield call(paymentAPI.subscribe, {pmId, token});
    yield put({type: SUBSCRIBE_SUCCESS, data: json.data})
  }
  catch(err){
    yield put({type: SUBSCRIBE_FAILURE, err: err})
  }
}

function *selectPlan ({id}) {
  dispatch({type: SELECT_PLAN, data: id});
  yield call(router.push,'/subscribe')
}


export default [
  takeEvery(FETCH_PLANS, fetchPlans),
  takeEvery(SELECT_PLAN_SAGA, selectPlan)
]
