import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { FETCH_PMS_INVALID } from "../../redux/reducers/ecommerce/pms";
import {selectPm, fetchPms} from "../../redux/actions/ecommerce/pms";
import st from './pmSelection.module.scss'
import StripeAddPmContainer from '../components/stripe/StripeAddPmContainer'

class PaymentMethodList extends PureComponent{

  constructor(props){
    super(props);
    this.onClickPm = this.onClickPm.bind(this)
  }

  componentDidMount() {
    this.props.fetchPms()
  }

  onClickPm(id){
    this.props.selectPm(id)
  }

  render(){
    const data = this.props.pmsData;

    return (
      <div classname={st.pmSection}>
        <div className={st.pmList}>
          {
            Object.keys(data).map(k =>
              <div onClick={() => this.onClickPm(data[k].id)} className={st.pmCard}>
                <h4 className={st.pmCardTitle}>
                  {data[k].name}
                </h4>
                <h4 className={st.pmCardDetail}>
                  {data[k].last_four}
                  {data[k].funding}
                  {data[k].fingerprint}
                  {data[k].exp_month}
                  {data[k].exp_year}
                </h4>
              </div>
            )
          }
        </div>
        <StripeAddPmContainer/>
      </div>
    )
  }
}

const mapStateToProps = ({ fetchPms }) => {
  let pmsData = {};
  let pmsReadyStatus = FETCH_PMS_INVALID;
  if (typeof fetchPms === 'object'){
    if('data' in fetchPms){
      pmsData = fetchPms.data
    }
    if('readyStatus' in fetchPms){
      pmsReadyStatus = fetchPms.readyStatus
    }
  }

  return {
    pmsData,
    pmsReadyStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPms: () => dispatch(fetchPms()),
    selectPm: (id) => dispatch(selectPm(id)),
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(PaymentMethodList)