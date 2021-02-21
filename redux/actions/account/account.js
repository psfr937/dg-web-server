import userAPI from '../../../api/user'

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
import {select, put, call, takeEvery} from "redux-saga/effects"
import {
  AUTHENTICATE,
} from "../../reducers/account/auth";

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

    yield put({type: AUTHENTICATE, info, token})

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

export default[
  takeEvery(LOGIN, login),
  takeEvery(REGISTER, register)
]
