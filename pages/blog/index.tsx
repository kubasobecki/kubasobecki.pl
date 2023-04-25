import Layout from "@/components/layout/Layout";
import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>kubasobecki.pl | blog</title>
      </Head>
      <Layout>
        <h1 className="page-heading">Blog</h1>
      </Layout>
    </>
  );
}
