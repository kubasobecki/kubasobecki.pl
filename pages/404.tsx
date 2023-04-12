import Layout from "@/components/layout/Layout";
import Link from "next/dist/client/link";

export default function Custom404() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-mono text-2xl">404 - You are lost</h1>
      <Link href="/" className="font-bold">
        Return home?
      </Link>
    </div>
  );
}
