import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CgDarkMode } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { themeActions } from "@/store/theme-slice";
import { navOpenActions } from "@/store/navopen-slice";

const links = [
  { label: "Hello", url: "/" },
  { label: "Projects", url: "/projects" },
  { label: "Blog", url: "/blog" },
  { label: "Lab", url: "/lab" },
  { label: "Contact", url: "/contact" },
];

export default function Header() {
  const router = useRouter();

  const { theme, isNavOpen } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  function navOpenHandler() {
    dispatch(navOpenActions.navOpenToggle());
  }

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
    <header className="fixed w-full">
      {/* Wrapper */}
      <div className="relative inset-x-0 flex h-16 w-full items-center justify-between bg-white px-8 text-indigo-800 shadow-lg dark:bg-navy dark:text-indigo-100 md:justify-between">
        {/* Logo */}
        <Link href="/" className="logo">
          <svg viewBox="0 0 384 512" className="h-[48px] w-[36px]">
            <path
              fill="#FF0080"
              d="m0 32 96 96v12.686c0 7.127-8.617 10.697-13.657 5.657l-72.97-72.97A32 32 0 0 1 0 50.745V32zm374.358 97.641L252.017 251.983c-6.637 6.637-17.397 6.637-24.034 0L192 216l-3.983 3.983c-6.637 6.637-6.637 17.397 0 24.034l39.966 39.966c6.637 6.637 17.397 6.637 24.034 0l126.971-126.972c8.776-8.775 5.26-22.648-4.63-27.37z"
            />
            <path
              fill="#0FF"
              d="M96 16v16H0V16C0 7.163 7.163 0 16 0h64c8.836 0 16 7.163 16 16zm197.255 112h73.717c2.73 0 5.21.602 7.386 1.641l4.63-4.63C389.694 114.305 382.112 96 366.972 96h-73.717a32 32 0 0 0-22.628 9.373l-82.61 82.61c-6.637 6.637-6.637 17.397 0 24.034L192 216l78.627-78.627A32 32 0 0 1 293.254 128z"
            />
            <path
              fill={theme === "dark" ? "#e0e7ff" : "navy"}
              d="M0 32h96v96L0 32zm252.017 219.983 122.341-122.342c-2.176-1.038-4.656-1.641-7.386-1.641h-73.717a32 32 0 0 0-22.628 9.373L192 216l35.983 35.983c6.637 6.637 17.397 6.637 24.034 0zm126.971 231.006L163.313 267.313c-6.248-6.248-16.379-6.248-22.627 0L96 312v-98.745a32 32 0 0 0-9.373-22.628l-72.97-72.97C8.616 112.617 0 116.187 0 123.313v371.658c0 15.141 18.305 22.723 29.011 12.018L152 383.999l118.627 118.628A32 32 0 0 0 293.254 512h73.717c15.141 0 22.724-18.306 12.017-29.011z"
            />
          </svg>
        </Link>
        {/* Hamburger Menu */}
        <div
          className="absolute right-8 h-[28px] w-[32px] cursor-pointer justify-between md:hidden"
          onClick={navOpenHandler}
        >
          <div
            className={`absolute h-[4px] w-[32px] origin-center rounded bg-navy transition-transform duration-300 ease-in-out dark:bg-indigo-100 ${
              isNavOpen ? "translate-y-[12px] rotate-45 transform" : ""
            }`}
          ></div>
          <div
            className={`absolute h-[4px] w-[32px] translate-y-[12px] rounded bg-navy transition-[opacity,transform] duration-300 ease-in-out dark:bg-indigo-100 ${
              isNavOpen ? "translate-x-[-32px] opacity-0" : ""
            }`}
          ></div>
          <div
            className={`absolute h-[4px] w-[32px] origin-center rounded bg-navy transition-transform duration-300 ease-in-out dark:bg-indigo-100 ${
              isNavOpen
                ? "translate-y-[12px] -rotate-45 transform"
                : "translate-y-[24px]"
            }`}
          ></div>
        </div>
        {/* Menu */}
        <nav
          className={`absolute top-16 right-0 -z-10 flex w-48 flex-col items-end border-t bg-gradient-to-r from-white/80 to-white font-bold text-navy shadow-xl duration-300 ease-in-out dark:border-t-navy dark:from-navy/80 dark:to-navy dark:text-indigo-100 md:static md:z-0 md:mr-4 md:ml-auto md:w-auto md:translate-y-0 md:flex-row md:items-center md:border-none md:bg-none md:shadow-none ${
            isNavOpen ? "translate-y-0" : "-translate-y-72"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              className={`group w-full py-2 px-8 text-right uppercase duration-200 hover:bg-navy hover:text-white dark:hover:bg-transparent dark:hover:text-cyanBright md:px-4 md:hover:bg-transparent dark:md:text-white ${
                router.route === link.url
                  ? "cursor-default text-magentaBright md:hover:text-magentaBright dark:md:text-cyanBright"
                  : "md:hover:text-navy dark:md:hover:text-white"
              }`}
              href={link.url}
            >
              {link.label}
              <div
                className={`-mb-1 hidden h-1 w-0 rounded bg-magentaBright duration-200  md:block ${
                  router.route === link.url ? "" : "group-hover:w-full"
                }`}
              ></div>
            </Link>
          ))}
        </nav>
        {/* Dark Mode Toggle */}
        <div
          className="absolute right-20 cursor-pointer justify-between md:static md:right-8"
          onClick={themeChangeHandler}
        >
          <CgDarkMode size="32" />
        </div>
      </div>
    </header>
  );
}
