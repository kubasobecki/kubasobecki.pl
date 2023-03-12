import Header from "./header/header";
import Footer from "./footer/footer";

export default function Layout(props) {
  return (
    <>
      <Header />
      <main className="w-full bg-slate-50 p-8 pt-12 md:pt-24">
        {props.children}
      </main>
      <Footer />
    </>
  );
}
