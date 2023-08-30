import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { fetchTopSerie } from '../utilities/funzioniApi';
import CercaSerieTV from './CercaSeries';
import DescrzioneApertoTV from './DescrizioneApertoTV';
import { Link, useParams } from 'react-router-dom';
const Serie = () => {
  const [serie, setSerie] = useState([]);


  const { ID } = useParams();

  const topSerie = async () => {
    const serieData = await fetchTopSerie(); 
    setSerie(serieData);
  };

  useEffect(() => {
    topSerie();
  }, []);


  return (
<>
<div className='max-w-5xl w-full mx-auto mt-4'>
    <h1 className='font-bold text-4xl'>TOP SERIE TV</h1>
      <div className='overflow-x-auto whitespace-nowrap'>
        <div className='flex space-x-4 p-4'>
          {serie.map((movie, index) => (
            <Link to={`/movies/tv/${movie.id}`} className='flex-none w-40 hover:scale-110 transition-all' key={movie.id}>
              <div className='relative'>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='No img' className='rounded-lg ' />
                <div className=' absolute top-2 right-2 p-2 bg-zinc-800 rounded-full'>{movie.vote_average}</div>
                <div className=' text-white p-2 w-full text-center'>
                  <h2 className='text-xs font-semibold whitespace-normal'>{movie.original_name}</h2>
                  <p className='text-xs'>
                  {format(new Date(movie.first_air_date), "dd MMM, yyyy", {
                    locale: itLocale,
                  })}
                    </p>
                </div>
              </div>
              <div className=' hidden w-full h-auto'>

              <h2 className='text-xs font-semibold whitespace-normal'>{movie.original_name}</h2>
              <h3 className='text-xs font-semibold whitespace-normal'>{movie.overview}</h3>
              </div>

            </Link>
          ))}
        </div>
      </div>
      {ID && (
      <DescrzioneApertoTV movieID={ID} />
  )}
    </div>
    <CercaSerieTV/>
    </>
  );
};
  

export default Serie;