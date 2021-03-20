import React, { useEffect } from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/cms/cmsNav";
import appSt from '../../../../home.module.scss'
import {FETCH_ONE_INVENTORY} from "../../../../../redux/reducers/ecommerce/oneInventory";
import {END} from 'redux-saga';
import { wrapper } from "../../../../../redux/store";
import { useSelector} from "react-redux";
import Product from "@components/cms/inventoryForm";

export default function ProductPage(){
  const oneInventory = useSelector(state => state.oneInventory);

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
        <Nav action={'update'}/>
        <Product oneInventory={oneInventory}/>
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({store, query}) => {
  const { pid } = query;
  console.log('the query')
  console.log(query)
  store.dispatch({type: FETCH_ONE_INVENTORY, pid: 52 });
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return {props: {custom: 'custom'}};
});



