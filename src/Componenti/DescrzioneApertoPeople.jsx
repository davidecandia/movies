import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { descrizionePeople } from "../utilities/funzioniApi";
import { useParams } from "react-router";

const DescrzioneApertoPeople = () => {
  const { ID: peopleID } = useParams();
  const [open, setOpen] = useState(null);

  const findById = useCallback(async () => {
    const trovato = await descrizionePeople({ peopleID: peopleID });
    console.log("descrizione people",trovato)
    setOpen(trovato);
  }, [peopleID]);

  useEffect(() => {
    findById();
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
              {/* {filmato && (
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
              )} */}

              <div>
                <h2 className=" font-bold text-xl">Descrizione</h2>
                <p className=" font-normal text-md leading-5 max-sm:text-sm max-sm:leading-4">
                  {open.responseJson.biography || open.responseJsonEn.biography || "Nessuna descrizione"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescrzioneApertoPeople;
