import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/utilities/hooks";
import { setTheme } from "@/store/theme-slice";
import { CgDarkMode } from "react-icons/cg";

export default function ThemeToggle() {
  const { theme } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  function themeChangeHandler() {
    const newTheme = theme === "light" ? "dark" : "light";

    dispatch(setTheme(newTheme));
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.removeAttribute("class");
  }

  useEffect(() => {
    // Get current theme from localStorage
    const localTheme = localStorage.getItem("theme");
    if (localTheme) dispatch(setTheme(localTheme));
    if (localTheme === "dark") document.documentElement.classList.add("dark");
  }, [dispatch]);

  return (
    <div
      className="absolute right-20 cursor-pointer justify-between md:static md:right-8"
      onClick={themeChangeHandler}
    >
      <CgDarkMode size="32" />
    </div>
  );
}
