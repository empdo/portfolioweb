import { Transition } from "@headlessui/react";
import Animation from "./Animation";

const Header = () => {
  return (
    <Transition
      appear={true}
      show={true}
      as="header"
      enter={`transition duration-500 delay-300`}
      enterFrom="opacity-0 opacity-0"
      enterTo="opacity-100 opacity-100"
        className={
          "mx-auto flex w-full flex-1 max-w-page tablet:flex-row flex-col tablet:items-center items-end tablet:justify-evenly justify-center gap-5 px-10 absolute inset-0"
        }
    >
        <div className={"flex max-w-3xl flex-col"}>
          <h1 className={"pb-4 sm:text-6xl text-4xl font-bold text-white"}>Emil Essung</h1>
          <div>
            <h2 className={"inline pb-2 sm:text-2xl text-xl red font-medium text-white"}>
              Web & Software developer
            </h2>
          </div>
          <p className={"pb-2 sm:text-xl text-lg text-gray-300"}>
            19 year old developer from Gothenburg, Sweden. I have a great
            interest in programming, math/physics and anything *NIX (Linux,
            Unix) related.
          </p>
          <p className={"sm:text-xl text-lg text-violet-400 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 animate-text"}>
            Currently working on a basic{" "}
            <a
              className={"underline"}
              target="_blank"
              rel="noreferrer"
              href="https://github.com/empdo/multiplayergame"
            >
              multiplayer game
            </a>
          </p>
        </div>
        <Animation />
    </Transition>
  );
};

export default Header;
