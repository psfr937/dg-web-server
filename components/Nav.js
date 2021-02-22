import st from "./nav.module.scss";
import React, {useEffect, useState} from "react";
import classnames from 'classnames'
import Fade from 'react-reveal/Fade'
import Link from "next/link"
import { useSelector } from 'react-redux'
import CircleImage from "@components/circularImage";

function Nav() {
  let [burgerOpened, setBurgerOpened] = useState(false);

  const readyStatus = useSelector(state => state.auth.info)

  let toggleBurger = () => {
    setBurgerOpened(!burgerOpened)
  }

  return <React.Fragment>
    <div className={st.appNav}>
      <div className={st.appNavHead}>
        <div onClick={toggleBurger} className={st.burgerMenuButton}>
          {/*  <svg className={st.burgerIcon} viewBox="0 0 24 24">*/}
          {/*    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>*/}
          {/*</svg>*/}
        </div>
        <img className={st.appNavImg} src="/dress_green_logo.png"/>
      </div>
      <div>
        <div className={st.appNavRow}>
          {/*<Link href={"/cart"}>*/}
          {/*  <svg viewBox="0 0 24 24">*/}
          {/*    <path fill="currentColor" d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />*/}
          {/*  </svg>*/}
          {/*</Link>*/}
          {/*<Link href={"/register"}>*/}
          {/*  <CircleImage/>*/}
          {/*</Link>*/}

          <a href="mailto:psc13579@hotmail.com">
            <button> Coming Soon </button>
          </a>
        </div>
      </div>
    </div>
    {/*<div className={burgerOpened ? st.burgerNav : classnames(st.burgerNav, st.hidden)}>*/}
    {/*  <Fade delay={50} duration={300} top when={burgerOpened === true}>*/}
    {/*    <a href={"/console"} className={st.burgerNavTitle}>Console</a>*/}
    {/*  </Fade>*/}
    {/*  <Fade delay={150} duration={300} top when={burgerOpened === true}>*/}
    {/*    <a href={"/blog"} className={st.burgerNavTitle}>Docs</a>*/}
    {/*  </Fade>*/}
    {/*</div>*/}
  </React.Fragment>
}

export default Nav