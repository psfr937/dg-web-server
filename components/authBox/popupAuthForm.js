
import React, { useState } from "react";

import loginSt from './login.module.scss'
import LoginForm from "@components/authBox/login";
import {motion} from "framer-motion";
import RegisterForm from "@components/authBox/register";
import classNames from "classnames";


export default function PopupAuth() {

  const [form, setForm ] = useState('register');

  const isFormActive = (thisForm) => {
    return thisForm === form ? loginSt.loginForm
       : classNames(loginSt.loginForm, loginSt.hidden)
  };

  return (
      <div className={loginSt.loginFormContainer}>
        <div>
          <motion.div
            className={isFormActive('login')}
            layoutId={'login'}
            initial={{opacity: 0, scale: 1.1,top: -20}}
            animate={{opacity: 1, scale: 1,top: 0}}
            transition={{duration:0.4, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275]}}
          >
            <LoginForm popUp={true} setForm={setForm}/>
          </motion.div>
        </div>
        <div>
          <motion.div
            className={isFormActive('register')}
            layoutId={'register'}
            initial={{opacity: 0, scale: 1,top: 0}}
            animate={{opacity: 0, scale: 1.1,top: -50}}
            transition={{duration:0.4}}
          >
            <RegisterForm popUp={true} setForm={setForm}/>
          </motion.div>
        </div>
      </div>
  )

}

