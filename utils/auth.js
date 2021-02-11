import React, { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const auth = ctx => {
  const { token, info } = nextCookie(ctx)
  // console.log('utils/auth, token and info:')
  // console.log(token)
  // console.log(info)

  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  // if (ctx.req && !token) {
  //   ctx.res.writeHead(302, { Location: '/' })
  //   ctx.res.end()
  // }
  //
  // // We already checked for server. This should only happen on client.
  // if (!token) {
  //   Router.push('/')
  // }

  return { token, info }
}

export const logout = () => {
  cookie.remove('token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [null])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async ctx => {
  //  console.log('Wrapper getInitialProps')
    const { token, info } = auth(ctx)

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))
  //  console.log('utils/auth.js componentProps')
  //  console.log(componentProps)

    return { ...componentProps, token, info }
  }

  return Wrapper


  //
  // return class Wrapper extends React.Component {
  //   static syncLogout(event){
  //     if (event.key === 'logout') {
  //       console.log('logged out from storage!')
  //       Router.push('/login')
  //     }
  //   }
  //
  //   hook (){
  //     window.addEventListener('storage', Wrapper.syncLogout)
  //
  //     return () => {
  //       window.removeEventListener('storage', Wrapper.syncLogout)
  //       window.localStorage.removeItem('logout')
  //     }
  //   }
  //
  //  static async getInitialProps(ctx){
  //     console.log('Wrapper getInitialProps')
  //     const { token, info } = auth(ctx)
  //
  //     const componentProps =
  //       WrappedComponent.getInitialProps &&
  //       (await WrappedComponent.getInitialProps(ctx))
  //     console.log('componentProps')
  //     console.log(componentProps)
  //
  //     return { ...componentProps, token, info }
  //   }
  //
  //   constructor(props){
  //     super(props)
  //     this.hook()
  //   }
  //
  //   render(){
  //
  //
  //     return <WrappedComponent {...this.props} />
  //   }
  // }
}
