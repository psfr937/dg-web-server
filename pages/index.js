import Head from '@components/Head'
import { fetchEntries } from '@utils/contentfulPosts'
import safeJsonStringify from 'safe-json-stringify';
import Footer from '@components/Footer'
import Post from '@components/Post'
import TitledPost from '@components/TitledPost'
import st from './home.module.scss'
import React from "react";
import Nav from "@components/Nav"
import classNames from 'classnames'
import Fade from 'react-reveal/Fade'
import PlanSelection from '@components/planSelection'

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

          <PlanSelection/>

          <div className={st.mainAppHeaderTextContainer}>
            <h2 className={st.appHeaderText}>Machine Learning Service</h2>
            <h4 className={st.appHeaderPara}>We hate work</h4>
          </div>
          <div className={classNames(st.homePageSection, st.first)}>
            <div className={st.introBox}>

              <div className={st.doubleBars}>
                <Fade left duration={500} delay={100}>
                  <h4>「亞太禮儀教育協會」成立於2020年，主要傳承中華民族禮儀之邦文化，融合西方禮儀文化，塑造由內而外的品格修為，共同普及禮儀文化，將禮儀文化及教育推廣致日常生活，達致全民有禮，促進社會與家庭和諧。
                  </h4>
                </Fade>
              </div>
            </div>
          </div>


          <div className={st.appHeaderTextContainer}>
            <h2 className={st.appHeaderText}>禮儀培訓教育</h2>
            <div className={st.posts}>
              {posts.filter(p => p.category === 'education').map((p) => {
                return <Post key={p.date} date={p.date} image={p.image.fields} title={p.title} />
              })}
            </div>
            <div className={st.appHeaderPara}>
              <h4>香港幼兒教育及服務聯會Blossoms 就職典禮禮儀專題講座</h4>
              <h4>校內受愛戴 校外獲尊敬—理想校長的舉止形象</h4>
            </div>
          </div>
          <div className={classNames(st.homePageSection, st.second)}>
            <ul className={st.ulList}>
              <Fade left duration={500} delay={0}>
                <li>提升個人對禮儀的修為，營造一個良好的禮儀習慣及環境</li>
              </Fade>
              <Fade left duration={500} delay={50}>
                <li>推廣生活及文化禮儀，從小做起</li>
              </Fade>
              <Fade left duration={500} delay={100}>
                <li>普及禮儀文化教育，並推廣民族、家庭、生活、工作、餐桌、外交等禮儀活動。</li>
              </Fade>
              <Fade left duration={500} delay={150}>
                <li>以禮儀為媒體，建立友誼，從而建構更和諧的社會</li>
              </Fade>
            </ul>
          </div>
          <div className={st.appHeaderTextContainer}>
            <h2 className={st.appHeaderText}>商業禮儀培訓</h2>
            <div className={st.posts}>
              {posts.filter(p => p.category === 'business').map((p) => {
                return <Post key={p.date} date={p.date} image={p.image.fields} title={p.title} />
              })}
            </div>

            <div className={st.appHeaderPara}>
              <h4>中銀香港導賞員專業賓客來訪接待禮儀培訓</h4>
            </div>
          </div>
          <div className={classNames(st.homePageSection, st.third)}>
            <div className={st.missionBox}>
              <div className={st.missionBoxTitleContainer}><h3>使命</h3></div>
              <h4>打造100,000家禮儀家
              </h4><h4>打造1000所禮儀學校</h4>
            </div>
          </div>
          <div className={st.appHeaderTextContainer}>
            <h2 className={st.appHeaderText}>傳媒訪問</h2>
            <div className={st.posts}>
              {posts.filter(p => p.category === 'media').map((p) => {
                return <TitledPost key={p.date} date={p.date} image={p.image.fields} title={p.title} />
              })}
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
