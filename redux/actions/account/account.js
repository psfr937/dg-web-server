import userAPI from '../../../api/user'

import {
  LOGIN_INVALID,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUESTING
} from '../../reducers/account/login'

import {
  REGISTER_INVALID,
  REGISTER_REQUESTING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../../reducers/account/register'

import {authenticate} from "../../actions/account/auth";
import Router from 'next/router'

export const login = data => async (
  dispatch,
  getState,
  apiEngine
) => {
  const readyStatus = getState().login.readyStatus
  if (readyStatus !== LOGIN_INVALID &&
    readyStatus !== LOGIN_FAILURE
  ) return

  dispatch({type: LOGIN_REQUESTING})
  try {
    const json = await userAPI(apiEngine).emailLogin(data)
    const result = json.data
    console.log(json)
    const { info, token } = result
    dispatch({type: LOGIN_SUCCESS})

    dispatch(authenticate({
      token, info,
    }))
    return await Router.push(`/`)

  } catch (err) {
    if (typeof err.response !== 'undefined'
      && typeof err.response.data !== 'undefined'
      && Array.isArray(err.response.data.errors)
      && err.response.data.errors.length > 0
    ) {
      dispatch({
        type: LOGIN_FAILURE,
        err: err.response.data.errors
      })
    } else {
      dispatch({type: LOGIN_FAILURE, err});
    }
  }
}

export const register = data => async (
  dispatch,
  getState,
  apiEngine
) => {
  const readyStatus = getState().register.readyStatus
  if (readyStatus !== REGISTER_INVALID && readyStatus !== REGISTER_FAILURE
  ) return

  dispatch({type: REGISTER_REQUESTING})
  try {
    const json = await userAPI(apiEngine).emailRegister(data)
    const result = json.data.data
    dispatch({type: REGISTER_SUCCESS})
  } catch (err) {
    if (typeof err.response !== 'undefined'
      && typeof err.response.data !== 'undefined'
      && Array.isArray(err.response.data.errors)
      && err.response.data.errors.length > 0) {
      dispatch({
        type: REGISTER_FAILURE,
        err: err.response.data.errors
      })

    } else {
      dispatch({type: REGISTER_FAILURE, err});
    }
  }
}