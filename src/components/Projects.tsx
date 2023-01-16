const Project = (props: { name: string, url: string, description: string }) => {

  return (
    <div className="bg-gray-800 flex items-start flex-col p-5 rounded-xl min-w-lg max-w-lg min-h-md">
      <h2 className={"text-white text-3xl font-semibold pb-8"}>{props.name}</h2>
      <p className={"text-2xl text-gray-200"}>{props.description}</p>
      <span className={"flex-grow"} />
      <div className="flex flex-row gap-5 bottom-0">
        <p className={"text-2xl text-gray-400"}>React</p>
        <p className={"text-2xl text-gray-400"}>SQL</p>
        <p className={"text-2xl text-gray-400"}>Something</p>
      </div>
    </div>
  )

}

const Projects = () => {
  return (
    <div className={"min-h-screen gap-12 min-w-screen flex items-center content-center justify-center flex-wrap"} id="projects">
      <Project name="MindGame" url="j" description="some super cool project yeeyee  asdfasdfasdfasdfasdfasdfasdf" />
      <Project name="MindGame" url="j" description="some super cool project yeeyee" />
      <Project name="MindGame" url="j" description="some super cool project yeeyee" />
      <Project name="MindGame" url="j" description="some super cool project yeeyee" />
      <Project name="MindGame" url="j" description="some super cool project yeeyee" />
    </div>
  )
}

export default Projects;
