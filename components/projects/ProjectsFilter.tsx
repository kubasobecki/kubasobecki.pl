import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { setFilter } from "@/store/projects-slice";

export default function ProjectsFilter({ projects }) {
  const filter = useAppSelector((state) => state.projects.filter);
  const dispatch = useAppDispatch();

  const tags = useMemo(
    () =>
      Array.from(
        new Set(projects.reduce((acc, proj) => acc.concat(...proj.tags), []))
      ).sort(),
    [projects]
  );

  return (
    <div className="my-8 flex justify-center space-x-2">
      <button
        key="all"
        disabled={filter === ""}
        className="rounded-lg bg-myDark py-2 px-4 text-sm text-white duration-200 hover:bg-myLime hover:font-bold hover:text-myDark disabled:bg-myLime disabled:font-bold disabled:text-myDark"
        onClick={() => {
          dispatch(setFilter(""));
        }}
      >
        All
      </button>
      {tags.map((tag, index) => (
        <button
          key={index}
          disabled={tag === filter}
          className="rounded-lg bg-myDark py-2 px-4 text-sm text-white duration-200 hover:bg-myLime hover:font-bold hover:text-myDark disabled:bg-myLime disabled:font-bold disabled:text-myDark"
          onClick={() => {
            dispatch(setFilter(tag));
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
