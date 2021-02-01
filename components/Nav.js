import st from "./nav.module.scss";
import LoginButton from "@components/LoginButton";
import React, {useEffect, useState} from "react";
import classNames from 'classnames'
import Fade from 'react-reveal/Fade'

function Nav() {
  let [burgerOpened, setBurgerOpened] = useState(false)


  let toggleBurger = () => {
    setBurgerOpened(!burgerOpened)
  }

  return <React.Fragment>
    <div className={st.appNav}>

      <div className={burgerOpened ? classNames(st.hidden, st.appNavHead): st.appNavHead}>
        <img alt="aeea" src="/logo.png"/>

        <div>
          <span className={st.appNavHeadTitle}>AEEA</span>
          <span className={st.appNavHeadTitle}>亞太禮儀教育協會</span>
        </div>
      </div>
      <div>
        <div className={st.appNavRow}>
          <a className={st.appNavTitle} href={"/"}>首頁</a>
          <a className={st.appNavTitle} href={"/activity"}>活動</a>
          <a className={st.appNavTitle} href={"/blog"}>文章</a>
          <a className={st.appNavTitle} href={"/contact"}>聯絡</a>
        </div>

          <div onClick={toggleBurger} className={st.burgerMenuButton}>
            <span className={st.appNavHeadTitle}>{burgerOpened? "Close" : "Menu"}</span>
            <svg className={st.burgerIcon} viewBox="0 0 24 24">
              {burgerOpened ?
                <path
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/> :
                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
              }
            </svg>
          </div>

      </div>
      {/*<LoginButton/>*/}
    </div>

    <div className={burgerOpened? st.burgerNav : classNames(st.burgerNav, st.hidden)}>
      <Fade delay={50} duration={300} top when={burgerOpened === true}>
        <a href={"/"} className={st.burgerNavTitle}>首頁</a>
      </Fade>
      <Fade delay={100} duration={300} top when={burgerOpened === true}>
        <a href={"/activity"} className={st.burgerNavTitle}>活動</a>
      </Fade>
      <Fade delay={150} duration={300} top when={burgerOpened === true}>
        <a href={"/blog"} className={st.burgerNavTitle}>文章</a>
      </Fade>
      <Fade delay={200} duration={300} top when={burgerOpened === true}>
        <a href={"/contact"} className={st.burgerNavTitle}>聯絡</a>
      </Fade>
    </div>


  </React.Fragment>
}

export default Nav