import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import st from './cartSection.module.scss'
import {FETCH_CIDS_SUCCESS} from "../../redux/reducers/ecommerce/cart/cartItemDetail";
import { FETCH_CIDS, REMOVE_CART_ITEM_SAGA } from "../../redux/actions/ecommerce/cart"
import classnames from 'classnames'
import {REMOVE_CART_ITEM} from "../../redux/reducers/ecommerce/cart/cartItems";
import { EmptyBanner } from "@components/EmptyBanner";

function CartItemMenu(){
  return   <div className={st.cartItemOptionsMenu}>
    <svg viewBox="0 0 24 24">
      <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
    </svg>
    <svg className={st.cartItemOptionsMenu} viewBox="0 0 24 24">
      <path d="M12.67 20.74L12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 9.93 21.5 11.26 20.62 12.61C20 12.31 19.31 12.11 18.59 12.04C19.5 10.8 20 9.65 20 8.5C20 6.5 18.5 5 16.5 5C14.96 5 13.46 6 12.93 7.36H11.07C10.54 6 9.04 5 7.5 5C5.5 5 4 6.5 4 8.5C4 11.39 7.14 14.24 11.89 18.55L12 18.65L12.04 18.61C12.12 19.37 12.34 20.09 12.67 20.74M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z" />
    </svg>
  </div>
}


export default function CartSection({editable = true}){

  const dispatch = useDispatch();
  const cids = useSelector(state => state.cartItemDetail);

  const [activeOptionMenuId, setActiveOptionMenuId] = useState(-1);

  const toggleMenu = (id) => activeOptionMenuId < 0 ?
    setActiveOptionMenuId(id) : setActiveOptionMenuId(-1);

  const removeCartItem = (id) => dispatch({type: REMOVE_CART_ITEM_SAGA, id: id});

  useEffect(() => {
    dispatch({type: FETCH_CIDS})
  }, []);

  const items = (cids.readyStatus !== FETCH_CIDS_SUCCESS) ? []
    : Object.keys(cids.data).map(k => cids.data[k]);

  const productCost = cids.readyStatus !== FETCH_CIDS_SUCCESS ? null :
    Object.keys(cids.data)
      .map(k => cids.data[k].price)
      .reduce((acc, cur) => acc + cur, 0);
  console.log(productCost)
  const productCostText = productCost === null ? '-': `HK$${productCost / 100}`;

  return (
    <div className={st.cartSection}>

      <div className={st.cartItemList}>
        <div className={classnames(st.cartItemCard, st.header)}>
          <h4>Item</h4>
          <h4>Name</h4>
          <h4>Size</h4>
          <h4>Unit Price</h4>
          { editable ?
          <div className={st.openCartItemOptionsMenuButtonContainer}>
              </div> : null }
        </div>
        { items.length === 0 ? <div>
            <EmptyBanner
              imgSrc={'/wish_empty.jpg'}
              text={'Your shopping cart is empty. Grab something from the shop!'}
            />
          </div> :
          items.map(k =>
            <div className={st.cartItemCard}>

              <div className={st.cartItemImage}>
                <img src={k.picture_url}/>
              </div>
              <h4>{k.name}</h4>
              <h4>{k.size}</h4>
              <h4>{`HK$${k.price / 100}`}</h4>
              { editable ?
              <div className={st.openCartItemOptionsMenuButtonContainer}>

                <div className={k.id === activeOptionMenuId ? st.selected : null}>
                  <svg  onClick={() => toggleMenu(k.id)} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                  </svg>
                  <div className={k.id === activeOptionMenuId ? st.cartItemOptionsMenu : classnames(st.cartItemOptionsMenu,st.hidden)} >
                    <div onClick={() => removeCartItem(k.id)}>
                      <svg viewBox="0 0 24 24">
                        <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                      </svg>
                      <h6> Remove from cart</h6>
                    </div>
                    <div>
                      <svg viewBox="0 0 24 24">
                        <path d="M12.67 20.74L12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 9.93 21.5 11.26 20.62 12.61C20 12.31 19.31 12.11 18.59 12.04C19.5 10.8 20 9.65 20 8.5C20 6.5 18.5 5 16.5 5C14.96 5 13.46 6 12.93 7.36H11.07C10.54 6 9.04 5 7.5 5C5.5 5 4 6.5 4 8.5C4 11.39 7.14 14.24 11.89 18.55L12 18.65L12.04 18.61C12.12 19.37 12.34 20.09 12.67 20.74M17 14V17H14V19H17V22H19V19H22V17H19V14H17Z" />
                      </svg>
                      <h6> Save to wish list</h6>
                    </div>
                  </div>
                </div>
              </div>
              : null}

              </div>
          )
        }
        <div className={classnames(st.cartItemCard, st.footer)}>
          <div className={st.cartItemImage}/>
          <h4></h4>
          <h4>Total Price</h4>
          <h4>{productCostText}</h4>
          {editable ?
          <div className={st.openCartItemOptionsMenuButtonContainer}>
               </div> : null}
        </div>
      </div>
    </div>
  )
}