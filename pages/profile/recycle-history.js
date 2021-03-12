import React from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from '../home.module.scss'
import st from './recycle-history.module.scss'

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
        <div className={appSt.navPadding}>
          <div>
            <h4>Recycle History</h4>
          </div>
        </div>
      </main>
    </div>
  )
}
