import Head from '@components/Head'
import { fetchEntries } from '../helpers/contentfulPosts'
import safeJsonStringify from 'safe-json-stringify';
import Footer from '@components/Footer'
import st from './home.module.scss'
import React from "react";
import Nav from "@components/Nav"
import classNames from 'classnames'
import Fade from 'react-reveal/Fade'


export default function Home({ posts }) {
  return (
    <div>
      <style jsx global>{`
      body {
        margin: 0;
        overflow-x: hidden;
      }
    `}</style>
      <Head/>
      <main className={st.app}>
        <Nav/>
        <div className={st.navPadding}>
          <div className={st.mainAppBanner}>
            <img src="/women.png"/>
            <div className={st.mainAppBannerContent}>
                <div>
                <span><h4>SELL WITH ZERO EFFORT</h4></span>
                </div>
              <div>
                <span><h4>BUY SMARTER, PAY LESS</h4></span>
              </div>
            </div>
          </div>
          <div className={st.sectionContainer}>
          <div className={st.appHeaderTextContainer}>
            <h2 className={st.appHeaderText}>SELL EASIER</h2>
            <p className={st.appHeaderPara}>
              Resell clothes in a seriously easy way. We do all the work.
            </p>
          </div>

          <div className={st.sellingStepList}>
            <div className={st.sellingPointCard}>
              <div className={st.sellingPointNumber}> 1 </div>
              <h4 className={st.sellingPointCardTitle}>
                You receive a bag from us at your door.
              </h4>
            </div>
            <div className={st.sellingPointCard}>
              <div className={st.sellingPointNumber}> 2 </div>
              <h4 className={st.sellingPointCardTitle}>
                 Pack up what you want to sell.
              </h4>
            </div>
            <div className={st.sellingPointCard}>
              <div className={st.sellingPointNumber}> 3 </div>
              <h4 className={st.sellingPointCardTitle}>
                A delivery man will collect your clothes at your door.
              </h4>
            </div>
            <div className={st.sellingPointCard}>
              <div className={st.sellingPointNumber}> 4 </div>
              <h4 className={st.sellingPointCardTitle}>
                We do all the chore such as photo-taking, advertising and delivery to the buyer. You can lay back and collect your profit.
              </h4>
            </div>

          </div>

          <div className={st.sellingPointList}>
            <div className={st.sellingPointCard}>
              <img src="/handbag.png"/>
              <h4 className={st.sellingPointCardTitle}>
                No need to manage selling yourself
              </h4>
              <h5 className={st.sellingPointCardPara}>
                No selling skill needed anymore. We do all the photo taking, inspection and marketing required to get your item sold
              </h5>
            </div>
            <div className={st.sellingPointCard}>
              <img src="/price_tag.webp"/>
              <h4 className={st.sellingPointCardTitle}>
                Advanced pricing optimization
              </h4>
              <h5 className={st.sellingPointCardPara}>
                We compare prices in different platform and automate price adjustment to ensure you make the best profit
              </h5>
            </div>
            <div className={st.sellingPointCard}>
              <img src="/hanger.png"/>
              <h4 className={st.sellingPointCardTitle}>
                No need to manage delivery yourself
              </h4>
              <h5 className={st.sellingPointCardPara}>
                We deliver it to the buyers and automatically give you payouts
              </h5>
            </div>

          </div>
            <button className={st.actionButton}>
              Recycle now
            </button>
          </div>


          <div className={st.sectionContainer}>
            <div className={st.appHeaderTextContainer}>
              <h2 className={st.appHeaderText}>BUY SMARTER</h2>
              <p className={st.appHeaderPara}>
              Get more, waste less
              </p>
            </div>

            <div className={st.sellingPointList}>
              <div className={st.sellingPointCard}>
                <img src="/handbag.png"/>

                <h4 className={st.sellingPointCardTitle}>
                  In-house quality check, 100% fraud-proof
                </h4>
                <h5 className={st.sellingPointCardPara}>
                  All products must go through our inspection process. Flaws, if any, are reported with 100% honesty
                </h5>
              </div>
              <div className={st.sellingPointCard}>
                <img src="/handbag.png"/>

                <h4 className={st.sellingPointCardTitle}>
                  Enjoy discount of up to 90% of retail price
                </h4>
                <h5 className={st.sellingPointCardPara}>
                  Explore different stylesm discover designers, and try new things at out-of-this-world prices.
                </h5>
              </div>
              <div className={st.sellingPointCard}>
                <img src="/hanger.png"/>
                <h4 className={st.sellingPointCardTitle}>
                  Sustainable Footprint
                </h4>
                <h5 className={st.sellingPointCardPara}>
                  Shopping secondhand displaces the need for new clothing production and diverts items from landfills.
                </h5>
              </div>

            </div>

            <button className={st.actionButton}>
              Shop now
            </button>
          </div>
          <div className={classNames(st.homePageSection, st.second)}>
            <div className={st.after}>

              <Fade left duration={500} delay={100}>
                <h4>SAVE THE EARTH FROM WASTE DISPOSAL</h4>
                <h5>With a smarter marketplace that process and recirculate clothing at an extraordinary speed and scale</h5>
              </Fade>

            </div>
          </div>
          <div className={st.categoryBannerList}>
            <div className={st.categoryBannerSection}>
              <div className={st.categoryBanner}>
                <img src="/kids.png"/>
                <div className={st.categoryBannerContent}>
                  <h4>KIDS</h4>
                </div>
              </div>
            </div>
            <div className={st.categoryBannerSection}>
              <div className={st.categoryBanner}>
                <img src="/women.png"/>
                <div className={st.categoryBannerContent}>
                  <h4>WOMEN</h4>
                </div>
              </div>
              <div className={st.categoryBanner}>
                <img src="/green_box.png"/>
                <div className={st.categoryBannerContent}>
                  <h4>GREEN BOX</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />



    </div>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries()
  const stringifiedData = safeJsonStringify(res)
  const data = JSON.parse(stringifiedData)
  // console.log(data)
  const posts = await data.map((p) => {
    return p.fields
  })

  return {
    props: {
      posts,
    },
  }
}
