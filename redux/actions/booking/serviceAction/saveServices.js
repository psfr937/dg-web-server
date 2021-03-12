
import serviceAPI from '../../../../api/ecommerce/services'
import {FETCH_SERVICES_FAILURE, FETCH_SERVICES_SUCCESS} from "../../../reducers/booking/serviceReducer/services";
import { SAVE_SERVICES_SUCCESS} from "../../../reducers/booking/serviceReducer/saveServices";
import {SET_EDIT_SERVICE_COPY,
  UPDATE, CREATE, DELETE
} from "../../../reducers/booking/serviceReducer/editService";
import {normalize} from "normalizr";
import { SET_READ_ONLY } from "../../../reducers/ecommerce/ux";
import {arrayOfService} from "../../../../schemas";
import dataURIToBlob from "../../../../helpers/dataURIToBlob";
import {select, put, call, takeEvery} from "redux-saga/effects"


const compare = newData => {
  let mediaFiles = {}

  const valueArray =  Object.keys(newData).map(k => newData[k])
  const createList = valueArray.filter(c => c.action === CREATE).map(
    c => {
      if(c.picture_url !== null) {
        mediaFiles[`image_${c.id}`] = dataURIToBlob(c.picture_url)
      }
      delete c.picture_url
      return c
    }
  )
  const updateList =  valueArray.filter(c => c.action === UPDATE).map(
    c => {
      if(c.pictureUpdated === true) {
        mediaFiles[`image_${c.id}`] = dataURIToBlob(c.picture_url)
        delete c.picture_url
      }
      return c
    }
  )
  const deleteList =  valueArray.filter(c => c.removed === true).map(
    c => {
      delete c.picture_url
      return c
    }
  )

  return {
    ...mediaFiles,
    createList: JSON.stringify(createList),
    updateList:  JSON.stringify(updateList),
    deleteList:  JSON.stringify(deleteList)
  }
}

export function* saveServices(){

  const newData = yield select(state => state.editService);
  let multiPartData = compare(newData);
  try {

    const json = yield call(serviceAPI.update, multiPartData);
    const normalizedData = yield call(normalize, json.data.data, arrayOfService);
    const data = normalizedData.entities.services;
    yield put({type: SAVE_SERVICES_SUCCESS, data: data});
    yield put({type: SET_READ_ONLY, listName: 'serviceList', value: true});
    yield put({type: SET_EDIT_SERVICE_COPY, data: data});
    yield put({type: FETCH_SERVICES_SUCCESS, data: data});
  } catch (err) {
    yield put({type: FETCH_SERVICES_FAILURE, err: err })
  }
};
