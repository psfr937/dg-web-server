import React from 'react'
import { useSelector} from 'react-redux'
import st from './cartMini.module.scss'

export default function CartMini(){

  const data = useSelector(state => state.cartItems);

  return (
    <div className={st.cartSection}>
      <div className={st.cartItemListHeader}>
        <div className={st.cartItemImage}/>
        <h4 >
          Name
        </h4>
        <h4 >
          Size
        </h4>
        <h4 >
          Unit Price
        </h4>

      </div>
      <div className={st.cartItemList}>
        {
          data.map(k =>
            <div className={st.cartItemCard}>
              <div className={st.cartItemImage}>
                <img src={k.picture_url}/>
              </div>
              <h4>
                {k.name}
              </h4>
              <h4>
                {k.size}
              </h4>
              <h4>
                {k.unit_price}
              </h4>

            </div>
          )
        }
      </div>
      <div className={st.cartItemListFooter}>
        <div className={st.cartItemImage}>
        </div>
        <h4>
        </h4>
        <h4>
        </h4>
        <h4>
          Total
        </h4>
      </div>
    </div>
  )
}