import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/utilities/hooks";
import { navOpenToggle } from "@/store/navopen-slice";
import Link from "next/link";

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

  return (
    <>
      {/* Hamburger Menu */}
      <div
        className="absolute right-8 h-[28px] w-[32px] cursor-pointer justify-between md:hidden"
        onClick={navOpenHandler}
      >
        <div
          className={`absolute h-[4px] w-[32px] origin-center rounded-full bg-navy transition-transform duration-300 ease-in-out dark:bg-indigo-100 ${
            isNavOpen ? "translate-y-[12px] -rotate-45 transform" : ""
          }`}
        ></div>
        <div
          className={`absolute h-[4px] w-[32px] translate-y-[12px] rounded-full bg-navy transition-[opacity,transform] duration-300 ease-in-out dark:bg-indigo-100 ${
            isNavOpen ? "translate-x-[32px] opacity-0" : ""
          }`}
        ></div>
        <div
          className={`absolute h-[4px] w-[32px] origin-center rounded-full bg-navy transition-transform duration-300 ease-in-out dark:bg-indigo-100 ${
            isNavOpen
              ? "translate-y-[12px] rotate-45 transform"
              : "translate-y-[24px]"
          }`}
        ></div>
      </div>
      {/* Menu */}
      <nav
        className={`absolute inset-0 -z-10 flex h-[100vh] w-full flex-col justify-center border-t bg-gradient-to-t from-white/80 to-white text-3xl font-bold text-navy shadow-xl duration-300 ease-in-out dark:border-t-navy dark:from-navy/80 dark:to-navy dark:text-indigo-100 md:static md:z-0 md:mr-4 md:ml-auto md:h-full md:w-auto md:translate-x-0 md:flex-row md:items-center md:border-none md:bg-none md:text-base md:shadow-none ${
          isNavOpen ? "translate-x-0" : "translate-x-[100vw]"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.label}
            className={`group w-full py-4 px-8 text-center uppercase duration-200 hover:bg-navy hover:text-white dark:hover:bg-transparent dark:hover:text-cyanBright md:px-4 md:hover:bg-transparent  ${
              router.route === link.url
                ? "cursor-default text-magentaBright md:hover:text-magentaBright dark:md:text-cyanBright"
                : "md:hover:text-navy dark:md:text-white dark:md:hover:text-white"
            }`}
            href={link.url}
          >
            {link.label}
            <div
              className={`-mb-1 hidden h-1 w-0 rounded-full bg-magentaBright duration-200  md:block ${
                router.route === link.url ? "" : "group-hover:w-full"
              }`}
            ></div>
          </Link>
        ))}
      </nav>
    </>
  );
}
