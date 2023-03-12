import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/utilities/hooks";
import { navOpenToggle } from "@/store/navopen-slice";
import Link from "next/link";
import { useEffect } from "react";

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
    else document.body.removeAttribute("class");
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
      {/* Menu */}
      <nav
        className={`text-dark absolute inset-0 -z-10 flex h-[100svh] w-full flex-col justify-center border-t bg-gradient-to-t from-white/90 to-white text-3xl font-bold shadow-xl duration-200 ease-in-out dark:border-t-myDark dark:from-myDark/90 dark:to-myDark dark:text-white md:static md:z-0 md:mr-4 md:ml-auto md:h-10 md:w-auto md:translate-x-0 md:flex-row md:border-none md:bg-none md:text-base md:shadow-none ${
          isNavOpen
            ? "translate-x-0 scale-x-100"
            : "translate-x-[100vw] scale-x-0"
        }`}
      >
        {links.map((link) => {
          const isCurrentPage = router.route === link.url;

          return (
            <Link
              key={link.label}
              onClick={isCurrentPage ? undefined : navOpenHandler}
              className={`group relative flex w-full items-center justify-center py-4 px-8 uppercase duration-200 hover:text-myDark md:px-4${
                isCurrentPage
                  ? " cursor-default text-myDark/50 hover:text-myDark/50 dark:text-white/50 dark:hover:text-white/50"
                  : ""
              }`}
              href={link.url}
            >
              {link.label}
              <div
                className={`left absolute left-0 -z-10 h-full w-full origin-left scale-x-0 bg-myLime duration-300 ${
                  isCurrentPage
                    ? ""
                    : " group-hover:scale-x-100 md:group-hover:scale-y-100"
                }`}
              ></div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
