import st from "./nav.module.scss";
import React, {useEffect, useState} from "react";
import classNames from 'classnames'
import Fade from 'react-reveal/Fade'

function LoginNav() {
  let [burgerOpened, setBurgerOpened] = useState(false)


  let toggleBurger = () => {
    setBurgerOpened(!burgerOpened)
  }

  return <React.Fragment>

      <div className={burgerOpened ? classNames(st.hidden, st.appNavHead): st.appNavHead}>
        <img alt="aeea" src="/pallysky_logo_2.svg"/>

        <div>
          <span className={st.appNavHeadTitle}>Pally AI</span>
        </div>
      </div>

      {/*<LoginButton/>*/}

  </React.Fragment>
}

export default LoginNav