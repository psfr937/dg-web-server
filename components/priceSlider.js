import React from 'react';
import { connectRange } from 'react-instantsearch-dom';

// Prerequisite: install rheostat@4
import 'rheostat/initialize';
import Rheostat from 'rheostat';

const algorithm = {
  getPosition(value, min, max) {
    const minv = Math.log(min);
    const maxv = Math.log(max);

    const scale = (maxv - minv) / 100;

    return (Math.log(value) - minv) / scale;
  },

  getValue(positionPercent, min, max) {
    const minv = Math.log(min);
    const maxv = Math.log(max);

    if (positionPercent === 0) {
      return min;
    }

    if (positionPercent === 100) {
      return max;
    }

    // calculate adjustment factor
    const scale = (maxv - minv) / 100;

    return Math.floor(Math.exp(minv + (scale * positionPercent))) || 0;
  },
};

const PriceSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
  const [stateMin, setStateMin] = React.useState(min);
  const [stateMax, setStateMax] = React.useState(max);

  React.useEffect(() => {
    if (canRefine) {
      setStateMin(currentRefinement.min);
      setStateMax(currentRefinement.max);
    }
  }, [currentRefinement.min, currentRefinement.max]);

  if (min === max) {
    return null;
  }

  const onChange = ({ values: [min, max] }) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };

  const onValuesUpdated = ({ values: [min, max] }) => {
    setStateMin(min);
    setStateMax(max);
  };

  return (
    <div className="rheostat-container">
      <Rheostat
        min={min}
        max={max}
        algorithm={algorithm}
        values={[currentRefinement.min, currentRefinement.max]}
        onChange={onChange}
        onValuesUpdated={onValuesUpdated}
      >
        <div className="rheostat-marker-row">
          <div
            className="rheostat-marker rheostat-marker--large"
            style={{ left: 0 }}
          >
            <div className="rheostat-value">HKD${stateMin / 100}</div>
          </div>
          <div
            className="rheostat-marker rheostat-marker--large"
            style={{ right: 0 }}
          >
            <div className="rheostat-value">HKD${stateMax / 100}</div>
          </div>
        </div>
      </Rheostat>
    </div>
  );
};

export default connectRange(PriceSlider);