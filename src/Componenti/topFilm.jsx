import React, { useEffect, useState } from 'react';
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
      <h1 className='font-bold text-4xl'>TOP FILMS</h1>
      <div className='overflow-x-auto whitespace-nowrap'>
        <div className='flex space-x-4 p-4'>
          {films.map((movie) => (
            <Link to={`/movies/movie/${movie.id}`} className='flex-none w-40 hover:scale-110 transition-all' key={movie.id}>
              <div className='relative'>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='No img' className='rounded-lg' />
                <div className=' absolute top-2 right-2 p-2 bg-zinc-800 rounded-full'><p>{movie.vote_average}</p></div>
                <div className=' text-white p-2 w-full text-center'>
                  <h2 className='text-xs font-semibold whitespace-normal'>{movie.title}</h2>
                  <p className='text-xs'>{movie.release_date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {ID && (
      <DescrzioneAperto movieID={ID} />
        // <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80'>
        //   <div className='w-full h-auto relative'>
        //     <div className='flex justify-between items-center relative'>
        //       <button
        //         className='absolute top-10 right-5 z-20 text-2xl font-bold hover:px-1 hover:rounded-full hover:bg-white hover:text-black hover:transition-all'
        //       >
        //         Chiudi
        //       </button>
        //     </div>
        //     <br />
        //     <DescrzioneAperto movieID={ID} />
        //   </div>
        // </div>
      )}
    </div>
  );
};

export default TopFilm;
