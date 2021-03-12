import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchClients } from "../../../redux/actions/booking/clientAction/clients"
import classnames from 'classnames'
import CircleImage from "../circleImage";
import ResizableBox from "../table/resizableBox";
import HOCTableInput from "../table/tableInput";
import EditTableButton from '../table/editTableButton'
import { ADD_EDIT_CLIENT_ROW } from "../../../redux/reducers/booking/clientReducer/editClient";
import AddTableRowButton from "../table/addTableRowButton";
import SaveTableButton from '../table/saveTableButton'
import {saveClients} from "../../../redux/actions/booking/clientAction/saveClients";
import ClientDetail from "./clientDetail";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {FETCH_CLIENTS_INVALID, } from "../../../redux/reducers/booking/clientReducer/clients";
import MoreDetailButton from "../table/moreDetailButton";
import {fetchVisits} from "../../../redux/actions/booking/visitAction/visits";
import { SET_READ_ONLY} from "../../../redux/reducers/ecommerce/ux"
import { resetEditClients } from "../../../redux/actions/booking/clientAction/clients";
import HOCRemoveRowButton from '../table/removeRowButton'
import HOCUndoRemoveRow from '../table/undoRemoveRow'
import HOCTableDatePicker from '../table/tableDatePicker'

const TableInput = HOCTableInput('CLIENT')
const RemoveRowButton = HOCRemoveRowButton('CLIENT')
const UndoRemoveRow = HOCUndoRemoveRow('CLIENT')
const TableDatePicker = HOCTableDatePicker('CLIENT')
import { fetchServices } from '../../../redux/actions/booking/serviceAction/services'

class ClientList extends PureComponent{

  constructor(props){
    super(props)
    this.readOnlyRowStyle = this.readOnlyRowStyle.bind(this)
    this.enableEditFunc = this.enableEditFunc.bind(this)
    this.addClientRow = this.addClientRow.bind(this)
    this.saveClients = this.saveClients.bind(this)
    this.openDetail = this.openDetail.bind(this)
    this.closeDetail = this.closeDetail.bind(this)
    this.isOpened = this.isOpened.bind(this)
    this.isLocked = this.isLocked.bind(this)
    this.state = {
      selectedDetailId: -1
    }
    this.targetElement = null

    this.fieldNames = [
       'gender',  'email',
      'referrer', 'address'
    ]
  }

  componentDidMount() {
    this.targetElement = document.querySelector('#tableListContainer');
    this.props.fetchClients()
  }



  readOnlyRowStyle() {
    return this.props.readOnly
      ? classnames('readOnly', "tableListRow")
      : classnames("tableListRow")
  }

  enableEditFunc(){
    const readOnly = this.props.readOnly
    if(readOnly === false) {
      this.props.setReadOnly(true)
    }
    else{
      this.props.setReadOnly(false)
      this.props.resetEditData()
    }
  }

  scrollToBottom() {
    this.clientList.scrollIntoView({ behavior: "smooth"})
  }

  saveClients(){
    this.props.saveClients()
  }

  addClientRow(){
    console.log('called')
    this.scrollToBottom()
    this.props.addEditClientRow()
  }

  openDetail(e, id){
    e.persist()
    console.log(id)
    disableBodyScroll(this.targetElement)

    this.setState({selectedDetailId: id})
    this.props.fetchVisits(id)
  }

  isOpened(){
    return this.state.selectedDetailId >= 0
      ? 'clientDetailContainer'
      : 'clientDetailContainer hidden'
  }

  closeDetail(){
   enableBodyScroll(this.targetElement)
    this.setState({selectedDetailId: -1})
  }

  isLocked(data){
    return 'verified' in data && data.verified === true
  }

