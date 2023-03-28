/* eslint-disable react/jsx-no-comment-textnodes */
import Image from "next/image";

export default function ProjectSingle({
  date,
  description,
  images,
  name,
  stack,
  tags,
}) {
  return (
    <div>
      <h3>{name}</h3>
      <img src={images.main} alt={name} className="rounded-xl" />
      <p>{date}</p>
      <p>{stack.join(" | ")}</p>
      <p>{tags.join(" | ")}</p>
      <p>{description}</p>
    </div>
  );
}
