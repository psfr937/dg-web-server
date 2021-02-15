
import fetchData from "./fetchData";
import ux from './ux'
import register from './account/register'
import login from './account/login'
import me from './account/me'
import auth from './account/auth'
import account from './account/account'
import editQuestion from "./questionReducer/editQuestion";
import questions from "./questionReducer/questions";
import saveQuestions from "./questionReducer/saveQuestions";
import cartItems from "./cart/cartItems";
import purchase from "./cart/purchase";
import addPm from "./pms/addPm";
import fetchPms from "./pms/fetchPms";
import selectPm from "./pms/selectPm";
import fetchPlans from './fetchPlans';
import selectPlan from "./plans/selectPlan";
import subscribe from "./plans/subscribe";
import createPaymentIntent from "./cart/createPaymentIntent";
import { combineReducers } from 'redux'

const reducer = {
  ux,
  register,
  login,
  me,
  auth,
  account,
  editQuestion,
  questions,
  saveQuestions,
  fetchData,
  cartItems,
  purchase,
  addPm,
  fetchPms,
  selectPm,
  fetchPlans,
  selectPlan,
  subscribe,
  createPaymentIntent
}


export default combineReducers(reducer)