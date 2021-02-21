import React from 'react'
import "react-vis/dist/style.css";
import "../styles/checkout.css"
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {wrapper} from '../redux/store';


const WrappedApp = (ctx) => {
    console.log(ctx)
    const {Component, pageProps, router} = ctx
    return(
          <AnimateSharedLayout>
            <Component {...pageProps} key={router.route}/>
          </AnimateSharedLayout>
    )
};

export default wrapper.withRedux(WrappedApp);