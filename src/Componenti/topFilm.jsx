import React, { useEffect, useState } from 'react';

const TopFilm = () => {
  const [films, setFilms] = useState([]);
  const [selectedOverview, setSelectedOverview] = useState('');
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
    }
  };

  const richiestaFilm = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=it-IT&page=1&sort_by=popularity.desc';
    try {
      const response = await fetch(url, options);
      const responseJson = await response.json();
      setFilms(responseJson.results || []);
      console.log('risultato nuova api', responseJson.results);
    } catch (error) {
      console.error('Errore durante la richiesta API:', error);
    }
  };

  useEffect(() => {
    richiestaFilm();
  }, []);

  const openOverview = (overview) => {
    setSelectedOverview(overview);
  };
  return (
<div className='max-w-5xl w-full mx-auto mt-4'>
    <h1 className='font-bold text-4xl'>TOP FILMS</h1>
      <div className='overflow-x-auto whitespace-nowrap'>
        <div className='flex space-x-4 p-4'>
          {films.map((movie, index) => (
            <div className='flex-none w-40 hover:scale-110 transition-all' key={movie.id}  onClick={() => openOverview(movie.overview)} >
              <div className='relative'>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='No img' className='rounded-lg ' />
                <div className='absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 w-full text-center'>
                  <h2 className='text-xs font-semibold whitespace-normal'>{movie.title}</h2>
                  <p className='text-xs'>{movie.release_date}</p>
                </div>
              </div>
              <div className=' hidden w-full h-auto'>

              <h2 className='text-xs font-semibold whitespace-normal'>{movie.title}</h2>
              <h3 className='text-xs font-semibold whitespace-normal'>{movie.overview}</h3>
              </div>

            </div>
          ))}
        </div>
      </div>
      {selectedOverview && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-[#121212] rounded-lg p-4 w-[50%]'>
            <div className='flex justify-between items-center'>

            <h2 className='text-2xl font-bold whitespace-normal'>Descrizione:</h2>
            <button className='text-2xl font-bold  hover:px-1 hover:rounded-full hover:bg-white hover:text-black' onClick={() => setSelectedOverview('')}>Chiudi</button>
            </div>
            <br />
            <h3 className='text-lg font-semibold whitespace-normal leading-8 tracking-wide'>{selectedOverview}</h3>
          </div>
        </div>
      )}
    </div>
  );
};
  

export default TopFilm;