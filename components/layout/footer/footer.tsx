import {
  AiOutlineGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-y-4 bg-myDark p-8 text-sm text-white md:flex-row-reverse md:justify-between">
      <div className="flex space-x-4">
        <a
          href="https://github.com/kubasobecki/"
          target="_blank"
          rel="noreferrer"
          className="text-white/90 duration-300 hover:text-myLime"
        >
          <AiOutlineGithub size="24" />
        </a>
        <a
          href="https://www.linkedin.com/in/kubasobecki/"
          target="_blank"
          rel="noreferrer"
          className="text-white/90 duration-300 hover:text-myLime"
        >
          <AiFillLinkedin size="24" />
        </a>
        <a
          href="https://twitter.com/_kubasobecki"
          target="_blank"
          rel="noreferrer"
          className="text-white/90 duration-300 hover:text-myLime"
        >
          <AiFillTwitterCircle size="24" />
        </a>
      </div>
      <p className="text-white/90">© {new Date().getFullYear()} Kuba Sobecki</p>
    </footer>
  );
}
