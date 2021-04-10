

import cartAPI from '../../../api/ecommerce/carts'
import { FETCH_CIDS_SUCCESS, FETCH_CIDS_FAILURE, FETCH_CIDS_REQUESTING} from "../../reducers/ecommerce/cart/cartItemDetail";
import { select, put, all, call, takeEvery } from "redux-saga/effects"
import planAPI from "../../../api/ecommerce/plans";
import {normalize} from "normalizr";
import {arrayOfCids} from "../../../schemas";
import {REMOVE_CART_ITEM} from "../../reducers/ecommerce/cart/cartItems";
export const FETCH_CIDS = "FETCH_CIDS";
export const REMOVE_CART_ITEM_SAGA = "REMOVE_CART_ITEM_SAGA";



function *fetchCids(){
  const readyStatus = yield select(state => state.cartItemDetail.readyStatus);
  const cartItemIds = yield select( state => state.cartItems);

  if(cartItemIds.length === 0) return;
  if([FETCH_CIDS_SUCCESS, FETCH_CIDS_REQUESTING].includes(readyStatus)) return;

  yield put({type: FETCH_CIDS_REQUESTING});
  try {
    const json = yield call(cartAPI.list, { data: cartItemIds} );
    const normalizedData = yield call (normalize,json.data.data, arrayOfCids);
    console.log(normalizedData);
    let cids = normalizedData.entities.cids;
    if(typeof cids === 'undefined') cids = {};

    yield put({type: FETCH_CIDS_SUCCESS, data: cids})
  } catch (err) {
    yield put({type: FETCH_CIDS_FAILURE, err: err})
  }
}

function *removeCartItemSaga({ id }){

  const cids = yield select(state => state.cartItemDetail);
  yield id
  let newData;
  newData = cids.data;
  yield id in newData
  console.log(`${id}` in newData)
  if(cids.readyStatus === FETCH_CIDS_SUCCESS && `${id}` in newData){
    delete newData[id]
  }
  console.log(newData)
  yield all([
      put({type: FETCH_CIDS_SUCCESS, data: newData}),
      put({type: REMOVE_CART_ITEM, id: id})
    ])

}

export default [
  takeEvery(FETCH_CIDS, fetchCids),
  takeEvery(REMOVE_CART_ITEM_SAGA, removeCartItemSaga)
]
