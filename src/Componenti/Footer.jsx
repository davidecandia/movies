import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" mt-20  w-full mx-auto p-8 bg-[#121212] |absolute bottom-0| flex flex-col items-center">
      <div className="max-w-5xl">
        <div className="flex gap-4 items-center">
          <p>Visita le mie pagine</p>
          <a href="https://github.com/Dexy98">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/_davide_1998/">
            <FaInstagram />
          </a>
        </div>
        <br />
        <div>
          <h4>2023 by Davide Candia</h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
