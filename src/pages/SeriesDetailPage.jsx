import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { cercaIDTV, videoTV, fetchWatchProviders } from "../utilities/funzioniApi";
import WatchProvidersSection from "../components/sections/WatchProvidersSection";
import { YoutubeIcon } from "../utilities/SVG";
import { formatAsItalianDate } from "../utilities/date";

const SeriesDetailPage = () => {
  const { ID: seriesID } = useParams();
  const [series, setSeries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const loadSeriesData = async () => {
      if (!seriesID) return;

      try {
        setIsLoading(true);
        const [seriesResponse, videosResponse, providersResponse] = await Promise.all([
          cercaIDTV({ movieID: seriesID }),
          videoTV({ movieID: seriesID }),
          fetchWatchProviders({ mediaID: seriesID, type: "tv" }),
        ]);

        setSeries(seriesResponse);
        setVideos(videosResponse);
        setProviders(providersResponse);
      } finally {
        setIsLoading(false);
      }
    };

    loadSeriesData();
  }, [seriesID]);

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

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center text-white">
        <p className="text-sm text-zinc-400">Caricamento in corso...</p>
      </section>
    );
  }

  if (!series) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center text-white">
        <p className="text-sm text-zinc-400">
          Impossibile trovare i dettagli della serie richiesta.
        </p>
      </section>
    );
  }

  return (
    <article className="text-white">
      <header className="relative flex min-h-[70vh] items-center">
        <div className="absolute inset-0">
          {series.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w1280${series.backdrop_path}`}
              alt={series.name}
              className="h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center">
          {series.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${series.poster_path}`}
              alt={series.name}
              className="h-80 w-56 rounded-3xl object-cover shadow-2xl md:h-[28rem] md:w-64"
            />
          )}

          <div className="flex flex-1 flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                Serie TV
              </p>
              <h1 className="text-3xl font-bold md:text-5xl">
                {series.name || series.original_name}
              </h1>
              <p className="mt-2 text-sm text-zinc-300">
                {formatAsItalianDate(series.first_air_date)}
                {series.number_of_seasons
                  ? ` • ${series.number_of_seasons} ${
                      series.number_of_seasons === 1 ? "stagione" : "stagioni"
                    }`
                  : ""}
                {series.number_of_episodes
                  ? ` • ${series.number_of_episodes} episodi`
                  : ""}
              </p>
            </div>

            {series.genres?.length ? (
              <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-zinc-200">
                {series.genres.map((genre) => (
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
                {series.vote_average
                  ? (Math.round(series.vote_average * 10) / 10).toFixed(1)
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
              <h2 className="text-lg font-semibold">Sinossi</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-200">
                {series.overview || "La sinossi non è disponibile in italiano."}
              </p>
            </div>
          </div>
        </div>
      </header>

      <WatchProvidersSection providers={providers} />
    </article>
  );
};

export default SeriesDetailPage;
