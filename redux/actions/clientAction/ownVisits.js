import visitsAPI from '../../../api/visits'
import { normalize, schema } from "normalizr";
import { arrayOfOwnVisits } from '../../../schemas'
import ownVisits, {
  FETCH_OWN_VISITS_REQUESTING,
  FETCH_OWN_VISITS_SUCCESS,
   FETCH_OWN_VISITS_FAILURE
} from "../../reducers/clientReducer/ownVisits";
import {select, put, call, takeEvery} from "redux-saga/effects"

export function* fetchMyVisits(){
  const status = yield select(state => state.ownVisits.readyStatus);
  if(status === FETCH_OWN_VISITS_SUCCESS ||
    status ===  FETCH_OWN_VISITS_REQUESTING
  ) return
  yield put({type: FETCH_OWN_VISITS_REQUESTING});
  try {
    const json = yield call(visitsAPI.listMine);
    console.log(json)
    const normalizedData = yield call(normalize, json.data.data, arrayOfOwnVisits)
    let data = normalizedData.entities.ownVisits;
    if(typeof data === 'undefined') data = {};
    console.log(data)
    yield put({type: FETCH_OWN_VISITS_SUCCESS, data: data})
  } catch (err) {
    yield put({type: FETCH_OWN_VISITS_FAILURE, err: err})
  }
};

