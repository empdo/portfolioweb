import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Animation from "../components/Animation";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"bg-background flex h-screen"}>
        <Nav/>
        <Animation/> 
      </main>
    </>
  );
};


export default Home;
