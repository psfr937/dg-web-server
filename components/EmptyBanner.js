import React from 'react'
import st from './emptyBanner.module.scss'
import Link from 'next/link'

export function EmptyBanner({imgSrc, text}){
  return <div className={st.emptyBanner}>
    <img style={{'height': '200px', 'width': '200px', 'border-radius': '8px'}} src={imgSrc} />
    <h4>{text} </h4>
    <Link href="/shopping">
      <button> + Visit the Shop </button>
    </Link>
  </div>
}

export function EmptyShopBanner({imgSrc, text}){
  return <div className={st.emptyShopBanner}>
    <img style={{'height': '200px', 'width': '200px', 'border-radius': '8px'}} src={imgSrc} />
    <h4>{text} </h4>
  </div>
}