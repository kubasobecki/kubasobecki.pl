import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({
  showHeader = true,
  showFooter = true,
  children,
}) {
  return (
    <>
      {showHeader && <Header />}
      <main className=" p-8 pt-12">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
      {showFooter && <Footer />}
    </>
  );
}
