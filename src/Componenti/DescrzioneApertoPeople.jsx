import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { descrizionePeople, moviesPeopleApi } from "../utilities/funzioniApi";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import GenericFlow from "./GenericFlow";

const DescrzioneApertoPeople = () => {
  const { ID: peopleID } = useParams();
  const [open, setOpen] = useState(null);
  const [movies, setMovies] = useState([]);

  const findById = useCallback(async () => {
    const trovato = await descrizionePeople({ peopleID: peopleID });
    console.log("descrizione people",trovato)
    setOpen(trovato);
  }, [peopleID]);

  const listMoviesPeople = useCallback(async () => {
    const trovato = await moviesPeopleApi({ peopleID: peopleID });
    console.log(" list moviespeople",trovato)
    setMovies(trovato);
  }, [peopleID]);

  useEffect(() => {
    findById();
    listMoviesPeople();
  }, [findById]);

  return (
    <div className="">
      {open && (
        <div className=" w-full mx-auto h-full relative ">
          <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-60 z-1"></div>
          <img
            src={`https://image.tmdb.org/t/p/w500${open.responseJson.profile_path}`}
            alt="No img"
            className=" w-full h-screen z-0 img-full object-cover object-center"
          />
          <div className="max-w-5xl mx-[50%] translate-x-[-50%] absolute top-0 left-0 w-full h-full text-white z-10 p-4 lg:flex gap-4 items-center  ">
            {/* <img
              src={`https://image.tmdb.org/t/p/w300${open.responseJson.poster_path}`}
              alt="no img"
              className=" rounded-2xl w-60 h-80 max-sm:w-28 max-sm:h-44 "
            /> */}
            <div>
              <h1 className="text-3xl font-bold">
                {open.responseJson.name} <br />
                <span className=" opacity-80">
                  {format(new Date(open.responseJson.birthday), "dd MMM, yyyy", {
                    locale: itLocale,
                  })}
                </span>
              </h1>

              <br />
              <button className=" p-2 bg-zinc-800 rounded-full cursor-default">
                {Math.round(open.responseJson.popularity * 10) / 10}
              </button>
              <br />
              <div>
                <h2 className=" font-bold text-xl">Descrizione</h2>
                <p className=" font-normal text-md leading-5 max-sm:text-sm max-sm:leading-4 bg-zinc-950/30	">
                  {open.responseJson.biography || open.responseJsonEn.biography || "Nessuna descrizione"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* films  */}
      <GenericFlow title="Movies Credits" array={movies}/>
    </div>
  );
};

export default DescrzioneApertoPeople;
