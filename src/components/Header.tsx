import Animation from "./Animation"

const Header = () => {
  return (
    <div className={"mx-auto px-10 flex flex-row justify-between max-w-page w-full items-center"}>
      <div className={"flex flex-col max-w-3xl"}>
        <h1 className={"pb-4 text-6xl font-bold text-white"}>
          Emil Essung
        </h1>
        <div>
        <h2 className={"pb-2 text-2xl font-medium text-white inline"}>
          Web & Software developer
        </h2>
        </div>
        <p className={"text-xl text-gray-300"}>
          19 year old developer from Gothenburg, Sweden.
          I have a great interest in programming, math/physics
          and anything
          *n.x (Linux, Unix) related.
        </p>
      </div>
      <Animation />
    </div>
  )
}

export default Header;
