import React, { PureComponent } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { register } from "../../redux/actions/account/account";
import st from './login.module.scss'
import Link from 'next/link';
import EmailSignUp from "@components/authBox/EmailSignUp";
import SocialAuthButtonList from "@components/authBox/SocialAuthButtonList";
import StyledLink from "@components/styledLink";

class AuthBoxSubContainer extends PureComponent{

  constructor(props) {
    super(props);
    this.state = {
      page: 'register',
      emailFormOpened: true,
      email: '',
      password: '',
      verifyCode: ''
    }
    this.setValue = this.setValue.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(){
    console.log('hi1')
    this.props.register({
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
              <span className={st.loginFormTitle}>Create an account</span>
            </div>
            <h5 className={st.loginFormSubTitle}>
              We're so excited to see you again!
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
              Continue
            </button>
            <div className={st.loginFormFooter}>

                <span className={st.switchFormText}>
                  By proceeding, you agree to our&nbsp;
                  <a href="/terms" className={st.goToLogin}>Terms of Use </a>
                  and confirm you have read our&nbsp;
                  <a href="/privacy" className={st.goToLogin}>Privacy Policy</a>.
                </span>
            </div>
            <SocialAuthButtonList
              prependText={'Sign Up'}
            />
            <div className={st.loginFormFooter}>
              <span className={st.switchFormText}>
                <Link href={"/login"} passHref>
                  <StyledLink>Already have an account?</StyledLink>
                </Link>
              </span>
            </div>
          </div>
    )
  }
}

const mapStateToProps = ({ register }) => {
  const registerReadyStatus = register.readyStatus
  return {
    registerReadyStatus
  };
};

const mapDispatchToProps = (dispatch) => ({
  register: data => dispatch(register(data)),
});


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(connector, withRouter)(AuthBoxSubContainer);




