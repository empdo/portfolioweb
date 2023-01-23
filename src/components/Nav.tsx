import { Transition } from "@headlessui/react";
import { useState } from "react";

const Nav = () => {
  const [showIcons, setShowIcons] = useState(true);
  const [iconAnimationState, setIconAnimationState] = useState("");
  const [linksAnimationState, setLinksAnimationState] = useState("");

  const hamburgerStyle =
    "h-1 w-8 rounded-sm bg-white transition ease transform duration-150 ";

  return (
    <Transition
      appear={true}
      show={true}
      enter={`transition duration-500 delay-300`}
      enterFrom="opacity-0 opacity-0"
      enterTo="opacity-100 opacity-100"
      className={
        "absolute top-0 flex w-full flex-row items-center justify-end px-10 pt-4 left-0"
      }
    >
    <div className="flex-row w-full sm:flex hidden">
        <h1 className={"pb-2 text-6xl font-medium text-violet-400"}>~</h1>
        <span className={"flex-grow"} />
        <div className={"flex flex-row items-center "}>
          <a className={"h-min"} href="#projects">
            <h2 className={"pl-4 text-3xl font-semibold text-white"}>
              Projects
            </h2>
          </a>
          <a className={"h-min"} href="">
            <h2 className={"pl-4 text-3xl font-semibold text-white"}>Posts</h2>
          </a>
        </div>
    </div>
      {!showIcons &&
        <div
          className={
            (iconAnimationState == "" ? "animate-fadein" : iconAnimationState) +
            " flex flex-col justify-center gap-10 absolute top-0 right-0 w-2/3 min-h-screen bg-slate-900 shadow-2xl"
          }
        >
          <a className={"h-min"} href="#projects">
            <h2 className={"pl-4 text-3xl font-semibold text-white"}>
              Projects
            </h2>
          </a>
          <a className={"h-min"} href="">
            <h2 className={"pl-4 text-3xl font-semibold text-white"}>
              Posts
            </h2>
          </a>
        </div>
      }
      <div
        className={
          "sm:hidden flex ml-8 h-min flex-col justify-center hover:cursor-pointer justify-self-end"
        }
        onClick={() => {
          setShowIcons(!showIcons);
        }}
      >
        <span
          className={
            hamburgerStyle + (!showIcons ? " translate-y-3  rotate-45" : "")
          }
        ></span>
        <span
          className={
            "mt-2 " + hamburgerStyle + (!showIcons ? " opacity-0" : "")
          }
        ></span>
        <span
          className={
            "mt-2 " +
            hamburgerStyle +
            (!showIcons ? " -translate-y-3 -rotate-45" : "")
          }
        ></span>
      </div>
    </Transition>
  );

};

export default Nav;
