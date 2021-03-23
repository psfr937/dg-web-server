import Head from '@components/ecommerce/Head'
import st from './home.module.scss'
import React from "react";
import LoginNav from "@components/LoginNav"
import loginSt from '../components/authBox/login.module.scss'
import LoginForm from "@components/authBox/login";
import {motion} from "framer-motion";
import RegisterForm from "@components/authBox/register";
import classNames from "classnames";
import { useRouter} from "next/router";


export default function Login() {
  const router = useRouter();
  const prevPath = 'prevPath' in router.query?  router.query.prevPath: '/'
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
            <div>
              <motion.div
                className={loginSt.loginForm}
                layoutId={'login'}
                initial={{opacity: 0, scale: 1.1,top: -20}}
                animate={{opacity: 1, scale: 1,top: 0}}
                transition={{duration:0.4, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275]}}
              >
                <LoginForm
                  prevPath={prevPath}
                />
              </motion.div>
            </div>
            <div>
              <motion.div
                className={classNames(loginSt.loginForm, loginSt.hidden)}
                layoutId={'register'}
                initial={{opacity: 0, scale: 1,top: 0}}
                animate={{opacity: 0, scale: 1.1,top: -50}}
                transition={{duration:0.4}}
              >
                <RegisterForm
                  prevPath={prevPath}
                />
              </motion.div>
            </div>

        </section>
      </main>


    </div>
  )
}

