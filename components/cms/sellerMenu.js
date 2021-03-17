import React, { useState } from 'react';
import Select from 'react-select';
import st from '../../pages/cms/itemDetail.module.scss'
import {useDispatch, useSelector} from "react-redux";
import { SET_SELLER } from "../../redux/reducers/cms/editInventory";
import {FETCH_USERS_SUCCESS} from "../../redux/reducers/cms/users";

export default function SellerMenu({defaultValue}) {
  const dispatch = useDispatch();
  const handleChange = selectedOption => {
    dispatch({type: SET_SELLER, value: { id: selectedOption.value } });
  }
  const users = useSelector(state => state.users)
  const data = users.readyStatus !== FETCH_USERS_SUCCESS ?  []
    : Object.keys(users.data).map(k => {
      return {
        value: users.data[k].id,
        label: users.data[k].id
      }
    }
    )

  return <Select
    defaultValue={defaultValue}
    name="seller"
    options={data}
    className={st.tagMenu}
    onChange={handleChange}
    classNamePrefix="select"
  />
};