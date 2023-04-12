/* eslint-disable react/jsx-no-comment-textnodes */
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectSingle({
  date,
  description,
  images,
  name,
  stack,
  tags,
}) {
  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <h3 className="text-xl">{name}</h3>
      <img src={images.main} alt={name} className="rounded-xl" />
      <p>{date}</p>
      <p>{stack.join(" | ")}</p>
      <p>{tags.join(" | ")}</p>
      <p>{description}</p>
    </motion.div>
  );
}
