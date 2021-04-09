

import wishlistAPI from '../../../api/ecommerce/wishlist'
import { FETCH_WIDS_SUCCESS, FETCH_WIDS_FAILURE,
  FETCH_WIDS_REQUESTING} from "../../reducers/ecommerce/wishlist/wisItemDetail";
import { ADD_WISH_ITEM_FAILURE, ADD_WISH_ITEM_REQUESTING,
 ADD_WISH_ITEM_SUCCESS } from "../../reducers/ecommerce/wishlist/addWishItem";
import { REMOVE_WISH_ITEM_FAILURE, REMOVE_WISH_ITEM_SUCCESS,
 REMOVE_WISH_ITEM_REQUESTING } from "../../reducers/ecommerce/wishlist/removeWishItem";
import { OFFLINE_ADD_WISH_ITEM, OFFLINE_REMOVE_WISH_ITEM } from "../../reducers/ecommerce/wishlist/wishItems";
import { select, put, all, call, takeEvery } from "redux-saga/effects"
import {normalize} from "normalizr";
import {arrayOfWids} from "../../../schemas";
import {FETCH_CIDS_SUCCESS} from "../../reducers/ecommerce/cart/cartItemDetail";

export const FETCH_WIDS = "FETCH_WIDS";
export const ADD_WISH_ITEM = "ADD_WISH_ITEM";
export const REMOVE_WISH_ITEM = "REMOVE_WISH_ITEM";

function *fetchWids(){
  const readyStatus = yield select(state => state.wishItemDetail.readyStatus);
  const wishItemIds = yield select( state => state.wishListDetail);

  if(wishItemIds.length === 0) return;
  if([FETCH_WIDS_SUCCESS, FETCH_WIDS_REQUESTING].includes(readyStatus)) return;

  yield put({type: FETCH_WIDS_REQUESTING});
  try {
    const json = yield call(wishlistAPI.list, { data: wishItemIds} );
    const normalizedData = yield call (normalize,json.data.data, arrayOfWids);
    console.log(normalizedData);
    let cids = normalizedData.entities.wids;
    if(typeof cids === 'undefined') cids = {};

    yield put({type: FETCH_WIDS_SUCCESS, data: cids})
  } catch (err) {
    yield put({type: FETCH_WIDS_FAILURE, err: err})
  }
}

function *removeWishItem({id}){
  const readyStatus = yield select(state => state.removeWishItem.readyStatus);

  const token = yield select(state => state.auth.token);
  if(token !== null){
    if([REMOVE_WISH_ITEM_REQUESTING].includes(readyStatus)) return;

    yield put({type: REMOVE_WISH_ITEM_REQUESTING});
    try {
      yield call(wishlistAPI.remove, { data: id});
      let newData;
      const wids = yield select(state => state.wishItemDetail);
      newData = wids.data;
      if(wids.readyStatus === FETCH_CIDS_SUCCESS && `${id}` in newData){
        delete newData[id]
      }
      yield all([
        put({type: FETCH_CIDS_SUCCESS, data: newData}),
        put({type: OFFLINE_REMOVE_WISH_ITEM, id: id}),
        put({type: REMOVE_WISH_ITEM_SUCCESS})
      ])
    } catch (err) {
      yield put({type: REMOVE_WISH_ITEM_FAILURE, err: err})
    }
  }
  else{
    const wids = yield select(state => state.wishItemDetail);

    let newData;
    newData = wids.data;
    if(wids.readyStatus === FETCH_CIDS_SUCCESS && `${id}` in newData){
      delete newData[id]
    }
    yield all([
      put({type: FETCH_CIDS_SUCCESS, data: newData}),
      put({type: OFFLINE_REMOVE_WISH_ITEM, id: id}),
      put({type: REMOVE_WISH_ITEM_SUCCESS})
    ])
  }
}

function *addWishItem({id}){
  const readyStatus = yield select(state => state.addWishItem.readyStatus);

  const token = yield select(state => state.auth.token);
  if(token !== null) {
    if([ADD_WISH_ITEM_REQUESTING].includes(readyStatus)) return;

    yield put({type: ADD_WISH_ITEM_REQUESTING});
    try {
      yield call(wishlistAPI.add, {data: id});
      yield all([
        put({type: OFFLINE_ADD_WISH_ITEM, id: id}),
        put({type: ADD_WISH_ITEM_SUCCESS})
      ])
    } catch (err) {
      yield put({type: ADD_WISH_ITEM_FAILURE, err: err})
    }
  }
  else{
    yield all([
      put({type: OFFLINE_ADD_WISH_ITEM, id: id}),
      put({type: ADD_WISH_ITEM_SUCCESS})
    ])
  }
}


export default [
  takeEvery(FETCH_WIDS, fetchWids),
  takeEvery(ADD_WISH_ITEM, addWishItem),
  takeEvery(REMOVE_WISH_ITEM, removeWishItem)
]
