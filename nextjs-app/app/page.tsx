import Image from 'next/image'
import Head from 'next/head'
import { NextPage } from 'next'
import homeStyles from './home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Jihoon Kim</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Kim Introduction]</p>
      </section>

      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>

        </ul>
      </section>
    </div>
  )
}

export default Home