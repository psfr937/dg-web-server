import React, { useEffect} from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from './home.module.scss';
import WishList from "@components/ecommerce/wishList";

export default function WishlistPage(){


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
         <WishList/>
        </div>
      </main>
    </div>
  )
}