
import React, { useState } from "react";

import loginSt from './login.module.scss'
import LoginForm from "@components/authBox/login";
import {motion} from "framer-motion";
import RegisterForm from "@components/authBox/register";
import classNames from "classnames";


export default function CartAuth() {

  const [form, setForm ] = useState('register');

  const isFormActive = (thisForm) => {
    return thisForm === form ? classNames(loginSt.loginForm, loginSt.embedded)
      : classNames(loginSt.loginForm, loginSt.embedded, loginSt.hidden)
  };

  return (
   <div className={loginSt.embeddedLoginFormContainer}>
      <div>
        <div className={isFormActive('login')}
         >

          <LoginForm popUp={true} embedded={true} setForm={setForm}/>
        </div>
      </div>
      <div>
        <div className={isFormActive('register')}
        >
          <RegisterForm popUp={true} embedded={true} setForm={setForm}/>
        </div>
      </div>
   </div>
  )

}

