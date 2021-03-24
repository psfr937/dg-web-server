import sizeAPI from '../../../api/ecommerce/sizes'
import { normalize } from "normalizr";
import { arrayOfSizes } from '../../../schemas'
import {
  FETCH_SIZES_REQUESTING,
  FETCH_SIZES_SUCCESS,
  FETCH_SIZES_FAILURE
} from "../../reducers/ecommerce/sizes";
import { all, select, put, call, fork, takeEvery } from "redux-saga/effects"
import {SET_UX_VALUE} from "../../reducers/ecommerce/ux";

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
    console.log(data)
    if(typeof data === 'undefined') data = {};

    let dataArray = Object.keys(data).map(k => data[k]);
    let firstSegmentId = null;
    let firstPhysiqueId = null;
    console.log(dataArray)
    for(let i = 0; i < dataArray.length; i++){
      console.log(i)
      if(dataArray[i].physiques.length >= 0){
        firstPhysiqueId = dataArray[i].physiques[0].id;
        firstSegmentId = dataArray[i].id;
        break;
      }
    }

    yield all ([
      put({type: FETCH_SIZES_SUCCESS, data: data}),
      put({type: SET_UX_VALUE, key: 'selectedSegment', value: 1}),
      put({type: SET_UX_VALUE, key: 'selectedPhysique', value: 1}),
    ])
  } catch (err) {
    yield put({type: FETCH_SIZES_FAILURE, err: err})
  }
}

export default [
  takeEvery(FETCH_SIZES, fetchSizes)
]