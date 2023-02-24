import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import type { Post, RepType } from "../pages";
import Blogs from "./Blogs";
import Projects from "./Projects";
import { useRouter } from 'next/router'

const Stuff = (props: {
  show: boolean;
  projects: RepType["repositories"];
  posts: { slug: string, frontmatter: Post}[];
}) => {

  const router = useRouter()
  let key;

  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    key = router.query.key; 
    setShowProjects(key === "blog");
  }, [router.query]);

  const textStyle = "z-0 sm:text-5xl text-4xl font-semibold cursor-pointer transition duration-500 ";

  return (
    <div className="flex flex-col items-center pt-10 gap-12 min-h-screen"
      id="work"
    >
      <Transition
        appear={true}
        show={props.show}
        unmount={false}
        enter="transition-opacity duration-1000 delay-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 block"
      >
      <div className="flex sm:gap-8 gap-4 items-center justify-baseline">
        <h1
          className={
            textStyle
            + (!showProjects ? "underline text-gray-300" : "text-gray-500")
            } 
          onClick={() => {setShowProjects(false)}}
          id="projects"
        >
          Projects
        </h1>
        <h1
          className={
            textStyle
            + (showProjects ? "underline text-gray-300" : "text-gray-500")
            } 
            onClick={() => {setShowProjects(true)}}
        >
          Blogs
        </h1>
      </div>
      </Transition>

      {showProjects ?
        (<Blogs show={props.show} posts={props.posts}/>)
        : 
        (<Projects show={props.show} projects={props.projects} />)
      }
    </div>
  )

}

export default Stuff;
