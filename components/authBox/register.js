import React, { useEffect, useState } from 'react';
import { compose } from 'redux'
import {connect, useDispatch, useSelector} from 'react-redux';
import { withRouter } from 'next/router';
import { REGISTER } from "../../redux/reducers/account/register";
import st from './login.module.scss'
import Link from 'next/link';
import EmailSignUp from "@components/authBox/EmailSignUp";
import SocialAuthButtonList from "@components/authBox/SocialAuthButtonList";
import StyledLink from "@components/ecommerce/styledLink";

function RegisterForm (){

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = useSelector(state => state.register);
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: REGISTER,
      data: {email: this.state.email, password: this.state.password}
    })
  };

  return (
    <form onSubmit={onSubmit} className={st.form}>
      <div className={st.loginFormTitleContainer}>
        <span className={st.registerFormTitle}>Create an account</span>
      </div>
      <EmailSignUp
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <button type="submit" className={st.loginFormSubmitButton}>
        Continue
      </button>
      <div className={st.loginFormFooter}>

          <span className={st.statementText}>
            By proceeding, you agree to our&nbsp;
            <a href="/terms" className={st.goToLogin}>Terms of Use</a>
             &nbsp; and confirm you have read our&nbsp;
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
    </form>
  )
}

export default RegisterForm;




