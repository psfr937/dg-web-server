import Router from 'next/router';
import { reauthenticate } from '../redux/actions/account/auth';
import { getCookie } from '../helpers/cookie';

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function(ctx) {
  if(ctx.isServer) {
    if(ctx.req.headers.cookie) {
      ctx.store.dispatch(reauthenticate({
        token: getCookie('token', ctx.req),
        info: getCookie('info', ctx.req)
    }));
    }
  } else {
    const token = ctx.store.getState().auth.token;

    if(token && (ctx.pathname === '/user/login' || ctx.pathname === '/user/register')) {
      setTimeout(function() {
        Router.push('/');
      }, 0);
    }
  }


}