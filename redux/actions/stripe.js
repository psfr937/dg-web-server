import {call, put, select, takeEvery } from "redux-saga/effects";
import stripeAPI from "../../api/stripe";
import {
  CREATE_PAYMENT_INTENT_FAILURE,
  CREATE_PAYMENT_INTENT_INVALID,
  CREATE_PAYMENT_INTENT_REQUESTING, CREATE_PAYMENT_INTENT_SUCCESS
} from "../reducers/cart/createPaymentIntent";

import {
  CREATE_SETUP_INTENT_FAILURE,
  CREATE_SETUP_INTENT_INVALID,
  CREATE_SETUP_INTENT_REQUESTING, CREATE_SETUP_INTENT_SUCCESS
} from "../reducers/cart/createSetupIntent";

export const PURCHASE = 'PURCHASE';
export const CREATE_PAYMENT_INTENT = 'CREATE_PAYMENT_INTENT';
export const CREATE_SETUP_INTENT = 'CREATE_SETUP_INTENT';


function *createPaymentIntent(){
  const cartItems =  yield select(state => state.cartItems);
  const readyStatus = yield select(state => state.createPaymentIntent.readyStatus);
  console.log(readyStatus)
  if (readyStatus !== CREATE_PAYMENT_INTENT_INVALID &&
    readyStatus !== CREATE_PAYMENT_INTENT_FAILURE
  ) return

  yield put({type: CREATE_PAYMENT_INTENT_REQUESTING});
  let json
  try {
    json = yield call(stripeAPI.createPaymentIntent,{cartItems: cartItems});
    console.log(json)
    yield put({type: CREATE_PAYMENT_INTENT_SUCCESS, data: json.data.result});
  }
  catch(err){
    yield put({type: CREATE_PAYMENT_INTENT_FAILURE, err});
  }
}


function *createSetupIntent(){
  const readyStatus = yield select(state => state.createSetupIntent.readyStatus);
  console.log(readyStatus)
  if (readyStatus !== CREATE_SETUP_INTENT_INVALID &&
    readyStatus !== CREATE_SETUP_INTENT_FAILURE
  ) return

  yield put({type: CREATE_SETUP_INTENT_REQUESTING});
  let json
  try {
    json = yield call(stripeAPI.createSetupIntent);
    console.log(json)
    yield put({type: CREATE_SETUP_INTENT_SUCCESS, data: json.data.result});
  }
  catch(err){
    yield put({type: CREATE_SETUP_INTENT_FAILURE, err});
  }
}

export default [
  takeEvery(CREATE_PAYMENT_INTENT, createPaymentIntent),
  takeEvery(CREATE_SETUP_INTENT, createSetupIntent)
]