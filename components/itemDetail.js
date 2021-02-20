import React, { PureComponent } from 'react'
import st from "./itemDetail.module.scss"
import {purchase, addCartItem, removeCartItem } from "../redux/actions/cart";
import fetchPlts from "../redux/reducers/plts";
import {connect} from "react-redux";
import router from 'next/router'
import {FETCH_ONE_INVENTORY_SUCCESS} from "../redux/reducers/oneInventory";
import clientStore from "../redux/actions/clientStore";

class ItemDetail extends PureComponent{

  constructor(props){
    super(props)
    this.state = {
      serverResult: null
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.serverResult !== this.state.serverResult) {
      this.setState({serverResult: nextProps.serverResult})
      this.props.clientStore(this.props.serverResult);
    }
  }

  render(){
    let { ready, inventory } = this.props;
    return (
      <div className={st.itemDetail}>
        <div>
          <h1> { ready ? inventory.name: 'loading'}</h1>
          { ready ?  <img src={inventory.picture_url}/> : null}
          <h2> { ready ? inventory.price: 'loading'}</h2>
          <button> Add To Cart </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ oneInventory }) => {
  console.log(oneInventory)
  return {
    ready: false, inventory: null, oneInventory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    purchase: (id) => dispatch(purchase(id)),
    fetchPlts: () => dispatch(fetchPlts()),
    addCartItem: (id) => dispatch(addCartItem(id)),
    removeCartItem: (id) => dispatch(removeCartItem(id)),
    clientStore: (result) => dispatch(clientStore(result))
   };
};

ItemDetail.defaultProps = {
  serverResult: null
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(ItemDetail)

