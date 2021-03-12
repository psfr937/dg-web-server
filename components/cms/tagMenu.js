import React from 'react';
import Select from 'react-select';
import st from '../../pages/cms/[name]/p/[pid]/itemDetail.module.scss'
export default function TagMenu({options}) {

    return <Select
      defaultValue={[]}
      isMulti
      name="colors"
      options={options}
      className={st.tagMenu}
      classNamePrefix="select"
    />
};