
import React from 'react';
import Shop from '../../components/Shop'
import Head from '@components/ecommerce/Head'
import appSt from "../home.module.scss";
import Nav from "@components/Nav";
import st from "../catalogPage.module.scss";


export default function Page(){

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
            <Shop
              cms={false}
            />
          </div>
        </main>
      </div>
    );
}
