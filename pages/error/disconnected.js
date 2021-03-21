import React from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from '../home.module.scss'
import st from './error.module.scss'

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
          <div className={st.errorPage}>

            <p>
            Sorry. We cannot connect you to the server. Come back later.
            </p>
            <img src={"/sad.jpeg"} alt={"sad"}/>
            <p>
            To report this issue, please contact us.
            Fill out this form and we will contact you directly
            </p>

          </div>
        </div>
      </main>
    </div>
  )
}
