import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="flex w-full items-center justify-between bg-slate-700 p-8 text-sm text-slate-400">
      <p>© {new Date().getFullYear()} Kuba Sobecki</p>
      <div className="flex space-x-4">
        <a
          href="https://github.com/kubasobecki/"
          target="_blank"
          rel="noreferrer"
          className="text-red-500"
        >
          <AiOutlineGithub size="24" />
        </a>
        <a
          href="https://www.linkedin.com/in/kubasobecki/"
          target="_blank"
          rel="noreferrer"
          className="text-red-500"
        >
          <AiFillLinkedin size="24" />
        </a>
      </div>
    </footer>
  );
}
