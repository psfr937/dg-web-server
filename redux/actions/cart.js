

import cartAPI from '../../api/carts'
import { PURCHASE_FAILURE, PURCHASE_INVALID, PURCHASE_REQUESTING, PURCHASE } from "../reducers/cart/purchase";
import router from 'next/router'
import {
  CREATE_PAYMENT_INTENT_FAILURE,
  CREATE_PAYMENT_INTENT_INVALID,
  CREATE_PAYMENT_INTENT_REQUESTING, CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYMENT_INTENT
} from "../reducers/cart/createPaymentIntent";
import { FETCH_CIDS, FETCH_CIDS_SUCCESS, FETCH_CIDS_FAILURE, FETCH_CIDS_REQUESTING} from "../reducers/cart/cartItemDetail";
import { select, put, call, takeEvery } from "redux-saga/effects"
import planAPI from "../../api/plans";
import {normalize} from "normalizr";
import {arrayOfCids} from "../../schemas";


function *purchase({pmId}) {
  const cartItems = yield select(state => state.cartItems);
  const readyStatus = yield select(state => state.purchase.readyStatus);
  if (readyStatus !== PURCHASE_INVALID &&
    readyStatus !== PURCHASE_FAILURE
  ) return

  yield put({type: PURCHASE_REQUESTING});
  const json = yield call(cartAPI.purchase, {pmId, cartItems});

  router.push('/checkout/success')
}

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
    json = yield call(cartAPI.createPaymentIntent,{cartItems});
    console.log(json)
    yield put({type: CREATE_PAYMENT_INTENT_SUCCESS, data: json.data.result});
  }
  catch(err){
    yield put({type: CREATE_PAYMENT_INTENT_FAILURE, err});
  }
}

function* fetchCids(){
  const readyStatus = yield select(state => state.cartItemDetail.readyStatus);
  const cartItemIds = yield select( state => state.cartItems);

  if(cartItemIds.length === 0) return;
  if(readyStatus === FETCH_CIDS_SUCCESS) return;
  try {
    const json = yield call(cartAPI.list, { data: cartItemIds} );
    const normalizedData = yield call (normalize,json.data.data, arrayOfCids);
    console.log(normalizedData);
    let cids = normalizedData.entities.cids;
    if(typeof cids === 'undefined') cids = {}

    yield put({type: FETCH_CIDS_SUCCESS, data: cids})
  } catch (err) {
    yield put({type: FETCH_CIDS_FAILURE, err: err})
  }
}

export default [
  takeEvery(PURCHASE, purchase),
  takeEvery(CREATE_PAYMENT_INTENT, createPaymentIntent),
  takeEvery(FETCH_CIDS, fetchCids)
]
