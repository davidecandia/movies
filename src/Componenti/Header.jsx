import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import film from "../assets/film.json";
import { Link, useLocation  } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const isLinkActive = (path) => {
    return location.pathname === path;
  };
  return (
    <nav className=" max-w-5xl w-full mx-auto h-20 bg-[#121212] flex justify-between items-center  rounded-full">
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
          <li className=" p-1 rounded-full |hover:px-1 hover:rounded-full hover:bg-white hover:text-black | transition-all duration-300 | 
            ">
            <Link to="./movies" 
            className={isLinkActive('/movies') ? 'w-full border-b-2 border-white ' : '' }>
              FILM
            </Link>
          </li>
          <li className=" p-1 |hover:px-1 hover:rounded-full hover:bg-white hover:text-black | transition-all duration-300">
            <Link to="./movies/serie" className={isLinkActive('/movies/serie') ? 'w-full border-b-2 border-white ' : '' }>SERIE</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
