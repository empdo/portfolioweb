import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

const Blogs = (props: {
  posts: { slug: string, frontmatter: { [key: string]: any } }[]
}
) => {
  return (
    <Transition
      appear={true}
      show={true}
      as="header"
      enter={`transition duration-500 delay-300`}
      enterFrom="opacity-0 opacity-0"
      enterTo="opacity-100 opacity-100"
      className="flex flex-row"
    >
      <Image width="420" height="420" src="/portfolioanim.gif" alt="typing gif" className="pb-6" />
      {props.posts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className='border max-w-xs border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col'
        >
          <Link href={`/post/${slug}`}>
            <h1 className='p-4 text-2xl font-bold'>{frontmatter.title}</h1>
          </Link>
        </div>
      ))}
    </Transition>
  )
}

export default Blogs;
