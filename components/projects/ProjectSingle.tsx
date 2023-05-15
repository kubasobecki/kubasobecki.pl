/* eslint-disable react/jsx-no-comment-textnodes */
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/store/projects-slice";
import ProjectTag from "./ProjectsTag";

export default function ProjectSingle({
  date,
  description,
  images,
  name,
  stack,
  tags,
}: Project) {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.25 }}
    >
      <div className="bg-white drop-shadow-xl">
        <img src={images?.main} alt={name} className="" />
        <h3 className="m-0 p-4 text-xl">{name}</h3>
        {/* <p>{date}</p>
      <p>{stack?.join(" | ")}</p> */}
        {/* <p className="m-0 px-4 py-2 text-xs">{tags?.join(" / ")}</p> */}
        <p className="m-0 space-x-1 px-4  text-xs">
          {tags?.map((text, idx) => (
            <ProjectTag text={text} color={null} key={idx} />
          ))}
        </p>
        <p className="m-0 p-4 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
