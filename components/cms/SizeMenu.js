import React, { useState } from 'react';
import Select from 'react-select';
import st from '../../pages/cms/[name]/p/[pid]/itemDetail.module.scss'
export default function SizeMenu({measurements}) {

  console.log(measurements)
  const measurementOptions = measurements.map(m => {
    return {
      value: m.id, label: `${m.physique} - ${m.name}`
    }
  });


    const [ measurement, setMeasurement ] = useState(0);

  let sizeOptions = !(measurement in measurementOptions)
  || !('sizes' in measurementOptions[measurement])
   || measurementOptions[measurement].sizes.length === 0 ? [] :
    measurementOptions[measurement].sizes.map(s => {
     return {
       value: s.id, label: s.name
     }
  });

    const onMeasurementMenuChange = (value, { action, removedValue })  =>{
    switch (action) {
      case 'remove-value':
      case 'pop-value':
        if ( measurementOptions.isFixed) {
          return;
        }
        break;
      case 'clear':
        value = measurementOptions.filter(v => v.isFixed);
        break;
    }

    setMeasurement( value);
  };

  return (
    <div className={st.sizeMenuCombo}>
      <div  className={st.measurementMenu}>
        <h4> Metric </h4>
        <Select
          defaultValue={measurementOptions[0]}
          name="measurement"
          options={measurementOptions}
          className={st.measurementMenu}
          onChange={onMeasurementMenuChange}
          classNamePrefix="select"
        />
      </div>
      <div  className={st.measurementMenu}>
        <h4> Size </h4>
        <Select
          defaultValue={[]}
          isMulti
          name="size"
          options={sizeOptions}
          className={st.sizeMenu}
          classNamePrefix="select"
        />
      </div>
    </div>
  )
};