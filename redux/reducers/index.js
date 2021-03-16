
import inventories from "./ecommerce/inventories";
import oneInventory from "./ecommerce/oneInventory";
import cartItems from './ecommerce/cart/cartItems';
import createPaymentIntent from "./ecommerce/cart/createPaymentIntent";
import createSetupIntent from "./ecommerce/cart/createSetupIntent";
import ux from "./ecommerce/ux"
import login from "./account/login"
import register from "./account/register";
import auth from "./account/auth"
import plts from './ecommerce/plts'
import kitOption from "./ecommerce/kitOptions";
import cartItemDetail from "./ecommerce/cart/cartItemDetail"
import addresses from "./ecommerce/address/addresses";
import getGeolocation from "./ecommerce/address/getGeolocation";
import getBuyQuotation from "./ecommerce/address/getBuyQuotation";
import getSellQuotation from "./ecommerce/address/getSellQuotation";
import saveAddress from "./ecommerce/address/saveAddress";
import kitOptions from "./ecommerce/kitOptions";
import addPm from "./ecommerce/transaction/addPm";
import buy from "./ecommerce/transaction/buy";
import sell from "./ecommerce/transaction/sell"
import pms from './ecommerce/pms'
import pickupTime from "./ecommerce/pickupTime";
import bts from './ecommerce/bts'
import editProduct from "./booking/productReducer/editProduct";
import products from "./booking/productReducer/products";
import saveProducts from "./booking/productReducer/saveProducts";
import editService from "./booking/serviceReducer/editService";
import saveServices from "./booking/serviceReducer/saveServices";
import services from "./booking/serviceReducer/services";
import editStaff from "./booking/staffReducer/editStaff";
import saveStaffs from "./booking/staffReducer/saveStaffs";
import staffs from "./booking/staffReducer/staffs";
import addVisit from "./booking/visitReducer/addVisit";
import editVisit from "./booking/visitReducer/editVisit";
import saveVisits from "./booking/visitReducer/saveVisits";
import visits from "./booking/visitReducer/visits";
import saveInventory from "./cms/editInventory";
import editInventory from "./cms/editInventory";
import sizes from "./ecommerce/sizes";
import tags from './ecommerce/tags'
import profile from './account/profile'
import users from './cms/users'

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
  bts,
  editProduct,
  products,
  saveProducts,
  editService,
  saveServices,
  services,
  editStaff,
  saveStaffs,
  staffs,
  addVisit,
  editVisit,
  saveVisits,
  visits,
  saveInventory,
  editInventory,
  profile,
  sizes,
  users,
  tags
};


export default combineReducers(reducer)