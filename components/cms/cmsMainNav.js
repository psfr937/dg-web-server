import st from "./cmsNav.module.scss";
import React, {useEffect, useState} from "react";
import classnames from 'classnames'
import Fade from 'react-reveal/Fade'
import Link from "next/link"
import {useDispatch, useSelector} from 'react-redux'
import CircleImage from "@components/ecommerce/circularImage";
import { FETCH_DETAIL_INFO_SUCCESS } from "../../redux/reducers/account/profile";
import {FETCH_DETAIL_INFO} from "../../redux/actions/account/profile";
import cmsSt from '../../pages/cms/itemDetail.module.scss'
import {UPDATE_INVENTORY, ADD_INVENTORY} from "../../redux/actions/cms/editInventory";

export default function Nav({ action }) {
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

  const saveAction = () => {
    if(action === 'create'){
      dispatch({type: ADD_INVENTORY})
    }
    else{
      dispatch({type: UPDATE_INVENTORY})
    }
  }

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
        <a href={'/cms/create'}>
          <button className={cmsSt.saveButton}>
            Create Product
          </button>
        </a>
      </div>
      <div>
        <div className={st.appNavRow}>
          {
            userReady && user.data.admin === true ? (
              <Link href={"/shopping"}>
                <div className={st.cmsButton}>
                  <h4> Shop </h4>
                </div>
              </Link>
            ) : null
          }
          {userReady ? null :
            <Link href={"/login"}>
              <div className={st.signInUpButton}>
                <h4> Sign In </h4>
              </div>
            </Link>
          }
          {userReady ?
            <Link href={token !== null ? "/profile/recycle-history" : "/register"}>
              <div className={st.myAccountButton}>
                <h4> { `Hi, ${user.data.name}` }</h4>
                <CircleImage/>
              </div>
            </Link> :
            <Link href={"/register"}>
              <div className={st.signInUpButton}>
                <h4> Sign Up </h4>
              </div>
            </Link>
          }

        </div>
      </div>
    </div>
    <div className={burgerOpened ? st.burgerNav : classnames(st.burgerNav, st.hidden)}>
      <Fade delay={50} duration={300} top when={burgerOpened === true}>
        <Link href={"/shopping"} className={st.burgerNavTitle}>Shopping</Link>
      </Fade>
      <Fade delay={150} duration={300} top when={burgerOpened === true}>
        <Link href={"/recycle"} className={st.burgerNavTitle}>Recycle</Link>
      </Fade>
    </div>
  </React.Fragment>
}
