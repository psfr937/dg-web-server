import React from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from './home.module.scss';
import st from './recycle.module.scss';
import AddressForm from "@components/ecommerce/addressForm";
import AddressList from "@components/ecommerce/addressList"
import Map from "@components/ecommerce/map";
import dynamic from "next/dist/next-server/lib/dynamic";
import {useSelector} from "react-redux";
import {GET_SELL_QUOTATION_SUCCESS} from "../redux/reducers/ecommerce/address/getSellQuotation";
import {FETCH_CIDS_SUCCESS} from "../redux/reducers/ecommerce/cart/cartItemDetail";
import classnames from 'classnames'
import KitForm from "@components/ecommerce/kitForm";
const PaymentForm = dynamic(() =>
  import("../components/ecommerce/stripe/PaymentForm"), { ssr: false });

export default function Cart(){

  const getQuotation = useSelector(state => state.getSellQuotation);

  const cartItemDetail = useSelector(state => state.cartItemDetail);

  const kitOptions = useSelector(state => state.kitOptions);


  const productCost = 0;
  const productCostText = `HK$0`;
  const deliveryCost = getQuotation.readyStatus !== GET_SELL_QUOTATION_SUCCESS ? null
    : getQuotation.data.quotation.amount;

  const address = getQuotation.readyStatus !== GET_SELL_QUOTATION_SUCCESS ? null
    : getQuotation.data.address;
  let lat = address === null ? null : address.lat;
  let lng = address === null ? null : address.lng;
  let formatted = address === null ? null : address.formatted;

  const deliveryCostText = deliveryCost === null ? '-': `HK$${deliveryCost / 100}`;
  const totalCost = productCost !== null && deliveryCost !== null
    ? productCost + deliveryCost : null;
  const totalCostText = totalCost === null ? '-': `HK$${totalCost / 100}`;

  const addressBoxActive = useSelector(state => state.ux.addressBoxActive)

  return (
    <div>
      <style jsx global>{`
    body {
      margin: 0;
      overflow-x: hidden;
    }
  `}</style>
      <Head/>
      <main className={st.app}>
        <Nav/>
        <div className={appSt.navPadding}>
          <div className={st.container}>
            <div className={st.topSection}>
              <div className={st.subSection}>
                <div >
                  <h4 className={st.sectionTitle}>How to sell </h4>

                  <KitForm/>
                </div>
                <div>
                  <h4 className={st.sectionTitle}>Delivery Address </h4>
                  <AddressList/>

                  <div className={addressBoxActive ? st.addressFormContainer
                    : classnames(st.hidden, st.addressFormContainer)
                  }>
                    <AddressForm
                      type='SELL'
                    />
                  </div>
                  <Map
                    center={{lat, lng}}
                  />
                </div>
              </div>
              <div className={st.bottomSection}>
                <div className={st.bottomLeftSection}>
                  <h4 className={st.sectionTitle}> </h4>


                  <div className={st.grassImageContainer}>
                    <img className={st.grassImage}/>
                  </div>

                </div>

                <div className={st.bottomRightSection}>
                  <h4 className={st.sectionTitle}>Summary </h4>

                  <div className={st.conclusion}>
                    <div className={st.h4}>
                      <h4>Delivery Cost</h4>
                      <h4>{deliveryCostText}</h4></div>
                  </div>
                  <h4 className={st.sectionTitle}>Checkout </h4>
                  <PaymentForm/>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}