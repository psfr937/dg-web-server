import React, { PureComponent } from 'react'
import Head from "@components/Head";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import appSt from './home.module.scss'
import dynamic from 'next/dynamic'
import st from './checkout.module.scss'
import CartSection from '../components/CartSection'
const StripePmContainer = dynamic(() => import("../components/stripe/StripeAddPmContainer"), { ssr: false });


class Cart extends PureComponent{

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
            <div className={st.container}>
              <CartSection/>
            </div>
          </div>
        </main>
      </div>
    )
  }
}


export default Cart