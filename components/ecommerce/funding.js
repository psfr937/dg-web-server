import React from 'react'
import st from './funding.module.scss'
import PredictionChart from './predictionChart'

class Funding extends React.PureComponent{
    constructor(props){
      super(props)
    }

    render(){
      return(
        <div>
          <div> Budget</div>
          <div className={st.fundingSummaryList}>
            <div className={st.fundingSummaryBox}>
              <div>Total Data Collected </div>
              <div> 153 </div>
            </div>
            <div className={st.fundingSummaryBox}>
              <div>Total Talents Acquired</div>
              <div> 153 </div>
            </div>
            <div className={st.fundingSummaryBox}>
              <div>Total Computing Power Budget </div>
              <div> 153 </div>
            </div>
            <div className={st.fundingSummaryBox}>
              <div>Total Financial Fund</div>
              <div> 153 </div>
            </div>
          </div>
          <div> Prediction</div>
          <div className={st.fundingSummaryList}>
            <div className={st.fundingSummaryBox}>
              <div>Total Data Collected </div>
              <div> 153 </div>
            </div>
            <div className={st.fundingSummaryBox}>
              <div>Total Talents Acquired</div>
              <div> 153 </div>
            </div>
            <div className={st.fundingSummaryBox}>
              <div>Total Computing Power Budget </div>
              <div> 153 </div>
            </div>
            <div className={st.fundingSummaryBox}>
              <div>Total Financial Fund</div>
              <div> 153 </div>
            </div>
          </div>
          <PredictionChart/>
        </div>

       )
    }
}

export default Funding