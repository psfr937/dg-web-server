import React, { useState, useEffect} from 'react'
import {useSelector} from "react-redux";
import {FETCH_SIZES_SUCCESS} from "../../redux/reducers/ecommerce/sizes";
import SegmentMenu from "@components/ecommerce/segmentMenu";
import classNames from 'classnames'
import st from './segmentDropButton.module.scss'
import names from '../../constants/segments'

export default function SegmentDropButton(){
  const selectedSegment = useSelector(state => state.ux.selectedSegment);
  const sizes = useSelector(state => state.sizes);
  const segments = (sizes.readyStatus !== FETCH_SIZES_SUCCESS) ? []
    : Object.keys(sizes.data).map(k => sizes.data[k]);

  const [segmentMenuOpened, setSegmentMenuOpened ] = useState(false);
  const index = segments.findIndex(s => s.id === selectedSegment)

    let segmentName = (index >= 0) ? names[segments[index].name] : '';

  const openSegmentMenu = () => {
      setSegmentMenuOpened(!segmentMenuOpened)
  };

  const closeMenu = () => {
    setSegmentMenuOpened(false)
  };


  const segmentMenuClass = () => {
    if(segmentMenuOpened === true) {
      return st.segmentMenuContainer
    }
    else{
      return classNames(st.segmentMenuContainer, st.disabled)
    }
  };


  return <div className={st.segmentDropMenu}>
    <button onClick={openSegmentMenu}>{segmentName} </button>
    <div className={segmentMenuClass()}>
      <SegmentMenu  attribute="segment" closeMenu={closeMenu} isDropMenu={true}/>
    </div>
  </div>
}