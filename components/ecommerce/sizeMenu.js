import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch-dom'
import React, { useState } from "react"
import { useSelector} from "react-redux";
import { FETCH_SIZES_SUCCESS } from "../../redux/reducers/ecommerce/sizes";
import st from "./sizeMenu.module.scss"
const namespace = 'refinementList';
import classnames from 'classnames'


const MySearchBox = ({ currentRefinement, refine }) => {

  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedSizeNames, setSelectedSizeNames] = useState([])
  const onClick = (d, t) => {

    const name = `${d.physique} > ${d.name} > ${t.name}`
    const idx = selectedSizes.indexOf(t.id);
    const nameIdx = selectedSizeNames.indexOf(name)

    if(nameIdx < 0) {
      setSelectedSizeNames([...selectedSizeNames, name])
      refine( [...selectedSizeNames, name])
    }
    else{
      setSelectedSizeNames(selectedSizeNames.slice(0, idx).concat(...selectedSizeNames.slice(idx + 1)))
      refine(selectedSizeNames.slice(0, idx).concat(...selectedSizeNames.slice(idx + 1)))
    }

    if(idx < 0) {
      setSelectedSizes([...selectedSizes, t.id])
    }
    else{
      setSelectedSizes(selectedSizes.slice(0, idx).concat(...selectedSizes.slice(idx + 1)))
    }

  };

  const sizeButtonClass = (id) => {
    return selectedSizes.indexOf(id) >= 0 ? classnames(st.sizeItem, st.selected) : st.sizeItem
  };

  // if(typeof window !== 'undefined' ) {
    const sizes = useSelector(state => state.sizes)
    const data = sizes.readyStatus === FETCH_SIZES_SUCCESS ?
      Object.keys(sizes.data).map(k => sizes.data[k]) : []
  console.log(data)
    return data.filter(d => d.physique === 'women').map(d => (
      <div className={st.measurementMenu}>
        <div className={st.measurementMenuTitle}>
          <h4> {d.name}</h4>
        </div>
        <div className={st.sizeList}>
          {d.sizes.map(t => <button
            className={sizeButtonClass(t.id)} onClick={() => onClick(d, t)}>
            {t.name}
          </button>)
          }
        </div>

      </div>

    ))
  // }
  // else{
  //   return null
  // }
};

export default connectRefinementList(MySearchBox);
