import React, { PureComponent } from 'react'
import {withAuthSync} from "../../../utils/auth"
import withRedux from "../../../lib/withRedux"
import { connect } from 'react-redux'
import { fetchServices } from "../../../redux/actions/booking/serviceAction/services"
import classnames from 'classnames'
import CircleImage from "../circleImage";
import ResizableBox from "../table/resizableBox";
import TableInput from "../table/tableInput";
import EditServiceButton from '../table/editTableButton'
import { ADD_EDIT_SERVICE_ROW,
EDIT_SERVICE_ROW} from "../../../redux/reducers/booking/serviceReducer/editService";
import AddServiceRowButton from "../table/addTableRowButton";
import SaveServicesButton from '../table/saveTableButton'
import {saveServices} from "../../../redux/actions/booking/serviceAction/saveServices";
import ServiceDetail from "./serviceDetail";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import {FETCH_SERVICES_INVALID} from "../../../redux/reducers/booking/serviceReducer/services";
import MoreDetailButton from "../table/moreDetailButton";
import {fetchVisits} from "../../../redux/actions/booking/visitAction/visits";
import {SET_READ_ONLY} from "../../../redux/reducers/ecommerce/ux";
import HOCRemoveRowButton from "../table/removeRowButton";
import HOCUndoRemoveRow from "../table/undoRemoveRow";
import PicturePreviewPopup from '../picturePreviewPopup'

const ServiceTableInput = TableInput('SERVICE')
const RemoveRowButton = HOCRemoveRowButton('SERVICE')
const UndoRemoveRow = HOCUndoRemoveRow('SERVICE')

class ServiceList extends PureComponent{

  constructor(props){
    super(props)
    this.readOnlyRowStyle = this.readOnlyRowStyle.bind(this)
    this.enableEditFunc = this.enableEditFunc.bind(this)
    this.addServiceRow = this.addServiceRow.bind(this)
    this.saveServices = this.saveServices.bind(this)
    this.openDetail = this.openDetail.bind(this)
    this.closeDetail = this.closeDetail.bind(this)
    this.isOpened = this.isOpened.bind(this)
    this.state = {
      selectedDetailId: -1,
    }
    this.targetElement = null
  }

  componentDidMount() {
    this.targetElement = document.querySelector('#tableListContainer');
    this.props.fetchServices()
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
    this.serviceList.scrollIntoView({ behavior: "smooth"})
  }

  saveServices(){
    this.props.saveServices()
  }

  addServiceRow(){
    console.log('called')
    this.scrollToBottom()
    this.props.addEditServiceRow()
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
      ? 'serviceDetailContainer'
      : 'serviceDetailContainer hidden'
  }

  closeDetail(){
    enableBodyScroll(this.targetElement)
    this.setState({selectedDetailId: -1})
  }

  render(){
    const { servicesData, editServiceData } = this.props
    const { readOnly } = this.props
    const data = readOnly ? servicesData : editServiceData
    const dataOfSelectedService = this.state.selectedDetailId in data
      ? data[this.state.selectedDetailId] : null
    console.log(servicesData)
    return (
      <div className="rightPage">
        <div className="bodyContent">
          <div className="toolBar">
            <div className="adminToolBarLeft">
              Services
            </div>
            <div className="adminToolBarRight">
              <EditServiceButton
                enableEditFunc={this.enableEditFunc}
                readOnly={readOnly}
                label='Edit Services'
              />
              <SaveServicesButton
                saveFunc={this.saveServices}
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
                    <ResizableBox header styles={{'width': '40px'}}>名稱</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>圖片</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>簡介</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>價錢</ResizableBox>
                    <ResizableBox header styles={{'width': '40px'}}>需時</ResizableBox>
                    {this.props.readOnly ? null : <th className="tableListCol"/>}
                  </tr>
                  </thead>
                  <tbody>
                  {Object.keys(data).map(
                    (k, i) =>
                      <tr className={this.readOnlyRowStyle()}>
                        <ResizableBox>{i+1}</ResizableBox>
                        <ResizableBox styles={{'width': '40px'}}>
                          <ServiceTableInput readOnly={this.props.readOnly} c={data[k]} fieldName={'name'}/>
                        </ResizableBox>

                        <ResizableBox styles={{'width': '40px'}} maxContent={false}>
                          <PicturePreviewPopup readOnly={this.props.readOnly} c={data[k]} fieldName={'picture_url'}/>
                        </ResizableBox>
                        <ResizableBox styles={{'width': '40px'}}>
                          <ServiceTableInput readOnly={this.props.readOnly} c={data[k]} fieldName={'description'}/>
                        </ResizableBox>
                        <ResizableBox styles={{'width': '40px'}}>
                          <ServiceTableInput readOnly={this.props.readOnly} c={data[k]} fieldName={'price'}/>
                        </ResizableBox>
                        <ResizableBox readOnly={this.props.readOnly} styles={{'width': '40px'}}>
                          <ServiceTableInput readOnly={this.props.readOnly} c={data[k]} fieldName={'minutes_required'}/>
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
                  this.serviceList = el;
                }}/>
              </div>

            </div>
            <AddServiceRowButton
              addRowFunc={this.addServiceRow}
              readOnly={this.props.readOnly}
              label='Add New Service'
            />
          </div>
        </div>
        { dataOfSelectedService !== null ?
          <ServiceDetail
            className={this.isOpened()}
            serviceData={dataOfSelectedService}
            closeDetail={this.closeDetail}
            serviceId={this.state.selectedDetailId}
          />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({ services, editService, ux }) => {
  let servicesData = {}
  let servicesReadyStatus = FETCH_SERVICES_INVALID
  if (typeof services === 'object'){
    if('data' in services){
      servicesData = services.data
    }
    if('readyStatus' in services ){
      servicesReadyStatus = services.readyStatus
    }
  }


  return {
    servicesData,
    servicesReadyStatus,
    editServiceData: editService,
    readOnly: ux.readOnly.serviceList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVisits: (id) => dispatch(fetchVisits(id)),
    fetchServices: () => dispatch(fetchServices()),
    saveServices: () => dispatch(saveServices()),
    addEditServiceRow: () => dispatch({type: ADD_EDIT_SERVICE_ROW}),
    editRow: (id, field, value) => dispatch({
      type: EDIT_SERVICE_ROW,
      id,
      field,
      value
    }),
    setReadOnly: bool => dispatch({type: SET_READ_ONLY, listName: 'serviceList', value: bool})
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withAuthSync(withRedux(connector(ServiceList)))