import React, { PureComponent } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { login } from "../../redux/actions/account/account";
import st from './login.module.scss'
import { SET_AUTH_BOX_PAGE } from "../../redux/reducers/ux";
import Link from "next/link";;

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

  onSubmit(){
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    })
  }

  setValue(key){
    return (value) => {
      this.setState({[key]: value})
    }
  }

  render() {
    return (
      <div className={st.form}>
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
        <button onClick={this.onSubmit} className={st.loginFormSubmitButton}>
          Login
        </button>
        <SocialAuthButtonList
          prependText='Sign In'
        />
        <div className={st.loginFormFooter}>
            <span className={st.switchFormText}>
           Need an account?
              <Link href={"/register"} passHref>
                <u>
                  Register
                </u>
              </Link>
            </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ ux, register }) => {
  const {authBoxActive, authBoxPage} = ux
  const registerReadyStatus = register.readyStatus
  return {
    authBoxActive,
    authBoxPage,
    registerReadyStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: data => dispatch(login(data)),
  setAuthBoxPage: (page) => dispatch({type: SET_AUTH_BOX_PAGE, page}),
});


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

// Enable hot reloading for async componet
export default compose(connector, withRouter)(AuthBoxSubContainer);




