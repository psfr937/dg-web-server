import React, { PureComponent } from 'react'
import st from "./itemDetail.module.scss"
import fetchPlts from "../redux/reducers/plts";
import {connect} from "react-redux";
import {FETCH_ONE_INVENTORY_SUCCESS} from "../redux/reducers/oneInventory";
import router from 'next/router'
class ItemDetail extends PureComponent{

  constructor(props){
    super(props)
  }

  render(){

    let {oneInventory } = this.props;
    console.log(oneInventory)
    const ready = oneInventory != null;
    console.log(ready)
    return (
      <div className={st.itemDetail}>
        <div>
          <h1> { ready ? oneInventory.name: 'loading'}</h1>
          { ready ?  <img src={oneInventory.picture_url}/> : null}
          <h2> { ready ? oneInventory.price: 'loading'}</h2>
          <button> Add To Cart </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ oneInventory }) => {
  let pid = oneInventory.selectedInventoryId
  let data = oneInventory.data
  console.log(pid);
  console.log(data);
  console.log(pid in data )
  console.log(data[pid])
  if(pid !== null) {


    return {
       oneInventory: pid in data && data[pid].readyStatus === FETCH_ONE_INVENTORY_SUCCESS
        ? data[pid].data : null
    }
  }
  return{
    oneInventory: null
  }
}

const mapDispatchToProps = dispatch => {
  return {
   };
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(ItemDetail)



