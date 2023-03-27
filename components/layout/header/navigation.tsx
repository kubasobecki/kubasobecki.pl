import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/utilities/hooks";
import { navOpenToggle } from "@/store/nav-slice";

const links = [
  { label: "Hello", url: "/" },
  { label: "Projects", url: "/projects" },
  { label: "Blog", url: "/blog" },
  { label: "Lab", url: "/lab" },
  { label: "Contact", url: "/contact" },
];

export default function Navigation() {
  const router = useRouter();
  const { isNavOpen } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  function navOpenHandler() {
    dispatch(navOpenToggle());
  }

  useEffect(() => {
    if (isNavOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [isNavOpen]);

  return (
    <>
      {/* Hamburger Menu */}
      <div
        className="absolute right-8 h-[28px] w-[32px] cursor-pointer justify-between md:hidden"
        onClick={navOpenHandler}
      >
        <div
          className={`absolute h-[4px] w-[32px] origin-center rounded-full bg-myDark transition-transform duration-200 ease-in-out dark:bg-white/90 ${
            isNavOpen ? "translate-y-[12px] -rotate-45 transform" : ""
          }`}
        ></div>
        <div
          className={`absolute h-[4px] w-[32px] translate-y-[12px] rounded-full bg-myDark transition-[opacity,transform] duration-200 ease-in-out dark:bg-white/90 ${
            isNavOpen ? "translate-x-[32px] opacity-0" : ""
          }`}
        ></div>
        <div
          className={`absolute h-[4px] w-[32px] origin-center rounded-full bg-myDark transition-transform duration-200 ease-in-out dark:bg-white/90 ${
            isNavOpen
              ? "translate-y-[12px] rotate-45 transform"
              : "translate-y-[24px]"
          }`}
        ></div>
      </div>
      {/* Mobile Nav */}
      <nav
        className={`text-dark absolute inset-0 -z-10 flex h-[100svh] w-full flex-col justify-center border-t bg-gradient-to-b from-white to-white/90 font-sans text-3xl transition-transform duration-200 ease-in-out dark:border-t-myDark dark:from-myDark dark:to-myDark/90 dark:text-white md:hidden ${
          isNavOpen
            ? "translate-x-0 scale-x-100"
            : "translate-x-[100vw] scale-x-0 md:scale-x-100"
        }`}
      >
        {links.map((link) => {
          const isCurrentPage = router.route === link.url;
          return (
            <Link
              key={link.label}
              onClick={isCurrentPage ? undefined : navOpenHandler}
              className={`group relative flex w-full items-center justify-center py-4 px-8 uppercase hover:text-myDark dark:duration-200 ${
                isCurrentPage
                  ? "cursor-default text-myDark/50 hover:text-myDark/50 dark:text-white/50 dark:hover:text-white/50"
                  : ""
              }`}
              href={link.url}
            >
              {link.label}
              <div
                className={`left absolute left-0 -z-10 ml-[10%] h-full w-[80%] origin-left skew-x-[-12.25deg] scale-x-0 bg-gradient-to-tr from-myLime to-myLime/75 duration-300 ${
                  isCurrentPage ? "" : "group-hover:scale-x-100"
                }`}
              ></div>
            </Link>
          );
        })}
      </nav>
      {/* Desktop Nav */}
      <nav
        className={`text-dark mr-4 ml-auto hidden h-10 w-auto justify-center border-t border-none bg-none font-sans text-base dark:text-white md:flex`}
      >
        {links.map((link) => {
          const isCurrentPage = router.route === link.url;

          return (
            <Link
              key={link.label}
              onClick={isCurrentPage ? undefined : navOpenHandler}
              className={`group relative flex w-full items-center justify-center p-4 uppercase hover:text-myDark dark:duration-200 ${
                isCurrentPage
                  ? "cursor-default text-myDark/50 hover:text-myDark/50 dark:text-white/50 dark:hover:text-white/50"
                  : ""
              }`}
              href={link.url}
            >
              {link.label}
              <div
                className={`absolute left-0 -z-10 ml-0 h-full w-full origin-left skew-x-[-12.25deg] scale-x-0 bg-gradient-to-tr from-myLime to-myLime/75 duration-200 ${
                  isCurrentPage ? "" : "group-hover:scale-x-100"
                }`}
              ></div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
