import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { FETCH_PLANS_INVALID} from "../redux/reducers/fetchPlans";
import { fetchPlans, selectPlan } from "../../redux/actions/ecommerce/plan";
import st from './planSelection.module.scss'

class PlanList extends PureComponent{

  constructor(props){
    super(props)
    this.onClickPlan = this.onClickPlan.bind(this)
  }

  componentDidMount() {
    this.props.fetchPlans()
  }

  onClickPlan(id){
    this.props.selectPlan(id)
  }

  render(){
    const data = this.props.plansData

    return (
      <div className={st.planList}>
        {
          Object.keys(data).map(k =>
            <div className={st.planCard}>
              <h4 className={st.planCardTitle}>
                {data[k].name}
              </h4>
              <h4 className={st.planCardDetail}>
              </h4>
              <h4 className={st.planCardPrice}>
                {data[k].price}
              </h4>
              <button onClick={() => this.onClickPlan(data[k].id)}> Subscribe </button>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({ fetchPlans }) => {
  let plansData = {}
  let plansReadyStatus = FETCH_PLANS_INVALID
  if (typeof fetchPlans === 'object'){
    if('data' in fetchPlans){
      plansData = fetchPlans.data
    }
    if('readyStatus' in fetchPlans){
      plansReadyStatus = fetchPlans.readyStatus
    }
  }

  return {
    plansData,
    plansReadyStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPlans: () => dispatch(fetchPlans()),
    selectPlan: (id) => dispatch(selectPlan(id)),
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(PlanList)