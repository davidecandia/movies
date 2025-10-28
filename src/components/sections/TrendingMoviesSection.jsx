import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { fetchTopFilms } from "../../utilities/funzioniApi";
import MediaCarousel from "../media/MediaCarousel";

const TrendingMoviesSection = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        setIsLoading(true);
        const filmsData = await fetchTopFilms();
        setMovies(filmsData);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return undefined;
    try {
      return format(new Date(dateString), "dd MMM yyyy", { locale: itLocale });
    } catch (error) {
      return undefined;
    }
  };

  return (
    <MediaCarousel
      title="Film in tendenza"
      items={isLoading ? [] : movies}
      emptyMessage={
        isLoading
          ? "Caricamento dei film in tendenza..."
          : "Nessun film disponibile al momento."
      }
      getHref={(movie) => `/movies/movie/${movie.id}`}
      getTitle={(movie) => movie.title}
      getSubtitle={(movie) => formatDate(movie.release_date)}
      getImage={(movie) =>
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
          : undefined
      }
      getBadge={(movie) =>
        movie.vote_average ? (Math.round(movie.vote_average * 10) / 10).toFixed(1) : undefined
      }
      getBadgeLabel={() => "Valutazione media"}
    />
  );
};

export default TrendingMoviesSection;
