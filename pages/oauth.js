import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";

import Router from 'next/router'
import nextCookie from "next-cookies";
import App from './index'
import {AUTHENTICATE} from "../redux/reducers/account/auth";

function Authenticator({ next, token, info }){
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch({type: AUTHENTICATE, token, info});
    Router.replace('/')
  }, []);

  return <App/>

}



function Oauth({query, token}){
  const { next, user } = query;

  let info = null;

  if(typeof user !== 'undefined') {
    info = JSON.parse(user)
  }
  console.log(token);
  console.log(info);
  return (
    <Authenticator
      next = {next}
      token = {token}
      info = {info}
    />
  )
}

Oauth.getInitialProps = (ctx) => {
  const cookie = nextCookie(ctx);
  return {query: ctx.query, token: cookie.token}
}

export default Oauth



