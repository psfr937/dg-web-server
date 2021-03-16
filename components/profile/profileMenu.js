import React, { PureComponent } from 'react'
import {connect, useDispatch} from 'react-redux'
import st from '../ecommerce/filterMenu.module.scss'
import { LOGOUT } from "../../redux/reducers/account/auth";

export default function ProfileMenu(){

  const dispatch = useDispatch();
  return (
    <div className={st.filterMenu}>
      <div className={st.filterSection}>
        <h4>Profile</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Purchase History</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Recycle History</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Payout</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Settings</h4>
      </div>

      <div className={st.filterSection}>
        <button onClick={() => dispatch({type: LOGOUT})}>
        <h4>Logout</h4>
        </button>
      </div>

    </div>
  )

}

