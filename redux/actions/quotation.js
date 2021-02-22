import {call, put, select, takeEvery} from "redux-saga/effects";
import {GET_QUOTATION_REQUESTING, GET_QUOTATION_SUCCESS, GET_QUOTATION_FAILURE } from "../reducers/address/getQuotation";
import quotationAPI from "../../api/quotation";
export const GET_BUY_QUOTATION = 'GET_BUY_QUOTATION';
export const GET_SELL_QUOTATION = 'GET_SELL_QUOTATION';


function *getBuyQuotation({ address }){
  const readyStatus = yield select(state => state.getQuotation.readyStatus);
  if([GET_QUOTATION_REQUESTING, GET_QUOTATION_SUCCESS].includes(readyStatus)) return;

  yield put({type: GET_QUOTATION_REQUESTING });

  const cartItemIds = yield select(state => state.cartItems);

  try {
    const json = yield call(quotationAPI.getBuyQuotation, {
      data: {
        cartItemIds,
        address
      }
    });

    yield put({type: GET_QUOTATION_SUCCESS, data: json.data.data})
  } catch (err) {
    yield put({type: GET_QUOTATION_FAILURE, err: err})
  }
}

function *getSellQuotation({ address }){
  const readyStatus = yield select(state => state.getQuotation.readyStatus);
  if([GET_QUOTATION_REQUESTING, GET_QUOTATION_SUCCESS].includes(readyStatus)) return;

  yield put({type: GET_QUOTATION_REQUESTING });

  const kitOptions = yield select(state => state.kitOptions);

  try {
    const json = yield call(quotationAPI.getSellQuotation, {
      data: {
        kitOptions,
        address
      }
    });

    yield put({type: GET_QUOTATION_SUCCESS, data: json.data.data})

  } catch (err) {
    yield put({type: GET_QUOTATION_FAILURE, err: err})
  }
}

export default [
  takeEvery(GET_BUY_QUOTATION, getBuyQuotation),
  takeEvery(GET_SELL_QUOTATION, getSellQuotation)
]