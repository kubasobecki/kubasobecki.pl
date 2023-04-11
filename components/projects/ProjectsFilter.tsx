import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { setFilter } from "@/store/projects-slice";

export default function ProjectsFilter({ projects }) {
  const filter = useAppSelector((state) => state.projects.filter);
  const dispatch = useAppDispatch();
  // console.log(projects);
  const tags = Array.from(
    new Set(projects.reduce((acc, proj) => acc.concat(...proj.tags), []))
  ).sort();

  useEffect(() => {
    // console.log(filter);
  });

  return (
    <div className="my-8 flex justify-center space-x-2">
      <button
        key="all"
        className="rounded-lg bg-myDark py-2 px-4 text-sm text-white duration-200 hover:bg-myLime hover:text-myDark"
        onClick={() => {
          dispatch(setFilter(""));
        }}
      >
        All
      </button>
      {tags.map((tag, index) => (
        <button
          key={index}
          className="rounded-lg bg-myDark py-2 px-4 text-sm text-white duration-200 hover:bg-myLime hover:text-myDark"
          onClick={() => {
            // console.log(tag);
            dispatch(setFilter(tag));
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