  render(){
    const { clientsData, editClientData } = this.props
    const { readOnly } = this.props
    const data = readOnly ? clientsData : editClientData
    const dataOfSelectedClient = this.state.selectedDetailId in data
    ? data[this.state.selectedDetailId] : null
    console.log(clientsData)
    return (
      <div className="rightPage">
        <div className="bodyContent">
          <div className="toolBar">
            <div className="adminToolBarLeft">
              Clients
            </div>
            <div className="adminToolBarRight">
              <EditTableButton
                enableEditFunc={this.enableEditFunc}
                readOnly={readOnly}
                label='Edit Clients'
              />
              <SaveTableButton
                saveFunc={this.saveClients}
                readOnly={readOnly}
              />
            </div>
          </div>
          <div  className="tableListSuperContainer">
          <div id="tableListContainer" className="tableListContainer" >
            <div className="tableListSmallContainer" >
            <table className="tableList client">
              <thead>
              <tr className="tableListRow">
                <th className="tableListCol"/>
                <ResizableBox header styles={{'width': '40px'}}>電話</ResizableBox>
                <ResizableBox header styles={{'width': '40px'}}>姓名</ResizableBox>
                <ResizableBox header styles={{'width': '40px'}}>身份證</ResizableBox>
                <ResizableBox header styles={{'width': '40px'}}>年齡</ResizableBox>
                <ResizableBox header styles={{'width': '40px'}}>性別</ResizableBox>
                <ResizableBox header styles={{'width': '40px'}}>電郵</ResizableBox>
                <ResizableBox header styles={{'width': '40px'}}>介紹人</ResizableBox>
                <ResizableBox header styles={{'width': '40px'}}>住址</ResizableBox>
                <ResizableBox header styles={{'width': '40px'}}>登記日期</ResizableBox>
                <th className="tableListCol"/>
              </tr>
              </thead>
              <tbody>
              {Object.keys(data).map(
                (k, i) =>
                    <tr key={k} className={this.readOnlyRowStyle()}>
                        <ResizableBox>{i+1}</ResizableBox>
                      <ResizableBox locked={this.isLocked(data[k])} styles={{'width': '40px'}}>
                        <TableInput readOnly={this.props.readOnly || this.isLocked(data[k])}
                                    c={data[k]}
                                    editRow={this.editRow} fieldName={'phone'}/>
                      </ResizableBox>
                        <ResizableBox>
                          <div className="profileNameWithIcon" >
                            <CircleImage/>
                            <TableInput readOnly={this.props.readOnly} c={data[k]} fieldName={'name'}/>
                          </div>
                        </ResizableBox>
                      <ResizableBox styles={{'width': '40px'}}>
                        <TableInput readOnly={this.props.readOnly} c={data[k]}
                                    editRow={this.editRow} fieldName={'hkid'}/>
                      </ResizableBox>
                        <ResizableBox styles={{'width': '40px'}}>
                          <TableInput type='number' readOnly={this.props.readOnly}
                                      c={data[k]} fieldName={'age'}/>
                        </ResizableBox>
                        {
                          this.fieldNames.map(f => (
                          <ResizableBox styles={{'width': '40px'}}>
                            <TableInput readOnly={this.props.readOnly} c={data[k]}
                                        editRow={this.editRow} fieldName={f}/>
                          </ResizableBox>
                        ))}
                      <ResizableBox styles={{'width': '40px'}}>
                        <TableDatePicker readOnly={this.props.readOnly}
                                    c={data[k]} fieldName={'registered_at'}/>
                      </ResizableBox>
                      {this.props.readOnly ? (
                        <ResizableBox readOnly={this.props.readOnly} styles={{'width': '40px'}}>

                            <MoreDetailButton
                              readOnly={this.props.readOnly}
                              id={data[k].id}
                              selectedDetailId={this.state.selectedDetailId}
                              openDetail={(e) => this.openDetail(e, data[k].id)}
                              closeDetail={this.closeDetail}
                            />
                        </ResizableBox>
                      ) :
                        (data[k].removed === true ?
                            <UndoRemoveRow
                              id={data[k].id}
                              removed={data[k].removed}
                            />
                             : <ResizableBox readOnly={this.props.readOnly} styles={{'width': '40px'}}>
                              <RemoveRowButton
                              id={data[k].id}
                             />
                              </ResizableBox>
                        )
                      }
                  </tr>

              )}

              </tbody>
            </table>

            <div ref={(el) => {
              this.clientList = el;
            }}/>
            </div>

          </div>
            <AddTableRowButton
              addRowFunc={this.addClientRow}
              readOnly={this.props.readOnly}
              label='Add New Client'
            />
        </div>
        </div>
        { dataOfSelectedClient !== null ?
          <ClientDetail
            className={this.isOpened()}
            clientData={dataOfSelectedClient}
            closeDetail={this.closeDetail}
            clientId={this.state.selectedDetailId}
          />
          : null
        }
      </div>
    )
  }
}



const mapStateToProps = ({ clients, editClient, ux }) => {
  let clientsData = {}
  let clientsReadyStatus = FETCH_CLIENTS_INVALID
  if (typeof clients === 'object'){
    if('data' in clients){
      clientsData = clients.data
    }
    if('readyStatus' in clients ){
      clientsReadyStatus = clients.readyStatus
    }
  }


  return {
    clientsData,
    clientsReadyStatus,
    editClientData: editClient,
    readOnly: ux.readOnly.clientList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVisits: (id) => dispatch(fetchVisits(id)),
    fetchClients: () => dispatch(fetchClients()),
    fetchServices: () => dispatch(fetchServices()),
    saveClients: () => dispatch(saveClients()),
    addEditClientRow: () => dispatch({type: ADD_EDIT_CLIENT_ROW}),
    setReadOnly: bool => dispatch({type: SET_READ_ONLY, listName: 'clientList', value: bool}),
    resetEditData: () => dispatch(resetEditClients())


  };
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(ClientList)