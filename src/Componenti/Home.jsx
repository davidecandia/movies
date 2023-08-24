import React, { useState, useEffect } from 'react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWE3ZmIyMWYxMTIwOTcyMzIwZTMzODI5YmMxMmJhZiIsInN1YiI6IjY0ZTczMzFmMDZmOTg0MDBlYjVmMWJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRRsWsLuNHtuPWTo_eeQH7jMC8lbW-P9AJzb3p9QHbY'
    }
  };

  const cercaMovies = async () => {
    const url = 'https://api.themoviedb.org/3/search/movie?query=atom&include_adult=false&language=it-IT';
    try {
      const response = await fetch(url, options);
      const responseJson = await response.json();

    setMovies(responseJson.results || []);
    console.log('risultato cerca', responseJson.results);
    } catch (error) {
      console.error('Errore durante la richiesta API:', error);
    }
  };

  useEffect(() => {
    cercaMovies();
  }, [searchTerm]);

  return (
    <div className='max-w-5xl w-full mx-auto '>
      <h1 className='text-2xl font-bold mb-4'>Cerca Film</h1>
      <div className='mb-4 transition-all'>
        <input
          type='text'
          placeholder='Cerca...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='px-2 py-1 border border-gray-300 rounded-lg w-40 text-black transition-all'
        />
      </div>
      <div className='overflow-x-auto whitespace-nowrap'>
        <div className='flex space-x-4 p-4'>
          {filteredMovies.map((movie, index) => (
            <div className='flex-none w-40 hover:scale-110 transition-all' key={movie.id}>
              <div className='relative'>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='No img' className='rounded-lg ' />
                <div className='absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 w-full text-center'>
                  <h2 className='text-xs font-semibold whitespace-normal'>{movie.title}</h2>
                  <p className='text-xs'>{movie.release_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
