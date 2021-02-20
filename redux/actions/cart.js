

import cartAPI from '../../api/carts'
import { PURCHASE_FAILURE, PURCHASE_INVALID, PURCHASE_REQUESTING } from "../reducers/cart/purchase";
import router from 'next/router'
import {
  CREATE_PAYMENT_INTENT_FAILURE,
  CREATE_PAYMENT_INTENT_INVALID,
  CREATE_PAYMENT_INTENT_REQUESTING, CREATE_PAYMENT_INTENT_SUCCESS
} from "../reducers/cart/createPaymentIntent";
import { ADD_CART_ITEM, REMOVE_CART_ITEM} from "../reducers/cart/cartItems";

export const addCartItem = (itemId) => async (
  dispatch,
  getState,
  apiEngine
) => {
  dispatch({type: ADD_CART_ITEM, data: itemId })
}

export const removeCartItem = (itemId) => async (
  dispatch,
  getState,
  apiEngine
) => {
  dispatch({type: REMOVE_CART_ITEM, data: itemId })
}



export const purchase = (pmId) => async (
  dispatch,
  getState,
  apiEngine
) => {
  const cartItems = getState().cartItems;
  const pmId = getState().cartItems;
  const readyStatus = getState().purchase.readyStatus;
  console.log(readyStatus)
  if (readyStatus !== PURCHASE_INVALID &&
    readyStatus !== PURCHASE_FAILURE
  ) return

  dispatch({type: PURCHASE_REQUESTING});
  const json = await cartAPI(apiEngine).purchase({pmId, cartItems});
  console.log(json.data.data);

  router.push('/checkout/success')

  return json.data.data
};

export const createPaymentIntent = () => async (
  dispatch,
  getState,
  apiEngine
) => {
  const cartItems = getState().cartItems;
  const readyStatus = getState().createPaymentIntent.readyStatus;
  console.log(readyStatus)
  if (readyStatus !== CREATE_PAYMENT_INTENT_INVALID &&
    readyStatus !== CREATE_PAYMENT_INTENT_FAILURE
  ) return

  dispatch({type: CREATE_PAYMENT_INTENT_REQUESTING});
  let json
  try {
    json = await cartAPI(apiEngine).createPaymentIntent({cartItems});
    console.log(json)
    dispatch({type: CREATE_PAYMENT_INTENT_SUCCESS, data: json.data.result});
    console.log(getState().createPaymentIntent)
  }
  catch(err){
    dispatch({type: CREATE_PAYMENT_INTENT_FAILURE, err});
  }
}
