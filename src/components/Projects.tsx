import { Transition } from "@headlessui/react";
import type { RepType } from "../pages";
import GitIcon from "./GitIcon";

const Project = (props: {
  name: string;
  url: string;
  description: string;
  primaryLanguage:
    | {
        __typename?: "Language" | undefined;
        name: string;
        color?: string | null | undefined;
      }
    | null
    | undefined;
  tecs: string[];
  show: boolean;
  index: number;
}) => {

  return (
    <Transition
      style={{ "--delay": `${300 + 50 * props.index}ms` }}
      appear={true}
    show={props.show}
    unmount={false}
    enter={`transition duration-500 delay-[var(--delay)]`}
    enterFrom="opacity-0 translate-y-40"
    enterTo="opacity-100 translate-y-0"
    leave={`transition duration-200`}
    leaveFrom="opacity-100"
    leaveTo="opacity-0 block"
  >
    <div className="flex min-h-md w-full min-w-[20rem] max-w-xs flex-col items-start rounded-xl p-5 transition duration-500 shadow-[0px_0px_25px_15px_rgb(0,0,0,0.1)] bg-[#192133] hover:shadow-pink-300 hover:shadow-[0px_0px_2px_1px_rgb(0,0,0,0.1)] group">
      <div className={"flex w-full flex-row items-center pb-3"}>
        <h2 className={"text-2xl font-medium capitalize text-white transition-all group-hover:text-opacity-0 group-hover:animate-text duration-500 bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300"}>
          {props.name}
        </h2>
        <span className={"flex-grow"} />
        <a href={props.url} target={"_blank"} rel={"noreferrer"}>
        <GitIcon className="h-7 fill-violet-100 hover:fill-gray-300"/>

          </a>
        </div>
        <p className={"text-lg text-gray-200"}>{props.description}</p>
        <span className={"flex-grow"} />
        <div className="bottom-0 flex flex-row gap-5 w-full">
          {props.tecs.map((content) => (
            <p key={content} className={"text-xl text-purple-300"}>
              {content}
            </p>
          ))}
          <span className="flex-grow"/>
        </div>
      </div>
    </Transition>
  );
};

const Projects = (props: {
  show: boolean;
  projects: RepType["repositories"];
}) => {
  return (
    <div
      id="work"
      className={
        "relative z-0 flex h-full flex-col content-start justify-center items-center max-w-page"
      }
    >
      <Transition
        appear={true}
        show={props.show}
        unmount={false}
        enter="transition-opacity duration-300 delay-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0 block"
      >
      </Transition>
      <div
        className={
          " z-0 flex flex-wrap content-start items-center justify-center gap-12 p-10 pt-0"
        }
      >
        {props.projects.map((project, index) => {
          if (!project?.node) return;

          if (project.node.__typename !== "Repository") return;

          const {
            id,
            name,
            url,
            description,
            repositoryTopics,
            primaryLanguage,
          } = project.node;

          return (
            <Project
              key={id}
              name={name.replace("_", " ").replace("-", " ")}
              url={url}
              description={description || name}
              tecs={
                repositoryTopics?.nodes?.map(
                  (node) => node?.topic.name || ""
                ) || []
              }
              primaryLanguage={primaryLanguage}
              show={props.show}
              index={index}
            />
          );
        })}
      </div>
      <Transition
        appear={true}
        show={props.show}
        enter="transition-opacity duration-[400ms] delay-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="pb-12"
      >
        <p className={"text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 animate-text"}>
          Check out my other projects at my github{" "}
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/empdo"
          >
            <GitIcon className="h-10 fill-white hover:fill-gray-300" />
          </a>
        </p>
      </Transition>
    </div>
  );
};

export default Projects;
