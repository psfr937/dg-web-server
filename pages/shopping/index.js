import React from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from '../home.module.scss'
import CatalogList from "@components/ecommerce/catelogList"
import FilterMenu from "@components/ecommerce/filterMenu"
import st from "../catalogPage.module.scss"

export default function Shop(){

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
        <div className={st.navPadding}>
          <div className={st.paginationBar}>
            <h6> Total </h6>
          </div>
          <div className={st.catalogPage}>
            <FilterMenu/>
            <CatalogList/>
          </div>
        </div>
      </main>
    </div>
  )
}