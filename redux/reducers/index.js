import ux from './ux'
import register from './account/register'
import login from './account/login'
import me from './account/me'
import auth from './account/auth'
import account from './account/account'
import cartItems from "./cart/cartItems";
import purchase from "./cart/purchase";
import addPm from "./pms/addPm";
import pms from "./pms/pms";
import selectPm from "./pms/selectPm";
import selectPlan from "./plans/selectPlan";
import subscribe from "./plans/subscribe";
import createPaymentIntent from "./cart/createPaymentIntent";
import plans from "./plans/plans";
import plts from "./plts";
import inventories from "./inventories";
import oneInventory from "./oneInventory";

import { combineReducers } from 'redux'

const reducer = {
  ux,
  register,
  login,
  me,
  auth,
  account,
  cartItems,
  purchase,
  addPm,
  pms,
  selectPm,
  plans,
  selectPlan,
  subscribe,
  createPaymentIntent,
  plts,
  inventories,
  oneInventory
}


export default combineReducers(reducer)