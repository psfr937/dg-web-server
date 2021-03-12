import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  BUY_FAILURE,
  BUY_INVALID,
  BUY_REQUESTING, BUY_SUCCESS
} from "../../reducers/ecommerce/transaction/buy";

import {
  SELL_FAILURE,
  SELL_INVALID,
  SELL_REQUESTING, SELL_SUCCESS
} from "../../reducers/ecommerce/transaction/sell";

import {
  ADD_PM_REQUESTING,
  ADD_PM_FAILURE,
  ADD_PM_INVALID,
  ADD_PM_SUCCESS
} from "../../reducers/ecommerce/transaction/addPm";

export const BUY = 'BUY';
export const SELL = 'SELL';
export const ADD_PM = 'ADD_PM';

import transactionAPI from "../../../api/ecommerce/tranasaction";
import router from "next/dist/client/router";
import {GET_BUY_QUOTATION_SUCCESS} from "../../reducers/ecommerce/address/getBuyQuotation";

function *buy({ paymentMethod, savePm = true, }){
  const readyStatus = yield select(state => state.buy.readyStatus);
  console.log(readyStatus);
  if (readyStatus !== BUY_INVALID &&
    readyStatus !== BUY_FAILURE
  ) return;
  let pm;
  if(savePm){
    pm = paymentMethod
  }
  else{
    pm = yield select(state => state.pms.selectedPmId);
  }

  const getBuyQuotation = yield select(state => state.getBuyQuotation);
  if(getBuyQuotation.readyStatus !== GET_BUY_QUOTATION_SUCCESS) return
  const quotationId = getBuyQuotation.data.quotationId

  const cartItems = yield select(state => state.cartItems);

  yield put({type: BUY_REQUESTING});
  let json;
  try {
    json = yield call(transactionAPI.buy, { data: {
      cartItems: cartItems,
      priceUpdateTimestamp: 0,
      paymentMethod: pm,
      quotationId: quotationId
    }
  });
    console.log(json);
    yield put({type: BUY_SUCCESS, data: json.data.result});
    yield call( router.push,'/checkout-success');
  }
  catch(err){
    yield put({type: BUY_FAILURE, err});
  }
}


function *sell({ paymentMethod, savePm = true }){
  const readyStatus = yield select(state => state.sell.readyStatus);
  console.log(readyStatus);
  if (readyStatus !== SELL_INVALID &&
    readyStatus !== SELL_FAILURE
  ) return;

  let pm = savePm ? paymentMethod
    : yield select(state => state.pms.selectedPmId);

  yield put({type: SELL_REQUESTING});
  let json;

  const kitOptions = yield select(state => state.kitOptions);

  try {
    json = yield call(transactionAPI.sell, { data: {
        packList: kitOptions.packList,
        mailLabel: kitOptions.mailLabel,
        recycleUnused: kitOptions.recycleUnused,
        priceUpdateTimestamp: 0,
        paymentMethod: pm
      }
    });

    console.log(json);
    yield put({type: SELL_SUCCESS, data: json.data.result});

  }
  catch(err){
    yield put({type: SELL_FAILURE, err});
  }
}

function *addPaymentMethod({ paymentMethod, savePm = true }){
  const readyStatus = yield select(state => state.addPm.readyStatus);
  console.log(readyStatus);
  if (readyStatus !== ADD_PM_INVALID &&
    readyStatus !== ADD_PM_FAILURE
  ) return;

  let pm = savePm ? paymentMethod
    : yield select(state => state.pms.selectedPmId);

  yield put({type: ADD_PM_REQUESTING});
  let json;
  try {
    json = yield call(transactionAPI.addPm, { data: pm });
    console.log(json);
    yield put({type: ADD_PM_SUCCESS, data: json.data.result});
  }
  catch(err){
    yield put({type: ADD_PM_FAILURE, err});
  }
}

export default [
  takeEvery(BUY, buy),
  takeEvery(SELL, sell),
  takeEvery(ADD_PM, addPaymentMethod)
]
/**
PM scchema
{
  "id": "seti_1IJirUCRRNHI4u4IeSfV9t2f",
  "object": "setup_intent",
  "application": null,
  "cancellation_reason": null,
  "client_secret": "seti_1IJirUCRRNHI4u4IeSfV9t2f_secret_Iva1UVKoXeXVbF8uFOfNUq7cqLKpnQx",
  "created": 1613064112,
  "customer": "cus_Iva1tbTJHQEAp6",
  "description": null,
  "last_setup_error": null,
  "latest_attempt": "setatt_1IJirUCRRNHI4u4I066C84wW",
  "livemode": false,
  "mandate": null,
  "metadata": {},
  "next_action": null,
  "on_behalf_of": null,
  "payment_method": "pm_1IJirRCRRNHI4u4IbZWduucq",
  "payment_method_options": {
  "card": {
    "request_three_d_secure": "automatic"
  }
},
  "payment_method_types": [
  "card"
],
  "single_use_mandate": null,
  "status": "succeeded",
  "usage": "off_session"
}

 **/