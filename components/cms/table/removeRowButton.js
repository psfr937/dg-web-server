import React, { PureComponent } from "react";
import {connect} from "react-redux";
import withRedux from "../../lib/withRedux";

class RemoveRowButtonAnyType extends PureComponent{

  constructor(props){
    super(props)
    this.editRow = this.editRow.bind(this)
  }

  editRow(e){
    this.props.editRow(
      this.props.id,
      'removed',
      true
    )
  }

  render(){
    return (
      <div>
        <button onClick={this.editRow} className='moreDetailButton'>
          <svg viewBox="0 0 24 24">
            <path d="M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
          </svg>
        </button>
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

const RemoveRowButtonWithType = withRedux(connector(RemoveRowButtonAnyType))

export default type => ((RemoveRowButtonAnyType, type) => {
  return props => (
    <RemoveRowButtonWithType
      type={type}
      {...props}
    />
  )
})(RemoveRowButtonAnyType, type)