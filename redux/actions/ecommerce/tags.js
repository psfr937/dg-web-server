import tagAPI from '../../../api/ecommerce/tags'
import { normalize, schema } from "normalizr";
import { arrayOfTags } from '../../../schemas'
import {
  FETCH_TAGS_REQUESTING,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE
} from "../../reducers/ecommerce/tags";
import { all, select, put, call, fork, takeEvery } from "redux-saga/effects"

export const FETCH_TAGS = 'FETCH_TAGS';

function *fetchTags(){
  const status = yield select( state => state.tags.readyStatus);
  if(status === FETCH_TAGS_SUCCESS ||
    status ===  FETCH_TAGS_REQUESTING
  ) return
  yield put({type: FETCH_TAGS_REQUESTING});

  try {
    const json = yield call(tagAPI.list);
    const normalizedData = yield call(normalize, json.data.data, arrayOfTags);
    let data = normalizedData.entities.tags;
    if(typeof data === 'undefined') data = {};

    yield put({type: FETCH_TAGS_SUCCESS, data: data})
  } catch (err) {
    yield put({type: FETCH_TAGS_FAILURE, data: data})
  }
}

export default [
  takeEvery(FETCH_TAGS, fetchTags)
]