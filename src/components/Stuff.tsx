import { Transition } from "@headlessui/react";
import { useState } from "react";
import type { RepType } from "../pages";
import Blogs from "./Blogs";
import Projects from "./Projects";

const Stuff = (props: {
  show: boolean;
  projects: RepType["repositories"];
  posts: {slug: string, frontmatter: {[key: string]: any}}[]
}) => {

  const [showProjects, setShowProjects] = useState(true);

  const textStyle = "z-0 sm:text-5xl text-4xl font-semibold cursor-pointer transition duration-500 ";

  return (
    <div className="flex flex-col items-center min-h-screen pt-10 gap-12"
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
      <div className="flex sm:gap-8 gap-2 items-center justify-baseline">
        <h1
          className={
            textStyle
            + (showProjects ? "underline text-gray-300" : "text-gray-500")
            } 
          onClick={() => {setShowProjects(true)}}
          id="projects"
        >
          Projects
        </h1>
        <h1
          className={
            textStyle
            + (!showProjects ? "underline text-gray-300" : "text-gray-500")
            } 
            onClick={() => {setShowProjects(false)}}
        >
          Blogs
        </h1>
      </div>
      </Transition>

      {showProjects ?
        (<Projects show={props.show} projects={props.projects} />)
        : 
        (<Blogs posts={props.posts}/>)
      }
    </div>
  )

}

export default Stuff;
