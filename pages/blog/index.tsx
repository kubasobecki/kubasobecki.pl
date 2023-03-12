import Layout from "@/components/layout/layout";
import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>kubasobecki.pl | blog</title>
      </Head>
      <Layout>
        <h1 className="text-3xl font-bold">Blog!</h1>
      </Layout>
    </>
  );
}
