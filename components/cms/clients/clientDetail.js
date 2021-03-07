import React, { PureComponent } from "react";
import {fetchVisits, resetEditVisits} from '../../../redux/actions/visitAction/visits'
import {saveVisits, addEditVisitRow } from "../../../redux/actions/visitAction/saveVisits";
import {connect} from "react-redux";
import {FETCH_VISITS_INVALID,
FETCH_VISITS_SUCCESS} from "../../../redux/reducers/visitReducer/visits";
import moment from 'moment'
import VisitDetailSectionTextbox from "./visitDetailSectionTextbox";
import EditTableButton from "../table/editTableButton";
import SaveTableButton from "../table/saveTableButton";
import {ADD_EDIT_VISIT_ROW, EDIT_VISIT_ROW} from "../../../redux/reducers/visitReducer/editVisit";
import classnames from "classnames";
var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();
import ServiceMenu from './serviceMenu'
import {SET_READ_ONLY} from "../../redux/reducers/ux";
import ProductMenu from "./productMenu";
import { fetchStaffs } from '../../redux/actions/staffAction/staffs'

import dynamic from 'next/dynamic';
import StaffMenu from "./staffMenu";

const  SickLeavePreview = dynamic(import ('../sickLeavePreview'),{ssr:false});

class ClientDetail extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      selectedVisitId: null,
    }
    this.isVisitListItemActive = this.isVisitListItemActive.bind(this)
    this.enableEditFunc = this.enableEditFunc.bind(this)
    this.insertImage = this.insertImage.bind(this)
    this.addVisitRow = this.addVisitRow.bind(this)
    this.selectVisit = this.selectVisit.bind(this)
    this.saveVisits = this.saveVisits.bind(this)
    this.editField = this.editField.bind(this)
    this.renderDetail=this.renderDetail.bind(this)
    this.renderVisitList = this.renderVisitList.bind(this)


  }

  enableEditFunc(){
    const readOnly = this.props.readOnly
    if(readOnly === false) {
      this.props.setReadOnly(true)
    }
    else{
      this.props.setReadOnly(false)
      this.props.resetEditData(this.props.clientId)
    }
  }

  componentDidMount(){
    this.props.fetchStaffs()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.readOnly === true) {
      if (nextProps.visitsData !== this.props.visitsData
        && typeof nextProps.visitsData === 'object' && Object.keys(nextProps.visitsData).length > 0) {
        const keys = Object.keys(nextProps.visitsData)
        this.setState({selectedVisitId: keys[keys.length-1]});
      }
    }
    else{
      if (nextProps.editVisitData !== this.props.editVisitData
        && typeof nextProps.editVisitData === 'object' && Object.keys(nextProps.editVisitData).length > 0) {
        const keys = Object.keys(nextProps.editVisitData)
        this.setState({selectedVisitId: keys[keys.length-1]});
      }
    }

  }

  saveVisits(){
    this.props.saveVisits(this.props.clientId)
  }


  selectVisit(id){
    this.setState({selectedVisitId: id })
  }

  isVisitListItemActive(id){
    return this.state.selectedVisitId === id
    ? 'visitListItem active'
      : 'visitListItem'
  }

  addVisitRow(){
    this.props.addEditVisitRow()
    this.props.setReadOnly(false)
  }

  editField(fieldName){
    console.log(fieldName)
    return value => {
      console.log(value)
      this.props.editVisitRow(
        this.state.selectedVisitId,
        fieldName,
        value
      )
    }
  }


  insertImage(fieldName, originalValue){

    this.props.editVisitRow(
      this.state.selectedVisitId,
      fieldName,
      htmlToReactParser.parse( ` ${originalValue} <img src='https://i.imgur.com/aBcof3d.png' alt="Logo" />`)
    )
  }

  renderVisitList(data){
    return(
      <div className="visitListContainer">
        <div className="visitList">
          <div className="visitListTitle">
            Records
          </div>
          <div className="visitListContent">
            {
              Object.keys(data).map((k, i) => {
                const v = data[k]
                console.log(k)
                return (
                  <div
                    key={k}
                    className={this.isVisitListItemActive(v.id)}
                    onClick={() => this.selectVisit(v.id)}>
                    <div className="visitListItemTitle">{v.title}</div>
                    <div className="timeText">{moment(v.visit_time).format('YYYY-MM-DD HH:mm') }</div>

                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="addVisitButton" onClick={this.addVisitRow}>
          <div className="visitListItemTitle">+ New Visit</div>
        </div>
      </div>
    )
  }

  renderDetail(data, selectedVisitId, visitsReadyStatus ){

    const datailOfSelectedVisit = typeof data !== 'undefined' && selectedVisitId in data &&
    selectedVisitId !== null ?
      data[selectedVisitId] : null


    const { staffsData, readOnly } = this.props

    const servicesOfSelectedVisit = datailOfSelectedVisit !== null &&
    'services' in datailOfSelectedVisit ?
      datailOfSelectedVisit.services.filter(s => s.removed !== true) : []
    const productsOfSelectedVisit = datailOfSelectedVisit !== null &&
    'products' in datailOfSelectedVisit ?
      datailOfSelectedVisit.products.filter(s => s.removed !== true) : []

    console.log(datailOfSelectedVisit)
    console.log(staffsData)

    const staffOfSelectedVisit = staffsData !== {} && datailOfSelectedVisit !== null ?
     staffsData[datailOfSelectedVisit.staff_id] : null
    const staffName = typeof staffOfSelectedVisit === 'object' && staffOfSelectedVisit !== null
      ? staffOfSelectedVisit.name : ''

    if(datailOfSelectedVisit !== null &&
      visitsReadyStatus === FETCH_VISITS_SUCCESS){

      return (<div className="visitDetail">

        <div className="visitDetailHeader">
          <span>{datailOfSelectedVisit.title}</span>
          <span className="visitDetailHeaderTime">{datailOfSelectedVisit.visit_time}</span>
        </div>

          <div  className="visitDetailTimeAndDoctor">
            <div className="visitDetailSection">
              <div className="visitDetailSectionTitle">
              診證時間
              </div>
              <div className="visitDetailSectionBody commonPadding">
              {moment(datailOfSelectedVisit.visit_time).format('DD/MM/YYYY HH:mm')}
              </div>
            </div>
            <div className="visitDetailSection">
              <div className="visitDetailSectionTitle">
              醫生
              </div>
              <div className="visitDetailSectionBody commonPadding">
              {
              readOnly ?staffName :
                <StaffMenu
                  visitId={this.state.selectedVisitId}
                  staffName={staffName}
                />
             }
              </div>
            </div>
          </div>
        <div className="visitDetailSection">
          <div className="visitDetailSectionTitle">
            主因
          </div>
          <VisitDetailSectionTextbox
            key="main_description"
            name="main_description"
            readOnly={readOnly}
            content={datailOfSelectedVisit.main_description}
            editFunc={value => this.editField("main_description")(value)}
          />
        </div>
        <div className="visitDetailSection">
          <div className="visitDetailSectionTitle">主證</div>
          <VisitDetailSectionTextbox
            key="evidence"
            name="evidence"
            readOnly={readOnly}
            content={datailOfSelectedVisit.evidence}
            editFunc={value => this.editField("evidence")(value)}
          />

        </div>
        <div className="visitDetailSection">
          <div className="visitDetailSectionTitle">歷史</div>
          <div className="visitDetailSectionBody">
            <VisitDetailSectionTextbox
              key="history"
              name="history"
              readOnly={readOnly}
              content={datailOfSelectedVisit.history}
              editFunc={value => this.editField("history")(value)}
            />
          </div>
        </div>
        <div className="visitDetailSection">
          <div className="visitDetailSectionTitle"> 骨科治療</div>

          <div className="visitDetailSectionBody commonPadding">
            <div className="visitDetailServiceList">
              {
                servicesOfSelectedVisit.map(s =>
                  <div className="visitDetailServiceListItem">
                    <span>{s.name}</span>
                    <span>{s.price}</span>
                  </div>
                )
              }
            </div>
            {readOnly ? null : <ServiceMenu
              visitId={this.state.selectedVisitId}
              selectedServices={servicesOfSelectedVisit}
            />}
          </div>
        </div>
        <div className="visitDetailSection">
          <div className="visitDetailSectionTitle"> 食療處方</div>
          <div className="visitDetailSectionBody commonPadding">

            <div className="visitDetailServiceList">
              {
                productsOfSelectedVisit.map(p =>
                  <div className="visitDetailServiceListItem">
                    <span>{p.name}</span>
                    <span>{p.price}</span>
                  </div>
                )
              }
            </div>
            {readOnly ? null : <ProductMenu
              visitId={this.state.selectedVisitId}
              selectedProducts={productsOfSelectedVisit}
            />}
          </div>
        </div>
        <div className="visitDetailSection">
          <div className="visitDetailSectionTitle">
            病假
          </div>
          <div className="visitDetailSectionBody">
            <SickLeavePreview/>
          </div>
        </div>
      </div>)
    }else{
      return null
    }
  }

  render(){
    const { visitsData, clientData, editVisitData, visitsReadyStatus } = this.props
    const { readOnly } = this.props
    console.log(visitsData)
    console.log(editVisitData)

    const data =  readOnly ? visitsData : editVisitData

    return (
      <div className={this.props.className}>
        {
          <div className="clientDetail">
            <div className="clientDetailHeader">
              {clientData['name']}
              <div className="clientDetailHeaderToolBar">
                {this.state.selectedVisitId !== null ? <EditTableButton
                  enableEditFunc={this.enableEditFunc}
                  readOnly={readOnly}
                  label='Edit Visit Records'
                /> : null }
                <SaveTableButton
                  saveFunc={this.saveVisits}
                  readOnly={readOnly}
                />
                <div onClick={this.props.closeDetail}
                     className={readOnly ? classnames("closeVisitButton")
                  : "closeVisitButton hidden"}>
                  Back
                </div>

              </div>

            </div>
            <div className="clientDetailBody">
              {
                this.renderVisitList(data)
              }
              {
                this.renderDetail(data, this.state.selectedVisitId, visitsReadyStatus )
              }
            </div>
          </div>
        }
      </div>
    )

  }
}

const mapStateToProps = ({ staffs, visits, editVisit, ux }, ownProps) => {
  let visitsData = {}
  let staffsData = {}

  if ('data' in staffs) {
    staffsData = staffs.data
  }
  const clientId = ownProps.clientId
  console.log(editVisit)
  console.log(clientId)
  console.log(visits)
  const visitOfClient = clientId in visits ? visits[clientId] : null
  let visitsReadyStatus = FETCH_VISITS_INVALID
  if(visitOfClient !== null) {

    if (typeof visitOfClient === 'object') {
      if ('data' in visitOfClient) {
        visitsData = visitOfClient.data
      }
      if ('readyStatus' in visitOfClient) {
        visitsReadyStatus = visitOfClient.readyStatus
      }
    }
  }


  return {
    visitsData,
    staffsData,
    visitsReadyStatus,
    editVisitData: editVisit,
    readOnly: ux.readOnly.visitList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveVisits: (clientId) => dispatch(saveVisits(clientId)),
    addEditVisitRow: () => dispatch({type: ADD_EDIT_VISIT_ROW}),
    editVisitRow: (id, field, value) => dispatch({
      type: EDIT_VISIT_ROW,
      id,
      field,
      value
    }),
    setReadOnly: bool => dispatch({type: SET_READ_ONLY, listName: 'visitList', value: bool}),
    resetEditData: clientId => dispatch(resetEditVisits(clientId)),
    fetchStaffs: () => dispatch(fetchStaffs())
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);


export default connector(ClientDetail)
