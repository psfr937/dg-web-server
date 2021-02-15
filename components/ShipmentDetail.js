import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { purchase } from "../redux/actions/cart";
import st from './cartMini.module.scss'

class ShipmentDetail extends PureComponent{

  constructor(props){
    super(props);
    this.onClickPlan = this.onClickPlan.bind(this)
  }

  onClickPlan(id){
    this.props.selectPlan(id)
  }

  render(){
    const data = this.props.cartItems

    return (
      <div className={st.cartSection}>
        <div className={st.cartItemListHeader}>


          <div className={st.cartItemImage}/>
          <h4 >
            Name
          </h4>
          <h4 >
            Size
          </h4>
          <h4 >
            Unit Price
          </h4>



        </div>

        <div className={st.cartItemList}>
          {
            data.map(k =>
              <div className={st.cartItemCard}>
                <div className={st.cartItemImage}>
                  <img src={k.picture_url}/>
                </div>
                <h4>
                  {k.name}
                </h4>
                <h4>
                  {k.size}
                </h4>
                <h4>
                  {k.unit_price}
                </h4>

              </div>
            )
          }
        </div>
        <div className={st.cartItemListFooter}>


          <div className={st.cartItemImage}>

          </div>
          <h4>

          </h4>
          <h4>

          </h4>
          <h4>
            Total
          </h4>
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
    purchase: (id) => dispatch(purchase(id)),
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(ShipmentDetail)