import {call, put, select, takeEvery} from "redux-saga/effects";
import {SAVE_ADDRESS_REQUESTING, SAVE_ADDRESS_SUCCESS, SAVE_ADDRESS_FAILURE} from "../reducers/address/saveAddress";
import addressAPI from "../../api/address";

export const SAVE_ADDRESS = 'SAVE_ADDRESS';

function *saveAddress({ address }){
  const readyStatus = yield select(state => state.getQuotation.readyStatus);
  if([SAVE_ADDRESS_REQUESTING, SAVE_ADDRESS_SUCCESS].includes(readyStatus)) return;

  yield put({type: SAVE_ADDRESS_REQUESTING });

  try {
    const json = yield call(addressAPI.add, {
      data: address
    });

    yield put({type: SAVE_ADDRESS_SUCCESS, data: json.data.data})
  } catch (err) {
    yield put({type: SAVE_ADDRESS_FAILURE, err: err})
  }
}


export default [
  takeEvery(SAVE_ADDRESS, saveAddress)
]