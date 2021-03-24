import React, { useEffect } from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/cms/cmsNav";
import appSt from '../home.module.scss'
import { EMPTY_INVENTORY } from "../../redux/actions/ecommerce/inventories";
import {useDispatch, useSelector} from "react-redux";
import Product from "@components/cms/inventoryForm";

export default function ProductPage(){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: EMPTY_INVENTORY,
      data: {
        images: [],
        sizes: [],
        tags: [],
        text: [{
          language: 'en',
          description: '',
          title: ''
        },
          {
            language: 'zh-HK',
            description: '',
            title: ''
          },
        ],
        brand: '',
        seller: {
          id: null
        },
        price: 0
      }
    })
  }, [])
  const oneInventory = useSelector(state => state.oneInventory);

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
        <Nav action={'create'}/>
        <Product oneInventory={oneInventory}/>
      </main>
    </div>
  )
}



