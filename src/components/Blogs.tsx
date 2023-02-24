import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../pages";

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
      className="flex flex-row flex-wrap h-full w-full justify-center "
    >
      {posts.map(({ slug, frontmatter }) => (
        <Link 
          href={`/post/${slug}`}
          key={slug}
          className='max-w-lg max-h-52 w-full m-2 rounded-xl overflow-hidden flex flex-row justify-between items-start hover:bg-slate-800'
        >
          <div className="flex flex-col justify-end items-start h-full p-4">
            <p className="text-gray-400 font-semibold">{frontmatter.date}</p>
            <h1 className='text-2xl font-bold'>{frontmatter.metaTitle}</h1>
            <p className="text-gray-200 font-semibold pt-1">{frontmatter.description}</p>
          </div>
          <img className="h-full relative w-full sm:inline hidden" src={frontmatter.image} alt="ts" />

        </Link>
      ))}
    </Transition>
  )
}

export default Blogs;
