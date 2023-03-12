import { HidingHeader } from "hiding-header-react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <HidingHeader>
      <header className="relative flex h-16 w-full items-center bg-white/75 px-8 shadow-lg backdrop-blur duration-200 dark:bg-black/50 dark:text-white md:h-24">
        <Logo />
        <Navigation />
        <ThemeToggle />
      </header>
    </HidingHeader>
  );
}
