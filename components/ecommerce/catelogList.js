import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import st from './catalog.module.scss'
import Link from 'next/link'
import {FETCH_INVENTORIES, FETCH_INVENTORIES_SUCCESS} from "../../redux/reducers/ecommerce/inventories";


export default function CatalogList(){

  const dispatch = useDispatch();
  const inventories = useSelector(state => state.inventories);
  const language = useSelector(state => state.ux.language);

  const createSlug = (localText) => {
    const name = typeof localText !== 'undefined' && typeof localText.name === 'string' ?
      localText.name : 'product';
    return name.split(/\s+/).slice(0,5).join(" ")
      .replace(/\s+/g, '-').toLowerCase();
  };


  const data = (inventories.readyStatus !== FETCH_INVENTORIES_SUCCESS) ? []
    : Object.keys(inventories.data).map(k =>  inventories.data[k])

  useEffect(() => {
    dispatch({type: FETCH_INVENTORIES})
  }, []);

  return (
    <div className={st.catalogSection}>
      <div className={st.container}>
        {
          data.map(i => {
            const localText = i.text.find(t => t.language === language);
            const firstImage = i.images.find(t => t.order === 1)
            return <Link href={`/shopping/${createSlug(localText)}/p/${i.id}`}>
              <div className={st.itemContainer}>
                <div className={st.item}>
                  <img src={typeof firstImage !== 'undefined' ? firstImage.url : null}/>
                  <div className={st.itemTitle}>{typeof localText !== 'undefined' ? localText.name : ''}</div>
                  <div className={st.itemPrice}>{`HK$${i.price/100}`}</div>
                </div>
              </div>
            </Link>
          })
        }
      </div>
    </div>
  )
}
