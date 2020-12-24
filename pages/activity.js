import Head from 'next/head'
import { fetchEntries } from '@utils/contentfulPosts'
import safeJsonStringify from 'safe-json-stringify';
import Footer from '@components/Footer'
import Post from '@components/Post'
import st from './test.module.scss'
import React from "react";
import Nav from "@components/Nav"

export default function ActivityPage({ courses }) {
  return (
    <div>
      <Head>
        <title>AEEA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={st.app}>

        <Nav/>

        <div>
        </div>
        <div className={st.posts}>
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



