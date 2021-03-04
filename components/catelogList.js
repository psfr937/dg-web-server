import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import st from './catalog.module.scss'
import Link from 'next/link'
import {FETCH_INVENTORIES, FETCH_INVENTORIES_SUCCESS} from "../redux/reducers/inventories";

const createSlug = (name) => {
  return name.split(/\s+/).slice(0,5).join(" ")
    .replace(/\s+/g, '-').toLowerCase();
};

function CatalogList(){

  const dispatch = useDispatch()
  const inventories = useSelector(state => state.inventories)

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
            return <Link href={`/shopping/${createSlug(i.name)}/p/${i.id}`}>
              <div className={st.itemContainer}>
                <div className={st.item}>
                  <img src={i.picture_url}/>
                  <div className={st.itemTitle}>{i.title}</div>
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

export default CatalogList