import React, { useState } from 'react';
import Select from 'react-select';
import st from '../../pages/cms/itemDetail.module.scss'
import {INV_ADD_SIZE, INV_REMOVE_SIZE, INV_SET_SIZE
} from "../../redux/reducers/cms/editInventory";
import {useDispatch} from "react-redux";
export default function SizeMenu({measurements, defaultValue, idx }) {
  console.log(idx)
  const measurementOptions = measurements.map(m => {
    return {
      value: m.id, label: `${m.physique} - ${m.name}`
    }
  });
  const [ measurement, setMeasurement ] = useState(defaultValue.measurement_id);
  const measurementIdx = measurements.findIndex(i => i.id === measurement);

  let sizeOptions = measurementIdx >= 0
  && 'sizes' in measurements[measurementIdx] ?
    measurements[measurementIdx].sizes.map(s => {
     return {
       value: s.id, label: s.name
     }
  }) : [];
  const dispatch = useDispatch();
  const removeSize = () => {
    dispatch({ type: INV_REMOVE_SIZE, idx: idx})
  };

  const onMeasurementMenuChange =  selectedOption  =>{
    setMeasurement(  selectedOption.value);
  };

  const handleChange = selectedOption => {
    dispatch({type: INV_SET_SIZE, idx: idx, value: {
      id: selectedOption.value,
      name: selectedOption.label,
      measurement_id: measurement
    } });
  };

  if(typeof measurementIdx < 0) return null
  const def = {
    value: defaultValue.measurement_id,
    label: typeof measurementOptions[measurementIdx] === 'undefined' ?
      measurementOptions[measurementIdx].label : 'haha'
  }
  return (
    <div className={st.sizeMenuCombo}>
      <div  className={st.measurementMenu}>
        <h4> Metric </h4>
        <Select
          defaultValue={def}
          name={`measurement${idx}`}
          options={measurementOptions}
          className={st.measurementMenu}
          onChange={onMeasurementMenuChange}
          classNamePrefix="select"
        />
      </div>
      <div  className={st.measurementMenu}>
        <h4> Size </h4>
        <Select
          defaultValue={ {value: defaultValue.id, label: defaultValue.name} }
          name={`size${idx}`}
          onChange={handleChange}
          options={sizeOptions}
          className={st.sizeMenu}
          classNamePrefix="select"
        />
      </div>
      <button onClick={removeSize} className={st.removeButton}> remove</button>
    </div>
  )
};