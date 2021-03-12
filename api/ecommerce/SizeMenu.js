import React from 'react';

import Select from 'react-select';
import {useSelector} from "react-redux";
import {FETCH_SIZES_SUCCESS} from "../../redux/reducers/ecommerce/sizes";


export default function SizeMenu({measurementId}) {

  const options = useSelector(state => typeof state.tags.readyStatus !== FETCH_SIZES_SUCCESS
    ? [] : state.tags.data[measurementId].sizes);

  return <Select
    defaultValue={[]}
    isMulti
    name="colors"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
  />
};