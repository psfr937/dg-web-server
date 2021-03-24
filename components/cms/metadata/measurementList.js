import React, { useEffect, useState } from 'react'
import {connect, useDispatch, useSelector} from 'react-redux'
import st from './list.module.scss'
import {FETCH_SIZES} from "../../../redux/actions/ecommerce/sizes";
import {FETCH_SIZES_SUCCESS} from "../../../redux/reducers/ecommerce/sizes";
import classNames from 'classnames'

export default function MeasurementList(){

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: FETCH_SIZES});
  }, []);

  const [segmentId, setSegmentId] = useState(0);
  const [physiqueId, setPhysiqueId] = useState(0);
  const [measurementId, setMeasurementId] = useState(0);

  const segments = useSelector(state => state.sizes.readyStatus !== FETCH_SIZES_SUCCESS
    ? [] : Object.keys(state.sizes.data).map(k => state.sizes.data[k]));

  const selectedSegment = segments.find(s => s.id === segmentId) || null;
  const selectedPhysique = selectedSegment === null || !('physiques' in selectedSegment)
    ? null : selectedSegment.physiques.find(s => s.id === physiqueId) || null;
  const selectedMeasurement = selectedPhysique === null || !('measurements' in selectedPhysique)
    ? null : selectedPhysique.measurements.find(s => s.id === measurementId) || null;

  return (
    <React.Fragment>
      <div className={st.sizeTableContainer}>
        <div className={st.sizeTableButtonList}>
          <button>Edit</button>
        </div>
        <div className={st.sizeTable}>
          <div className={classNames(st.filterMenu, st.narrow)}>
            <div className={st.title}>
              <h4>Segments </h4>
            </div>
            <ul>
              <li> + </li>
              { segments.map(
                seg => (
                  <li className={segmentId === seg.id ? classNames(st.selected): ''}
                      onClick={() => setSegmentId(seg.id)}>{seg.name}</li>
                )
              )}
            </ul>
          </div>
          <div className={classNames(st.filterMenu, st.narrow)}>
            <div className={st.title}>

              <h4>Physiques </h4>
            </div>
            <ul>
              <li> + </li>
              { selectedSegment === null || !('physiques' in selectedSegment) ?
                null : selectedSegment.physiques.map(
                p => (
                  <li className={physiqueId === p.id ? classNames(st.selected): ''}
                      onClick={() => setPhysiqueId(p.id)}>
                    {p.name}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className={classNames(st.filterMenu, st.wide)}>

            <div className={st.title}>

              <h4>Measurements </h4>

            </div>
            <ul>
              <li> + </li>
            { selectedPhysique === null || !('measurements' in selectedPhysique) ?
              null : selectedPhysique.measurements.map(
              m => (
                  <li className={measurementId === m.id ? classNames(st.selected): ''}
                      onClick={() => setMeasurementId(m.id)}>{m.name}</li>
              )
            )}
            </ul>
          </div>
          <div className={classNames(st.filterMenu, st.narrow)}>
            <div className={st.title}>
              <h4>Sizes</h4>
            </div>
            <ul>
              <li> + </li>
              {  selectedMeasurement === null || !('sizes' in selectedMeasurement) ?
                null : selectedMeasurement.sizes.map(
                s => (
                  <li >{
                    s.name
                  }</li>))
                }
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  )

}
