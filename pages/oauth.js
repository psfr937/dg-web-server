import React, { PureComponent } from 'react'
import {connect} from "react-redux";
import { authenticate } from "../redux/actions/account/auth";
import Router from 'next/router'
import nextCookie from "next-cookies";
import App from './index'
class Authenticator extends PureComponent{
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const { next, token, info } = this.props;
    console.log('hello pony')
    this.props.authenticate(token, info);
    Router.replace('/')
  }

  render(){
    return <App/>
  }
}

const mapDispatchToProps = (dispatch) => ({
  authenticate: (token, info) => dispatch(authenticate({token, info}))
});

const connector = connect(
  null,
  mapDispatchToProps
);

const HOCAuthenticator = connector(Authenticator)



const Oauth = ({query, token}) => {
  const { next, user } = query;
  console.log(query)
  // let avatar_url = ''
  // let display_name = ''
  let info = null

  if(typeof user !== 'undefined') {
    info = JSON.parse(user)
  }
  console.log(token);
  console.log(info);
  return (
    <HOCAuthenticator
      next = {next}
      token = {token}
      info = {info}
    />
  )
}

Oauth.getInitialProps = (ctx) => {
  const cookie = nextCookie(ctx)
  return {query: ctx.query, token: cookie.token}
}

export default Oauth



