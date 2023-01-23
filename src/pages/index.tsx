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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export type RepType = InferGetStaticPropsType<typeof getStaticProps>;


const Home: NextPage<RepType> = ({ repositories }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const show = useOnScreen(containerRef);

  return (
    <div className={`${inter.variable} font-sans scroll-smooth `}>
      <Head>
        <title>EE</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"flex-col flex min-h-screen bg-gradient-to-r from-slate-900 to-gray-900 snap-y snap-mandatory"}>
        <section className={"flex flex-col min-h-screen items-center justify-center max-w-page mx-auto snap-center"}>
          <Nav />
          <Header />
        </section>
        <section className={"flex flex-col shrink-0 min-h-screen items-center justify-center max-w-page mx-auto snap-start"}>
          <div ref={containerRef}>
            <Projects show={show} projects={repositories} />
          </div>
        </section>
      </main>
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
