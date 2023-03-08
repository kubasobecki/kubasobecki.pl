import Header from "./header";
import Footer from "./footer";

export default function Layout(props) {
  return (
    <>
      <Header />
      <main className="w-full bg-slate-50 p-8 pt-32">{props.children}</main>
      <Footer />
    </>
  );
}
