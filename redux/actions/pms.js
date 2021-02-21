
import pmAPI from '../../api/pms'
import { ADD_PM, ADD_PM_INVALID, ADD_PM_FAILURE, ADD_PM_REQUESTING} from "../reducers/pms/addPm";
import {  FETCH_PMS_SUCCESS, FETCH_PMS, FETCH_PMS_FAILURE } from "../reducers/pms/pms";
import { SELECT_PM, SELECT_PM_SAGA } from "../reducers/pms/selectPm";
import {normalize} from "normalizr";
import {arrayOfPms} from "../../schemas";
import { call, put, select, takeEvery } from "redux-saga/effects"

function *fetchPms(){
  const readyStatus = select( state => state.fetchPms.readyStatus);
  if(readyStatus === FETCH_PMS_SUCCESS) return;
  try {
    const json = yield call(pmAPI.list);
    const normalizedData = yield call(normalize, json.data.data, arrayOfPms);
    console.log(normalizedData)
    let pms = normalizedData.entities.pms;
    if(typeof pms === 'undefined') pms = {};

    yield put({type: FETCH_PMS_SUCCESS, data: pms})
  } catch (err) {
    yield put({type: FETCH_PMS_FAILURE, err: err})
  }
}

function *addPm({token}){
  const readyStatus = select( state => state.addPm.readyStatus);
  if (readyStatus !== ADD_PM_INVALID &&
    readyStatus !== ADD_PM_FAILURE
  ) return;

  dispatch({type: ADD_PM_REQUESTING});
  const json = yield call(pmAPI.addPaymentMethod,{token});
  console.log(json.data.data);

  return json.data.data
}

function *selectPm(id) {
  dispatch({type: SELECT_PM, data: id});
}

export default [
  takeEvery(FETCH_PMS, fetchPms),
  takeEvery(ADD_PM, addPm),
  takeEvery(SELECT_PM_SAGA, selectPm)
]

