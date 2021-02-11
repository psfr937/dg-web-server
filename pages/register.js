import Head from '@components/Head'
import { fetchEntries } from '@utils/contentfulPosts'
import safeJsonStringify from 'safe-json-stringify';
import Footer from '@components/Footer'
import LoginVideo from '../components/authBox/loginVideo'
import st from './home.module.scss'
import loginSt from '../components/authBox/login.module.scss'
import React from "react";
import LoginNav from "@components/LoginNav"

import Register from "@components/authBox/register";
import Login from "@components/authBox/login";
import {motion} from "framer-motion";
import classNames from 'classnames'
import dynamic from "next/dynamic";


export default function Home() {
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


          <motion.div
            className={classNames(loginSt.loginForm, loginSt.hidden)}
            layoutId={'login'}
            initial={{opacity: 0, scale: 1,top: 100}}
            animate={{opacity: 0, scale: 1.1, top: 50}}
            transition={{duration:0.4}}
          >
            <Login/>
          </motion.div>
          <motion.div
            className={loginSt.loginForm}
            layoutId={'register'}
            initial={{opacity: 0, scale: 1.1, top: 0}}
            animate={{opacity: 1, scale: 1,top: 50}}
            transition={{duration:0.4, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275]}}

          >
            <Register/>
          </motion.div>
        </section>
      </main>


    </div>
  )
}

