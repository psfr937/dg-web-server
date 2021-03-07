import React, { PureComponent } from 'react'
import classnames from 'classnames'

const getStyle = (readOnly) => {
  return readOnly ? classnames('readOnly', 'addClientRowButtonContainer', 'clientListRow', 'hidden')
    : "readOnly addClientRowButtonContainer clientListRow"
}
export default ({addRowFunc, readOnly, label='Add New Item'}) => (
    <div onClick={() => addRowFunc()} className={getStyle(readOnly)}>
          <div className="addClientRowButton">{label}</div>
    </div>
)
