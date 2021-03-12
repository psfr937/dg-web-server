import React from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from './home.module.scss';
import st from './cart.module.scss';
import CartSection from '@components/ecommerce/CartSection';
import AddressForm from "@components/ecommerce/addressForm";
import AddressList from "@components/ecommerce/addressList"
import Map from "@components/ecommerce/map";
import dynamic from "next/dist/next-server/lib/dynamic";
import { deliveryRoutes, itemPropertySources } from '../constants/delivery'
import {useSelector} from "react-redux";
import {FETCH_CIDS_SUCCESS} from "../redux/reducers/ecommerce/cart/cartItemDetail";
import { GET_BUY_QUOTATION_SUCCESS } from "../redux/reducers/ecommerce/address/getBuyQuotation";
import classnames from 'classnames'
const PaymentForm = dynamic(() =>
  import("../components/ecommerce/stripe/PaymentForm"), { ssr: false });

export default function Cart(){

  const getQuotation = useSelector(state => state.getBuyQuotation);

  const cartItemDetail = useSelector(state => state.cartItemDetail);

  const productCost = cartItemDetail.readyStatus !== FETCH_CIDS_SUCCESS ? null :
    Object.keys(cartItemDetail.data)
    .map(k => cartItemDetail.data[k].price)
    .reduce((acc, cur) => acc + cur, 0);
  console.log(productCost)
  const productCostText = productCost === null ? '-': `HK$${productCost / 100}`;
  const deliveryCost = getQuotation.readyStatus !== GET_BUY_QUOTATION_SUCCESS ? null
    : getQuotation.data.quotation.amount;

  const address = getQuotation.readyStatus !== GET_BUY_QUOTATION_SUCCESS ? null
    : getQuotation.data.address;
  let lat = address === null ? null : address.lat;
  let lng = address === null ? null : address.lng;
  let formatted = address === null ? null : address.formatted;

  const deliveryCostText = deliveryCost === null ? '-': `HK$${deliveryCost / 100}`;
  const totalCost = productCost !== null && deliveryCost !== null
    ? productCost + deliveryCost : null;
  const totalCostText = totalCost === null ? '-': `HK$${totalCost / 100}`;

  const addressBoxActive = useSelector(state => state.ux.addressBoxActive);

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
                <h4 className={st.sectionTitle}>Shopping Cart </h4>

                <CartSection/>
              </div>
              <div>
                <h4 className={st.sectionTitle}>Delivery Address </h4>
                <AddressList/>

                <div className={addressBoxActive ? st.addressFormContainer
                 : classnames(st.hidden, st.addressFormContainer)
                }>
                  <AddressForm
                    deliveryRoute={deliveryRoutes.FROM_HQ_TO_CLIENT}
                    itemPropertySource={itemPropertySources.CART}
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
                    <h4>Product Price</h4>
                    <h4>{productCostText}</h4>
                  </div>
                    <div className={st.h4}>
                      <h4>Delivery Cost</h4>
                      <h4>{deliveryCostText}</h4></div>
                      <div className={st.h4}>
                        <h4>Total Cost</h4><h4>{totalCostText} </h4></div>
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