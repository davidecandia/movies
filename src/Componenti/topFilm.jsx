import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { fetchTopFilms } from '../utilities/funzioniApi';
import DescrzioneAperto from './DescrzioneAperto';
import { Link, useParams } from 'react-router-dom';

const TopFilm = () => {
  const [films, setFilms] = useState([]);

  const { ID } = useParams();

  const topFilm = async () => {
    const filmsData = await fetchTopFilms(); 
    setFilms(filmsData);
  };

  useEffect(() => {
    topFilm();
  }, []);

  return (
    <div className='max-w-5xl w-full mx-auto '>
      <h1 className='font-bold text-4xl my-4'>TOP FILMS</h1>
      <div className='overflow-x-auto whitespace-nowrap'>
        <div className='flex space-x-4 p-4'>
          {films.map((movie) => (
            <Link to={`/movies/movie/${movie.id}`} className='flex-none w-40 hover:scale-110 transition-all' key={movie.id}>
              <div className='relative'>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='No img' className='rounded-lg' />
                <div className=' absolute top-2 right-2 p-2 bg-zinc-800 rounded-full'><p>{movie.vote_average}</p></div>
                <div className=' text-white p-2 w-full text-center'>
                  <h2 className='text-xs font-semibold whitespace-normal'>{movie.title}</h2>
                  <p className='text-xs'>
                  {format(new Date(movie.release_date), "dd MMM, yyyy", {
                    locale: itLocale,
                  })}
                    </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {ID && (
      <DescrzioneAperto movieID={ID} />)}
    </div>
  );
};

export default TopFilm;
