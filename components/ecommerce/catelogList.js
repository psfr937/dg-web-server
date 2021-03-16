import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import st from './catalog.module.scss'
import Link from 'next/link'
import {FETCH_INVENTORIES, FETCH_INVENTORIES_SUCCESS} from "../../redux/reducers/ecommerce/inventories";
import classnames from 'classnames'

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default function CatalogList(){

  const dispatch = useDispatch();
  const inventories = useSelector(state => state.inventories);
  const language = useSelector(state => state.ux.language);

  const createSlug = (localText) => {
    const name = typeof localText !== 'undefined' && typeof localText.name === 'string' ?
      localText.name : 'product';
    return name.split(/\s+/).slice(0,5).join(" ")
      .replace(/\s+/g, '-').toLowerCase();
  };


  const data = (inventories.readyStatus !== FETCH_INVENTORIES_SUCCESS) ? []
    : Object.keys(inventories.data).map(k =>  inventories.data[k])

  useEffect(() => {
    dispatch({type: FETCH_INVENTORIES})
  }, []);

  let placeHolderAmount;

  const size = useWindowSize();

  console.log(size.width)
  let layoutChanges = [950, 1180, 1400, 1660, 1886, Infinity];
  for(let i = 0; i < layoutChanges.length; i++){
    if(size.width <= layoutChanges[i]){
      let n = i + 2;
      placeHolderAmount =  data.length % n === 0 ? 0 : n - data.length % n;
      break;
    }
  }

  return (
    <div className={st.catalogSection}>
      <div className={st.container}>
        {
          data.map(i => {
            const localText = i.text.find(t => t.language === language);
            const firstImage = i.images.find(t => t.order === 1)
            return <Link href={`/shopping/${createSlug(localText)}/p/${i.id}`}>
              <div className={st.itemContainer}>
                <div className={st.item}>
                  <img src={typeof firstImage !== 'undefined' ? firstImage.url : null}/>
                  <div className={st.itemTitle}>{typeof localText !== 'undefined' ? localText.name : ''}</div>
                  <div className={st.itemPrice}>{`HK$${i.price/100}`}</div>
                </div>
              </div>
            </Link>
          })

        }
        {
          _.times(placeHolderAmount, () => <div className={st.itemContainer}/>)
        }


      </div>
    </div>
  )
}
