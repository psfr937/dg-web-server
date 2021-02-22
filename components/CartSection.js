import React from 'react'
import { useSelector} from 'react-redux'
import st from './cart.module.scss'

export default function CartSection(){

  const cartItems = useSelector(state => state.cartItems);
  const oneInventory = useSelector(state => state.oneInventory);
  const items = cartItems
    .filter(c => c in oneInventory.data)
    .map(c => {
      return oneInventory.data[c].data
  });

  return (
    <div className={st.cartSection}>
      <div className={st.cartItemListHeader}>
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

      <div className={st.cartItemList}>
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
                {k.unit_price}
              </h4>
            </div>
          )
        }
      </div>
      <div className={st.cartItemListFooter}>
        <div className={st.cartItemImage}>

        </div>
        <h4 className={st.cartItemCardTitle}>

        </h4>
        <h4 className={st.cartItemCardPrice}>

        </h4>
        <h4 className={st.cartItemCardPrice}>
          Total
        </h4>
      </div>
    </div>
  )
}