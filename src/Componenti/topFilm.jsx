import React, { useEffect, useState } from "react";
import { fetchTopFilms } from "../utilities/funzioniApi";

import GenericFlow from "./GenericFlow";

const TopFilm = () => {
  const [films, setFilms] = useState([]);


  const topFilm = async () => {
    const filmsData = await fetchTopFilms();
    setFilms(filmsData);
  };

  useEffect(() => {
    topFilm();
  }, []);

  return (
    <GenericFlow title="Top Films" array={films}/>
  );
};

export default TopFilm;
