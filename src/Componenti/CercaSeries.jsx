import React, { useState, useCallback } from "react";
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { cercaSerie } from "../utilities/funzioniApi";
import DescrzioneApertoTV from "./DescrizioneApertoTV";
import { Link, useParams } from "react-router-dom";
import { Search } from "../utilities/SVG";

const CercaSerieTV = () => {
  const [serie, setSerie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { ID } = useParams();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    findSerie();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      //click di tasto invio
      findSerie();
    }
  };

  const filteredSerie = serie.filter((tv) =>
    tv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const findSerie = useCallback(async () => {
    const trovato = await cercaSerie(searchTerm);
    setSerie(trovato);
  }, [searchTerm]);

  // useEffect(() => {
  //   findSerie();
  // }, [searchTerm, findSerie]);

  return (
    <>
      <div className="max-w-5xl w-full mx-auto max-lg:p-4 ">
        <h1 className="font-bold text-4xl">Cerca</h1>
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
            {filteredSerie.map((movie, index) => (
              <Link
                to={`/movies/tv/${movie.id}`}
                className="flex-none w-40 hover:scale-110 transition-all"
                key={movie.id}>
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt="No img"
                    className="rounded-lg "
                  />
                  <div className=" absolute top-2 right-2 p-2 bg-zinc-800 rounded-full">
                    {Math.round(movie.vote_average * 10) / 10}
                  </div>
                  <div className=" text-white p-2 w-full text-center">
                    <h2 className="text-xs font-semibold whitespace-normal">
                      {movie.name}
                    </h2>
                    <p className="text-xs">
                      {movie.first_air_date
                        ? format(
                            new Date(movie.first_air_date),
                            "dd MMM, yyyy",
                            {
                              locale: itLocale,
                            }
                          )
                        : "Data non disponibile"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {ID && <DescrzioneApertoTV movieID={ID} />}
      </div>
    </>
  );
};

export default CercaSerieTV;
