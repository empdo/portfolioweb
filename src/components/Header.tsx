import Animation from "./Animation";

const Header = () => {
  return (
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
        <p className={"text-xl pb-2 text-gray-300"}>
          19 year old developer from Gothenburg, Sweden. I have a great interest
          in programming, math/physics and anything *n.x (Linux, Unix) related.
        </p>
        <p className={"text-xl text-violet-400"}>
          Currently working on a basic{" "}
          <a
            className={"underline"}
            target="_blank"
            href="https://github.com/empdo/multiplayergame"
          >
            multiplayer game
          </a>
        </p>
      </div>
      <Animation />
    </div>
  );
};

export default Header;
