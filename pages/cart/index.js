import React, { useEffect} from 'react'
import Head from "@components/ecommerce/Head";
import Nav from "@components/Nav";
import appSt from '../home.module.scss';
import st from '../recycle/recycle.module.scss';
import CartSection from '@components/ecommerce/CartSection';
import AddressForm from "@components/ecommerce/addressForm";
import AddressList from "@components/ecommerce/addressList"
import Map from "@components/ecommerce/map";
import { deliveryRoutes, itemPropertySources } from '../../constants/delivery'
import {useSelector} from "react-redux";
import {FETCH_CIDS_SUCCESS} from "../../redux/reducers/ecommerce/cart/cartItemDetail";
import { GET_BUY_QUOTATION_SUCCESS } from "../../redux/reducers/ecommerce/address/getBuyQuotation";
import classnames from 'classnames'
import Link from 'next/link'
import CartAuth from "@components/authBox/cartAuthForm"
import {FETCH_ADDRESSES_SUCCESS} from "../../redux/reducers/ecommerce/address/addresses";


export default function Cart(){

  const getQuotation = useSelector(state => state.getBuyQuotation);
  const token = useSelector(state => state.auth.token);
  const cartItemDetail = useSelector(state => state.cartItemDetail);

  const addresses = useSelector(state => state.addresses);
  const selectedAddressId = addresses.selectedAddressId;

  const addressData = (addresses.readyStatus !== FETCH_ADDRESSES_SUCCESS) ? []
    : Object.keys(addresses.data).map(k => addresses.data[k]);


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
  let isAuth = true;

  const isDisabled = () => {
    return !(typeof selectedAddressId === 'number'
    && selectedAddressId >= 0) || totalCost === null || deliveryCost === null
    || productCost === null
  }

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
                  <div className={token !== null ? st.show: st.hidden}>
                    <h4 className={st.sectionTitle}>Delivery Address </h4>
                    <AddressList
                      data={addressData}
                      selectedAddressId={selectedAddressId}
                    />
                    {
                      (addresses.readyStatus === FETCH_ADDRESSES_SUCCESS) &&
                      addressData.length === 0 ? <AddressForm
                        deliveryRoute={deliveryRoutes.FROM_HQ_TO_CLIENT}
                        itemPropertySource={itemPropertySources.CART}
                        cancelButton={false}
                      /> :   <React.Fragment>


                        <div className={addressBoxActive ? st.addressFormContainer
                          : classnames(st.hidden, st.addressFormContainer)
                        }>
                          <AddressForm
                            deliveryRoute={deliveryRoutes.FROM_HQ_TO_CLIENT}
                            itemPropertySource={itemPropertySources.CART}
                            cancelButton={true}
                          />
                        </div>
                      </React.Fragment>
                    }
                  </div>

                  <div className={ token !== null? st.hidden : st.show}>
                    <h4 className={st.sectionTitle}>Sign Up </h4>
                    <CartAuth/>
                  </div>

              </div>
              {token !== null ?
                <div className={st.bottomSection}>
                  <div className={st.bottomRightSection}>

                    <div className={st.conclusion}>

                      <div className={st.h4}>
                        <h4>Product Price</h4>
                        <h4>{productCostText}</h4>
                      </div>
                      <div className={st.h4}>
                        <h4>Delivery Cost</h4>
                        <h4>{deliveryCostText}</h4></div>
                      <div className={st.h4}>
                        <h4>Total Cost</h4><h4>{totalCostText} </h4>
                      </div>

                    </div>
                    <div className={st.checkoutButtonContainer}>
                      <Link href={'/recycle/checkout'}>
                        <div className={isDisabled() ? classnames(st.checkoutButton, st.disabled): st.checkoutButton}>
                          <h4>Checkout </h4>
                        </div>
                      </Link>
                    </div>

                  </div>
                </div> : null
              }
            </div>


          </div>

        </div>
      </main>
    </div>
  )
}