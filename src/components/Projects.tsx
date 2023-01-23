import { Transition } from "@headlessui/react";
import type { RepType } from "../pages";

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

  console.log(props.primaryLanguage);

  return (
    <Transition
      style={{ "--delay": `${300 + 50 * props.index}ms` }}
      appear={true}
      show={props.show}
      enter={`transition duration-500 delay-[var(--delay)]`}
      enterFrom="opacity-0 translate-y-40"
      enterTo="opacity-100 translate-y-0"
      leave={`transition duration-200`}
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex min-h-md w-full min-w-[20rem] max-w-xs flex-col items-start rounded-xl bg-gradient-to-r from-slate-800 via-gray-800 to-[#3e0652] bg-200% p-5 shadow-2xl hover:animate-scrollbg ">
        <div className={"flex w-full flex-row items-center pb-3"}>
          <h2 className={"text-2xl font-medium capitalize text-white"}>
            {props.name}
          </h2>
          <span className={"flex-grow"} />
          <a href={props.url} target={"_blank"} rel={"noreferrer"}>
            <svg
              className={"h-7 fill-violet-100 hover:fill-violet-300"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
          </a>
        </div>
        <p className={"text-lg text-gray-200"}>{props.description}</p>
        <span className={"flex-grow"} />
        <div className="bottom-0 flex flex-row gap-5 w-full">
          {props.tecs.map((content) => (
            <p key={content} className={"text-xl text-violet-300"}>
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
      className={
        "relative z-0 flex min-h-screen flex-col content-start items-center"
      }
    >
      <Transition
        appear={true}
        show={props.show}
        enter="transition-opacity duration-300 delay-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <h1
          className={"z-0 pb-12 text-5xl font-semibold text-gray-300"}
          id="projects"
        >
          My projects
        </h1>
      </Transition>
      <div
        className={
          " z-0  flex flex-wrap content-start items-center justify-center gap-12 p-10 pt-0"
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
      >
        <p className={"text-xl text-violet-400"}>
          Check out my other projects at{" "}
          <a
            className={"underline"}
            target="_blank"
            rel="noreferrer"
            href="https://github.com/empdo/multiplayergame"
          >
            my github
          </a>
        </p>
      </Transition>
    </div>
  );
};

export default Projects;
