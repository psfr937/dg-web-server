import App from 'next/app'
import React from 'react'
import "react-vis/dist/style.css";
import "../styles/checkout.css"
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";


import {wrapper} from '../redux/store';

const WrappedApp = ({Component, pageProps}) => <Component {...pageProps} />;

export default wrapper.withRedux(WrappedApp);