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
        "absolute top-0 left-0 flex w-full flex-row items-center justify-end px-10 pt-4"
      }
    >
      <Transition
        appear={true}
        show={!showIcons}
        enter={`transition duration-300`}
        enterFrom="opacity-50 scale-x-0"
        enterTo="opacity-100 scale-x-100"
        leave="transition duration-300"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-50 translate-x-full"
        className={
          "absolute top-0 right-0 flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-slate-900 shadow-2xl"
        }
      >
        <a className={"h-min"} href="#projects">
          <h2 className={"text-3xl font-semibold text-white"}>Projects</h2>
        </a>
        <a className={"h-min"} href="">
          <h2 className={"text-3xl font-semibold text-white"}>Posts</h2>
        </a>
      </Transition>
      <div className="flex w-full flex-row items-center ">
        <h1 className={"pb-2 text-6xl font-medium text-violet-400"}>~</h1>
        <span className={"flex-grow"} />
        <div
          className={
            "ml-8 flex h-min flex-col justify-center justify-self-end hover:cursor-pointer sm:hidden"
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
        <div className={"hidden flex-row items-center sm:flex "}>
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
    </Transition>
  );
};

export default Nav;
