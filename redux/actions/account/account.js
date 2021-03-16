import userAPI from '../../../api/ecommerce/user'

import {
  LOGIN_INVALID,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUESTING,
  LOGIN
} from '../../reducers/account/login'

import {
  REGISTER_INVALID,
  REGISTER_REQUESTING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER
} from '../../reducers/account/register'
import Router from 'next/router'
import {select, put, all, call, takeEvery} from "redux-saga/effects"
import {
  AUTHENTICATE, DEAUTHENTICATE, LOGIN_WITH_FACEBOOK, LOGIN_WITH_GOOGLE, LOGOUT, VERIFY_EMAIL,
} from "../../reducers/account/auth";
import { RESET_PROFILE } from '../../reducers/account/profile'

function *login({data}){

  const readyStatus = select(state => state.login.readyStatus);
  // if (readyStatus !== LOGIN_INVALID &&
  //   readyStatus !== LOGIN_FAILURE
  // ) return;

  yield put({type: LOGIN_REQUESTING});
  try {
    const json = yield call(userAPI.emailLogin, data);
    const result = json.data;
    console.log(json);
    const { info, token } = result;
    yield put({type: LOGIN_SUCCESS});

    yield put({type: AUTHENTICATE, info, token});

   yield call(Router.push,`/`)

  } catch (err) {
    if (typeof err.response !== 'undefined'
      && typeof err.response.data !== 'undefined'
      && Array.isArray(err.response.data.errors)
      && err.response.data.errors.length > 0
    ) {
      yield put({
        type: LOGIN_FAILURE,
        err: err.response.data.errors
      })
    } else {
      yield put({type: LOGIN_FAILURE, err});

    }
  }
}

function *register({data}){
  const readyStatus = select(state => state.register.readyStatus);
  if (readyStatus !== REGISTER_INVALID && readyStatus !== REGISTER_FAILURE
  ) return;

  yield put({type: REGISTER_REQUESTING});
  try {
    const json = yield call(userAPI.emailRegister, data);
    const result = json.data;
    console.log(json);
    const { info, token } = result;
    yield put({type: REGISTER_SUCCESS});
    yield put({type: AUTHENTICATE, info, token});
    yield call(Router.push,`/`)

  } catch (err) {
    if (typeof err.response !== 'undefined'
      && typeof err.response.data !== 'undefined'
      && Array.isArray(err.response.data.errors)
      && err.response.data.errors.length > 0) {
      yield put({
        type: REGISTER_FAILURE,
        err: err.response.data.errors
      })

    } else {
      yield put({type: REGISTER_FAILURE, err});
    }
  }
}


function *loginWithFacebook({nextLocation}) {
  if (typeof nextLocation !== 'string' || nextLocation === '') {
    nextLocation = ''
  }
  try {
    const json = yield call(userAPI.loginWithFacebook, nextLocation);
    return json
  } catch (err) {
    throw err;
  }
}

function *loginWithGoogle({nextLocation}){
  try{
    if (typeof nextLocation !== 'string' || nextLocation === ''){
      nextLocation = ''
    }
    const json = yield call(userAPI.loginWithGoogle, nextLocation);
    return json
  } catch (err){
    throw err;
  }
}

function *logoutUser(){
  try {
    yield call(userAPI.logout);
    yield all([
      put({type: DEAUTHENTICATE}),
      put( {type: RESET_PROFILE})
    ])
  } catch (err) {
    alert('Logout user fail');
    throw err;
  }
}

function *verifyEmail({token}){
  try {
    const json = yield call(userAPI.verifyEmail, {token: token});
  }catch (err){
    // console.log(err.stack);
    throw err;
  }
}

export default[
  takeEvery(LOGIN, login),
  takeEvery(REGISTER, register),
  takeEvery(LOGOUT, logoutUser),
  takeEvery(LOGIN_WITH_FACEBOOK, loginWithFacebook),
  takeEvery(LOGIN_WITH_GOOGLE, loginWithGoogle),
  takeEvery(VERIFY_EMAIL, verifyEmail)
]
