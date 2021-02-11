import Router from 'next/router';
import { AUTHENTICATE, DEAUTHENTICATE } from '../../reducers/account/auth';
import userAPI from '../../../api/user';
import { setCookie, removeCookie } from '../../../helpers/cookie';
import chalk from 'chalk'
import {LOGIN_INVALID} from "../../reducers/account/login";

// gets token from the api and stores it in the redux store and in cookie
export const authenticate = ({ token=null, info=null }, res = null) => (dispatch, getState) => {
  console.log(token)
  console.log(info)
  if(token !== null) setCookie('token', token);
  if(info !== null) setCookie('info', info);
  dispatch({type: AUTHENTICATE, payload: {
      token, info
    }
  });
  console.log(chalk.green('[action/auth line 19]') + JSON.stringify(getState().auth))
};

// gets the token from the cookie and saves it in the store
export const reauthenticate = ({token, info}) => (dispatch) => {
  dispatch({type: AUTHENTICATE, payload: {
      token, info
    }
  });
};

// removing the token
export const deauthenticate = () => (dispatch) => {
  removeCookie('token');
  removeCookie('info');
  dispatch({type: DEAUTHENTICATE});
  dispatch({type: LOGIN_INVALID})
  Router.push('/');
};

export const emailRegister = values =>
  async (dispatch, getState, apiEngine) => {
    try{
      const json = await userAPI(apiEngine).emailRegister(values);
      return json;
    } catch (err) {
      throw err;
    }
  };

export const emailLogin = values =>
  async (dispatch, getState, apiEngine) => {
    try{
      const json = await userAPI(apiEngine).emailLogin(values);
      return json
    } catch (err){
      throw err;
    }
  };

export const loginWithFacebook = (nextLocation) =>
  async (dispatch, getState, apiEngine) => {
    if (typeof nextLocation !== 'string' || nextLocation === ''){
      nextLocation = ''
    }
    try{
      const json = await userAPI(apiEngine).loginWithFacebook(nextLocation);
      return json
    } catch (err){
      throw err;
    }
  };

export const loginWithGoogle = (nextLocation) =>
  async (dispatch, getState, apiEngine) => {
    try{
      if (typeof nextLocation !== 'string' || nextLocation === ''){
        nextLocation = ''
      }
      const json = await userAPI(apiEngine).loginWithGoogle(nextLocation);
      return json
    } catch (err){
      throw err;
    }
  };

export const logoutUser = () =>
  async (dispatch, getState, apiEngine) => {
    try {
      await userAPI(apiEngine).logout();
      dispatch(deauthenticate());
    } catch (err) {
      alert('Logout user fail');
      throw err;
    }
  };

export const verifyEmail = token =>
  async (dispatch, getState, apiEngine) => {
    try {
      const json = await userAPI(apiEngine).verifyEmail({token});
      return json;
    }catch (err){
      // console.log(err.stack);
      throw err;
    }
  };