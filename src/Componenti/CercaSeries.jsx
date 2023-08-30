import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { cercaSerie } from '../utilities/funzioniApi';
import DescrzioneApertoTV from './DescrizioneApertoTV';
import { Link, useParams } from 'react-router-dom';

const CercaSerieTV = () => {
  const [serie, setSerie] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const { ID } = useParams();


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
            <Link to={`/movies/tv/${movie.id}`} className='flex-none w-40 hover:scale-110 transition-all' key={movie.id}>
              <div className='relative'>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='No img' className='rounded-lg ' />
                <div className=' absolute top-2 right-2 p-2 bg-zinc-800 rounded-full'>{movie.vote_average}</div>
                <div className=' text-white p-2 w-full text-center'>
                  <h2 className='text-xs font-semibold whitespace-normal'>{movie.name}</h2>
                  <p className='text-xs'>
                  {format(new Date(movie.first_air_date), "dd MMM, yyyy", {
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
        <DescrzioneApertoTV movieID={ID} />
  )}
    </div>
    </>
  );
};

export default CercaSerieTV;
