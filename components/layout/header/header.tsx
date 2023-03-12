import { HidingHeader } from "hiding-header-react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <HidingHeader>
      <header className="relative flex h-16 w-full items-center bg-white px-8 shadow-lg duration-200 dark:bg-myDark dark:text-white md:h-24">
        <Logo />
        <Navigation />
        <ThemeToggle />
      </header>
    </HidingHeader>
  );
}
