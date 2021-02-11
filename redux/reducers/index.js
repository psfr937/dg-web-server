
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
import fetchPlans from './fetchPlans'
import checkout from './checkout'

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
  fetchPlans,
  checkout
}


export default combineReducers(reducer)