
import clientAPI from '../../../../api/ecommerce/clients'
import {FETCH_CLIENTS_FAILURE, FETCH_CLIENTS_SUCCESS} from "../../../reducers/booking/clientReducer/clients";
import {SET_EDIT_CLIENT_COPY} from "../../../reducers/booking/clientReducer/editClient";
import { normalize, schema } from "normalizr";
import { arrayOfClient } from '../../../../schemas'
import {select, put, call, takeEvery} from "redux-saga/effects"

export const FETCH_CLIENTS = 'FETCH_CLIENTS';
export const RESET_EDIT_CLIENTS = 'RESET_EDIT_CLIENTS';

export function* fetchClients(){
  const clients = yield select(state => state.clients);
  if(clients.readyStatus === FETCH_CLIENTS_SUCCESS) return;
  try {
    const json = yield call(clientAPI.list);
    // console.log(json.data.data)
    const normalizedData = yield call(normalize,json.data.data, arrayOfClient);
    let data = normalizedData.entities.clients;
    if(typeof data === 'undefined') data = {};

    yield put({type: FETCH_CLIENTS_SUCCESS, data: data});
    yield put({type: SET_EDIT_CLIENT_COPY, data: data});
  } catch (err) {
    yield put({type: FETCH_CLIENTS_FAILURE, err: err})
  }
}


export function* resetEditClients(){
  const originalData = yield select(state => state.clients.data);
  yield put({type: SET_EDIT_CLIENT_COPY, data: originalData});
}


export default [
  takeEvery(FETCH_CLIENTS, fetchClients),
  takeEvery(RESET_EDIT_CLIENTS, fetchClients)
]
