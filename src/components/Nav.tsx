import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import GitIcon from "./GitIcon";
import LinkedInIcon from "./LinkedInIcon";

const Nav = () => {
  const [showIcons, setShowIcons] = useState(true);

  const hamburgerStyle =
    "h-1 w-8 rounded-sm bg-white transition ease transform duration-150 ";

  useEffect(() => {
    const onScroll = () =>  !showIcons && setShowIcons(!showIcons);
    
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [showIcons]);

  return (
    <Transition
      appear={true}
      show={true}
      as="nav"
      enter={`transition duration-500 delay-300`}
      enterFrom="opacity-0 opacity-0"
      enterTo="opacity-100 opacity-100"
      className={
        "flex w-full flex-row items-center justify-end px-10 pt-4 justify-self-start z-10"
      }
    >
      <Transition
        appear={true}
        show={!showIcons}
        enter={`transition duration-300`}
        enterFrom="opacity-50 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition duration-300"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-50 translate-x-full"
        className={
          "fixed top-0 right-0 flex min-h-screen w-2/3 flex-col items-center justify-center gap-10 bg-slate-900 shadow-2xl overflow-hidden"
        }
      >
        <a className={"h-min"} href="#projects">
          <img src="./github.svg" alt="git_icon"/>
        </a>
        <a className={"h-min"} href="">
          <h2 className={"text-3xl font-semibold text-white"}>Work</h2>
        </a>
      </Transition>
      <div className="flex w-full flex-row items-center ">
      <a href="/">
        <h1 className={"pb-2 text-6xl font-medium text-violet-400 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 animate-text"}>~</h1>
        </a>
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
        <div className={"hidden flex-row gap-6 items-end sm:flex "}>
          <a className={"h-min"} href="#work">
            <h2 className={"text-4xl font-bold text-white"}>Work</h2>
          </a>
          <a className={"cursor-pointer "} href="https://github.com/empdo">
            <LinkedInIcon className="h-10 fill-white hover:fill-gray-300"/>
          </a>
          <a className={"cursor-pointer "} href="https://github.com/empdo">
            <GitIcon className="h-10 fill-white hover:fill-gray-300" />
          </a>

        </div>
      </div>
    </Transition>
  );
};

export default Nav;
