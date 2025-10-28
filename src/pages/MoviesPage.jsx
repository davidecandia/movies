import React, { useCallback, useState } from "react";
import { cercaMovies } from "../utilities/funzioniApi";
import SearchBar from "../components/common/SearchBar";
import MediaCarousel from "../components/media/MediaCarousel";
import UpcomingMoviesSection from "../components/sections/UpcomingMoviesSection";
import TrendingMoviesSection from "../components/sections/TrendingMoviesSection";
import TrendingPeopleSection from "../components/sections/TrendingPeopleSection";
import { formatAsItalianDate } from "../utilities/date";

const MoviesPage = () => {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = useCallback(
    async (term) => {
      const query = term.trim();
      setLastQuery(query);

      if (!query) {
        setResults([]);
        return;
      }

      try {
        setIsSearching(true);
        const trovati = await cercaMovies(query);
        setResults(trovati);
      } finally {
        setIsSearching(false);
      }
    },
    [setResults]
  );

  const shouldShowResults = lastQuery && !isSearching && results.length > 0;

  return (
    <main className="flex flex-col gap-12 pb-16">
      <section className="max-w-5xl w-full mx-auto px-4 pt-8 text-white">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Esplora
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">
              Trova il film perfetto
            </h1>
          </div>

          <SearchBar
            onSubmit={handleSearch}
            placeholder="Cerca un film per titolo..."
            submitLabel="Cerca"
          />

          {isSearching && (
            <p className="text-sm text-zinc-400">Ricerca in corso...</p>
          )}

          {!isSearching && lastQuery && results.length === 0 && (
            <p className="text-sm text-zinc-400">
              Nessun risultato trovato per &ldquo;{lastQuery}&rdquo;.
            </p>
          )}
        </div>

        {shouldShowResults && (
          <MediaCarousel
            title={`Risultati per “${lastQuery}”`}
            items={results}
            getHref={(movie) => `/movies/movie/${movie.id}`}
            getTitle={(movie) => movie.title}
            getSubtitle={(movie) => formatAsItalianDate(movie.release_date)}
            getImage={(movie) =>
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : undefined
            }
            getBadge={(movie) =>
              movie.vote_average
                ? (Math.round(movie.vote_average * 10) / 10).toFixed(1)
                : undefined
            }
            getBadgeLabel={() => "Valutazione media"}
          />
        )}
      </section>

      <UpcomingMoviesSection />
      <TrendingMoviesSection />
      <TrendingPeopleSection />
    </main>
  );
};

export default MoviesPage;
