import clientAPI from '../../../api/clients'
import {FETCH_CLIENTS_SUCCESS} from "../../reducers/clientReducer/clients";
import { SAVE_CLIENTS_SUCCESS} from "../../reducers/clientReducer/saveClients";
import {SET_EDIT_CLIENT_COPY,
  UPDATE, CREATE, DELETE
} from "../../reducers/clientReducer/editClient";
import {SET_READ_ONLY} from "../../reducers/ux";
import {normalize} from "normalizr";
import {arrayOfClient} from "../../../schemas";
import {FETCH_SERVICES_FAILURE} from "../../reducers/serviceReducer/services";
import {select, put, call, takeEvery} from "redux-saga/effects"

const compare = (newData) => {
  const valueArray =  Object.keys(newData).map(k => newData[k])
  const createList = valueArray.filter(c => c.action === CREATE)
  const updateList =  valueArray.filter(c => c.action === UPDATE)
  const deleteList =  valueArray.filter(c => c.action === DELETE)
  return {
    createList, updateList, deleteList
  }
}

export function* saveClients(){
  const originalData = yield select(state => state.clients.readyStatus.data)
  const newData = yield select(state => state.editClient);
  const updateDetail = compare(newData)
  try {
    const json = yield call(clientAPI.update, updateDetail);
    console.log(json.data.data)
    const normalizedData = yield call(normalize, json.data.data, arrayOfClient);
    const data = normalizedData.entities.clients;
    console.log(data);
    yield put({type: SAVE_CLIENTS_SUCCESS, data: data});
    yield put({type: SET_READ_ONLY, listName: 'clientList', value: true})
    yield put({type: SET_EDIT_CLIENT_COPY, data: data});
    yield put({type: FETCH_CLIENTS_SUCCESS, data: {} } );
    yield put({type: FETCH_CLIENTS_SUCCESS, data: data } )
  } catch (err) {
    yield put({type: FETCH_SERVICES_FAILURE, err: err})
  }
};

