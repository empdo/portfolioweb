import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring';
import BackArrow from "../../components/BackArrow";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import { useInView } from "react-intersection-observer";
import { useScrollSpy } from '../../components/scrollSpy';
import { convertMatterData, Post } from '..';

export function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.mdx', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

interface IParams extends ParsedUrlQuery {
  slug: string,
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;

  const fileName = fs.readFileSync(`posts/${slug}.mdx`, 'utf-8');
  const { data, content } = matter(fileName);
  const frontmatter = convertMatterData(data);
  const mdxSource = await serialize(content, 
    {
      mdxOptions: 
      {
        remarkPlugins: [remarkGfm], 
        rehypePlugins: [rehypeHighlight], 
      }
    }, 
  );

  return {
    props: {
      frontmatter,
      mdxSource,
    },
  };
}

const Page : NextPage<{frontmatter: Post, 
mdxSource:  MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>}> 
= ({ frontmatter, mdxSource }) => {

  const contentRef = useRef<HTMLDivElement | null>(null);
  let content: HTMLDivElement | null;

  const [toc, setToc] = useState<{ id: string, title: string, depth: number }[]>([]);

  const activeId = useScrollSpy(
    toc.map(({ id }) => id),
    { rootMargin: "0px 0px -100% 0px" }
  );

  useEffect(() => {
    content = contentRef.current;

    if (content) {
      const children = [...content.children];
      const anchors = children.filter(child =>
        ['h1', 'h2'].includes(child.localName)
      ).map(child => {
        return {
          id: child.id,
          title: child.innerHTML,
          depth: parseInt(child.localName.replace('h', ''), 0),
        }
      });

      setToc(anchors);

    }
  }, [contentRef]);

  return (
    <div className='flex flex-col items-start sm:mx-auto mx-4 max-w-screen-sm'>
      <div className='flex flex-row items-center mt-10 mb-8'>
      <Link href="/?key=blog#work" className="flex align-center">
        <BackArrow className="h-8 mr-6 fill-white inline" />
        <p className='inline text-2xl font-semibold'>Back to blog posts</p>
        </Link>
      </div>

        <div className='2xl:fixed block h-full top-0 bottom-0 left-12 pb-4'>
        <ol className='list-inside list-decimal justify-center flex flex-col align-center h-full'>
        <h1 className='text-xl mb-3 font-bold '>Table of content</h1>
          {
            toc.map((content, index) =>
              <li className={'max-w-xs pb-4 ' + 
              (content.id === activeId ? 'text-purple-300 marker:text-purple-300' : '')}
              key={index}>
                <Link href={"#" + content.id}>
                <p className={'inline font-semibold '}>{content.title}</p>
                </Link>
              </li>
            )
          }
      </ol>
        </div>

      <div className='prose prose-invert pb-12 w-full' ref={contentRef}>
        <h1 id="titleid">{frontmatter.title}</h1>
        <MDXRemote {...mdxSource} />
      </div>
    </div>
  );
}

export default Page;
