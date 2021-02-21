import React, { PureComponent } from 'react'
import st from "./itemDetail.module.scss"
import fetchPlts from "../redux/reducers/plts";
import {useSelector, useDispatch } from "react-redux";
import {FETCH_ONE_INVENTORY_SUCCESS} from "../redux/reducers/oneInventory";

function ItemDetail(){

  const oneInventory = useSelector(state => state.oneInventory);

  let pid = oneInventory.selectedInventoryId;
  let data = oneInventory.data;

  const inventoryDetail = pid !== null && pid in data && data[pid].readyStatus === FETCH_ONE_INVENTORY_SUCCESS
        ? data[pid].data : null;

    const ready = inventoryDetail != null;

    return (
      <div className={st.itemDetail}>
        <div>
          <h1> { ready ? inventoryDetail.name: 'loading'}</h1>
          { ready ?  <img src={inventoryDetail.picture_url}/> : null}
          <h2> { ready ? inventoryDetail.price: 'loading'}</h2>
          <button> Add To Cart </button>
        </div>
      </div>
    )
}


export default ItemDetail



