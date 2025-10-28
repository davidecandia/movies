import React, { useEffect, useState } from "react";
import { fetchTopSerie } from "../../utilities/funzioniApi";
import MediaCarousel from "../media/MediaCarousel";
import { formatAsItalianDate } from "../../utilities/date";

const TrendingSeriesSection = () => {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTrendingSeries = async () => {
      try {
        setIsLoading(true);
        const serieData = await fetchTopSerie();
        setSeries(serieData);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrendingSeries();
  }, []);

  return (
    <MediaCarousel
      title="Serie TV in tendenza"
      items={isLoading ? [] : series}
      emptyMessage={
        isLoading
          ? "Caricamento delle serie in tendenza..."
          : "Nessuna serie disponibile al momento."
      }
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
  );
};

export default TrendingSeriesSection;
