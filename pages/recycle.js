import React, { PureComponent } from 'react'
import Head from "@components/Head";
import Nav from "@components/Nav";
import appSt from './home.module.scss'
import AddressForm from "@components/addressForm"
import st from "./catalogPage.module.scss"
import KitForm from "@components/kitForm";

export default function Recycle(){

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
            <KitForm/>
            <AddressForm/>
          </div>
        </div>
      </main>
    </div>
  )

}