import React, { useEffect, useState } from 'react';
import { fetchTopSerie } from '../utilities/funzioniApi';
import CercaSerieTV from './CercaSeries';
import DescrzioneApertoTV from './DescrizioneApertoTV';

const Serie = () => {
  const [serie, setSerie] = useState([]);
  const [selectedOverview, setSelectedOverview] = useState('');
  const [selectedMovieID, setSelectedMovieID] = useState();

  
  const topSerie = async () => {
    const serieData = await fetchTopSerie(); 
    setSerie(serieData);
  };

  useEffect(() => {
    topSerie();
  }, []);


  const openOverview = (overview, movieID) => {
    setSelectedOverview(overview);
    setSelectedMovieID(movieID);
  };
  return (
<>
<div className='max-w-5xl w-full mx-auto mt-4'>
    <h1 className='font-bold text-4xl'>TOP SERIE TV</h1>
      <div className='overflow-x-auto whitespace-nowrap'>
        <div className='flex space-x-4 p-4'>
          {serie.map((movie, index) => (
            <div className='flex-none w-40 hover:scale-110 transition-all' key={movie.id}  onClick={() => openOverview(movie.overview, movie.id)} >
              <div className='relative'>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='No img' className='rounded-lg ' />
                <div className=' absolute top-2 right-2 p-2 bg-slate-500 rounded'>{movie.vote_average}</div>
                <div className=' text-white p-2 w-full text-center'>
                  <h2 className='text-xs font-semibold whitespace-normal'>{movie.original_name}</h2>
                  <p className='text-xs'>{movie.first_air_date}</p>
                </div>
              </div>
              <div className=' hidden w-full h-auto'>

              <h2 className='text-xs font-semibold whitespace-normal'>{movie.original_name}</h2>
              <h3 className='text-xs font-semibold whitespace-normal'>{movie.overview}</h3>
              </div>

            </div>
          ))}
        </div>
      </div>
      {selectedOverview && (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-5'>
      <div className='bg-[#121212] w-full h-auto relative'>
        <div className='flex justify-between items-center'>
          <button
            className='absolute top-10 right-5 z-20 text-2xl font-bold  hover:px-1 hover:rounded-full hover:bg-white hover:text-black'
            onClick={() => setSelectedOverview('')}
          >
            Chiudi
          </button>
        </div>
        <br />
        <DescrzioneApertoTV movieID={selectedMovieID} /> {/* Passa movieID come prop */}
      </div>
    </div>
  )}
    </div>
    <CercaSerieTV/>
    </>
  );
};
  

export default Serie;