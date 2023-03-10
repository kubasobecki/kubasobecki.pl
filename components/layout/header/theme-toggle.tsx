import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { themeActions } from "@/store/theme-slice";
import { CgDarkMode } from "react-icons/cg";

export default function ThemeToggle() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  function themeChangeHandler() {
    const newTheme = theme === "light" ? "dark" : "light";

    dispatch(themeActions.setDarkMode(newTheme));
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  useEffect(() => {
    // Get current theme from localStorage
    const theme = localStorage.getItem("theme");
    if (theme) dispatch(themeActions.setDarkMode(theme));
    if (theme === "dark") document.documentElement.classList.add("dark");
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
