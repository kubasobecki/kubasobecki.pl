import { useState } from "react";
import Link from "next/link";

const links = ["Hello", "Projects", "Blog", "Lab", "Contact"];

export default function Header() {
  const [navIsOpen, setNavIsOpen] = useState(false);

  function navOpenHandler() {
    setNavIsOpen((state) => !state);
  }

  return (
    <header className="fixed w-full">
      <div className="relative inset-x-0 flex h-16 w-full items-center justify-between bg-white px-8 text-indigo-800 shadow-lg">
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
              fill="navy"
              d="M0 32h96v96L0 32zm252.017 219.983 122.341-122.342c-2.176-1.038-4.656-1.641-7.386-1.641h-73.717a32 32 0 0 0-22.628 9.373L192 216l35.983 35.983c6.637 6.637 17.397 6.637 24.034 0zm126.971 231.006L163.313 267.313c-6.248-6.248-16.379-6.248-22.627 0L96 312v-98.745a32 32 0 0 0-9.373-22.628l-72.97-72.97C8.616 112.617 0 116.187 0 123.313v371.658c0 15.141 18.305 22.723 29.011 12.018L152 383.999l118.627 118.628A32 32 0 0 0 293.254 512h73.717c15.141 0 22.724-18.306 12.017-29.011z"
            />
          </svg>
        </Link>
        <div
          className="absolute right-8 h-[24px] w-[32px] cursor-pointer justify-between"
          onClick={navOpenHandler}
        >
          <div
            className={`absolute h-[4px] w-[32px] bg-navy transition duration-300 ease-in-out ${
              navIsOpen
                ? "translate-y-[12px] rotate-45 transform delay-100"
                : "delay-0"
            }`}
          ></div>
          <div
            className={`absolute h-[4px] w-[32px] translate-y-[10px] bg-navy transition duration-300 ease-in-out ${
              navIsOpen ? "delay-0 -translate-x-[32px] opacity-0" : "delay-100"
            }`}
          ></div>
          <div
            className={`absolute h-[4px] w-[32px] translate-y-[20px] bg-navy transition duration-300 ease-in-out ${
              navIsOpen
                ? "translate-y-[12px] -rotate-45 transform delay-100"
                : "delay-0"
            }`}
          ></div>
        </div>
        <nav
          className={`absolute top-16 left-0 -z-10 flex w-full flex-col items-center space-y-2 border-t bg-white py-4 font-bold text-navy shadow-xl duration-300 ease-in-out ${
            navIsOpen ? "translate-y-0" : "-translate-y-72"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link}
              className="py-1 uppercase duration-200 hover:text-magentaBright"
              href={"/" + link.toLowerCase().replaceAll(" ", "-")}
            >
              {link}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
