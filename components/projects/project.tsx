import Image from "next/image";

export default function Project({
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
      <img src={images.main} alt={name} />
      <p>{date}</p>
      <p>{stack.join(" | ")}</p>
      <p>{tags.join(" | ")}</p>
      <p>{description}</p>
    </div>
  );
}
