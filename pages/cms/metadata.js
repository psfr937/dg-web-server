import React from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from '../home.module.scss'
import st from './metadata.module.scss'
import ProfileMenu from "@components/profile/profileMenu";
import MetadataMenu from "@components/cms/metadata/metadataMenu";
import MeasurementList from "@components/cms/metadata/measurementList";
import SortList from "@components/sortList";
export default function RecycleHistory(){
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
            <MetadataMenu/>
            <MeasurementList/>
            {/*<SortList/>*/}
          </div>
        </div>
      </main>
    </div>
  )
}
