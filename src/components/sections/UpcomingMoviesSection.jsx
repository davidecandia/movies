import React, { useEffect, useMemo, useState } from "react";
import { fetchUpcomingMovies } from "../../utilities/funzioniApi";
import MediaCarousel from "../media/MediaCarousel";
import { formatAsItalianDate, daysUntilDate } from "../../utilities/date";

const UpcomingMoviesSection = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUpcomingMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUpcomingMovies();
        setMovies(response);
      } finally {
        setIsLoading(false);
      }
    };

    loadUpcomingMovies();
  }, []);

  const formatRelativeDays = (dateString) => {
    const diff = daysUntilDate(dateString);
    if (diff === null) return undefined;

    if (diff < 0) return "Disponibile";
    if (diff === 0) return "Oggi";
    if (diff === 1) return "Domani";
    return `Tra ${diff} giorni`;
  };

  const items = useMemo(() => {
    return [...movies]
      .filter((movie) => movie.release_date)
      .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
      .slice(0, 15);
  }, [movies]);

  return (
    <MediaCarousel
      title="Film in arrivo"
      items={isLoading ? [] : items}
      emptyMessage={
        isLoading
          ? "Caricamento dei prossimi film in arrivo..."
          : "Non ci sono uscite imminenti da mostrare."
      }
      getHref={(movie) => `/movies/movie/${movie.id}`}
      getTitle={(movie) => movie.title}
      getSubtitle={(movie) => formatAsItalianDate(movie.release_date)}
      getImage={(movie) =>
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
          : undefined
      }
      getBadge={(movie) => formatRelativeDays(movie.release_date)}
      getBadgeLabel={() => "Tempo al debutto"}
    />
  );
};

export default UpcomingMoviesSection;
