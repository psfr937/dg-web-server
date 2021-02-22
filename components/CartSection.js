import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import st from './cart.module.scss'
import {FETCH_CIDS, FETCH_CIDS_SUCCESS} from "../redux/reducers/cart/cartItemDetail";

export default function CartSection(){

  const dispatch = useDispatch();
  const cids = useSelector(state => state.cartItemDetail);

  useEffect(() => dispatch({type: FETCH_CIDS}), []);
  console.log(cids)
  const items = (cids.readyStatus !== FETCH_CIDS_SUCCESS) ? []
    : Object.keys(cids.data).map(k => cids.data[k]);

  return (
    <div className={st.cartSection}>

      <div className={st.cartItemList}>
        <div className={st.cartItemCard}>
          <div className={st.cartItemImage}/>
          <h4 className={st.cartItemCardTitle}>
            Name
          </h4>
          <h4 className={st.cartItemCardPrice}>
            Size
          </h4>
          <h4 className={st.cartItemCardPrice}>
            Unit Price
          </h4>
        </div>
        {
          items.map(k =>
            <div className={st.cartItemCard}>
              <div className={st.cartItemImage}>
                <img src={k.picture_url}/>
              </div>
              <h4 className={st.cartItemCardTitle}>
                {k.name}
              </h4>
              <h4 className={st.cartItemCardPrice}>
                {k.size}
              </h4>
              <h4 className={st.cartItemCardPrice}>
                {k.price}
              </h4>
            </div>
          )
        }
        <div className={st.cartItemCard}>
          <div className={st.cartItemImage}/>
          <h4 className={st.cartItemCardTitle}>

          </h4>
          <h4 className={st.cartItemCardPrice}>
            Total Price
          </h4>
          <h4 className={st.cartItemCardPrice}>

          </h4>
        </div>
      </div>
    </div>
  )
}