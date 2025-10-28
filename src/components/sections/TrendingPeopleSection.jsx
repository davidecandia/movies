import React, { useEffect, useState } from "react";
import { peopleApi } from "../../utilities/funzioniApi";
import MediaCarousel from "../media/MediaCarousel";

const TrendingPeopleSection = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrendingPeople = async () => {
      try {
        setIsLoading(true);
        const response = await peopleApi();
        setPeople(response);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingPeople();
  }, []);

  return (
    <MediaCarousel
      title="Artisti in tendenza"
      items={isLoading ? [] : people}
      emptyMessage={
        isLoading
          ? "Caricamento dei profili in tendenza..."
          : "Nessun artista disponibile al momento."
      }
      getHref={(person) => `/people/${person.id}`}
      getTitle={(person) => person.name}
      getSubtitle={(person) => person.known_for_department}
      getImage={(person) =>
        person.profile_path
          ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
          : undefined
      }
      getBadge={(person) =>
        person.popularity
          ? (Math.round(person.popularity * 10) / 10).toFixed(1)
          : undefined
      }
      getBadgeLabel={() => "Indice di popolarità"}
    />
  );
};

export default TrendingPeopleSection;
