import React, { PureComponent } from 'react'
import Head from "@components/Head";
import Nav from "@components/Nav";
import appSt from '../../../../home.module.scss'
import st from "../../../../catalogPage.module.scss"
import ItemDetail from "@components/itemDetail";
import { getInventory } from "../../../../../redux/actions/inventories"
import {FETCH_ONE_INVENTORY_SUCCESS} from "../../../../../redux/reducers/oneInventory";

const Product = () => {
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
                inv={this.props.inv}
              />
            </div>
          </div>
        </main>
      </div>
    )

}

Product.getInitialProps = async (ctx) => {
  console.log(ctx);
  const data = await ctx.store.dispatch(getInventory(ctx.query.pid));
  ctx.store.dispatch({type: FETCH_ONE_INVENTORY_SUCCESS, pid: query.pid, data: data});
  return {
    inv: data
  }
}

export default Product


