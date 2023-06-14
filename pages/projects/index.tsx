import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { fetchProjectsThunk } from "@/store/projects-slice";
import Layout from "@/components/layout/Layout";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectsFilter from "@/components/projects/ProjectsFilter";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const { projects } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjectsThunk());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>kubasobecki.pl | projects</title>
      </Head>
      <Layout>
        <section id="projects-grid" className="pt-0">
          <h1 className="page-heading">Projects</h1>
          {projects.status === "loading" && "Loading projects..."}
          {projects.status === "succeeded" && (
            <>
              <ProjectsFilter projects={projects.entries} />
              <motion.div
                layout
                className="grid grid-cols-auto250 gap-x-4 gap-y-8"
              >
                <AnimatePresence>
                  {projects.entries
                    .filter(
                      ({ tags }) =>
                        projects.filter === "" ||
                        tags!.includes(projects.filter)
                    )
                    .map((props) => (
                      <ProjectCard key={props.id} {...props} />
                    ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </section>
      </Layout>
    </>
  );
}
