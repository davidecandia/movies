import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full mx-auto p-8 bg-[#121212] flex flex-col items-center">
      <div className="max-w-5xl w-full text-white flex flex-col gap-4">
        <div>
          <p className="uppercase text-xs tracking-widest text-zinc-400">
            Seguimi anche qui
          </p>
          <ul className="mt-2 flex items-center gap-4">
            <li>
              <a
                href="https://github.com/Dexy98"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                <FaGithub aria-hidden="true" />
                <span className="text-sm">GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/_davide_1998/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                <FaInstagram aria-hidden="true" />
                <span className="text-sm">Instagram</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="border-t border-zinc-800 pt-4 text-xs text-zinc-500">
          <p>2023 &mdash; Davide Candia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
