import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="w-full p-8 pt-12 md:pt-24">{children}</main>
      <Footer />
    </>
  );
}
