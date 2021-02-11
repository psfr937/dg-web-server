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
        <img alt="aeea" src="/pallysky_logo_2.svg"/>

        <div>
          <span className={st.appNavHeadTitle}>Pally AI</span>
        </div>
      </div>
      <div>
        <div className={st.appNavRow}>
          <a className={st.appNavTitle} href={"/console"}>Console</a>
          <a className={st.appNavTitle} href={"/blog"}>Docs</a>
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
        <a href={"/console"} className={st.burgerNavTitle}>Console</a>
      </Fade>
      <Fade delay={150} duration={300} top when={burgerOpened === true}>
        <a href={"/blog"} className={st.burgerNavTitle}>Docs</a>
      </Fade>
    </div>


  </React.Fragment>
}

export default Nav