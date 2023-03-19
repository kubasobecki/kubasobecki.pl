import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="w-full p-8 pt-12">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
      <Footer />
    </>
  );
}
