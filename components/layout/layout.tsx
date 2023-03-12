import Header from "./header/Header";
import Footer from "./footer/footer";

export default function Layout(props) {
  return (
    <>
      <Header />
      <main className="w-full p-8 pt-12 md:pt-24">{props.children}</main>
      <Footer />
    </>
  );
}
