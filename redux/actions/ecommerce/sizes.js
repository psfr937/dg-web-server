import sizeAPI from '../../../api/ecommerce/sizes'
import { normalize } from "normalizr";
import { arrayOfSizes } from '../../../schemas'
import {
  FETCH_SIZES_REQUESTING,
  FETCH_SIZES_SUCCESS,
  FETCH_SIZES_FAILURE
} from "../../reducers/ecommerce/sizes";
import { all, select, put, call, fork, takeEvery } from "redux-saga/effects"

export const FETCH_SIZES = 'FETCH_SIZES';

function *fetchSizes(){
  const status = yield select( state => state.sizes.readyStatus);
  if(status === FETCH_SIZES_SUCCESS ||
    status ===  FETCH_SIZES_REQUESTING
  ) return
  yield put({type: FETCH_SIZES_REQUESTING});

  try {
    const json = yield call(sizeAPI.list);
    const normalizedData = yield call(normalize, json.data.data, arrayOfSizes);
    let data = normalizedData.entities.sizes;
    if(typeof data === 'undefined') data = {};

    yield put({type: FETCH_SIZES_SUCCESS, data: data})
  } catch (err) {
    yield put({type: FETCH_SIZES_FAILURE, err: err})
  }
}

export default [
  takeEvery(FETCH_SIZES, fetchSizes)
]