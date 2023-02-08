import { InferGetStaticPropsType, type NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Projects from "../components/Projects";
import { useRef } from "react";
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import useOnScreen from '../components/useOnScreen';

import { Inter } from '@next/font/google'
import getClient from "../api";
import { Transition } from "@headlessui/react";
import Stuff from "../components/Stuff";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export type RepType = InferGetStaticPropsType<typeof getStaticProps>;


const Home: NextPage<RepType> = ({ repositories }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const show = useOnScreen(containerRef);

  return (
    <div className={`${inter.variable} font-sans scroll-smooth overflow-hidden`}>
      <Head>
        <title>EE</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"flex-col flex flex-none min-h-screen bg-gradient-to-r from-slate-900 to-gray-900 snap-y overflow-auto snap-proximity"}>
        <div className={"flex flex-col h-screen relative snap-center shrink-0"}>
          <Nav />
          <Header />
        </div>
        <section className={"flex flex-col shrink-0 w-full min-h-screen items-center justify-center snap-center"}>
          <div ref={containerRef}>
           <Stuff show={show} projects={repositories} />
          </div>
        </section>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const client = getClient();

  const { user } = await client.getRepositories({ username: "empdo" });

  const repositories = user?.pinnedItems.edges || [];

  return {
    props: {
      repositories
    }
  }
}

export default Home;
