

import cartAPI from '../../api/carts'
import { PURCHASE_FAILURE, PURCHASE_INVALID, PURCHASE_REQUESTING, PURCHASE } from "../reducers/cart/purchase";
import router from 'next/router'
import {
  CREATE_PAYMENT_INTENT_FAILURE,
  CREATE_PAYMENT_INTENT_INVALID,
  CREATE_PAYMENT_INTENT_REQUESTING, CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYMENT_INTENT
} from "../reducers/cart/createPaymentIntent";
import { select, put, call, takeEvery } from "redux-saga/effects"


function *purchase({pmId}) {
  const cartItems = select(state => state.cartItems);
  const readyStatus = select(state => state.purchase.readyStatus);
  if (readyStatus !== PURCHASE_INVALID &&
    readyStatus !== PURCHASE_FAILURE
  ) return

  yield put({type: PURCHASE_REQUESTING});
  const json = yield call(cartAPI.purchase, {pmId, cartItems});

  router.push('/checkout/success')
}

function *createPaymentIntent(){
  const cartItems =  select(state => state.cartItems);
  const readyStatus = select(state => state.createPaymentIntent.readyStatus);
  console.log(readyStatus)
  if (readyStatus !== CREATE_PAYMENT_INTENT_INVALID &&
    readyStatus !== CREATE_PAYMENT_INTENT_FAILURE
  ) return

  yield put({type: CREATE_PAYMENT_INTENT_REQUESTING});
  let json
  try {
    json = yield call(cartAPI.createPaymentIntent,{cartItems});
    console.log(json)
    yield put({type: CREATE_PAYMENT_INTENT_SUCCESS, data: json.data.result});
  }
  catch(err){
    yield put({type: CREATE_PAYMENT_INTENT_FAILURE, err});
  }
}

export default [
  takeEvery(PURCHASE, purchase),
  takeEvery(CREATE_PAYMENT_INTENT, createPaymentIntent)

]
