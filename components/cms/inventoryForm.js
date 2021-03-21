import React, { useEffect } from 'react'
import st from "../../pages/cms/itemDetail.module.scss"
import {FETCH_ONE_INVENTORY, FETCH_ONE_INVENTORY_SUCCESS} from "../../redux/reducers/ecommerce/oneInventory";
import {useDispatch, useSelector} from "react-redux";
import ImageUploader from "@components/cms/addStory/imageUploader";
import {FETCH_TAGS} from "../../redux/actions/ecommerce/tags";
import {FETCH_SIZES} from "../../redux/actions/ecommerce/sizes";
import {FETCH_TAGS_SUCCESS} from "../../redux/reducers/ecommerce/tags";
import TagMenu from '@components/cms/tagMenu';
import {FETCH_SIZES_SUCCESS} from "../../redux/reducers/ecommerce/sizes";
import SizeMenu from "@components/cms/SizeMenu";
import { SET_PRICE, SET_TEXT, SET_BRAND,
  INV_ADD_SIZE } from "../../redux/reducers/cms/editInventory";
import DescriptionTextEditor from "@components/descriptionTextEditor";
import SellerMenu from "@components/cms/sellerMenu";
import { FETCH_USERS } from "../../redux/actions/cms/users";

export default function ProductForm({ oneInventory }){

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: FETCH_USERS});
    dispatch({type: FETCH_TAGS});
    dispatch({type: FETCH_SIZES});
  }, []);

  const language = useSelector(state => state.ux.language);
  const aspects = useSelector(state => state.tags.readyStatus !== FETCH_TAGS_SUCCESS
    ? [] : Object.keys(state.tags.data).map(k => state.tags.data[k]));
  const measurements = useSelector(state => state.sizes.readyStatus !== FETCH_SIZES_SUCCESS
    ? [] : Object.keys(state.sizes.data).map(k => state.sizes.data[k]));

  const ready = oneInventory.readyStatus === FETCH_ONE_INVENTORY_SUCCESS;

  const inventoryDetail = useSelector(state => state.editInventory);
  if(!ready){
    return null
  }
  console.log(inventoryDetail);
  console.log(oneInventory);
  const localText = ready ? inventoryDetail.text.find(t => t.language === language) : null;
  const imageUrls = {};
  inventoryDetail.images.map(i => {
    imageUrls[i.order] = i.url
  });
  console.log(aspects)
  const [, ...arr] = Array(inventoryDetail.sizes.length + 1).keys();
  console.log(arr)

  const addSize = () => {
    dispatch({ type: INV_ADD_SIZE, data: {
        id: measurements[0].sizes[0].id,
        name: measurements[0].sizes[0].name,
        measurement_id: measurements[0].id
      }
    })
  };

  console.log(inventoryDetail.sizes);

  return (

        <div className={st.navPadding}>
          <div className={st.productDetailPage}>
            <div className={st.productDetail}>


              <ImageUploader
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
                        value={ready ? inventoryDetail.brand : 'loading'}
                        onChange={e => dispatch({type: SET_BRAND, value: e.target.value})}
                      />
                    </div>
                  </div>
                  <div  className={st.inventoryFieldItem}>
                    <h4>
                      Price (in cents) :
                    </h4>
                    <div className={st.inventoryFieldInputContainer}>
                      <input
                        type="number"
                        value={ready ? inventoryDetail.price  : 0}
                        onChange={e => dispatch({type: SET_PRICE, value: e.target.value})}
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
                        onChange={e => dispatch({
                          type: SET_TEXT,
                          key: 'name',
                          language: 'en',
                          value: e.target.value})}
                      />
                    </div>
                  </div>

                  <h3 className={st.descriptionField}>
                    <h4>
                      Description:
                    </h4>
                    <DescriptionTextEditor
                      key="main_description"
                      name="main_description"
                      readOnly={false}
                      content={typeof localText !== 'undefined' ? localText.description: ''}
                      editFunc={value =>  dispatch({
                        type: SET_TEXT,
                        key: 'description',
                        language: 'en',
                        value: value})
                      }
                    />
                  </h3>
                  <div  className={st.inventoryFieldItem}>
                    <h4>
                      Seller:
                    </h4>

                    <SellerMenu
                      defaultValue={
                        {
                          value: inventoryDetail.seller.id,
                          label: inventoryDetail.seller.id
                        }
                      }
                    />

                  </div>
                </div>


              </div>


            </div>
            <div className={st.bottomSection}>
              <div  className={st.leftDescriptionFieldContainer}>
                <div  className={st.descriptionField}>
                  <h4>
                    Tags:
                  </h4>
                  {
                    aspects
                      .filter(i => ['physique', 'brand', 'segment']
                        .indexOf(i.name) < 0)
                      .map(i => <div>
                          <h4> {i.name} </h4>
                          <TagMenu
                            defaultValue={inventoryDetail.tags.filter(t => t.aspect === i.name)
                              .map(t => {
                                return {
                                  value: t.id,
                                  label: t.name
                                }
                              })}
                            options={i.tags.map(t => {
                              return {
                                value: t.id,
                                label: t.name
                              }
                            })}
                            aspect={i.name}
                          />
                        </div>
                      )
                  }
                </div>
              </div>

              <div className={st.rightDescriptionFieldContainer}>
                <div className={st.descriptionField}>
                  <h4>
                    Sizing:
                  </h4>
                  {
                    inventoryDetail.sizes.map((s, i) => (
                      <SizeMenu
                        measurements={measurements}
                        defaultValue={s}
                        idx={i}
                      />
                    ))
                  }
                  <button onClick={addSize}> Add a size</button>
                </div>
              </div>
            </div>


          </div>

          <div className={st.suggestionSection}>
            <h4 className={st.suggestionSectionTitle}>Similar Items</h4>
            <div className={st.suggestionSectionContent}>
            </div>
          </div>
          <div className={st.suggestionSection}>
            <h4 className={st.suggestionSectionTitle}>You may also like</h4>
            <div className={st.suggestionSectionContent}>

            </div>
          </div>



        </div>
  )
}


