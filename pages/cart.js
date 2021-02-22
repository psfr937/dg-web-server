import React, { PureComponent } from 'react'
import Head from "@components/Head";
import Nav from "@components/Nav";
import appSt from './home.module.scss';
import st from './checkout.module.scss';
import CartSection from '../components/CartSection';
import AddressForm from "@components/addressForm";

function Cart(){


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
          <div className={st.container}>
            <CartSection/>
            <AddressForm/>
            <button onClick=""> Checkout </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Cart