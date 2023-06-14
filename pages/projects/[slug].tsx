import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { fetchProjectsThunk } from "@/store/projects-slice";
import { fetchProjects } from "@/utilities/api";
import Layout from "@/components/layout/Layout";

export default function Project() {
  const router = useRouter();
  const { projects } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  // Redirect if invalid slug

  useEffect(() => {
    dispatch(fetchProjectsThunk());
  }, [dispatch]);

  useEffect(() => {
    // console.log(projects);
    if (
      projects.status === "succeeded" &&
      !projects.entries.find((p) => p.slug === router.query.slug)
    ) {
      console.log(router.query);
      console.log(projects.entries.find((p) => p.slug === router.query.slug));
    }
    //   redirect("/projects");
  }, [projects, router.query.slug]);

  return (
    <>
      <Head>
        <title>kubasobecki.pl | {router.query.slug}</title>
      </Head>
      <Layout>
        <section id="projects-grid" className="pt-0">
          <h1 className="page-heading">Projects</h1>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const projects = await fetchProjects();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      projects,
    },
  };
}

export async function getStaticPaths() {
  const projects = await fetchProjects();

  const paths = projects.map((p) => ({
    params: { id: p.slug },
  }));

  return { paths, fallback: false };
}
