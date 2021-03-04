
import pmAPI from '../../api/pms'
import {  FETCH_PMS_SUCCESS, FETCH_PMS, FETCH_PMS_FAILURE } from "../reducers/pms";
import {normalize} from "normalizr";
import {arrayOfPms} from "../../schemas";
import { call, put, select, takeEvery } from "redux-saga/effects"

function *fetchPms(){
  const readyStatus = select( state => state.fetchPms.readyStatus);
  if(readyStatus === FETCH_PMS_SUCCESS) return;
  try {
    const json = yield call(pmAPI.list);
    const normalizedData = yield call(normalize, json.data.data, arrayOfPms);
    console.log(normalizedData);
    let pms = normalizedData.entities.pms;
    if(typeof pms === 'undefined') pms = {};

    yield put({type: FETCH_PMS_SUCCESS, data: pms})
  } catch (err) {
    yield put({type: FETCH_PMS_FAILURE, err: err})
  }
}

export default [
  takeEvery(FETCH_PMS, fetchPms)
]

