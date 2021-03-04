import {FETCH_BTS_SUCCESS, FETCH_BTS_FAILURE} from "../reducers/bts";
import btAPI from "../../api/bts";
import {normalize} from "normalizr";
import {arrayOfBts} from "../../schemas";

export const FETCH_BTS = 'FETCH_BTS'

import { call, select, put, takeEvery, all } from "redux-saga/effects"
import {SELECT_BAG} from "../reducers/kitOptions";

function *fetchBts(){
  const readyStatus = select(state => state.readyStatus);
  if(readyStatus === FETCH_BTS_SUCCESS) return;
  try {
    const json = yield call(btAPI.list);
    const normalizedData = yield call(normalize, json.data.data, arrayOfBts);
    console.log(normalizedData)
    let bts = normalizedData.entities.bts;
    if(typeof bts === 'undefined') bts = {};
    console.log(Object.keys(bts))
    let firstId = parseInt(Object.keys(bts)[0]);
    yield all([
      put({type: SELECT_BAG, data: firstId }),
      put({type: FETCH_BTS_SUCCESS, data: bts}),
    ]);


  } catch (err) {
    yield put({type: FETCH_BTS_FAILURE, err: err})
  }
}

export default [
  takeEvery(FETCH_BTS, fetchBts),
]