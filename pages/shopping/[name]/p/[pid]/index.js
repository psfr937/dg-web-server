import React, { PureComponent } from 'react'
import Head from "@components/Head";
import Nav from "@components/Nav";
import appSt from '../../../../home.module.scss'
import st from "./itemDetail.module.scss"
import {FETCH_ONE_INVENTORY, FETCH_ONE_INVENTORY_SUCCESS} from "../../../../../redux/reducers/oneInventory";
import {END} from 'redux-saga';
import { wrapper } from "../../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {ADD_CART_ITEM} from "../../../../../redux/reducers/cart/cartItems";

export default function Product(){


  const oneInventory = useSelector(state => state.oneInventory);

  const dispatch = useDispatch();

  const addCartItem = (id) => {
    dispatch({type: ADD_CART_ITEM, id: id})
  }

  let pid = oneInventory.selectedInventoryId;
  let data = oneInventory.data;

  const inventoryDetail = pid !== null && pid in data && data[pid].readyStatus === FETCH_ONE_INVENTORY_SUCCESS
    ? data[pid].data : null;

  const ready = inventoryDetail != null;

  return (
    <div>
      <style jsx global>{`
    body {
      margin: 0;
      overflow-x: hidden;
    }
  `}</style>
      <Head/>
      <main className={appSt.app}>
        <Nav/>
        <div className={appSt.navPadding}>
            <div className={st.itemDetail}>
              <h1> { ready ? inventoryDetail.name: 'loading'}</h1>
              { ready ?  <img src={inventoryDetail.picture_url}/> : null}
              <h2> { ready ? `HK$${inventoryDetail.price/100}`: 'loading'}</h2>
              <button onClick={() => addCartItem(inventoryDetail.id)}> Add To Cart </button>
            </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({store, query}) => {
  const { pid } = query
  store.dispatch({type: FETCH_ONE_INVENTORY, pid });
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return {props: {custom: 'custom'}};
});


