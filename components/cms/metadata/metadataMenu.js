import React, { PureComponent } from 'react'
import {connect, useDispatch} from 'react-redux'
import st from '../../ecommerce/filterMenu.module.scss'
import { LOGOUT } from "../../../redux/reducers/account/auth";

export default function MetadataMenu(){

  const dispatch = useDispatch();
  return (
    <div className={st.filterMenu}>
      <div className={st.filterSection}>
        <h4>Colors</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Materials</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Schools</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Brands</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Sizes</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Accents</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Categories</h4>
      </div>
      <div className={st.filterSection}>
        <h4>Staffs</h4>
      </div>

    </div>
  )

}

