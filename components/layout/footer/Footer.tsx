import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiFillMail,
  AiFillPhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
// import { FaTelegramPlane } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const tooltipStyle = {
  backgroundColor: "hsl(var(--my-lime))",
  color: "hsl(var(--my-dark))",
  fontWeight: "bold",
  margin: "0",
};

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

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-y-4 bg-myDark p-8 text-sm text-white dark:bg-black/50 md:flex-row-reverse md:justify-between">
      <div className="flex space-x-2">
        <ErrorBoundary>
          <a
            href="https://github.com/kubasobecki/"
            data-tooltip-id="tooltip-footer-github"
            data-tooltip-content="GitHub"
            target="_blank"
            rel="noreferrer"
            className="p-1 text-white/90 duration-300 hover:text-myLime"
          >
            <AiOutlineGithub size="24" />
          </a>
          <Tooltip id="tooltip-footer-github" style={tooltipStyle} />
          <a
            href="https://www.linkedin.com/in/kubasobecki/"
            data-tooltip-id="tooltip-footer-linkedin"
            data-tooltip-content="LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="p-1 text-white/90 duration-300 hover:text-myLime"
          >
            <AiFillLinkedin size="24" />
          </a>
          <Tooltip id="tooltip-footer-linkedin" style={tooltipStyle} />
          <a
            href="https://t.me/KubaSobecki"
            data-tooltip-id="tooltip-footer-telegram"
            data-tooltip-content="Telegram"
            target="_blank"
            rel="noreferrer"
            className="p-1 text-white/90 duration-300 hover:text-myLime"
          >
            {/* <FaTelegramPlane size="24" /> */}
          </a>
          <Tooltip id="tooltip-footer-telegram" style={tooltipStyle} />
          <a
            href="https://wa.me/48519676788"
            data-tooltip-id="tooltip-footer-whatsapp"
            data-tooltip-content="WhatsApp"
            target="_blank"
            rel="noreferrer"
            className="p-1 text-white/90 duration-300 hover:text-myLime"
          >
            <AiOutlineWhatsApp size="24" />
          </a>
          <Tooltip id="tooltip-footer-whatsapp" style={tooltipStyle} />
          <a
            href="mailto:kubasobecki@gmail.com"
            data-tooltip-id="tooltip-footer-email"
            data-tooltip-content="Email"
            target="_blank"
            rel="noreferrer"
            className="p-1 text-white/90 duration-300 hover:text-myLime"
          >
            <AiFillMail size="24" />
          </a>
          <Tooltip id="tooltip-footer-email" style={tooltipStyle} />
          <a
            href="tel:+48519676788"
            data-tooltip-id="tooltip-footer-mobile"
            data-tooltip-content="Mobile"
            target="_blank"
            rel="noreferrer"
            className="p-1 text-white/90 duration-300 hover:text-myLime"
          >
            <AiFillPhone size="24" />
          </a>
          <Tooltip id="tooltip-footer-mobile" style={tooltipStyle} />
        </ErrorBoundary>
      </div>
      <span className="text-white/90">
        © {new Date().getFullYear()} Kuba Sobecki
      </span>
    </footer>
  );
}
