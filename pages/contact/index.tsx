import Head from "next/head";
import Layout from "@/components/layout/Layout";
import ContactForm from "@/components/forms/ContactForm";

import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiFillMail,
  AiFillPhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const tooltipStyle = {
  backgroundColor: "hsl(var(--my-lime))",
  color: "hsl(var(--my-dark))",
  fontWeight: "bold",
  margin: "0",
};

export default function Contact() {
  return (
    <>
      <Head>
        <title>kubasobecki.pl | contact</title>
      </Head>
      <Layout>
        <div className="mx-auto max-w-md">
          <h1 className="page-heading text-center">Let's talk</h1>

          <div className="mb-8 flex justify-center space-x-8">
            <a
              href="https://github.com/kubasobecki/"
              data-tooltip-id="tooltip-github"
              data-tooltip-content="GitHub"
              target="_blank"
              rel="noreferrer"
              className="p-1 text-myDark duration-300 hover:text-myDark/60 dark:text-zinc-400 dark:hover:text-zinc-400/50"
            >
              <AiOutlineGithub size="36" />
            </a>
            <Tooltip id="tooltip-github" style={tooltipStyle} />
            <a
              href="https://www.linkedin.com/in/kubasobecki/"
              data-tooltip-id="tooltip-linkedin"
              data-tooltip-content="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="p-1 text-myDark duration-300 hover:text-myDark/60 dark:text-zinc-400 dark:hover:text-zinc-400/50"
            >
              <AiFillLinkedin size="36" />
            </a>
            <Tooltip id="tooltip-linkedin" style={tooltipStyle} />
            <a
              href="https://t.me/KubaSobecki"
              data-tooltip-id="tooltip-telegram"
              data-tooltip-content="Telegram"
              target="_blank"
              rel="noreferrer"
              className="p-1 text-myDark duration-300 hover:text-myDark/60 dark:text-zinc-400 dark:hover:text-zinc-400/50"
            >
              <FaTelegramPlane size="36" />
            </a>
            <Tooltip id="tooltip-telegram" style={tooltipStyle} />
            <a
              href="https://wa.me/48519676788"
              data-tooltip-id="tooltip-whatsapp"
              data-tooltip-content="WhatsApp"
              target="_blank"
              rel="noreferrer"
              className="p-1 text-myDark duration-300 hover:text-myDark/60 dark:text-zinc-400 dark:hover:text-zinc-400/50"
            >
              <AiOutlineWhatsApp size="36" />
            </a>
            <Tooltip id="tooltip-whatsapp" style={tooltipStyle} />
            <a
              href="mailto:kubasobecki@gmail.com"
              data-tooltip-id="tooltip-email"
              data-tooltip-content="Email"
              target="_blank"
              rel="noreferrer"
              className="p-1 text-myDark duration-300 hover:text-myDark/60 dark:text-zinc-400 dark:hover:text-zinc-400/50"
            >
              <AiFillMail size="36" />
            </a>
            <Tooltip id="tooltip-email" style={tooltipStyle} />
            <a
              href="tel:+48519676788"
              data-tooltip-id="tooltip-mobile"
              data-tooltip-content="Mobile"
              target="_blank"
              rel="noreferrer"
              className="p-1 text-myDark duration-300 hover:text-myDark/60 dark:text-zinc-400 dark:hover:text-zinc-400/50"
            >
              <AiFillPhone size="36" />
            </a>
            <Tooltip id="tooltip-mobile" style={tooltipStyle} />
          </div>

          <div className="mb-16 rounded-lg bg-slate-200 p-4 dark:bg-zinc-800">
            <ContactForm />
          </div>
        </div>
      </Layout>
    </>
  );
}
