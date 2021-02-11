import Head from '@components/Head'
import { fetchEntries } from '@utils/contentfulPosts'
import safeJsonStringify from 'safe-json-stringify';
import Footer from '@components/Footer'

import st from './home.module.scss'
import React from "react";
import LoginNav from "@components/LoginNav"
import loginSt from '../components/authBox/login.module.scss'
import Login from "@components/authBox/login";
import {motion} from "framer-motion";
import Register from "@components/authBox/register";
import classNames from "classnames";
import LoginVideo from "@components/authBox/loginVideo";

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
          {/*<video className={loginSt.video} autoPlay muted loop id="myVideo">*/}
          {/*  <source src="/login_video.mp4" type="video/mp4"/>*/}
          {/*</video>*/}
          {/*<img className={loginSt.video} src={"/background.jpg"}/>*/}
          <motion.div
            className={loginSt.loginForm}
            layoutId={'login'}
            initial={{opacity: 0, scale: 1.1,top: 50}}
            animate={{opacity: 1, scale: 1,top: 100}}
            transition={{duration:0.4, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275]}}
          >
            <Login/>
          </motion.div>
          <motion.div
            className={classNames(loginSt.loginForm, loginSt.hidden)}
            layoutId={'register'}
            initial={{opacity: 0, scale: 1,top: 50}}
            animate={{opacity: 0, scale: 1.1,top: 0}}
            transition={{duration:0.4}}
          >
            <Register/>
          </motion.div>
        </section>
      </main>


    </div>
  )
}

