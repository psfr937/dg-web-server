
import inventories from "./inventories";
import oneInventory from "./oneInventory";
import cartItems from './cart/cartItems';
import createPaymentIntent from "./cart/createPaymentIntent";
import purchase from "./cart/purchase";

import { combineReducers } from 'redux'

const reducer = {
  inventories,
  oneInventory,
  cartItems,
  createPaymentIntent,
  purchase
}


export default combineReducers(reducer)