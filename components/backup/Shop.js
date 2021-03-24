import algoliasearch from 'algoliasearch/lite';
import React, { useEffect } from 'react';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  HierarchicalMenu,
  Stats,
  SortBy,
  connectHits
} from 'react-instantsearch-dom';

import PropTypes from 'prop-types';
import Head from "@components/ecommerce/Head";
import Link from "next/dist/client/link";
import filterMenuSt from "@components/ecommerce/filterMenu.module.scss"
import CustomPriceSlider from '@components/priceSlider'
import classnames from 'classnames'

import st from '@components/ecommerce/catalog.module.scss'
import filterMenu from "@components/ecommerce/filterMenu";
import SizeMenu from "@components/ecommerce/SizeMenu";
import {useDispatch} from "react-redux";
import {FETCH_SIZES} from "../redux/actions/ecommerce/sizes";
import SegmentMenu from "@components/ecommerce/segmentMenu"
export default function Shop(props){
  // static propTypes = {
  //   searchState: PropTypes.object,
  //   resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  //   onSearchStateChange: PropTypes.func,
  //   createURL: PropTypes.func,
  //   indexName: PropTypes.string,
  //   searchClient: PropTypes.object,
  // };
  //console.log(window)
  if(typeof window !== 'undefined') {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch({type: FETCH_SIZES})
    }, []);
  }

  return (
    <InstantSearch
      searchClient={props.searchClient}
      resultsState={props.resultsState}
      onSearchStateChange={props.onSearchStateChange}
      searchState={props.searchState}
      createURL={props.createURL}
      indexName={props.indexName}
      onSearchParameters={props.onSearchParameters}
      {...props}
    >
      <div className={st.paginationBar}>
        <SegmentMenu
          attribute="segment"
        />
        <Stats/>
        {/*<SortBy*/}
        {/*  // ...*/}
        {/*  items={[*/}
        {/*    { value: 'instant_search', label: 'Featured' },*/}
        {/*    { value: 'instant_search_price_asc', label: 'Price asc.' },*/}
        {/*    { value: 'instant_search_price_desc', label: 'Price desc.' },*/}
        {/*  ]}*/}
        {/*/>*/}
        <Pagination
          showLast
        />
      </div>
      <div className={st.catalogPage}>
        <div className={"filterMenu"}>
          <div className={"searchContainer"}>
            <SearchBox/>
          </div>
          <div className={"filterTitleContainer"}>
            <div className={"filterByText"}>
              <h4> Filter By</h4>
            </div>
            <ClearRefinements
              translations={{
                reset: 'Clear',
              }}
            />
          </div>
          <div className={"filterMenuBottomSection"}>
            <div className={"filterSection"}>
              <h4>Category</h4>
              <RefinementList
                searchable={"true"}
                attribute="category"/>
            </div>
            <div className={"filterSection"}>
              <h4>Accent</h4>
              <RefinementList
                searchable={"true"}
                attribute="accent"/>
            </div>
            <div className={"filterSection"}>
              <h4>Brand</h4>
              <RefinementList
                searchable={"true"}
                attribute="brand"
              />
            </div>
            <div className={"filterSection"}>
              <h4>Color</h4>
              <RefinementList
                searchable={"true"}
                attribute="color"
              />
            </div>
            <div className={"filterSection"}>
              <h4>Size</h4>
              {/*<RefinementList*/}
              {/*  searchable={"true"}*/}
              {/*  attribute="size.lvl2"*/}
              {/*/>*/}
              {/*<HierarchicalMenu attributes={[*/}
              {/*  'size.lvl0',*/}
              {/*  'size.lvl1',*/}
              {/*  'size.lvl2',*/}
              {/*  'size.lvl3',*/}
              {/*]}/>*/}
              <SizeMenu
                attribute="size"
              />
            </div>
            <div className={"filterSection"}>
              <h4>Price</h4>
              <CustomPriceSlider
                attribute={"price"}
                min={100}
                max={1000000}
              />
            </div>
          </div>

          <Configure hitsPerPage={8}/>
        </div>
        <div className="right-panel">
          {/*<CustomHits data="test" />*/}

          {/*<Hits*/}
          {/*  hitComponent={Hit}*/}
          {/*  cms={props.cms}*/}
          {/*/> : 'haha'*/}
          <CustomHits cms={props.cms}/>
        </div>
      </div>
    </InstantSearch>
  )

}

const createSlug = (localText) => {
  const name = typeof localText !== 'undefined' && typeof localText.name === 'string' ?
    localText.name : 'product';
  return name.split(/\s+/).slice(0,5).join(" ")
    .replace(/\s+/g, '-').toLowerCase();
};

function Hit({ hit, cms }) {
  console.log(hit);

  let language = 'en';
  const localText = hit.text.find(t => t.language === language);
  const firstImage = hit.images.find(t => t.order === 1)

  const path = cms === true ? 'cms' : 'shopping';
  return(
    <div className={st.itemContainer}>
      <Link href={`/${path}/${createSlug(localText)}/p/${hit.id}`}>
        <div className={st.item}>
          <img src={typeof firstImage !== 'undefined' ? firstImage.url : null}/>

          <div className={st.itemBrand}>{hit.brand}</div>
          <div className={st.itemName}>{typeof localText !== 'undefined' ? localText.name : ''}</div>
          <div className={st.itemPrice}>{`HK$${hit.price/100}`}</div>

        </div>
      </Link>
    </div>
  )

}


const Hitts = ({ hits, cms }) => (
  <ul>
    {hits.map(hit => (
      <li>
        <Hit hit={hit} cms={cms}/>
      </li>
    ))}
  </ul>
);

const CustomHits = connectHits(Hitts);

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};
