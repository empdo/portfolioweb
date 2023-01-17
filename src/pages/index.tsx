import { type NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Projects from "../components/Projects";

import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const Home: NextPage = () => {
  return (
    <div className={`${inter.variable} font-sans scroll-smooth`}>
      <Head>
        <title>EE</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"flex-col flex min-h-screen bg-gradient-to-r from-slate-900 to-gray-900"}>
        <section className={"flex flex-col min-h-screen items-center justify-center max-w-page mx-auto"}>
          <Nav />
          <Header />
        </section>
        <section className={"flex flex-col min-h-screen items-center justify-center max-w-page mx-auto"}>
          <Projects />
          </section> 
      </main>
    </div>
  );
};

export default Home;
