import { useEffect } from "react";

export default function ProjectsFilter({ projects }) {
  // console.log(projects);
  const tags = Array.from(
    new Set(projects.reduce((acc, proj) => acc.concat(...proj.tags), []))
  );
  console.log(tags);
  // const tags = new Set()

  useEffect(() => {
    //
  }, []);

  return (
    <div className="flex justify-center space-x-2">
      {tags.map((tag, index) => (
        <button
          key={index}
          className="rounded-lg bg-myDark py-2 px-4 text-sm text-white duration-200 hover:bg-myLime hover:text-myDark"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
