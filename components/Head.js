import Head from 'next/head'
import React from "react";
function SiteHead({title = 'AEEA'}) {
  return (
    <Head>
      <title>AEEA</title>
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
