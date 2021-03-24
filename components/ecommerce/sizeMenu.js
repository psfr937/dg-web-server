import { connectRefinementList } from 'react-instantsearch-dom'
import React, { useState } from "react"
import { useSelector} from "react-redux";
import { FETCH_SIZES_SUCCESS } from "../../redux/reducers/ecommerce/sizes";
import st from "./sizeMenu.module.scss"
import classnames from 'classnames'

const MySearchBox = ({ currentRefinement, refine }) => {

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSizeNames, setSelectedSizeNames] = useState([]);
  const [physiqueName, setPhysiqueName] = useState(null);
  const ux = useSelector(state => state.ux);
  const onClick = (d, t) => {
    const name = `${physiqueName} > ${d.name} > ${t.name}`;
    const idx = selectedSizes.indexOf(t.id);
    const nameIdx = selectedSizeNames.indexOf(name);

    if(nameIdx < 0) {
      setSelectedSizeNames([...selectedSizeNames, name]);
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

  const sizes = useSelector(state => state.sizes);
    let measurements = [];
    console.log(sizes)

    if(sizes.readyStatus === FETCH_SIZES_SUCCESS){
      let segmentDetail = Object.keys(sizes.data).map(k => sizes.data[k]).find(s => s.id === ux.selectedSegment)
      console.log(segmentDetail);
      if(typeof segmentDetail !== 'undefined' && Array.isArray(segmentDetail.physiques)) {
        let physiqueDetail = segmentDetail.physiques.find(p => p.id === ux.selectedPhysique);
        if(typeof physiqueDetail !== 'undefined' && Array.isArray(physiqueDetail.measurements)) {
          if(physiqueName === null) setPhysiqueName(physiqueDetail.name);
          measurements = physiqueDetail.measurements
        }
      }
    }

    return measurements.map(d => (
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
};

export default connectRefinementList(MySearchBox);
