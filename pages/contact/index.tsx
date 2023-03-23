import Head from "next/head";
import Layout from "@/components/layout/Layout";
import ContactForm from "@/components/forms/ContactForm";

export default function Contact() {
  return (
    <>
      <Head>
        <title>kubasobecki.pl | contact</title>
      </Head>
      <Layout>
        <h1 className="">Let's talk</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded bg-slate-200 p-4">
            <p>Kuba Sobecki</p>
            <p>+48 519 67 67 88</p>
            <p>kubasobecki@gmail.com</p>
            <p>Kuba Sobecki</p>
          </div>
          <div className="rounded bg-slate-200 p-4">
            <ContactForm />
          </div>
        </div>
      </Layout>
    </>
  );
}
