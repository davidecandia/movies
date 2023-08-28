import React, { useState, useEffect } from 'react';
import { cercaSerie } from '../utilities/funzioniApi';
import DescrzioneApertoTV from './DescrizioneApertoTV';


const CercaSerieTV = () => {
  const [serie, setSerie] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOverview, setSelectedOverview] = useState('');
  const [selectedMovieID, setSelectedMovieID] = useState();


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const filteredSerie = serie.filter((tv) =>
    tv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const findSerie = async () =>{
    const trovato = await cercaSerie(searchTerm);
    setSerie(trovato);
  }

  useEffect(() => {
    findSerie();
  }, [searchTerm]);


  const openOverview = (overview, movieID) => {
    setSelectedOverview(overview);
    setSelectedMovieID(movieID);
  };

  return (
    <>
    <div className='max-w-5xl w-full mx-auto '>
    <h1 className='font-bold text-4xl'>CERCA</h1>
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
          {filteredSerie.map((movie, index) => (
            <div className='flex-none w-40 hover:scale-110 transition-all' key={movie.id} onClick={() => openOverview(movie.overview, movie.id)}>
              <div className='relative'>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='No img' className='rounded-lg ' />
                <div className=' absolute top-2 right-2 p-2 bg-slate-500 rounded'>{movie.vote_average}</div>
                <div className=' text-white p-2 w-full text-center'>
                  <h2 className='text-xs font-semibold whitespace-normal'>{movie.name}</h2>
                  <p className='text-xs'>{movie.release_date}</p>
                </div>
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
    </>
  );
};

export default CercaSerieTV;
