import React, { PureComponent } from 'react'
import Head from "@components/Head";
import Nav from "@components/Nav";
import appSt from '../../../../home.module.scss'
import st from "../../../../catalogPage.module.scss"
import ItemDetail from "@components/itemDetail";
import {FETCH_ONE_INVENTORY} from "../../../../../redux/reducers/oneInventory";
import {END} from 'redux-saga';
import { wrapper } from "../../../../../redux/store";

class Product extends PureComponent{

  constructor(props){
    super(props)
    this.state = {
      serverResult: null
    }
  }

  render() {
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
            <div className={st.catalogPage}>
              <ItemDetail
                serverResult={this.props.serverResult}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }
}


export const getServerSideProps = wrapper.getServerSideProps(async ({store, query}) => {
  const { pid } = query
  store.dispatch({type: FETCH_ONE_INVENTORY, pid });
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return {props: {custom: 'custom'}};
});


export default Product


