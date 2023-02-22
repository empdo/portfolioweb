import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

const Blogs = (props: {
  show: boolean,
  posts: { slug: string, frontmatter: { [key: string]: any } }[]
}
) => {
  return (
    <Transition
      appear={true}
      show={props.show}
      unmount={false}
      as="header"
      enter={`transition duration-500 delay-300`}
      enterFrom="opacity-0 opacity-0"
      enterTo="opacity-100 opacity-100"
      className="flex flex-row flex-wrap h-full w-full justify-center "
    >
      {props.posts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className='max-w-lg max-h-52 w-full m-2 rounded-xl overflow-hidden flex flex-row justify-between items-start hover:shadow-[0px_0px_15px_10px_rgb(0,0,0,0.15)]'
        >
        <Link href={`/post/${slug}`} className="flex flex-col justify-end items-start h-full p-4">
            <p>{frontmatter.date}</p>
            <h1 className='text-2xl font-bold'>{frontmatter.metaTitle}</h1>
        </Link>
        <img className="h-full" src={frontmatter.image} alt="ts"/>


        </div>
      ))}
      <br/>
    </Transition>
  )
}

export default Blogs;
