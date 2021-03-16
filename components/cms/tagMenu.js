import React, { useState } from 'react';
import Select from 'react-select';
import st from '../../pages/cms/itemDetail.module.scss'
import {useDispatch} from "react-redux";
import { ADD_TAG, REMOVE_TAG } from "../../redux/reducers/cms/editInventory";

export default function TagMenu({options, defaultValue, aspect}) {
    const dispatch = useDispatch();
    const handleChange = selectedOption => {
        console.log(defaultValue)
        console.log(selectedOption)
        const defaultValueIds = defaultValue.map(i => i.value);
        const selectedOptionIds = selectedOption.map(i => i.value);
        let added = selectedOptionIds.filter(x => !defaultValueIds.includes(x));
        let removed =defaultValueIds.filter(x => !selectedOptionIds.includes(x)); // calculates diff
        console.log(added)
        console.log(removed)
        if(added.length > 0){
            dispatch({type: ADD_TAG, add: {
                    id: added[0], name: options.find(i => i.value === added[0]).label, aspect: aspect
                }
            });
        }
        if(removed.length > 0){
            dispatch({type: REMOVE_TAG, id: removed[0] });
        }
    };

    console.log(defaultValue);
    return <Select
      defaultValue={defaultValue}
      isMulti
      name="colors"
      options={options}
      className={st.tagMenu}
      onChange={handleChange}
      classNamePrefix="select"
    />
};