import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Logo() {
  const { theme } = useSelector((state: RootState) => state);

  return (
    <Link href="/" className="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="h-[48px] w-[32px] md:h-[64px] md:w-[48px]"
      >
        <linearGradient
          id="a"
          x1="-8"
          x2="96"
          y1="40"
          y2="144"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#F000B8" />
          <stop offset=".9" stopColor="#0FF" />
        </linearGradient>
        <path
          fill="url(#a)"
          d="m0 32 96 96v13c0 7-9 10-14 5L9 73a32 32 0 0 1-9-22V32z"
        />
        <linearGradient
          id="b"
          x1="183"
          x2="384"
          y1="209.3"
          y2="209.3"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#F000B8" />
          <stop offset=".9" stopColor="#0FF" />
        </linearGradient>
        <path
          fill="url(#b)"
          d="M374 130 252 252c-7 7-17 7-24 0l-36-36-4 4c-7 7-7 17 0 24l40 40c7 7 17 7 24 0l127-127c9-9 5-23-5-27z"
        />
        <linearGradient
          id="c"
          x1="0"
          x2="96"
          y1="16"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#B2FF1A" />
          <stop offset=".9" stopColor="#0FF" />
        </linearGradient>
        <path
          fill="url(#c)"
          d="M96 16v16H0V16C0 7 7 0 16 0h64c9 0 16 7 16 16z"
        />
        <linearGradient
          id="d"
          x1="183"
          x2="384"
          y1="156"
          y2="156"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#B2FF1A" />
          <stop offset=".9" stopColor="#0FF" />
        </linearGradient>
        <path
          fill="url(#d)"
          d="M293 128h74l7 2 5-5c11-11 3-29-12-29h-74a32 32 0 0 0-22 9l-83 83c-7 7-7 17 0 24l4 4 79-79a32 32 0 0 1 22-9z"
        />
        <path
          fill={theme === "dark" ? "#FFFFFF" : "#18181B"}
          d="M0 32h96v96L0 32zm252 220 122-122-7-2h-74a32 32 0 0 0-22 9l-79 79 36 36c7 7 17 7 24 0zm127 231L163 267c-6-6-16-6-22 0l-45 45v-99a32 32 0 0 0-9-22l-73-73c-5-5-14-2-14 5v372c0 15 18 23 29 12l123-123 119 119a32 32 0 0 0 22 9h74c15 0 23-18 12-29z"
        />
        <circle cx="552" cy="148" r="148" fill="#FFF" />
      </svg>
    </Link>
  );
}
