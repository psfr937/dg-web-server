import React from 'react';
import Select from 'react-select';
import st from '../../pages/cms/itemDetail.module.scss'

export default function MeasurementMenu({options}) {

  return <Select
    defaultValue={options[0]}
    name="colors"
    options={options}
    className={st.tagMenu}
    classNamePrefix="select"
  />
};