import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  descrizionePeople,
  moviesPeopleApi,
} from "../utilities/funzioniApi";
import MediaCarousel from "../components/media/MediaCarousel";
import { formatAsItalianDate } from "../utilities/date";

const PersonDetailPage = () => {
  const { ID: personID } = useParams();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPersonData = async () => {
      if (!personID) return;

      try {
        setIsLoading(true);
        const [personResponse, creditsResponse] = await Promise.all([
          descrizionePeople({ peopleID: personID }),
          moviesPeopleApi({ peopleID: personID }),
        ]);

        setPerson(personResponse);
        setCredits(creditsResponse);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersonData();
  }, [personID]);

  const formattedBirthday = useMemo(() => {
    const date = person?.responseJson?.birthday;
    if (!date) return null;
    return formatAsItalianDate(date);
  }, [person]);

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center text-white">
        <p className="text-sm text-zinc-400">Caricamento in corso...</p>
      </section>
    );
  }

  if (!person) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center text-white">
        <p className="text-sm text-zinc-400">
          Impossibile trovare i dettagli richiesti.
        </p>
      </section>
    );
  }

  const personData = person.responseJson;
  const biography =
    personData.biography || person.responseJsonEn?.biography || "";

  return (
    <article className="text-white">
      <header className="relative flex min-h-[60vh] items-center">
        <div className="absolute inset-0">
          {personData.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w780${personData.profile_path}`}
              alt={personData.name}
              className="h-full w-full object-cover blur-lg brightness-50"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center">
          {personData.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${personData.profile_path}`}
              alt={personData.name}
              className="h-80 w-56 rounded-3xl object-cover shadow-2xl md:h-[28rem] md:w-64"
            />
          )}

          <div className="flex flex-1 flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                Persona
              </p>
              <h1 className="text-3xl font-bold md:text-5xl">
                {personData.name}
              </h1>
              <p className="mt-2 text-sm text-zinc-300">
                {personData.known_for_department}
                {formattedBirthday ? ` • Nato il ${formattedBirthday}` : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-white px-4 py-1 text-sm font-semibold text-black">
                {personData.popularity
                  ? (Math.round(personData.popularity * 10) / 10).toFixed(1)
                  : "N.D."}
              </span>
            </div>

            <div className="max-w-2xl">
              <h2 className="text-lg font-semibold">Biografia</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-200">
                {biography || "La biografia non è disponibile in italiano."}
              </p>
            </div>

            {personData.homepage && (
              <a
                href={personData.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:border-white hover:bg-white hover:text-black"
              >
                Visita il sito ufficiale
              </a>
            )}
          </div>
        </div>
      </header>

      <MediaCarousel
        title="Film in cui compare"
        items={credits}
        emptyMessage="Non ci sono film associati a questo artista."
        getHref={(item) => (item.id ? `/movies/movie/${item.id}` : null)}
        getTitle={(item) => item.title || item.original_title}
        getSubtitle={(item) => {
          if (!item.release_date) return undefined;
          try {
            return formatAsItalianDate(item.release_date);
          } catch (error) {
            return undefined;
          }
        }}
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

export default PersonDetailPage;
