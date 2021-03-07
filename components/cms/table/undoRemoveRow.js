import React, { PureComponent } from "react";
import {connect} from "react-redux";

class RemoveRowButtonAnyType extends PureComponent{

  constructor(props){
    super(props)
    this.editRow = this.editRow.bind(this)
  }

  editRow(e){
    this.props.editRow(
      this.props.id,
      'removed',
      false
    )
  }

  render(){
    const { id, removed } = this.props
    return (
      <div onClick={this.editRow} className={removed ? 'undoRemove' : 'undoRemove hidden'}>
        Undo Remove
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {

  const { type } = ownProps

  let actionType = 'EDIT_CLIENT_ROW'
  if(type === 'SERVICE'){
    actionType = 'EDIT_SERVICE_ROW'
  }
  else if(type === 'STAFF'){
    actionType = 'EDIT_STAFF_ROW'
  }

  return {
    editRow: (id, field, value) => dispatch({
      type: actionType,
      id,
      field,
      value
    })
  };
};

const connector = connect(
  null,
  mapDispatchToProps
);

const RemoveRowButtonWithType = connector(RemoveRowButtonAnyType)

export default type => ((RemoveRowButtonAnyType, type) => {
  return props => (
    <RemoveRowButtonWithType
      type={type}
      {...props}
    />
  )
})(RemoveRowButtonAnyType, type)