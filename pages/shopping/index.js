import React, { PureComponent } from 'react'
import Head from "@components/Head";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import appSt from '../home.module.scss'
import CatalogList from "@components/catelogList"
import FilterMenu from "@components/filterMenu"
import st from "../catalogPage.module.scss"

class Shop extends PureComponent{

  constructor(props){
    super(props)
  }


  render(){

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
            <div className={st.catalogPage}>
              <FilterMenu/>
              <CatalogList/>
            </div>
          </div>
        </main>
      </div>
    )
  }
}


export default Shop