import {call, put, select, takeEvery} from "redux-saga/effects";
import {GET_SELL_QUOTATION_REQUESTING, GET_SELL_QUOTATION_SUCCESS, GET_SELL_QUOTATION_FAILURE
} from "../reducers/address/getSellQuotation";
import quotationAPI from "../../api/quotation";
export const GET_BUY_QUOTATION = 'GET_BUY_QUOTATION';
export const GET_SELL_QUOTATION = 'GET_SELL_QUOTATION';

function *getSellQuotation({ data }){
  const readyStatus = yield select(state => state.getSellQuotation.readyStatus);
  if([GET_SELL_QUOTATION_REQUESTING, GET_SELL_QUOTATION_SUCCESS].includes(readyStatus)) return;
  yield put({type: GET_SELL_QUOTATION_REQUESTING });
  const packList = yield select(state => state.kitOptions.packList);
  try {
    const pickupTime = yield select(state => state.pickupTime);
    const json = yield call(quotationAPI.getSellQuotation, {
      data: {
        ...data,
        packList: packList,
        pickupTime: pickupTime
      }
    });
    yield put({type: GET_SELL_QUOTATION_SUCCESS, data: json.data.data})
  } catch (err) {
    yield put({type: GET_SELL_QUOTATION_FAILURE, err: err})
  }
}
export default [

  takeEvery(GET_SELL_QUOTATION, getSellQuotation)
]