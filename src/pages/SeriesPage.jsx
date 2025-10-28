import React, { useCallback, useState } from "react";
import { cercaSerie } from "../utilities/funzioniApi";
import SearchBar from "../components/common/SearchBar";
import MediaCarousel from "../components/media/MediaCarousel";
import UpcomingSeriesSection from "../components/sections/UpcomingSeriesSection";
import TrendingSeriesSection from "../components/sections/TrendingSeriesSection";
import { formatAsItalianDate } from "../utilities/date";

const SeriesPage = () => {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = useCallback(async (term) => {
    const query = term.trim();
    setLastQuery(query);

    if (!query) {
      setResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const trovate = await cercaSerie(query);
      setResults(trovate);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const shouldShowResults = lastQuery && !isSearching && results.length > 0;

  return (
    <main className="flex flex-col gap-12 pb-16">
      <section className="max-w-5xl w-full mx-auto px-4 pt-8 text-white">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Scopri
            </p>
            <h1 className="text-3xl font-bold md:text-4xl">
              Le serie TV che amerai
            </h1>
          </div>

          <SearchBar
            onSubmit={handleSearch}
            placeholder="Cerca una serie per titolo..."
            submitLabel="Cerca"
          />

          {isSearching && (
            <p className="text-sm text-zinc-400">Ricerca in corso...</p>
          )}

          {!isSearching && lastQuery && results.length === 0 && (
            <p className="text-sm text-zinc-400">
              Nessuna serie trovata per &ldquo;{lastQuery}&rdquo;.
            </p>
          )}
        </div>

        {shouldShowResults && (
          <MediaCarousel
            title={`Risultati per “${lastQuery}”`}
            items={results}
            getHref={(serie) => `/movies/tv/${serie.id}`}
            getTitle={(serie) => serie.name || serie.original_name}
            getSubtitle={(serie) => formatAsItalianDate(serie.first_air_date)}
            getImage={(serie) =>
              serie.poster_path
                ? `https://image.tmdb.org/t/p/w300${serie.poster_path}`
                : undefined
            }
            getBadge={(serie) =>
              serie.vote_average
                ? (Math.round(serie.vote_average * 10) / 10).toFixed(1)
                : undefined
            }
            getBadgeLabel={() => "Valutazione media"}
          />
        )}
      </section>

      <UpcomingSeriesSection />
      <TrendingSeriesSection />
    </main>
  );
};

export default SeriesPage;
