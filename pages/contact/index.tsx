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
        <h1 className="text-3xl font-bold">Contact!</h1>
        <ContactForm />
      </Layout>
    </>
  );
}
