import { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import NoSsr from "./../helpers/NoSsr";

interface Props {
  showHeader?: boolean;
  showFooter?: boolean;
  children?: ReactNode;
}

export default function Layout({
  showHeader = true,
  showFooter = true,
  children,
}: Props) {
  return (
    <>
      {showHeader && <Header />}
      <main className="p-8 pt-12">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
      {showFooter && (
        <NoSsr>
          <Footer />
        </NoSsr>
      )}
    </>
  );
}
