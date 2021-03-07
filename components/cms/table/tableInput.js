import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { EDIT_CLIENT_ROW } from "../../../redux/reducers/clientReducer/editClient";
import { FETCH_CLIENTS_INVALID } from "../../../redux/reducers/clientReducer/clients";
import classnames from 'classnames'

class TableInputWithAnyType extends PureComponent{

  constructor(props){
    super(props)
    this.getStyle = this.getStyle.bind(this)
    this.editRow = this.editRow.bind(this)
    this.state = {
      readOnly: true
    }
  }

  getStyle() {
    return this.props.readOnly
      ? classnames('readOnly')
      : null
  }

  isLocked(){
    return this.props.c.verified === true ? 'locked'
  : null

  }

  editRow(e){
    this.props.editRow(
      this.props.c.id,
      this.props.fieldName,
      e.target.value
    )
  }

  render(){
    const { c, type, fieldName, readOnly } = this.props
    const inputType = type !== null ? type : 'text'
    const defaultValue = c[fieldName]
    console.log(defaultValue)
    return (
      <input
        readOnly={readOnly}
        type={inputType}
        onChange={this.editRow}
        className={this.getStyle()}
        defaultValue={defaultValue}/>
    )
  }
}

const mapStateToProps = ({ clients }) => {
  let clientsData = []
  let clientsReadyStatus = FETCH_CLIENTS_INVALID
  if (typeof clients === 'object'){
    if('data' in clients && Array.isArray(clients.data)){
      clientsData = clients.data
    }
    if('readyStatus' in clients ){
      clientsReadyStatus = clients.readyStatus
    }
  }


  return {
    clientsData,
    clientsReadyStatus
  };
};

const actionTypes = {
  CLIENT: 'EDIT_CLIENT_ROW',
  SERVICE: 'EDIT_SERVICE_ROW',
  STAFF: 'EDIT_STAFF_ROW',
  PRODUCT: 'EDIT_PRODUCT_ROW'
}


const mapDispatchToProps = (dispatch, ownProps) => {

  const { actionType } = ownProps
  let type = actionTypes[actionType]

  return {
    editRow: (id, field, value) => dispatch({
      type: type,
      id,
      field,
      value
    })
  };
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const TableInputWithType = connector(TableInputWithAnyType)

export default type => ((TableInputWithAnyType, type) => {
    return props => (
      <TableInputWithType
        actionType={type}
        {...props}
      />
    )
})(TableInputWithAnyType, type)


