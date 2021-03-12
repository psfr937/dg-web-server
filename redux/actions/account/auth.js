import router from 'next/router';
import {SAVE_COOKIE, REMOVE_COOKIE, DEAUTHENTICATE,
AUTHENTICATE, LOGOUT, LOGIN_WITH_FACEBOOK, LOGIN_WITH_GOOGLE,
 VERIFY_EMAIL,
} from '../../reducers/account/auth';
import userAPI from '../../../api/ecommerce/user';
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



export default [
  takeEvery(AUTHENTICATE, authenticate ),
  takeEvery(DEAUTHENTICATE, deauthenticate),
]
