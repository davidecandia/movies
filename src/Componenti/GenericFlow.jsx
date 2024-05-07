import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const GenericFlow = ({title,array}) => {


  return (
    <div className="max-w-5xl w-full mx-auto max-lg:p-4 ">
      <h1 className="font-bold text-4xl my-4">{title}</h1>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="flex space-x-4 p-4">
          {array.length > 0 && array.map((movie) => (
            <Link
              to={`/movies/movie/${movie.id}`}
              className="flex-none w-40 hover:scale-110 transition-all"
              key={movie.id}>
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt="No img"
                  className="rounded-lg"
                />
                <div className=" absolute top-2 right-2  h-9 w-9 flex justify-center items-center bg-zinc-800 rounded-full">
                  <p>{Math.round(movie.vote_average * 10) / 10}</p>
                </div>
                <div className=" text-white p-2 w-full text-center">
                  <h2 className="text-xs font-semibold whitespace-normal">
                    {movie.title}
                  </h2>
                  {
                    movie.release_date &&
                    <p className="text-xs">
                    {format(new Date(movie.release_date), "dd MMM, yyyy")}
                  </p>
                  }
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default GenericFlow;
