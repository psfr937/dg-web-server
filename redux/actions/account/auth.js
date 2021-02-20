import Router from 'next/router';
import {SAVE_COOKIE, REMOVE_COOKIE, DEAUTHENTICATE,
AUTHENTICATE, LOGOUT, LOGIN_WITH_FACEBOOK, LOGIN_WITH_GOOGLE,
 VERIFY_EMAIL} from '../../reducers/account/auth';
import userAPI from '../../../api/user';
import chalk from 'chalk'
import {LOGIN_INVALID} from "../../reducers/account/login";
import { put, call, takeEvery } from "redux-saga/effects"

import cookie from 'js-cookie';



const setCookie = (key, value) => {
  if(key === 'info' && typeof value === 'string') value = value.replace('=', '^')
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/'
    });
  }
};

const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

// gets token from the api and stores it in the redux store and in cookie
function *authenticate({ token=null, info=null }) {
  console.log(token);
  console.log(info);
  if(token !== null) setCookie('token', token);
  if(info !== null) setCookie('info', info);
  yield put({type: SAVE_COOKIE, payload: {
      token, info
    }
  });
}

function *deauthenticate(){
  removeCookie('token');
  removeCookie('info');
  yield put({type: REMOVE_COOKIE});
  yield put({type: LOGIN_INVALID});
  yield call(router.push,'/');
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
      yield call(deauthenticate)
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

export default [
  takeEvery(AUTHENTICATE, authenticate ),
  takeEvery(DEAUTHENTICATE, deauthenticate),
  takeEvery(LOGOUT, logoutUser),
  takeEvery(LOGIN_WITH_FACEBOOK, loginWithFacebook),
  takeEvery(LOGIN_WITH_GOOGLE, loginWithGoogle),
  takeEvery(VERIFY_EMAIL, verifyEmail)
]
