import Navigation from "./header";
import Footer from "./footer";

export default function Layout(props) {
  return (
    <>
      <Navigation />
      <main className="min-h-[{calc(100vh - 100px)}] w-full columns-4 bg-slate-50 p-8 ">
        {props.children}
      </main>
      <Footer />
    </>
  );
}
