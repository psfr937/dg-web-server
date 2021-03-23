import React from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from '../home.module.scss'
import st from './error.module.scss'
import Link from 'next/link'
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
              You are not an admin. Therefore, you cannot enter our CMS.
            </p>
            <img src={"/sad.jpeg"} alt={"sad"}/>
            <p>
              To go shopping, go to this link
              <Link href={'/shopping'}>
                <button className={st.linkButton}>
                <h4>dressgreen.net/shopping</h4>
                </button>
              </Link>
            </p>

          </div>
        </div>
      </main>
    </div>
  )
}
