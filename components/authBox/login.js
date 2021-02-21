import React, { useState, useEffect } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import st from './login.module.scss'
import { LOGIN, LOGIN_REQUESTING } from "../../redux/reducers/account/login";
import Link from "next/link";
import Spinner from "../spinner"
import EmailSignIn from "@components/authBox/EmailSignIn";
import SocialAuthButtonList from "@components/authBox/SocialAuthButtonList";


function LoginForm(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const login = useSelector(state => state.login)
  const loginReadyStatus = login.readyStatus;
  const loading = loginReadyStatus === LOGIN_REQUESTING;

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: LOGIN,
      data: { email: email,  password: password}
    });
  };

  return (
    <form onSubmit={onSubmit} autoComplete="on" className={st.form}>
      <div className={st.loginFormTitleContainer}>
        <h1 className={st.loginFormTitle}>Welcome back!</h1>
        <h2 className={st.loginFormSubTitle}>
          We're so excited to see you again!
        </h2>
      </div>
      <EmailSignIn
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <button type="submit" className={st.loginFormSubmitButton}>
        { loading ? <Spinner/> : 'Login' }
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

export default LoginForm;




