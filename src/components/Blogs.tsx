import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "../pages";

const Blogs = (props: {
  show: boolean,
  posts: { slug: string, frontmatter: Post}[]
}
) => {

  const posts = props.posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return (
    <Transition
      appear={true}
      show={props.show}
      unmount={false}
      as="header"
      enter="transition-opacity duration-1000 delay-300"
      enterFrom="opacity-0 opacity-0"
      enterTo="opacity-100 opacity-100"
      className="flex flex-row flex-wrap h-full w-full justify-center flex-col "
    >
      {posts.map(({ slug, frontmatter }) => (
        <Link 
          href={`/post/${slug}`}
          key={slug}
          className='max-w-2xl max-h-max sm:min-h-[13em] w-full m-4 rounded-xl overflow-hidden flex flex-row justify-between items-start hover:bg-slate-800'
        >
          <div className="flex flex-col justify-end items-start h-full p-4 flex-[4]">
            <p className="text-gray-400 font-semibold">{frontmatter.date}</p>
            <h1 className='text-2xl font-bold'>{frontmatter.metaTitle}</h1>
            <p className="text-gray-200 font-semibold pt-1">{frontmatter.description}</p>
          </div>
          <div className="h-full w-full relative sm:inline hidden flex-[3] min-h-[13em]">
            <Image style={{"objectFit": "cover"}} fill={true} src={frontmatter.image} alt="ts" />
          </div>

        </Link>
      ))}
    </Transition>
  )
}

export default Blogs;
