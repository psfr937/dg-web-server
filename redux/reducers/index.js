
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
import kitOption from "./kitOption";

import { combineReducers } from 'redux'

const reducer = {
  inventories,
  oneInventory,
  cartItems,
  createPaymentIntent,
  purchase,
  ux,
  login,
  register,
  auth,
  plts,
  addPm,
  kitOption
}


export default combineReducers(reducer)