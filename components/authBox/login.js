import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import st from './login.module.scss'
import { LOGIN, LOGIN_REQUESTING } from "../../redux/reducers/account/login";
import { SET_AUTH_BOX_PAGE } from "../../redux/reducers/ux";
import Link from "next/link";
import Spinner from "../spinner"

import EmailSignUp from "@components/authBox/EmailSignUp";
import SocialAuthButtonList from "@components/authBox/SocialAuthButtonList";

class AuthBoxSubContainer extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
      emailFormOpened: true,
      email: '',
      password: '',
      verifyCode: ''
    };
    this.setValue = this.setValue.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e){
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    });

    e.preventDefault();
  }

  setValue(key){
    return (value) => {
      this.setState({[key]: value})
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} autoComplete="on" className={st.form}>
        <div className={st.loginFormTitleContainer}>
          <span className={st.loginFormTitle}>Welcome back!</span>
        </div>
        <h5 className={st.loginFormSubTitle}>
          We're so excited to see you again
        </h5>
        <EmailSignUp
          email={this.state.email}
          setEmail={this.setValue('email')}
          password={this.state.password}
          setPassword={this.setValue('password')}
          hasButton
          formType={this.props.page}
        />
        <button type="submit" className={st.loginFormSubmitButton}>
          { this.props.loading ? <Spinner/> : 'Login' }
        </button>
        <SocialAuthButtonList
          prependText='Sign In'
        />
        <div className={st.loginFormFooter}>
            <span className={st.switchFormText}>
           Need an account?
              <Link href={"/register"} passHref>
                <u className={st.registerFormLink}>
                  Register
                </u>
              </Link>
            </span>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ ux, login }) => {
  const {authBoxActive, authBoxPage} = ux;
  const loginReadyStatus = login.readyStatus;
  const loading = loginReadyStatus === LOGIN_REQUESTING
  return {
    authBoxActive,
    authBoxPage,
    loginReadyStatus,
    loading
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: data => dispatch({type: LOGIN, data: data}),
  setAuthBoxPage: (page) => dispatch({type: SET_AUTH_BOX_PAGE, page}),
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(AuthBoxSubContainer);




