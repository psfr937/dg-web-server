import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import Head from "@components/ecommerce/Head";
import appSt from "./home.module.scss";
import Link from "next/dist/client/link";

import classnames from 'classnames'

import st from '@components/ecommerce/catalog.module.scss'

const searchClient = algoliasearch(
  'XSR6ZP990B', //'B1G2GM9NG0',
  'e3d7f522186e977cdb3d84474d85f038' //'aadef574be1f9252bb48d4ea09b5cfe5'
);

export default function Shop(){

    return (
      <div>
        <style jsx global>{`
      body {
        margin: 0;
        overflow-x: hidden;
      }
      
    
    `}</style>
        <Head/>
        <main className={appSt.app}>
          <div className={'ais-InstantSearch'}>
            <h1>React InstantSearch e-commerce demo</h1>
            <InstantSearch indexName="dev_dg" searchClient={searchClient}>
              <div className="left-panel">

                <ClearRefinements />
                <h2>Brands</h2>
                <RefinementList attribute="brand" />
                <Configure hitsPerPage={8} />
              </div>
              <div className="right-panel">
                <SearchBox />
                <Hits hitComponent={Hit} />
                <Pagination />
              </div>
            </InstantSearch>
          </div>
        </main>
      </div>
    );
}

// function Hit(props) {
//   return (
//     <div>
//       <img src={props.hit.image} align="left" alt={props.hit.name} />
//       <div className="hit-name">
//         <Highlight attribute="name" hit={props.hit} />
//       </div>
//       <div className="hit-description">
//         <Highlight attribute="description" hit={props.hit} />
//       </div>
//       <div className="hit-price">${props.hit.price}</div>
//     </div>
//   );
// }
const createSlug = (localText) => {
  const name = typeof localText !== 'undefined' && typeof localText.name === 'string' ?
    localText.name : 'product';
  return name.split(/\s+/).slice(0,5).join(" ")
    .replace(/\s+/g, '-').toLowerCase();
};

function Hit({ hit }) {
  console.log(hit)
  let language = 'en';
  const localText = hit.text.find(t => t.language === language);
  const firstImage = hit.images.find(t => t.order === 1)
  return <Link href={`/shopping/${createSlug(localText)}/p/${hit.id}`}>
    <div className={st.itemContainer}>
      <div className={st.item}>
        <img src={typeof firstImage !== 'undefined' ? firstImage.url : null}/>
        <div className={st.itemTitle}>{typeof localText !== 'undefined' ? localText.name : ''}</div>
        <div className={st.itemPrice}>{`HK$${hit.price/100}`}</div>
      </div>
    </div>
  </Link>

}


Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};
