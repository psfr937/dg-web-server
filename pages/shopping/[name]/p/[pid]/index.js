import React, { PureComponent } from 'react'
import Head from "@components/Head";
import Nav from "@components/Nav";
import appSt from '../../../../home.module.scss'
import st from "../../../../catalogPage.module.scss"
import ItemDetail from "@components/itemDetail";
import {getInventory, serverGetInventory} from "../../../../../redux/actions/inventories"
import {FETCH_ONE_INVENTORY_SUCCESS} from "../../../../../redux/reducers/oneInventory";
import withRedux from "../../../../../lib/withRedux";
import {addCartItem, purchase, removeCartItem} from "../../../../../redux/actions/cart";
import fetchPlts from "../../../../../redux/reducers/plts";
import clientStore from "../../../../../redux/actions/clientStore";
import {connect} from "react-redux";
class Product extends PureComponent{

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

  static async getInitialProps(ctx){
    const serverResult = await serverGetInventory(ctx.query.pid, ctx);
    return {
      serverResult
    }

  }
}


const mapDispatchToProps = dispatch => {
  return {
    clientStore: (result) => dispatch(clientStore(result))
  };
};

const connector = connect(
  null,
  mapDispatchToProps
);


export default withRedux(connector(Product))


