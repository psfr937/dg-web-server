import st from "./nav.module.scss";
import React, {useEffect, useState} from "react";
import classnames from 'classnames'
import Fade from 'react-reveal/Fade'
import Link from "next/link"
import {useDispatch, useSelector} from 'react-redux'
import CircleImage from "@components/ecommerce/circularImage";
import { FETCH_DETAIL_INFO_SUCCESS } from "../redux/reducers/account/profile";
import {FETCH_DETAIL_INFO} from "../redux/actions/account/profile";

export default function Nav() {
  let [burgerOpened, setBurgerOpened] = useState(false);

  const token = useSelector(state => state.auth.token);
  const info = useSelector(state => state.auth.info);
  const user = useSelector(state => state.profile);

  const userReady = user.readyStatus === FETCH_DETAIL_INFO_SUCCESS;

  const dispatch = useDispatch();

  useEffect(() => {
    if(token !== null && !userReady){
      dispatch({type: FETCH_DETAIL_INFO })
    }
  }, [token]);

  let toggleBurger = () => {
    setBurgerOpened(!burgerOpened)
  };

  return <React.Fragment>
    <div className={st.appNav}>
      <div className={st.appNavHead}>
        <div onClick={toggleBurger} className={st.burgerMenuButton}>

          <svg className={st.burgerIcon} viewBox="0 0 24 24">
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
          </svg>

        </div>
        <Link href="/shopping">
          <img className={st.appNavImg} src="/dress_green_logo.png"/>
        </Link>
        {/*<Link href="/shopping">*/}
        {/*  <h4>Normal</h4>*/}
        {/*</Link>*/}
        {/*<Link href="/shopping">*/}
        {/*  <h4>Uniform</h4>*/}
        {/*</Link>*/}
        {/*<SegmentMenu*/}
        {/*  attribute="segment"*/}
        {/*/>*/}
      </div>

      <div className={st.appNavRow}>
        {
          userReady && user.data.admin === true ? (
            <Link href={"/cms"}>
              <div className={st.cmsButton}>
                <h4> Admin </h4>
              </div>
            </Link>
          ) : null
        }

        <Link href={"/shopping"}>
          <button className={st.buyButton}>
            <img src={"/logo.png"}/>
            <h4> Buy </h4>
          </button>
        </Link>

        <Link href={"/recycle"}>
          <button className={st.sellButton}>
            <div>
              <svg viewBox="0 0 24 24">
                <path  d="M7.17 7.91L8.9 8.91L12.08 3.42L14.33 7.31L11.73 8.81L17.19 10.27L18.66 4.81L16.06 6.31L13.81 2.41C13.26 1.45 12.03 1.12 11.08 1.68C10.81 1.83 10.58 2.05 10.41 2.31M10 20V18L3.66 18L5.9 14.1L8.5 15.6L7.04 10.14L1.57 11.6L4.17 13.1L1.92 17C1.37 17.96 1.7 19.18 2.65 19.73C2.92 19.89 3.22 19.97 3.54 20M19.06 11.5L17.32 12.5L20.5 18H16V15L12 19L16 23V20H20.5C21.61 20 22.5 19.11 22.5 18C22.5 17.69 22.42 17.38 22.28 17.11Z" />
              </svg>
              <h4> Sell </h4>
            </div>
          </button>
        </Link>
        <Link href={"/wishlist"}>
          <button>
              <svg viewBox="0 0 24 24">
                <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
              </svg>
          </button>
        </Link>
        <Link href={"/cart"}>
            <button>
                <svg viewBox="0 0 24 24">
                  <path d="M22 9H17.21L12.83 2.44C12.64 2.16 12.32 2 12 2S11.36 2.16 11.17 2.45L6.79 9H2C1.45 9 1 9.45 1 10C1 10.09 1 10.18 1.04 10.27L3.58 19.54C3.81 20.38 4.58 21 5.5 21H18.5C19.42 21 20.19 20.38 20.43 19.54L22.97 10.27L23 10C23 9.45 22.55 9 22 9M12 4.8L14.8 9H9.2L12 4.8M18.5 19L5.5 19L3.31 11H20.7L18.5 19M12 13C10.9 13 10 13.9 10 15S10.9 17 12 17 14 16.1 14 15 13.1 13 12 13Z" /> </svg>

            </button>
        </Link>
        {userReady ? null :
          <Link href={"/login"}>
          <button className={classnames(st.signInUpButton, st.signIn)}>

                <h4> Sign In </h4>

          </button>
          </Link>
        }
        {userReady ?
          <button>
            <Link href={token !== null ? "/profile/recycle-history" : "/register"}>
              <div className={st.myAccountButton}>
                {/*<h4> { `${user.data.name}` }</h4>*/}
                <CircleImage/>
              </div>
            </Link>
          </button>:

            <Link href={"/register"}>
              <button className={st.signInUpButton}>
                <h4> Sign Up </h4>
              </button>
            </Link>

        }

      </div>
    </div>

    <div className={burgerOpened ? st.burgerNav : classnames(st.burgerNav, st.hidden)}>
      <Fade delay={50} duration={300} top when={burgerOpened === true}>
        <a href={"/shopping"} className={st.burgerNavTitle}>Shopping</a>
      </Fade>
      <Fade delay={150} duration={300} top when={burgerOpened === true}>
        <a href={"/recycle"} className={st.burgerNavTitle}>Recycle</a>
      </Fade>
    </div>
  </React.Fragment>
}
