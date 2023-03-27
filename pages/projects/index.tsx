import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { fetchProjectsThunk } from "@/store/projects-slice";
import Layout from "@/components/layout/Layout";
import Project from "@/components/projects/project";

export default function Projects() {
  const { projects } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjectsThunk());
  }, []);

  useEffect(() => {
    // console.log(projects);
  }, [projects]);

  return (
    <>
      <Head>
        <title>kubasobecki.pl | projects</title>
      </Head>
      <Layout>
        <h1 className="">Projects</h1>
        <section>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            cumque ullam quae alias error repellendus quod tenetur quia
            consequatur doloremque.
          </p>
          <div>Filters</div>
          <div>Works</div>
          <div>
            <p>
              inside gallery with:
              <br />
              <a href="https://www.geeksforgeeks.org/animated-sliding-page-gallery-using-framer-motion-and-react-js/">
                https://www.geeksforgeeks.org/animated-sliding-page-gallery-using-framer-motion-and-react-js/
                ?
              </a>
            </p>
          </div>
          {/* <div>{JSON.stringify(projects)}</div> */}
        </section>
        <section>
          <div className="grid grid-cols-auto250">
            {projects.status === "loading" && "Loading projects..."}
            {projects.status === "succeeded" &&
              projects.entries.map((props) => (
                <Project key={props.id} {...props} />
              ))}
          </div>
        </section>
      </Layout>
    </>
  );
}
