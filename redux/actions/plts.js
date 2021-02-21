import {FETCH_PLTS_SUCCESS, FETCH_PLTS_FAILURE, FETCH_PLTS} from "../reducers/plts";
import pltAPI from "../../api/plts";
import {normalize} from "normalizr";
import {arrayOfPlts} from "../../schemas";

import { call, select, put, takeEvery } from "redux-saga/effects"

function *plts(){
  const readyStatus = select(state => state.readyStatus);
  if(readyStatus === FETCH_PLTS_SUCCESS) return;
  try {
    const json = yield call(pltAPI.list);
    const normalizedData = yield call(normalize, json.data.data, arrayOfPlts);
    console.log(normalizedData)
    let plts = normalizedData.entities.plts;
    if(typeof plts === 'undefined') plts = {};

   yield put({type: FETCH_PLTS_SUCCESS, data: plts})
  } catch (err) {
    yield put({type: FETCH_PLTS_FAILURE, err: err})
  }
}

export default [
  takeEvery(FETCH_PLTS, plts),
]