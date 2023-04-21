import { ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

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
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
