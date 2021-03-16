import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch-dom'
import React, { useState } from "react"
import st from "./segmentMenu.module.scss"
const namespace = 'refinementList';
import classnames from 'classnames'


const MySearchBox = ({ currentRefinement, refine }) => {

  const [selectedSegment, setSelectedSegment] = useState('women');
  const onClick = (s) => {
      setSelectedSegment(s.value)
      refine(s.value)
  };

  const sizeButtonClass = (value) => {
    return selectedSegment === value ? classnames(st.sizeItem, st.selected) : st.sizeItem
  }
  const segments = [
    {
      label: 'Women',
      value: 'women'
    },
    {
      label: 'Girl',
      value: 'girl'
    },
    {
      label: 'Boy',
      value: 'boy'
    },
  ]


  return <div className={st.sizeList}>
    {segments.map( s => (
         <button
          className={sizeButtonClass(s.value)} onClick={() => onClick(s)}>
         {s.label}
        </button>
    ))
    }

      </div>



};

export default connectRefinementList(MySearchBox);
