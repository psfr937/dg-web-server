import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchStaffs } from "../../../redux/actions/booking/staffAction/staffs"
import classnames from 'classnames'
import CircleImage from "../circleImage";
import ResizableBox from "../table/resizableBox";
import HOCTableInput from "../table/tableInput";
import EditStaffButton from '../table/editTableButton'
import { ADD_EDIT_STAFF_ROW } from "../../../redux/reducers/booking/staffReducer/editStaff";
import AddStaffRowButton from "../table/addTableRowButton";
import SaveStaffsButton from '../table/saveTableButton'
import {saveStaffs} from "../../../redux/actions/booking/staffAction/saveStaffs";
import StaffDetail from "./staffDetail";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import {FETCH_STAFFS_INVALID} from "../../../redux/reducers/booking/staffReducer/staffs";
import MoreDetailButton from "../table/moreDetailButton";
import {fetchVisits} from "../../../redux/actions/booking/visitAction/visits";
import {SET_READ_ONLY} from "../../../redux/reducers/ecommerce/ux";
import HOCRemoveRowButton from "../table/removeRowButton";
import HOCUndoRemoveRow from "../table/undoRemoveRow";
import HOCTableDatePicker from "../table/tableDatePicker";

const TableInput = HOCTableInput('STAFF')
const RemoveRowButton = HOCRemoveRowButton('STAFF')
const UndoRemoveRow = HOCUndoRemoveRow('STAFF')
const TableDatePicker = HOCTableDatePicker('STAFF')
class StaffList extends PureComponent{

  constructor(props){
    super(props)
    this.readOnlyRowStyle = this.readOnlyRowStyle.bind(this)
    this.enableEditFunc = this.enableEditFunc.bind(this)
    this.addStaffRow = this.addStaffRow.bind(this)
    this.saveStaffs = this.saveStaffs.bind(this)
    this.closeDetail = this.closeDetail.bind(this)
    this.isOpened = this.isOpened.bind(this)
    this.state = {
      selectedDetailId: -1
    }
    this.targetElement = null

    this.fieldNames = [
      'email', 'hkid',  'gender', 'address'
    ]
  }

  componentDidMount() {
    this.targetElement = document.querySelector('#staffListContainer');
    this.props.fetchStaffs()
    this.isLocked = this.isLocked.bind(this)
  }

  isLocked(data){
    return 'verified' in data && data.verified === true
  }


  readOnlyRowStyle() {
    return this.props.readOnly
      ? classnames('readOnly', "tableListRow")
      : classnames("tableListRow")
  }

  enableEditFunc(){
    this.props.setReadOnly(!this.props.readOnly)
  }

  scrollToBottom() {
    this.staffList.scrollIntoView({ behavior: "smooth"})
  }

  saveStaffs(){
    this.props.saveStaffs()
  }

  addStaffRow(){
    console.log('called')
    this.scrollToBottom()
    this.props.addEditStaffRow()
  }

  isOpened(){
    return this.state.selectedDetailId >= 0
      ? 'staffDetailContainer'
      : 'staffDetailContainer hidden'
  }

  closeDetail(){
    enableBodyScroll(this.targetElement)
    this.setState({selectedDetailId: -1})
  }

  render(){
    const { staffsData, editStaffData } = this.props
    const { readOnly } = this.props
    const data = readOnly ? staffsData : editStaffData
    const dataOfSelectedStaff = this.state.selectedDetailId in data
      ? data[this.state.selectedDetailId] : null
    console.log(data)
    return (
      <div className="rightPage">
        <div className="bodyContent">
          <div className="toolBar">
            <div className="adminToolBarLeft">
              Staffs
            </div>
            <div className="adminToolBarRight">
              <EditStaffButton
                enableEditFunc={this.enableEditFunc}
                readOnly={readOnly}
                label='Edit Staffs'
              />
              <SaveStaffsButton
                saveFunc={this.saveStaffs}
                readOnly={readOnly}
              />
            </div>
          </div>
          <div  className="tableListSuperContainer">
            <div id="tableListContainer" className="tableListContainer" >
              <div className="tableListSmallContainer" >
                <table className={readOnly ? "tableList" : "tableList client"}>
                  <thead>
                  <tr className="tableListRow">
                    <th className="tableListCol"/>
                    <ResizableBox header styles={{'width': '40px'}}>電話</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>姓名</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>電郵</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>身份證</ResizableBox>
                   <ResizableBox header styles={{'width': '40px'}}>性別</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>住址</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>年齡</ResizableBox>

                    {this.props.readOnly ? null : <th className="tableListCol"/>}
                  </tr>
                  </thead>
                  <tbody>
                  {Object.keys(data).map(
                    (k, i) =>
                      <tr className={this.readOnlyRowStyle()}>
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


                        {
                          this.fieldNames.map(f => (
                            <ResizableBox styles={{'width': '40px'}}>
                              <TableInput readOnly={this.props.readOnly} c={data[k]}
                                          editRow={this.editRow} fieldName={f}/>
                            </ResizableBox>
                          ))}
                        <ResizableBox styles={{'width': '40px'}}>
                          <TableInput type='number' readOnly={this.props.readOnly}
                                      c={data[k]} fieldName={'age'}/>
                        </ResizableBox>
                        {this.props.readOnly ? null :
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
                  this.staffList = el;
                }}/>
              </div>

            </div>
            <AddStaffRowButton
              addRowFunc={this.addStaffRow}
              readOnly={this.props.readOnly}
              label='Add New Staff'
            />
          </div>
        </div>
        { dataOfSelectedStaff !== null ?
          <StaffDetail
            className={this.isOpened()}
            staffData={dataOfSelectedStaff}
            closeDetail={this.closeDetail}
            staffId={this.state.selectedDetailId}
          />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({ staffs, editStaff, ux }) => {
  let staffsData = {}
  let staffsReadyStatus = FETCH_STAFFS_INVALID
  if (typeof staffs === 'object'){
    if('data' in staffs){
      staffsData = staffs.data
    }
    if('readyStatus' in staffs ){
      staffsReadyStatus = staffs.readyStatus
    }
  }

  return {
    staffsData,
    staffsReadyStatus,
    editStaffData: editStaff,
    readOnly: ux.readOnly.staffList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVisits: (id) => dispatch(fetchVisits(id)),
    fetchStaffs: () => dispatch(fetchStaffs()),
    saveStaffs: () => dispatch(saveStaffs()),
    addEditStaffRow: () => dispatch({type: ADD_EDIT_STAFF_ROW}),
    setReadOnly: bool => dispatch({type: SET_READ_ONLY, listName: 'staffList', value: bool})

  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(StaffList)