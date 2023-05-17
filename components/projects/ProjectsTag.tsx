import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { setFilter } from "@/store/projects-slice";

export default function ProjectTag({ text }: { text: string }) {
  const filter = useAppSelector((state) => state.projects.filter);
  const dispatch = useAppDispatch();

  return (
    <button
      className={`tag mr-1 mb-1 border border-myDark/10 py-1 px-1 text-myDark transition-colors hover:border-transparent hover:bg-myDark/10`}
      onClick={() => {
        dispatch(setFilter(text));
      }}
    >
      {text}
    </button>
  );
}
