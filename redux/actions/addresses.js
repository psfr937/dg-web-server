import {call, put, select, takeEvery} from "redux-saga/effects";
import {SAVE_ADDRESS_REQUESTING, SAVE_ADDRESS_SUCCESS, SAVE_ADDRESS_FAILURE} from "../reducers/address/saveAddress";
import { FETCH_ADDRESSES_SUCCESS, FETCH_ADDRESSES_FAILURE,
  FETCH_ADDRESSES_REQUESTING} from "../reducers/address/addresses";
import addressAPI from "../../api/address";
import {normalize} from "normalizr";
import {arrayOfAddresses} from "../../schemas";
export const FETCH_ADDRESSES = 'FETCH_ADDRESSES';
export const SAVE_ADDRESS = 'SAVE_ADDRESS';
export const FETCH_ADDRESSES_AND_GET_QUOTATION = 'FETCH_ADDRESS_AND_GET_QUOTATION'
import {GET_BUY_QUOTATION} from "../actions/quotation";
import {
  GET_BUY_QUOTATION_FAILURE,
  GET_BUY_QUOTATION_REQUESTING,
  GET_BUY_QUOTATION_SUCCESS
} from "../reducers/address/getBuyQuotation";
import quotationAPI from "../../api/quotation";

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

function *fetchAddresses(){
  const readyStatus = yield select(state => state.addresses.readyStatus);
  if([FETCH_ADDRESSES_REQUESTING, FETCH_ADDRESSES_SUCCESS].includes(readyStatus)) return;

  yield put({type: FETCH_ADDRESSES_REQUESTING });

  try {
    const json = yield call(addressAPI.list);
    const normalizedData = yield call(normalize, json.data.data, arrayOfAddresses);
    let data = normalizedData.entities.addresses;
    if(typeof data === 'undefined') data = {};
    yield put({type: FETCH_ADDRESSES_SUCCESS, data: data})
  } catch (err) {
    yield put({type: FETCH_ADDRESSES_FAILURE, err: err})
  }
}

function *fetchAddressesGetQuotation(){
  yield call(fetchAddresses);
  yield call(getBuyQuotation);

}

export function *getBuyQuotation( newAddress = null ){
  const readyStatus = yield select(state => state.getBuyQuotation.readyStatus);
  if([GET_BUY_QUOTATION_REQUESTING, GET_BUY_QUOTATION_SUCCESS].includes(readyStatus)) return;
  yield put({type: GET_BUY_QUOTATION_REQUESTING });

  const cartItems = yield select(state => state.cartItems);
  const pickupTime = yield select(state => state.pickupTime);

  let address;
  if(newAddress !== null){
    address = newAddress
  }
  else{
    let addresses = yield select(state => state.addresses);
    address = addresses.data[addresses.selectedAddressId];
  }

  try {
    const json = yield call(quotationAPI.getBuyQuotation, {
      data: {
        cartItems: cartItems,
        pickupTime: pickupTime,
        address: address
      }
    });

    yield put({type: GET_BUY_QUOTATION_SUCCESS, data: json.data.data})
  } catch (err) {
    yield put({type: GET_BUY_QUOTATION_FAILURE, err: err})
  }
}

export default [
  takeEvery(SAVE_ADDRESS, saveAddress),
  takeEvery(FETCH_ADDRESSES, fetchAddresses),
  takeEvery(GET_BUY_QUOTATION, getBuyQuotation),
  takeEvery(FETCH_ADDRESSES_AND_GET_QUOTATION , fetchAddressesGetQuotation)
]