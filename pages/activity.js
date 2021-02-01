
import { fetchEntries } from '@utils/contentfulPosts'
import safeJsonStringify from 'safe-json-stringify';
import Footer from '@components/Footer'
import Post from '@components/Post'
import st from './home.module.scss'
import React from "react";
import Nav from "@components/Nav"
import Head from "@components/Head"
import classNames from 'classnames'

export default function ActivityPage({ courses }) {
  return (
    <div>
      <Head/>

      <main className={st.app}>

        <Nav/>


        <div className={classNames(st.navPadding, st.posts)}>
          {courses.map((p) => {
            return <Post key={p.date} date={p.date} image={p.image.fields} title={p.title} />
          })}
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
  const courses = await data.map((p) => {
    return p.fields
  })

  return {
    props: {
      courses
    },
  }
}



