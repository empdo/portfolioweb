import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Nav from "../components/Nav";
import Header from "../components/Header";
import { useRef } from "react";
import useOnScreen from '../components/useOnScreen';

import { Inter } from '@next/font/google'
import getClient from "../api";
import Stuff from "../components/Stuff";
import Fotter from "../components/Fotter";

import matter, { GrayMatterFile } from 'gray-matter';
import fs from 'fs';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export type RepType = InferGetStaticPropsType<typeof getStaticProps>;


const Home: NextPage<RepType> = ({ repositories, posts }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const show = useOnScreen(containerRef);

  return (
    <div className={`${inter.variable} font-sans scroll-smooth overflow-hidden`}>
      <Head>
        <title>Essung</title>
        <meta name="description" content="Emil Essung portfolio" />
      </Head>
      <div className={"flex-col flex flex-none min-h-screen  snap-y overflow-auto snap-mandatory"}>
        <div className={"flex flex-col h-screen relative snap-center shrink-0"}>
          <Nav />
          <Header />
        </div>
        <div className={"flex flex-col shrink-0 w-full min-h-screen items-center justify-center snap-start"}>
          <div ref={containerRef}>
            <Stuff show={show || typeof window !== 'undefined' && window.innerWidth < 500} projects={repositories} posts={posts} />
          </div>
        </div>
        <Fotter />
      </div>
    </div>
  );
};

export type Post = {
  date: string,
  image: string,
  title: string,
  metaTitle: string,
  description: string,
}


export function convertMatterData(data: GrayMatterFile<string>['data']): Post {
  return {
    title: data.title as string || '',
    metaTitle: data.metaTitle as string || '',
    date: data.date as string || '',
    image: data.image as string || '',
    description: data.description as string || '',
  };
}

export const getStaticProps = async () => {
  const client = getClient();
  const { user } = await client.getRepositories({ username: "empdo" });
  const repositories = user?.pinnedItems.edges || [];

  const files = fs.readdirSync('posts');

  const posts = files.map((fileName) => {
    const slug = fileName.replace('.mdx', '');
    const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data } = matter(readFile);

    const frontmatter = convertMatterData(data);

    
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      repositories,
      posts,
    }
  }
}

export default Home;
