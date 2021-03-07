import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { EDIT_CLIENT_ROW } from "../../../redux/reducers/clientReducer/editClient";
import { FETCH_CLIENTS_INVALID } from "../../../redux/reducers/clientReducer/clients";
import classnames from 'classnames'
import DatePicker from "react-date-picker/dist/entry.nostyle";

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

  editRow(value){
    this.props.editRow(
      this.props.c.id,
      this.props.fieldName,
      value
    )
  }

  render(){
    const { c, type, fieldName, readOnly } = this.props
    const inputType = type !== null ? type : 'text'
    const date = c[fieldName]
    console.log(date)
    const defaultValue = date === null ? new Date() : new Date(date)
    console.log(defaultValue)
    return (
      <DatePicker
        readOnly={readOnly}
        onChange={this.editRow}
        value={defaultValue}
      />
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
  mapStateToProps,
  mapDispatchToProps
);

const TableInputWithType = connector(TableInputWithAnyType)

export default type => ((TableInputWithAnyType, type) => {
  return props => (
    <TableInputWithType
      type={type}
      {...props}
    />
  )
})(TableInputWithAnyType, type)


