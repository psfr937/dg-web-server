import React from 'react'
import "react-vis/dist/style.css";
import "../styles/checkout.css"
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {wrapper} from '../redux/store';
import { useStore } from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';



const WrappedApp = (ctx) => {
    console.log(ctx)
    const {Component, pageProps, router} = ctx
    const store = useStore();
    return(
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
          <AnimateSharedLayout>
            <Component {...pageProps} key={router.route}/>
          </AnimateSharedLayout>
      </PersistGate>
    )
};

export default wrapper.withRedux(WrappedApp);