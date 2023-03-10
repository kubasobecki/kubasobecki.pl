import Logo from "./Logo";
import Navigation from "./navigation";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="fixed w-full">
      <div className="relative flex h-16 w-[100vw] items-center bg-white px-8 text-indigo-800 shadow-lg dark:bg-navy dark:text-indigo-100">
        <Logo />
        <Navigation />
        <ThemeToggle />
      </div>
    </header>
  );
}
