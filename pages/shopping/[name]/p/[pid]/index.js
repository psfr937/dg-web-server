import React from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from '../../../../home.module.scss'
import st from "./itemDetail.module.scss"
import {FETCH_ONE_INVENTORY, FETCH_ONE_INVENTORY_SUCCESS} from "../../../../../redux/reducers/ecommerce/oneInventory";
import {END} from 'redux-saga';
import { wrapper } from "../../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {ADD_CART_ITEM} from "../../../../../redux/reducers/ecommerce/cart/cartItems";

export default function Product(){


  const oneInventory = useSelector(state => state.oneInventory);

  const dispatch = useDispatch();

  const addCartItem = (id) => {
    dispatch({type: ADD_CART_ITEM, id: id})
  }

  const language = useSelector(state => state.ux.language)

  const inventoryDetail = oneInventory.readyStatus === FETCH_ONE_INVENTORY_SUCCESS
    ? oneInventory.data : null;

  const ready = inventoryDetail != null;
  if(!ready){
    return null
  }
  const localText = ready ? inventoryDetail.text.find(t => t.language === language) : null;
  const imageUrls = {}
  inventoryDetail.images.map(i => {
    imageUrls[i.order] = i.url
  });
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
            <div className={st.productDetailPage}>
              <div className={st.productDetail}>
                <div className={st.gallery}>
                  <div className={st.thumbnailList}>
                    { ready ?  <img className={st.smallImage} src={1 in imageUrls ? imageUrls[1] : null }/> : null}

                  </div>
                  { ready ?  <img className={st.bigImage} src={1 in imageUrls ? imageUrls[1] : null }/> : null}

                </div>
                <div  className={st.productInfoContainer}>
                  <div className={st.productInfo}>
                    <h2 className={st.title}> { ready ? inventoryDetail.brand : 'loading'}</h2>
                    <h2 className={st.title}> { ready ? (typeof localText !== 'undefined' ? localText.name: '') : 'loading'}</h2>
                     <h3 className={st.price}> { ready ? `HK$${inventoryDetail.price/100}`: 'loading'}</h3>
                    <h3 className={st.description}>  { ready ? (typeof localText !== 'undefined' ? localText.description: '') : 'loading'}</h3>
                    <div className={st.productSizesInfo}>
                      <h5> Sizing </h5>
                      <div className={st.productSizesList}>
                        {
                          inventoryDetail.sizes.map(s =>
                            <div>
                              <h5>{s.physique_name} </h5>
                              <h5>{s.size_name} </h5>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className={st.callToActionSection}>
                    <button className={st.addToCartButton} onClick={() => addCartItem(inventoryDetail.id)}> Add To Cart </button>
                    <button className={st.addToWishListButton} onClick={() => addCartItem(inventoryDetail.id)}> Add To Wishlist </button>
                  </div>


                </div>
              </div>
              <div className={st.suggestionSection}>
                <h4 className={st.suggestionSectionTitle}>Similar Items</h4>
                <div className={st.suggestionSectionContent}>
                  <div className={st.productTagsInfo}>
                    <div className={st.productTagsList}>
                      {
                        inventoryDetail.tags.map(s =>
                          <div>
                            <h6>{s.tag_name} </h6>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className={st.suggestionSection}>
                <h4 className={st.suggestionSectionTitle}>You may also like</h4>
                <div className={st.suggestionSectionContent}>
                  <div className={st.productTagsInfo}>
                    <div className={st.productTagsList}>
                      {
                        inventoryDetail.tags.map(s =>
                          <div>
                            <h6>{s.tag_name} </h6>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>


        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({res, store, query}) => {
  const { pid } = query;
  store.dispatch({type: FETCH_ONE_INVENTORY, pid, res:res });
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return {props: {custom: 'custom'}};
});


