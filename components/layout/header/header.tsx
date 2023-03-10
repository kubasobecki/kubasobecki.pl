import { HidingHeader } from "hiding-header-react";
import Logo from "./Logo";
import Navigation from "./navigation";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <HidingHeader>
      <header className="relative flex h-16 w-full items-center bg-white px-8 text-indigo-800 shadow-lg dark:bg-navy dark:text-indigo-100 md:h-20">
        <Logo />
        <Navigation />
        <ThemeToggle />
      </header>
    </HidingHeader>
  );
}
