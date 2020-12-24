import st from "./nav.module.scss";
import LoginButton from "@components/LoginButton";
import React, {useEffect, useState} from "react";
import classNames from 'classnames'


function Nav() {
  let [burgerOpened, setBurgerOpened] = useState(false)


  let toggleBurger = () => {
    setBurgerOpened(!burgerOpened)
  }

  return <React.Fragment>
    <div className={st.appNav}>
      <div onClick={toggleBurger} className={st.appNavHead}>
        <svg className={st.burgerIcon} viewBox="0 0 24 24">
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
        </svg>
        <span className={st.appNavHeadTitle}>AEEA</span>
      </div>
      <div className={st.appNavRow}>

        <a className={st.appNavTitle} href={"/course"}>服務</a>
        <a className={st.appNavTitle} href={"/activity"}>行動</a>
        <a className={st.appNavTitle} href={"/blog"}>文章</a>
        <a className={st.appNavTitle} href={"/contact"}>聯絡</a>
      </div>
      <LoginButton/>
    </div>
    <div className={burgerOpened? st.burgerNav : classNames(st.burgerNav, st.hidden)}>
      <a href={"/"} className={st.burgerNavTitle}>AEEA</a>
      <a href={"/course"} className={st.burgerNavTitle}>服務</a>
      <a href={"/activity"} className={st.burgerNavTitle}>行動</a>
      <a href={"/blog"} className={st.burgerNavTitle}>文章</a>
      <a href={"/contact"} className={st.burgerNavTitle}>聯絡</a>
    </div>

  </React.Fragment>
}

export default Nav