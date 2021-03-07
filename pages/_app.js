import React from 'react'
import "react-vis/dist/style.css";
import "../styles/checkout.css"
import "../styles/global.scss"
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {wrapper} from '../redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {useStore} from "react-redux";

const WrappedApp = (ctx) => {
    const {Component, pageProps, router} = ctx;
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