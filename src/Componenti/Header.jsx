import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import film from "../assets/film.json";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className=" max-w-5xl w-full mx-auto h-20 bg-[#121212] flex justify-between items-center px-4 rounded-full">
      <div className="logo">
        <Player
          autoplay
          loop
          src={film}
          style={{ height: "5rem", width: "5rem" }}
        >
          <Controls visible={false} />
        </Player>
      </div>
      <div>
        <ul className="flex gap-8 pr-8">
          <li className=" hover:px-1 hover:rounded-full hover:bg-white hover:text-black">
            <Link to="./movies">FILM</Link>
          </li>
          <li className=" hover:px-1 hover:rounded-full hover:bg-white hover:text-black">
            <Link to="./movies/serie">SERIE</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
