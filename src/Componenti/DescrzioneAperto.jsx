import React, { useEffect, useState } from "react";
import { cercaID } from "../utilities/funzioniApi";
const DescrzioneAperto = ({ movieID }) => {
  const [open, setOpen] = useState(null);
  const findById = async () => {
    const trovato = await cercaID({ movieID });
    setOpen(trovato);
  };

  useEffect(() => {
    findById();
  }, []);
  return (
    <div className="relative">
      {open && (
        <div className="max-w-5xl w-full mx-auto mt-4 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-1"></div>
          <img
            src={`https://image.tmdb.org/t/p/w500${open.backdrop_path}`}
            alt="No img"
            className="w-full h-auto z-0 img-full rounded-md"
          />
          <div className="absolute top-0 left-0 w-full h-full text-white z-10 p-4 flex gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w300${open.poster_path}`}
              alt="no img"
              className=" rounded-2xl"
            />
            <div>
              <h1 className="text-3xl font-bold">
                {open.original_title}{" "}
                <span className=" opacity-80">({open.release_date})</span>
              </h1>
              <div className="flex">
                {open.genres && open.genres.length > 0 ? (
                  <>
                    <p>Genere: {open.genres[0].name}</p>
                    {open.genres[1] && <p>, {open.genres[1].name}</p>}
                    {open.genres[2] && <p>, {open.genres[2].name}</p>}
                    {open.genres[3] && <p>, {open.genres[3].name}</p>}
                  </>
                ) : (
                  <p>Genere non disponibile</p>
                )}
                <p className="ml-3">•{open.runtime} min</p>
              </div>

              <br />
              <button className=" p-2 bg-zinc-800 rounded-full">
                {Math.round(open.vote_average * 10) / 10}
              </button>
              <br />
              <div>
                <h2 className=" font-bold text-xl">Descrizione</h2>
                <p className=" font-normal text-md leading-5">
                  {open.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescrzioneAperto;
