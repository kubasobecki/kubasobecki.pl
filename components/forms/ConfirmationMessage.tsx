import { useEffect, useRef } from "react";

export default function ConfirmationMessage({ status, timeout }) {
  const ref = useRef();

  const classes = `mt-2 px-6 py-3 text-center duration-1000 opacity-0 ${
    status?.ok ? "bg-myLime font-bold text-myDark" : "bg-red-500 text-white"
  }`;

  useEffect(() => {
    if (status) {
      ref.current.classList.add("opacity-100");

      setTimeout(() => {
        ref.current.classList.remove("opacity-100");
      }, timeout);
    }
  }, [status]);

  return (
    <div className={classes} ref={ref}>
      <span>{status?.message}</span>
    </div>
  );
}
