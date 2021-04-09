import React, { useEffect, useState } from 'react';
import {
  SearchBox,
  Pagination,
  ClearRefinements,
  RefinementList,
  Configure,
  Stats,
  connectHits,
  SortBy
} from 'react-instantsearch-dom';

import classNames from 'classnames'

import PropTypes from 'prop-types';
import Link from "next/dist/client/link";
import CustomPriceSlider from '@components/priceSlider'

import st from '@components/ecommerce/catalog.module.scss'
import filterMenu from "@components/ecommerce/filterMenu";
import SizeMenu from "@components/ecommerce/SizeMenu";
import {useDispatch} from "react-redux";
import {FETCH_SIZES} from "../redux/actions/ecommerce/sizes";
import SegmentDropButton from "@components/ecommerce/segmentDropButton";



export default function Shop(props){
  if(typeof window !== 'undefined') {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch({type: FETCH_SIZES})
    }, []);
  }

  const [filterMenuOpened, setFilterMenuOpened] = useState(false);

  const openFilterMenu = () => {
    setFilterMenuOpened(!filterMenuOpened)
  };

  const getFilterMenuClass = () => {
    if(filterMenuOpened === true){
     return "filterMenu"
    }
    else{
      return classNames("filterMenu", "disabled")
    }
  };



  return (
   <React.Fragment>
     <Configure hitsPerPage={8}/>
      <div className={st.paginationBar}>
        <div className={st.paginationBarLeft}>
          <SegmentDropButton/>
          <div className={st.statContainer}>
            <Stats
              translations={{
                stats(nbHits, processingTimeMS, nbSortedHits, areHitsSorted) {
                  return areHitsSorted && nbHits !== nbSortedHits
                    ? `${nbSortedHits.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found in ${processingTimeMS.toLocaleString()}ms`
                    : `Total items: ${nbHits.toLocaleString()}`
                },
              }}
            />
          </div>
        </div>
        <div className={st.paginationBarMiddle}>
          <div className={"searchContainer"}>
            <SearchBox/>
          </div>
        </div>
        <div className={st.paginationBarRight}>
          <div className={st.paginationAndSortContainer}>
            <Pagination
            showLast={false}
            showFirst={false}
            />
            <SortBy
              defaultRefinement="dev_dg"
              items={[
                { value: 'dev_dg', label: 'Featured' },
                { value: 'dev_dg_price_asc', label: 'Price asc.' },
                { value: 'dev_dg_price_desc', label: 'Price desc.' },
              ]}
            />
          </div>
          <div className={st.openFilterMenuButton} onClick={openFilterMenu}>
            <svg style={{width:'24px',height:'24px'}} viewBox="0 0 24 24">
              <path fill="currentColor" d="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={st.catalogPage}>
        <div className={getFilterMenuClass()}>

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
          <div className={st.showResultButtonContainer}>
            <button onClick={() => setFilterMenuOpened(false)}> Show Results </button>
          </div>
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
   </React.Fragment>
  )

}

const createSlug = (localText) => {
  const name = typeof localText !== 'undefined' && typeof localText.name === 'string' ?
    localText.name : 'product';
  return name.split(/\s+/).slice(0,5).join(" ")
    .replace(/\s+/g, '-').toLowerCase();
};

function Hit({ hit, cms }) {
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
