import { Transition } from "@headlessui/react";
import Animation from "./Animation";

const Header = () => {
  return (
    <Transition
      appear={true}
      show={true}
      enter={`transition duration-500 delay-300`}
      enterFrom="opacity-0 opacity-0"
      enterTo="opacity-100 opacity-100"
    >
      <div
        className={
          "mx-auto flex w-full max-w-page flex-row items-center justify-between px-10"
        }
      >
        <div className={"flex max-w-3xl flex-col"}>
          <h1 className={"pb-4 text-6xl font-bold text-white"}>Emil Essung</h1>
          <div>
            <h2 className={"inline pb-2 text-2xl font-medium text-white"}>
              Web & Software developer
            </h2>
          </div>
          <p className={"pb-2 text-xl text-gray-300"}>
            19 year old developer from Gothenburg, Sweden. I have a great
            interest in programming, math/physics and anything *n.x (Linux,
            Unix) related.
          </p>
          <p className={"text-xl text-violet-400"}>
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
      </div>
    </Transition>
  );
};

export default Header;
