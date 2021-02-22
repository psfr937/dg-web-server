
import inventories from "./inventories";
import oneInventory from "./oneInventory";
import cartItems from './cart/cartItems';
import createPaymentIntent from "./cart/createPaymentIntent";
import purchase from "./cart/purchase";
import ux from "./ux"
import login from "./account/login"
import register from "./account/register";
import auth from "./account/auth"
import plts from './plts'
import addPm from "./pms/addPm";
import kitOption from "./kitOptions";
import cartItemDetail from "./cart/cartItemDetail"
import addresses from "./address/addresses";
import getGeolocation from "./address/getGeolocation";
import getQuotation from "./address/getQuotation";
import saveAddress from "./address/saveAddress";
import kitOptions from "./kitOptions";

import { combineReducers } from 'redux'

const reducer = {
  inventories,
  oneInventory,
  cartItems,
  createPaymentIntent,
  cartItemDetail,
  purchase,
  ux,
  login,
  kitOptions,
  register,
  auth,
  plts,
  addPm,
  kitOption,
  addresses,
  getGeolocation,
  getQuotation,
  saveAddress
}


export default combineReducers(reducer)