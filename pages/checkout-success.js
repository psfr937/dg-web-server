import React, { PureComponent } from 'react'
import Head from "@components/Head";
import Nav from "@components/Nav";
import appSt from './home.module.scss'
import dynamic from 'next/dynamic'
import st from './checkout-success.module.scss'
import MiniCartSection from '@components/CartMini'
import ShipmentDetail from "@components/ShipmentDetail";
const StripePmContainer = dynamic(() => import("../components/stripe/StripeAddPmContainer"), { ssr: false });



class CheckoutSuccess extends PureComponent{

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
            <div className={appSt.container}>
              <div className={st.successMessage}>
                <svg className={st.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle className={st.checkmark__circle} cx="26" cy="26" r="25" fill="none"/>
                  <path className={st.checkmark__check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
                <h3 className={st.successText}>
                  <pre>THANK YOU!</pre>
                  <pre> We have received your order.</pre>
                </h3>
              </div>
              <div className={st.checkoutSuccessDetail}>
                <MiniCartSection/>
                <ShipmentDetail/>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
}


export default CheckoutSuccess