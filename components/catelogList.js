import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { purchase } from "../redux/actions/cart";
import st from './catalog.module.scss'
import Link from 'next/link'
import {fetchInventories} from "../redux/actions/inventories";
import {FETCH_INVENTORIES_SUCCESS} from "../redux/reducers/inventories";

class CatalogList extends PureComponent{

  constructor(props){
    super(props)
    this.onClickPlan = this.onClickPlan.bind(this)
    this.createSlug = this.createSlug.bind(this)

  }

  componentDidMount() {
    this.props.fetchInventories()
  }

  onClickPlan(id){
    this.props.selectPlan(id)
  }

  createSlug(name){
    return name.split(/\s+/).slice(0,5).join(" ")
      .replace(/\s+/g, '-').toLowerCase();
  }

  render(){

    return (
      <div className={st.catalogSection}>

        <div className={st.container}>
          {
            this.props.inventories.map(i => {
              return <Link href={`/shopping/${this.createSlug(i.name)}/p/${i.id}`}>
                <div className={st.itemContainer}>
                  <div className={st.item}>
                    <img src={i.picture_url}/>
                    <div className={st.itemTitle}>{i.title}</div>
                    <div className={st.itemPrice}>{`$${i.price}`}</div>
                  </div>
                </div>
              </Link>
            })
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({cartItems, inventories}) => {
  console.log(inventories.data)
  return {
    cartItems,
    inventories: (inventories.readyStatus !== FETCH_INVENTORIES_SUCCESS) ? []
    : Object.keys(inventories.data).map(k =>  inventories.data[k])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    purchase: (id) => dispatch(purchase(id)),
    fetchInventories: () => dispatch(fetchInventories())
  };
};


const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connector(CatalogList)