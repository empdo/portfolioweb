import { Transition } from "@headlessui/react";
import Image from "next/image";

const Blogs = () => {
  return (
    <Transition
      appear={true}
      show={true}
      as="header"
      enter={`transition duration-500 delay-300`}
      enterFrom="opacity-0 opacity-0"
      enterTo="opacity-100 opacity-100"
    >
  <div className="flex flex-col items-center">
    <Image width="420" height="420" src="/portfolioanim.gif" alt="typing gif" className="pb-6"/>
    <h1 className="text-white text-4xl font-semibold pb-12">
      Working on it...
    </h1>
  </div>
  </Transition>
  )
}

export default Blogs;
