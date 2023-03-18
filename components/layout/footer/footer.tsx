import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-y-4 bg-myDark p-8 text-sm text-white dark:bg-black/50 md:flex-row-reverse md:justify-between">
      <div className="flex space-x-2">
        <a
          href="https://github.com/kubasobecki/"
          target="_blank"
          rel="noreferrer"
          className="p-1 text-white/90 duration-300 hover:text-myLime"
        >
          <AiOutlineGithub size="24" />
        </a>
        <a
          href="https://www.linkedin.com/in/kubasobecki/"
          target="_blank"
          rel="noreferrer"
          className="p-1 text-white/90 duration-300 hover:text-myLime"
        >
          <AiFillLinkedin size="24" />
        </a>
        <a
          href="https://t.me/KubaSobecki"
          target="_blank"
          rel="noreferrer"
          className="p-1 text-white/90 duration-300 hover:text-myLime"
        >
          <FaTelegramPlane size="24" />
        </a>
        <a
          href="https://wa.me/48519676788"
          target="_blank"
          rel="noreferrer"
          className="p-1 text-white/90 duration-300 hover:text-myLime"
        >
          <FaWhatsapp size="24" />
        </a>
      </div>
      <span className="text-white/90">
        © {new Date().getFullYear()} Kuba Sobecki
      </span>
    </footer>
  );
}
