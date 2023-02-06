import { useState } from "react";
import type { RepType } from "../pages";
import Projects from "./Projects";

const Stuff = (props: {
  show: boolean;
  projects: RepType["repositories"];
}) => {

  const [showProjects, setShowProjects] = useState(true);

  const textStyle = "z-0 sm:text-5xl text-4xl font-semibold cursor-pointer transition duration-500 ";

  return (
    <div className="flex flex-col items-center min-h-screen pt-10 gap-12">
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

      {showProjects ?
        (<Projects show={props.show} projects={props.projects} />)
        : 
        (<></>)
      }
    </div>
  )

}

export default Stuff;
