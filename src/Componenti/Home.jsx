import React, { useState, useEffect } from 'react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const richiestaMovies = async () => {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=af658dd6`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setMovies(responseJson.Search || []);
  };

  useEffect(() => {
    richiestaMovies();
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
            <div className='flex-none w-40 hover:scale-110 transition-all' key={movie.imdbID}>
              <div className='relative'>
                <img src={movie.Poster} alt='No img' className='rounded-lg ' />
                <div className='absolute bottom-0 left-0 bg-black bg-opacity-60 text-white p-2 w-full text-center'>
                  <h2 className='text-xs font-semibold whitespace-normal'>{movie.Title}</h2>
                  <p className='text-xs'>{movie.Year}</p>
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
