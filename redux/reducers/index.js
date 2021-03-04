
import inventories from "./inventories";
import oneInventory from "./oneInventory";
import cartItems from './cart/cartItems';
import createPaymentIntent from "./cart/createPaymentIntent";
import createSetupIntent from "./cart/createSetupIntent";
import ux from "./ux"
import login from "./account/login"
import register from "./account/register";
import auth from "./account/auth"
import plts from './plts'
import kitOption from "./kitOptions";
import cartItemDetail from "./cart/cartItemDetail"
import addresses from "./address/addresses";
import getGeolocation from "./address/getGeolocation";
import getBuyQuotation from "./address/getBuyQuotation";
import getSellQuotation from "./address/getSellQuotation";
import saveAddress from "./address/saveAddress";
import kitOptions from "./kitOptions";
import addPm from "./transaction/addPm";
import buy from "./transaction/buy";
import sell from "./transaction/sell"
import pms from './pms'
import pickupTime from "./pickupTime";
import bts from './bts'

import { combineReducers } from 'redux'

const reducer = {
  inventories,
  oneInventory,
  cartItems,
  createPaymentIntent,
  createSetupIntent,
  cartItemDetail,
  ux,
  login,
  kitOptions,
  register,
  auth,
  plts,
  addPm,
  pms,
  buy,
  sell,
  kitOption,
  addresses,
  getGeolocation,
  getBuyQuotation,
  getSellQuotation,
  saveAddress,
  pickupTime,
  bts
};


export default combineReducers(reducer)