import React, { useEffect, useMemo, useState } from "react";
import { fetchUpcomingSeries } from "../../utilities/funzioniApi";
import MediaCarousel from "../media/MediaCarousel";
import { formatAsItalianDate, daysUntilDate } from "../../utilities/date";

const UpcomingSeriesSection = () => {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUpcomingSeries = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUpcomingSeries();
        setSeries(response);
      } finally {
        setIsLoading(false);
      }
    };

    loadUpcomingSeries();
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
    return [...series]
      .filter((item) => item.first_air_date)
      .sort((a, b) => new Date(a.first_air_date) - new Date(b.first_air_date))
      .slice(0, 15);
  }, [series]);

  return (
    <MediaCarousel
      title="Serie TV in arrivo"
      items={isLoading ? [] : items}
      emptyMessage={
        isLoading
          ? "Caricamento delle prossime serie in arrivo..."
          : "Non ci sono nuove serie in programmazione."
      }
      getHref={(serie) => `/movies/tv/${serie.id}`}
      getTitle={(serie) => serie.name || serie.original_name}
      getSubtitle={(serie) => formatAsItalianDate(serie.first_air_date)}
      getImage={(serie) =>
        serie.poster_path
          ? `https://image.tmdb.org/t/p/w300${serie.poster_path}`
          : undefined
      }
      getBadge={(serie) => formatRelativeDays(serie.first_air_date)}
      getBadgeLabel={() => "Tempo alla messa in onda"}
    />
  );
};

export default UpcomingSeriesSection;
