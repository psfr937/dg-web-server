import serviceAPI from '../../../../api/ecommerce/services'
import {SET_EDIT_SERVICE_COPY} from "../../../reducers/booking/serviceReducer/editService";
import { normalize, schema } from "normalizr";
import { arrayOfService } from '../../../../schemas'
import {
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_REQUESTING,
  FETCH_SERVICES_SUCCESS
} from "../../../reducers/booking/serviceReducer/services";
import {FETCH_STAFFS_SUCCESS} from "../../../reducers/booking/staffReducer/staffs";
import {select, put, call, takeEvery} from "redux-saga/effects"
export function* fetchServices(){
  const status = select(state => state.services.readyStatus);
  if(status === FETCH_SERVICES_SUCCESS ||
    status ===  FETCH_SERVICES_REQUESTING
  ) return
  yield put({type: FETCH_SERVICES_REQUESTING});
  try {
    const json = yield call(serviceAPI.list)
    console.log(json)
    const normalizedData = yield call(normalize, json.data.data, arrayOfService);
    let data = normalizedData.entities.services;
    if(typeof data === 'undefined') data = {}
     console.log(data)
    yield put({type: FETCH_SERVICES_SUCCESS, data: data})
    yield put({type: SET_EDIT_SERVICE_COPY, data: data})
  } catch (err) {
    yield put({type: FETCH_SERVICES_FAILURE, err: err})
  }
};


export function* resetEditServices  (){
  const originalData = yield select(state => state.services.data);
  yield put({type: SET_EDIT_SERVICE_COPY, data: originalData})


};
