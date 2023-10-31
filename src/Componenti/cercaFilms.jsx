import React, { useState, useCallback } from "react";
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { cercaMovies } from "../utilities/funzioniApi";
import TopFilm from "./topFilm";
import DescrzioneAperto from "./DescrzioneAperto";
import { Link, useParams } from "react-router-dom";
import { Search } from "../utilities/SVG";

const CercaFilms = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { ID } = useParams();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    findMovies();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      //click di tasto invio
      findMovies();
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const findMovies = useCallback(async () => {
    const trovato = await cercaMovies(searchTerm);
    setMovies(trovato);
  }, [searchTerm]);

  // useEffect(() => {
  //   findMovies();
  // }, [searchTerm, findMovies]);

  return (
    <>
      <TopFilm />
      <div className="max-w-5xl w-full mx-auto max-lg:p-4 ">
        <h1 className="font-bold text-4xl my-4">Cerca</h1>
        <div className="mb-4 transition-all flex gap-1 items-center">
          <input
            type="text"
            placeholder="Cerca..."
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className="px-2 py-1 border border-gray-300 rounded-lg w-40 text-black transition-all"
          />
          <div onClick={handleSearchClick} className=" cursor-pointer">
            <Search />
          </div>
        </div>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-4 p-4">
            {filteredMovies.map((movie, index) => (
              <Link
                to={`/movies/movie/${movie.id}`}
                className="flex-none w-40 hover:scale-110 transition-all"
                key={movie.id}>
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt="No img"
                    className="rounded-lg "
                  />
                  <div className=" absolute top-2 right-2 p-2 bg-zinc-800 rounded-full">
                    {movie.vote_average}
                  </div>
                  <div className=" text-white p-2 w-full text-center">
                    <h2 className="text-xs font-semibold whitespace-normal">
                      {movie.title}
                    </h2>
                    <p className="text-xs">
                      {movie.release_date
                        ? format(new Date(movie.release_date), "dd MMM, yyyy", {
                            locale: itLocale,
                          })
                        : "Data non disponibile"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {ID && <DescrzioneAperto movieID={ID} />}
      </div>
    </>
  );
};

export default CercaFilms;
