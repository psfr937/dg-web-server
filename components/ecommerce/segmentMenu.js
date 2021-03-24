import { connectRefinementList } from 'react-instantsearch-dom'
import React, { useState } from "react"
import st from "./segmentMenu.module.scss"
const namespace = 'refinementList';
import classnames from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import { SET_UX_VALUE } from "../../redux/reducers/ecommerce/ux";
import {FETCH_SIZES_SUCCESS} from "../../redux/reducers/ecommerce/sizes";

const SegmentMenu = ({ currentRefinement, refine }) => {


  const selectedSegment = useSelector(state => state.ux.selectedSegment);
  const sizes = useSelector(state => state.sizes);
  const segments = (sizes.readyStatus !== FETCH_SIZES_SUCCESS) ? []
    : Object.keys(sizes.data).map(k => sizes.data[k]);
  console.log(segments)
  const dispatch = useDispatch();
  const onClick = (s) => {
      dispatch({type: SET_UX_VALUE, key: 'selectedSegment', value: s.id});
      refine(s.name)
  };

  const sizeButtonClass = (id) => {
    return selectedSegment === id ? classnames(st.sizeItem, st.selected) : st.sizeItem
  }


  return <div className={st.sizeList}>
    {segments.map( s => (
         <button
          className={sizeButtonClass(s.id)} onClick={() => onClick(s)}>
         {s.name}
        </button>
    ))
    }

      </div>



};

export default connectRefinementList(SegmentMenu);
