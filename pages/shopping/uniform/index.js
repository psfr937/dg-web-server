import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import UniformShop from '@components/UniformShop'
import Head from '@components/ecommerce/Head'
import appSt from "../../home.module.scss";
import Nav from "@components/ecommerce/shoppingNav";
import st from "../../catalogPage.module.scss";
const searchClient = algoliasearch(
  'XSR6ZP990B', //'B1G2GM9NG0',
  'e3d7f522186e977cdb3d84474d85f038' //'aadef574be1f9252bb48d4ea09b5cfe5'
);

import  { InstantSearch } from "react-instantsearch-dom"

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
        <InstantSearch indexName="dev_dg" searchClient={searchClient}>
          <Nav/>
          <div className={st.navPadding}>
            <UniformShop
              cms={false}
            />
          </div>
        </InstantSearch>
      </main>
    </div>
  );
}
