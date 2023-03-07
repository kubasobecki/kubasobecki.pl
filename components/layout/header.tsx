import Link from "next/link";

export default function Navigation() {
  return (
    <header className="w-full bg-slate-300  p-8">
      <nav className="space-x-6 font-bold">
        <Link href="/about">About</Link>
        <Link href="/work">Work</Link>
        <Link href="/lab">Lab</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
