import productAPI from '../../../../api/ecommerce/products'
import {SET_EDIT_PRODUCT_COPY} from "../../../reducers/booking/productReducer/editProduct";
import { normalize, schema } from "normalizr";
import { arrayOfProduct } from '../../../../schemas'
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUESTING,
  FETCH_PRODUCTS_SUCCESS
} from "../../../reducers/booking/productReducer/products";
import {select, put, call, takeEvery} from "redux-saga/effects"

export function* fetchProducts(){
  const status = yield select(state => state.products.readyStatus);
  if(status === FETCH_PRODUCTS_SUCCESS ||
    status ===  FETCH_PRODUCTS_REQUESTING
  ) return;
  yield put({type: FETCH_PRODUCTS_REQUESTING});
  try {
    const json = yield call(productAPI.list);
    console.log(json);
    const normalizedData = yield call(normalize, json.data.data, arrayOfProduct);
    let data = normalizedData.entities.products;
    if(typeof data === 'undefined') data = {};
    console.log(data);
    yield put({type: FETCH_PRODUCTS_SUCCESS, data: data});
    yield put({type: SET_EDIT_PRODUCT_COPY, data: data})
  } catch (err) {
    yield put({type: FETCH_PRODUCTS_FAILURE, err: err})
  }
};


export function* resetEditProducts(){
  const originalData = yield select( state => state.products.data);
  yield put({type: SET_EDIT_PRODUCT_COPY, data: originalData})
}
