import App from 'next/app'
import React from 'react'
import withRedux from '../lib/withRedux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Router from 'next/router';
import "react-vis/dist/style.css";
import "../styles/checkout.css"
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

// Router.events.on('routeChangeComplete', () => {
//     if (process.env.NODE_ENV !== 'production') {
//       const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
//       const timestamp = new Date().valueOf();
//       els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
//     }
//   }
// )

/**
 * Get the messages and also do locale negotiation. A multi-lingual user
 * can specify locale prefs like ['ja', 'en-GB', 'en'] which is interpreted as
 * Japanese, then British English, then English
 * @param locales list of requested locales
 * @returns {[string, Promise]} A tuple containing the negotiated locale
 * and the promise of fetching the translated messages
 */
// function getMessages(locales) {
//   if (!Array.isArray(locales)) {
//     locales = [locales];
//   }
//   let langBundle;
//   let locale;
//   for (let i = 0; i < locales.length && !locale; i++) {
//     locale = locales[i];
//     switch (locale) {
//       case 'zh-Hans-CN':
//         langBundle = import('../compiled-lang/zh-Hans-CN.json');
//         break;
//       case 'zh-Hant-HK':
//         langBundle = import('../compiled-lang/zh-Hant-HK.json');
//         break;
//       default:
//         break;
//       // Add more languages
//     }
//   }
//   if (!langBundle) {
//     return ['en', import('../compiled-lang/en.json')];
//   }
//   return [locale, langBundle];
// }

// const getInitialProps = async appContext => {
//   const {
//     ctx: {req},
//   } = appContext;
//   const requestedLocales =
//     req.locale ||
//     (typeof navigator !== 'undefined' && navigator.languages) ||
//     // IE11
//     (typeof navigator !== 'undefined' && navigator.userLanguage) ||
//     (typeof window !== 'undefined' && window.LOCALE) ||
//     'en';
//
//   const [supportedLocale, messagePromise] = getMessages(requestedLocales);
//
//   const [, messages, appProps] = await Promise.all([
//     polyfill(supportedLocale),
//     messagePromise,
//     App.getInitialProps(appContext),
//   ]);
//
//   return {
//     ...(appProps),
//     locale: supportedLocale,
//     messages: messages.default,
//   };
// };


class MyApp extends App {
  constructor (props) {
    super(props)
    this.persistor = persistStore(props.reduxStore)

  }



  render () {
    // console.log('app')
    const { Component, pageProps, reduxStore, router } = this.props
    return (

      <Provider store={reduxStore}>
        <PersistGate
          loading={<Component {...pageProps} />}
          persistor={this.persistor}
        >
          <AnimateSharedLayout>
              <Component {...pageProps} key={router.route} />
          </AnimateSharedLayout>
        </PersistGate>
      </Provider>
    )
  }
}

export default withRedux(MyApp)