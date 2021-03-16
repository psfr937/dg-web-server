import React, { useState } from 'react';
import Select from 'react-select';
import st from '../../pages/cms/itemDetail.module.scss'
import {useDispatch} from "react-redux";
import { SET_BRAND } from "../../redux/reducers/cms/editInventory";

export default function BrandMenu({options, defaultValue}) {
  const dispatch = useDispatch();
  const handleChange = selectedOption => {
    dispatch({type: SET_BRAND, id: selectedOption.value});
  }

  return <Select
    defaultValue={defaultValue}
    name="brand"
    options={options}
    className={st.tagMenu}
    onChange={handleChange}
    classNamePrefix="select"
  />
};