import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import film from "../../assets/film.json";
import { NavLink } from "react-router-dom";
const Header = () => {
  const navItems = [
    { label: "Film", to: "/movies", end: true },
    { label: "Serie", to: "/movies/serie" },
  ];

  return (
    <nav className="w-full bg-[#121212]">
      <div className="max-w-5xl mx-auto h-20 flex justify-between items-center px-6">
        <div className="logo">
          <Player
            autoplay
            loop
            src={film}
            style={{ height: "5rem", width: "5rem" }}>
            <Controls visible={false} />
          </Player>
        </div>
        <ul className="flex gap-8">
          {navItems.map((item) => (
            <li key={item.to} className="transition-all duration-300 rounded-full">
              <NavLink
                to={item.to}
                end={Boolean(item.end)}
                className={({ isActive }) =>
                  [
                    "px-3 py-1 rounded-full transition-colors duration-300",
                    "hover:bg-white hover:text-black",
                    isActive ? "bg-white text-black font-semibold" : "",
                  ]
                    .join(" ")
                    .trim()
                }>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
