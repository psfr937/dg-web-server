import App from "next/app";
import React from 'react'
import "react-vis/dist/style.css";
import "../styles/checkout.css"
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "../redux/store";
import { useStore } from "react-redux";


function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  return (
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <Component {...pageProps} />
      </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);