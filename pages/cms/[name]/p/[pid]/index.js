

import React, { useEffect } from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from '../../../../home.module.scss'
import st from "./itemDetail.module.scss"
import {FETCH_ONE_INVENTORY, FETCH_ONE_INVENTORY_SUCCESS} from "../../../../../redux/reducers/ecommerce/oneInventory";
import {END} from 'redux-saga';
import { wrapper } from "../../../../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {ADD_CART_ITEM} from "../../../../../redux/reducers/ecommerce/cart/cartItems";
import ImageUploader from "@components/cms/addStory/imageUploader";
import {SET_ATTACHMENT} from "../../../../../redux/reducers/cms/editInventory";
import DescriptionTextEditor from "@components/descriptionTextEditor";
import { SET_INVENTORY_VALUE } from "../../../../../redux/reducers/cms/editInventory"
import {FETCH_TAGS} from "../../../../../redux/actions/ecommerce/tags";
import {FETCH_SIZES} from "../../../../../redux/actions/ecommerce/sizes";
import {FETCH_TAGS_SUCCESS} from "../../../../../redux/reducers/ecommerce/tags";
import TagMenu from '@components/cms/tagMenu';
import {FETCH_SIZES_SUCCESS} from "../../../../../redux/reducers/ecommerce/sizes";
import SizeMenu from "@components/cms/SizeMenu";

export default function Product(){


  const oneInventory = useSelector(state => state.oneInventory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: FETCH_TAGS});
    dispatch({type: FETCH_SIZES})
  }, []);


  const setAttachment = (value) => {
    dispatch({type: SET_ATTACHMENT, value: value})
  };

  let pid = oneInventory.selectedInventoryId;
  let data = oneInventory.data;
  const language = useSelector(state => state.ux.language)
  const editInventory = useSelector(state => state.editInventory);

  const aspects = useSelector(state => state.tags.readyStatus !== FETCH_TAGS_SUCCESS
    ? [] : Object.keys(state.tags.data).map(k => state.tags.data[k]));
  const measurements = useSelector(state => state.sizes.readyStatus !== FETCH_SIZES_SUCCESS
    ? [] : Object.keys(state.sizes.data).map(k => state.sizes.data[k]));

  const inventoryDetail = pid !== null && pid in data && data[pid].readyStatus === FETCH_ONE_INVENTORY_SUCCESS
    ? data[pid].data : null;

  const ready = inventoryDetail != null;
  const readOnly = false;
  if(!ready){
    return null
  }
  const localText = ready ? inventoryDetail.text.find(t => t.language === language) : null;
  const imageUrls = {}
  inventoryDetail.images.map(i => {
    imageUrls[i.order] = i.url
  });
  console.log(aspects)
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


              <ImageUploader
                setAttachment={setAttachment}
                defaultImages={[]}
                className={st.thumbnailList}
              />




              <div  className={st.productInfoContainer}>
                <div className={st.productInfo}>
                  <div  className={st.inventoryFieldItem}>
                    <h4>
                      Brand:
                    </h4>
                    <div className={st.inventoryFieldInputContainer}>
                      <input
                        value={ready ? editInventory.brand : 'loading'}
                        onChange={e => dispatch({type: SET_INVENTORY_VALUE, name: 'brand', value: e.target.value})}
                      />
                    </div>
                  </div>
                  <div  className={st.inventoryFieldItem}>
                    <h4>
                      Product Name:
                    </h4>
                    <div className={st.inventoryFieldInputContainer}>
                      <input
                        value={ready ? (typeof localText !== 'undefined' ? localText.name: '') : 'loading'}
                        onChange={e => dispatch({type: SET_INVENTORY_VALUE, name: 'nameEn', value: e.target.value})}
                      />
                    </div>
                  </div>
                  <div  className={st.inventoryFieldItem}>
                    <h4>
                      Price:
                    </h4>
                    <div className={st.inventoryFieldInputContainer}>
                      <input
                        type="number"
                        value={ready ? editInventory.price : 0}
                        onChange={e => dispatch({type: SET_INVENTORY_VALUE, name: 'nameEn', value: e.target.value})}
                      />
                    </div>
                  </div>
                  <h3 className={st.descriptionField}>
                    <h4>
                      Description:
                    </h4>
                    {/*<DescriptionTextEditor*/}
                    {/*  key="main_description"*/}
                    {/*  name="main_description"*/}
                    {/*  readOnly={readOnly}*/}
                    {/*  content={editInventory.descriptionEn}*/}
                    {/*  editFunc={value => dispatch({type: SET_INVENTORY_VALUE, name: 'descriptionEn', value})}*/}
                    {/*/>*/}
                  </h3>

                  </div>


                </div>


              </div>
            <div className={st.bottomSection}>
              <div  className={st.descriptionField}>
                <h4>
                  Tags:
                </h4>
                {
                  aspects.map(i => <div>
                      <h4> {i.name} </h4>
                      <TagMenu options={i.tags.map(t => {
                        return {
                          value: t.id,
                          label: t.name
                        }
                      })}/>
                    </div>
                  )
                }
              </div>
              <div  className={st.descriptionField}>
                <h4>
                  Sizing:
                </h4>
                <SizeMenu measurements={measurements}/>
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
      </main>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({store, query}) => {
  const { pid } = query;
  store.dispatch({type: FETCH_ONE_INVENTORY, pid });
  store.dispatch(END);
  await store.sagaTask.toPromise();
  return {props: {custom: 'custom'}};
});



