import Layout from "@/components/layout/Layout";
import { useAppSelector } from "@/utilities/hooks";
import Head from "next/head";
import { RootState } from "@/store/store";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Sorry.. there was an error</h1>;<p>{}</p>
        </>
      );
    }

    return this.props.children;
  }
}

export default function Home() {
  const { theme } = useAppSelector((state: RootState) => state);

  return (
    <>
      <Head>
        <title>kubasobecki.pl | home</title>
      </Head>
      <ErrorBoundary>
        <Layout>
          <section className="mx-auto max-w-7xl text-lg">
            <h1 className="">_story</h1>
            <p>
              Hello, my name is Kuba Sobecki.
              <br />
              <br />
              My adventure began with MS-DOS, I built my first website in
              Macromedia Flash {new Date().getFullYear() - 2002} years ago.
              <br />
              <br />
              For the last {new Date().getFullYear() - 2013} years I have been
              designing, building and maintaining websites as well as other
              solutions for businesses using HTML/CSS/JS and WordPress.
              <br />
              <br />
              I’ve also got {new Date().getFullYear() - 2002} years of
              experience as a graphic designer under my belt and a highly
              developed aesthetic and functional sense, great attention to
              detail and passion for quality.
              <br />
              <br />
              I am capable in solving new problems and love doing it.
              <br />
              <br />I am a born enthusiast, perfectionist and self-taught
              professional who does not settle in endless self-development.
            </p>
          </section>

          <section className="mx-auto max-w-7xl text-lg">
            <h1 className="">_brands</h1>
            <p>
              Through the years I've worked with global brands, offices,
              agencies as well as small companies.
            </p>
            <p>
              Adidas, Carrefour, Kompania Piwowarska, Lidl, Mercedes, Nestle,
              Netto, Orlen, Santander, Shimano, Toyota, Unilever, Poznan City
              Hall, VW.
            </p>
          </section>

          <section className="mx-auto max-w-7xl text-lg">
            <h1 className="">_stack</h1>
            <p>Technologies I work with include:</p>
            <p>
              HTML5, CSS3, JavaScript ES6+, ReactJS 16.8+, Redux, Redux Toolkit,
              React Router 6, NextJS, MySQL, Git, SVN, WordPress, Figma, Adobe
              Creative Suite
            </p>
          </section>

          <section className="mx-auto max-w-7xl text-lg">
            <h1 className="">_services</h1>
            <p>
              The scope of my services covers: Corporate identity, Logo design,
              Rebranding, Company and product naming, Packaging design,
              Publication graphics design, Website design, and Web/Software
              development.
            </p>
          </section>

          <section className="mx-auto max-w-7xl text-lg">
            <h1 className="">_this website</h1>
            <p>is built with:</p>
            <div className="flex space-x-8">
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                React
              </a>
              <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                Next.js
              </a>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noreferrer"
              >
                TailwindCSS
              </a>
              <a href="https://formik.org/" target="_blank" rel="noreferrer">
                Formik
              </a>
              <a href="https://lodash.com/" target="_blank" rel="noreferrer">
                Lodash
              </a>
              <a
                href="https://nodemailer.com/"
                target="_blank"
                rel="noreferrer"
              >
                Nodemailer
              </a>
              <a
                href="https://react-hot-toast.com/"
                target="_blank"
                rel="noreferrer"
              >
                react-hot-toast
              </a>
            </div>
          </section>

          <section className="mx-auto max-w-7xl text-lg">
            <p>
              If you like my work, feel free to contact me. I’m always open for
              new job opportunities.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="mx-auto my-24 h-auto max-w-[384px]"
            >
              <linearGradient
                id="a"
                x1="-8"
                x2="96"
                y1="40"
                y2="144"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".1" stopColor="#F000B8" />
                <stop offset=".9" stopColor="#0FF" />
              </linearGradient>
              <path
                fill="url(#a)"
                d="m0 32 96 96v13c0 7-9 10-14 5L9 73a32 32 0 0 1-9-22V32z"
              />
              <linearGradient
                id="b"
                x1="183"
                x2="384"
                y1="209.3"
                y2="209.3"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".1" stopColor="#F000B8" />
                <stop offset=".9" stopColor="#0FF" />
              </linearGradient>
              <path
                fill="url(#b)"
                d="M374 130 252 252c-7 7-17 7-24 0l-36-36-4 4c-7 7-7 17 0 24l40 40c7 7 17 7 24 0l127-127c9-9 5-23-5-27z"
              />
              <linearGradient
                id="c"
                x1="0"
                x2="96"
                y1="16"
                y2="16"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".1" stopColor="#B2FF1A" />
                <stop offset=".9" stopColor="#0FF" />
              </linearGradient>
              <path
                fill="url(#c)"
                d="M96 16v16H0V16C0 7 7 0 16 0h64c9 0 16 7 16 16z"
              />
              <linearGradient
                id="d"
                x1="183"
                x2="384"
                y1="156"
                y2="156"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".1" stopColor="#B2FF1A" />
                <stop offset=".9" stopColor="#0FF" />
              </linearGradient>
              <path
                fill="url(#d)"
                d="M293 128h74l7 2 5-5c11-11 3-29-12-29h-74a32 32 0 0 0-22 9l-83 83c-7 7-7 17 0 24l4 4 79-79a32 32 0 0 1 22-9z"
              />
              <path
                fill={theme === "dark" ? "#FFFFFF" : "#18181B"}
                d="M0 32h96v96L0 32zm252 220 122-122-7-2h-74a32 32 0 0 0-22 9l-79 79 36 36c7 7 17 7 24 0zm127 231L163 267c-6-6-16-6-22 0l-45 45v-99a32 32 0 0 0-9-22l-73-73c-5-5-14-2-14 5v372c0 15 18 23 29 12l123-123 119 119a32 32 0 0 0 22 9h74c15 0 23-18 12-29z"
              />
              <circle cx="552" cy="148" r="148" fill="#FFF" />
            </svg>
          </section>
        </Layout>
      </ErrorBoundary>
    </>
  );
}
