import React, { PureComponent } from "react";
import {fetchMyVisits} from '../../../redux/actions/account/ownVisits'
import {saveVisits, addEditVisitRow } from "../../../redux/actions/booking/visitAction/saveVisits";
import {connect} from "react-redux";
import {FETCH_OWN_VISITS_INVALID,
  FETCH_OWN_VISITS_SUCCESS} from "../../../redux/reducers/account/ownVisits";
import VisitDetailSectionTextbox from "./visitDetailSectionTextbox";
import {ADD_EDIT_VISIT_ROW, EDIT_VISIT_ROW} from "../../../redux/reducers/booking/visitReducer/editVisit";
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();
import moment from 'moment'
import {SET_READ_ONLY} from "../../redux/reducers/ux";


class UserViewClientDetail extends PureComponent{


  constructor(props){
    super(props)
    this.state = {
      selectedVisitId: null,
    }
    this.isVisitListItemActive = this.isVisitListItemActive.bind(this)
    this.insertImage = this.insertImage.bind(this)
    this.addVisitRow = this.addVisitRow.bind(this)
    this.selectVisit = this.selectVisit.bind(this)
    this.saveVisits = this.saveVisits.bind(this)
    this.editField = this.editField.bind(this)

  }

  componentDidMount() {
    this.props.fetchMyVisits()
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

  static getDerivedStateFromProps(props, state) {
      if (state.selectedVisitId === null && Array.isArray(props.visitsDataArray) && props.visitsDataArray.length > 0) {
        const key = props.visitsDataArray[0].id
        console.log(key)
        return({selectedVisitId: key});
      }
      else{
        return null
      }

  }


  insertImage(fieldName, originalValue){

    //  var HtmlToReactParser = require('html-to-react').Parser;
    this.props.editVisitRow(
      this.state.selectedVisitId,
      fieldName,
      htmlToReactParser.parse( ` ${originalValue} <img src='https://i.imgur.com/aBcof3d.png' alt="Logo" />`)
    )
  }

  render(){
    const { visitsData: data,  visitsReadyStatus, upcomingVisitsArray, pastVisitsArray } = this.props


    const datailOfSelectedVisit = typeof data !== 'undefined' && this.state.selectedVisitId in data &&
    this.state.selectedVisitId !== null ?
      data[this.state.selectedVisitId] : null



    const servicesOfSelectedVisit = datailOfSelectedVisit !== null &&
    'services' in datailOfSelectedVisit ?
      datailOfSelectedVisit.services.filter(s => s.removed !== true) : []
    return (
      <div className={this.props.className}>
        {
          <div className="clientDetail">
            <div className="userViewClientDetailBody">
              <div className="visitListContainer">

                <div className="visitList">
                  <div className="visitListTitle">
                    Booking
                  </div>
                  <div className="visitListContent">
                    {
                      upcomingVisitsArray
                        .map((v, i) => {
                        return (
                          <div
                            key={v.id}
                            className={this.isVisitListItemActive(v.id)}
                            onClick={() => this.selectVisit(v.id)}>
                            <div className="visitListItemTitle">{v.title}</div>
                            <div className="timeText">{moment(v.visit_time).format('YYYY-MM-DD HH:mm') }</div>

                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="visitListTitle">
                    History
                  </div>

                  <div className="visitListContent">
                    {
                      pastVisitsArray.map((v, i) => {

                        return (
                          <div
                            key={v.id}
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
              </div>
              {datailOfSelectedVisit !== null &&
              visitsReadyStatus === FETCH_OWN_VISITS_SUCCESS ?
                <div className="visitDetail">

                  <div className="visitDetailHeader">
                    <span>{datailOfSelectedVisit.title}</span>
                    <span className="visitDetailHeaderTime">{datailOfSelectedVisit.visit_time}</span>
                  </div>
                  <div className="visitDetailSectionTitle">
                    <div>
                      診證時間：{moment(datailOfSelectedVisit.visit_time).format('DD/MM/YYYY HH:mm')}
                    </div>
                    <div>
                      醫生: {datailOfSelectedVisit.staff_name}
                    </div>
                  </div>
                  <div className="visitDetailSection">
                    <div className="visitDetailSectionTitle">
                      主因
                    </div>
                    <VisitDetailSectionTextbox
                      key="main_description"
                      name="main_description"
                      readOnly={true}
                      content={datailOfSelectedVisit.main_description}
                      editFunc={value => this.editField("main_description")(value)}
                    />
                  </div>
                  <div className="visitDetailSection">
                    <div className="visitDetailSectionTitle">主證</div>
                    <VisitDetailSectionTextbox
                      key="evidence"
                      name="evidence"
                      readOnly={true}
                      content={datailOfSelectedVisit.evidence}
                      editFunc={value => this.editField("evidence")(value)}
                    />

                  </div>
                  <div className="visitDetailSection">
                    <div className="visitDetailSectionTitle">歷史</div>
                    <VisitDetailSectionTextbox
                      key="history"
                      name="history"
                      readOnly={true}
                      content={datailOfSelectedVisit.history}
                      editFunc={value => this.editField("history")(value)}
                    />
                  </div>
                  <div className="visitDetailSection">
                    <div className="visitDetailSectionTitle"> 骨科治療</div>
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
                  </div>
                  <div className="visitDetailSection">
                    <div className="visitDetailSectionTitle"> 食療處方</div>
                    <div className="visitDetailServiceList">
                      {
                        datailOfSelectedVisit !== null && 'products' in datailOfSelectedVisit ?
                          datailOfSelectedVisit.products.filter(s => s.removed !== true).map(p =>
                            <div className="visitDetailServiceListItem">
                              <span>{p.name}</span>
                              <span>{p.price}</span>
                            </div>
                          ) : null
                      }
                    </div>
                  </div>
                </div> : null
              }
            </div>
          </div>
        }
      </div>
    )

  }
}

const mapStateToProps = ({ ownVisits, ux }, ownProps) => {
  let visitsData = {}

  let visitsReadyStatus = FETCH_OWN_VISITS_INVALID

  if ('data' in  ownVisits) {
    visitsData =  ownVisits.data
  }
  if ('readyStatus' in  ownVisits) {
    visitsReadyStatus =  ownVisits.readyStatus
  }

  const now = moment()

  const visitsDataArray = typeof visitsData !== 'undefined' ? Object.keys(visitsData)
    .map(k => visitsData[k])
    .sort((a,b) => {
      if (a.visit_time === null && b.visit_time === null) {
        return 0
      }
      else if(a.visit_time === null){
        return 1
      }
      else if (b.visit_time === null){
        return -1
      }
      else {
        return new moment(b.visit_time).format('YYYYMMDDHHmm') - new moment(a.visit_time).format('YYYYMMDDHHmm')
      }
    }) : []

  return {
    visitsData,
    visitsDataArray,
    visitsReadyStatus,
    readOnly: ux.readOnly.visitList,
    upcomingVisitsArray:  typeof visitsData !== 'undefined' ? visitsDataArray.filter(v => {
      const time = moment(v.visit_time)
      return moment.isMoment(time) && time.isAfter(now)
    }) : [],
    pastVisitsArray: typeof visitsData !== 'undefined' ? visitsDataArray.filter(v => {
      const time = moment(v.visit_time)
      return v.visit_time === null || (moment.isMoment(time) && time.isBefore(now))
    }) : []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveVisits: (clientId) => dispatch(saveVisits(clientId)),
    addEditVisitRow: () => dispatch({type: ADD_EDIT_VISIT_ROW}),
    fetchMyVisits: () => dispatch(fetchMyVisits()),
    editVisitRow: (id, field, value) => dispatch({
      type: EDIT_VISIT_ROW,
      id,
      field,
      value
    }),
    setReadOnly: bool => dispatch({type: SET_READ_ONLY, listName: 'visitList', value: bool}),
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);


export default connector(UserViewClientDetail)
