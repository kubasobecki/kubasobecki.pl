import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { fetchProjectsThunk } from "@/store/projects-slice";
import { fetchProjects } from "@/utilities/api";
import Layout from "@/components/layout/Layout";
import { Project } from "@/store/projects-slice";

export default function ProjectSingle() {
  const router = useRouter();
  const { projects } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );

  // Redirect if invalid slug

  useEffect(() => {
    dispatch(fetchProjectsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (
      projects.status === "succeeded" &&
      projects.entries.find((p) => p.slug === router.query.slug)
    ) {
      setCurrentProject(
        projects.entries.find((p) => p.slug === router.query.slug)
      );
      console.log(router);
      console.log(currentProject);
    }
    // else router.replace("/projects");
  }, [projects, currentProject, router]);

  return (
    <>
      <Head>
        <title>kubasobecki.pl | {router.query.slug}</title>
      </Head>
      <Layout>
        <section id="projects-grid" className="pt-0">
          {currentProject && (
            <>
              <h1 className="page-heading">{currentProject.name}</h1>
              <img src={currentProject.images?.main} />
              <p>{currentProject.tags?.join(" | ")}</p>
              <p>{currentProject.description}</p>
            </>
          )}
        </section>
      </Layout>
    </>
  );
}
