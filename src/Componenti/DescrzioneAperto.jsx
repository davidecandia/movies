import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { cercaID, video, similarMovies } from "../utilities/funzioniApi";
import { YoutubeIcon } from "../utilities/SVG";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const DescrzioneAperto = () => {
  const { ID: movieID } = useParams();
  const [open, setOpen] = useState(null);
  const [filmato, setFilmato] = useState();
  const [similar, setSimilar] = useState([]);

  const findById = useCallback(async () => {
    const trovato = await cercaID({ movieID });
    setOpen(trovato);
  }, [movieID]);

  const trailer = useCallback(async () => {
    const trovato = await video({ movieID });
    setFilmato(trovato);
  }, [movieID]);

  const similarMoviesFunction = useCallback(async () => {
    const trovato = await similarMovies({ movieID });
    setSimilar(trovato);
  }, [movieID]);


  useEffect(() => {
    findById();
    trailer();
    similarMoviesFunction();
  }, [findById, trailer, similarMoviesFunction]);

  return (
    <div className="">
      {open && (
        <div className=" w-full mx-auto h-full relative ">
          <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-60 z-1"></div>
          <img
            src={`https://image.tmdb.org/t/p/w500${open.backdrop_path}`}
            alt="No img"
            className=" w-full h-screen z-0 img-full object-cover object-center"
          />
          <div className="max-w-5xl mx-[50%] translate-x-[-50%] absolute top-0 left-0 w-full h-full text-white z-10 p-4 lg:flex gap-4 items-center  ">
            <img
              src={`https://image.tmdb.org/t/p/w300${open.poster_path}`}
              alt="no img"
              className=" rounded-2xl w-60 h-80 max-sm:w-28 max-sm:h-44 "
            />
            <div>
              <h1 className="text-3xl font-bold">
                {open.original_title} <br />
                <span className=" opacity-80">
                  {format(new Date(open.release_date), "dd MMM, yyyy", {
                    locale: itLocale,
                  })}
                </span>
              </h1>
              <div className="flex">
                {open.genres && open.genres.length > 0 ? (
                  <div className=" flex gap-1">
                    <p>Genere: {open.genres[0].name}</p>
                    {open.genres[1] && <p>{open.genres[1].name} </p>}
                    {open.genres[2] && <p>{open.genres[2].name} </p>}
                    {open.genres[3] && <p>{open.genres[3].name} </p>}
                  </div>
                ) : (
                  <p>Genere non disponibile</p>
                )}
                <p className="ml-3">• {open.runtime} Min</p>
              </div>

              <br />
              <button className=" p-2 bg-zinc-800 rounded-full cursor-default">
                {Math.round(open.vote_average * 10) / 10}
              </button>
              <br />
              {filmato && (
                <>
                  {filmato.responseJson.results.length > 0 ||
                  filmato.responseJsonEn.results.length > 0 ? (
                    <div>
                      <h4 className="flex gap-2 items-center">
                        {<YoutubeIcon />}YouTube:{" "}
                        <a
                          className=" p-1 |hover:p-1 hover:bg-white hover:rounded-full hover:text-black hover:transition-all "
                          target="blank"
                          href={`https://www.youtube.com/watch?v=${
                            (
                              filmato.responseJson.results[0] ||
                              filmato.responseJsonEn.results[0]
                            ).key
                          }`}>
                          •Guarda Trailer
                        </a>
                      </h4>
                    </div>
                  ) : (
                    <p>Nessun trailer disponibile.</p>
                  )}
                </>
              )}

              <div>
                <h2 className=" font-bold text-xl">Descrizione</h2>
                <p className=" font-normal text-md leading-5 max-sm:text-sm max-sm:leading-4">
                  {open.overview || "Nessuna descrizione"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* prova */}
      <div className="max-w-5xl w-full mx-auto max-lg:p-4 ">
      <h1 className="font-bold text-4xl my-4">Similar Films</h1>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-4 p-4">
          {similar.length > 0 && similar.map((movie) => (
            <Link
              to={`/movies/movie/${movie.id}`}
              className="flex-none w-40 hover:scale-110 transition-all"
              key={movie.id}>
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt="No img"
                  className="rounded-lg"
                />
                <div className=" absolute top-2 right-2  h-9 w-9 flex justify-center items-center bg-zinc-800 rounded-full">
                  <p>{Math.round(movie.vote_average * 10) / 10}</p>
                </div>
                <div className=" text-white p-2 w-full text-center">
                  <h2 className="text-xs font-semibold whitespace-normal">
                    {movie.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default DescrzioneAperto;
