import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  cercaID,
  similarMovies,
  video as fetchMovieVideos,
} from "../utilities/funzioniApi";
import MediaCarousel from "../components/media/MediaCarousel";
import { YoutubeIcon } from "../utilities/SVG";
import { formatAsItalianDate, parseDateString } from "../utilities/date";

const MovieDetailPage = () => {
  const { ID: movieID } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const loadMovieData = async () => {
      if (!movieID) return;

      try {
        setIsLoading(true);
        const [movieResponse, videosResponse, similarResponse] =
          await Promise.all([
            cercaID({ movieID }),
            fetchMovieVideos({ movieID }),
            similarMovies({ movieID }),
          ]);

        setMovie(movieResponse);
        setVideos(videosResponse);
        setSimilar(similarResponse);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieData();
  }, [movieID]);

  const primaryVideoKey = useMemo(() => {
    if (!videos) return null;

    const allVideos = [
      ...(videos.responseJson?.results || []),
      ...(videos.responseJsonEn?.results || []),
    ];

    const trailer =
      allVideos.find((video) => video.type === "Trailer") || allVideos[0];

    return trailer?.key ?? null;
  }, [videos]);

  const italianReleaseDate = useMemo(() => {
    if (!movie) return null;

    const releaseDates = movie.release_dates?.results;
    if (!releaseDates?.length) {
      return movie.release_date || null;
    }

    const italyEntry = releaseDates.find(
      (entry) => entry.iso_3166_1 === "IT" && entry.release_dates?.length
    );

    if (!italyEntry) {
      return movie.release_date || null;
    }

    const sorted = [...italyEntry.release_dates].sort((a, b) => {
      const first = parseDateString(a.release_date);
      const second = parseDateString(b.release_date);

      if (first && second) {
        return first - second;
      }

      if (first) return -1;
      if (second) return 1;
      return 0;
    });

    return sorted[0]?.release_date || movie.release_date || null;
  }, [movie]);

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center text-white">
        <p className="text-sm text-zinc-400">Caricamento in corso...</p>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center text-white">
        <p className="text-sm text-zinc-400">
          Impossibile trovare i dettagli del film richiesto.
        </p>
      </section>
    );
  }

  return (
    <article className="text-white">
      <header className="relative flex min-h-[70vh] items-center">
        <div className="absolute inset-0">
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="h-80 w-56 rounded-3xl object-cover shadow-2xl md:h-[28rem] md:w-64"
            />
          )}

          <div className="flex flex-1 flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                Film
              </p>
              <h1 className="text-3xl font-bold md:text-5xl">
                {movie.title || movie.original_title}
              </h1>
              <p className="mt-2 text-sm text-zinc-300">
                {formatAsItalianDate(
                  italianReleaseDate || movie.release_date
                )}
                {movie.runtime ? ` • ${movie.runtime} minuti` : ""}
              </p>
            </div>

            {movie.genres?.length ? (
              <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-zinc-200">
                {movie.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="rounded-full border border-white/20 px-3 py-1"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-zinc-400">Genere non disponibile</p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-black">
                {movie.vote_average
                  ? (Math.round(movie.vote_average * 10) / 10).toFixed(1)
                  : "N.D."}
              </span>

              {primaryVideoKey && (
                <a
                  href={`https://www.youtube.com/watch?v=${primaryVideoKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  <YoutubeIcon />
                  Guarda il trailer
                </a>
              )}
            </div>

            <div className="max-w-2xl">
              <h2 className="text-lg font-semibold">Trama</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-200">
                {movie.overview || "La trama non è disponibile in italiano."}
              </p>
            </div>
          </div>
        </div>
      </header>

      <MediaCarousel
        title="Film simili"
        items={similar}
        emptyMessage="Non sono disponibili suggerimenti simili."
        getHref={(item) => `/movies/movie/${item.id}`}
        getTitle={(item) => item.title}
        getSubtitle={(item) => formatAsItalianDate(item.release_date)}
        getImage={(item) =>
          item.poster_path
            ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
            : undefined
        }
        getBadge={(item) =>
          item.vote_average
            ? (Math.round(item.vote_average * 10) / 10).toFixed(1)
            : undefined
        }
        getBadgeLabel={() => "Valutazione media"}
      />
    </article>
  );
};

export default MovieDetailPage;
