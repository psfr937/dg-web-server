import Head from '@components/Head'
import st from './home.module.scss'
import loginSt from '../components/authBox/login.module.scss'
import React from "react";
import LoginNav from "@components/LoginNav"

import Register from "@components/authBox/register";
import Login from "@components/authBox/login";
import {motion} from "framer-motion";
import classNames from 'classnames'

export default function Register() {
  return (
    <div>
      <style jsx global>{`
      body {
        margin: 0;
        overflow-x: hidden;
      }
    `}</style>
      <Head/>
      <main className={st.app}>

        <LoginNav/>
        <section className={loginSt.loginFormContainer}>

          <div>
            <motion.div
              className={classNames(loginSt.loginForm, loginSt.hidden)}
              layoutId={'login'}
              initial={{opacity: 0, scale: 1,top: 0}}
              animate={{opacity: 0, scale: 1.1, top: -50}}
              transition={{duration:0.4}}
            >
              <Login/>
            </motion.div>
          </div>
          <div>
            <motion.div
              className={loginSt.loginForm}
              layoutId={'register'}
              initial={{opacity: 0, scale: 1.1, top: -20}}
              animate={{opacity: 1, scale: 1,top: 0}}
              transition={{duration:0.4, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275]}}

            >
              <Register/>
            </motion.div>
          </div>
        </section>
      </main>


    </div>
  )
}

