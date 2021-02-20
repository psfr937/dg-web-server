import Head from 'next/head'
import React from "react";
function SiteHead({title = 'Dress Green'}) {
  return (
    <Head>
      <title>Dress Green</title>
      <link rel="icon" href="/logo.png"/>
      <link
        rel="preload"
        href="/fonts/Roboto-Medium.ttf"
        as="font"
        crossOrigin=""
      />
    </Head>
  )
}

export default SiteHead
