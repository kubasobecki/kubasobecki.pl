/* eslint-disable react/jsx-no-comment-textnodes */
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/store/projects-slice";
import ProjectTag from "./ProjectsTag";

export default function ProjectCard({
  date,
  description,
  images,
  name,
  stack,
  tags,
}: Project) {
  return (
    <motion.figure
      layout="position"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="group h-full max-w-full cursor-pointer bg-white drop-shadow-xl transition"
        onClick={() => {
          console.log("Yey!");
        }}
      >
        <div className="relative">
          <img src={images?.main} alt={name} className="" />
          <div className="absolute top-0 flex h-full w-full items-center justify-center bg-myDark/25 opacity-0 transition-opacity after:font-serif after:text-6xl after:text-white after:content-['+'] group-hover:opacity-100"></div>
        </div>
        <h3 className="m-4 inline-block text-xl">{name}</h3>
        {/* <p>{date}</p>
      <p>{stack?.join(" | ")}</p> */}
        {/* <p className="m-0 px-4 py-2 text-xs">{tags?.join(" / ")}</p> */}
        <p className="m-0 px-4 text-xs">
          {tags?.map((text, idx) => (
            <ProjectTag text={text} key={idx} />
          ))}
        </p>
        <p className="m-0 p-4 text-sm">{description}</p>
      </div>
    </motion.figure>
  );
}
