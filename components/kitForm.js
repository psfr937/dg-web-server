import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import st from './kitForm.module.scss'
import { FETCH_PLTS } from "../redux/reducers/plts";

class KitForm extends PureComponent{

  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.fetchPlts()
  }


  render(){
    return (
      <div className={st.kitForm}>
        <h2> Review Kit Settings</h2>
        <div className={st.kitFormQuestion}>
          <h3> Label or Bag </h3>
          <h4> Bags may take up to 2 weeks. Our eco-friendly shipping labels can be printed and used on any box. </h4>
          <div className={st.kitFormOption}>
            <div>
              <h4> Email a Label</h4>
              <h4> Free</h4>

            </div>
            <div>
              <h4> Mail a Bag</h4>
              <h4> Free</h4>
            </div>
          </div>
        </div>
        <div className={st.kitFormQuestion}>
          <h3> Item We Don't Accept </h3>
          <h4> Only 40% of items in the average kit meet our quality standards. </h4>
          <div className={st.kitFormOption}>
            <div>
              <h4> Recycle My Items</h4>
              <h4> Free</h4>
            </div>
            <div>
              <h4> Return my Items</h4>
              <h4> $10.99</h4>
            </div>
          </div>
        </div>
        <div className={st.kitFormQuestion}>
          <h3> How Many Clothes do you have? </h3>
          <h4> This helps us know the delivery cost </h4>
          {
            this.props.plts.map(plt => (<div className={st.clothingTypeOption}>
                plt
                <button> + </button>
                <button> {this.props.packList[plt]} </button>
              </div>)
            )
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({cartItems, packList, plts}) => {
  return {
    cartItems,
    packList,
    plts: plts.readyStatus === 'FETCH_PLTS_SUCCESS' ?
      (Object.keys(plts).map(k => plts[k])) : []
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPlts: () => dispatch({ type: FETCH_PLTS })
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(KitForm)