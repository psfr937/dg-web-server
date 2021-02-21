import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import st from './addressForm.module.scss'
import {PURCHASE} from "../redux/reducers/cart/purchase";

class AddressForm extends PureComponent{

  constructor(props){
    super(props)
    this.onClickPlan = this.onClickPlan.bind(this)
  }

  onClickPlan(id){
    this.props.selectPlan(id)
  }

  render(){
    const data = this.props.cartItems

    return (
      <div className={st.addressForm}>
        <div>
          <label>
            <h4> Delivery Address </h4>
            <div className={st.addressFormField}>
              <label>Address Line 1</label>
              <input type="address" className="FormBase"/>
            </div>
            <div className={st.addressFormField}>
              <label>Address Line 2</label>
              <input type="address" className="FormBase"/>
            </div>
            <div className={st.addressFormField}>
              <label>City</label>
              <input type="address" className="FormBase"/>
            </div>
            <div className={st.addressFormField}>
              <label>State/Province</label>
              <input type="address" className="FormBase"/>
            </div>
            <div className={st.addressFormField}>
              <label>Zip/Postal Code</label>
              <input type="address" className="FormBase"/>
            </div>
            <div className={st.addressFormField}>
              <label>Country</label>
              <input type="address" className="FormBase"/>
            </div>
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({cartItems}) => {
  return {
    cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    purchase: (id) => dispatch({ type: PURCHASE, id: id} ),
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(AddressForm)

