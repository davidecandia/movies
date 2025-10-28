import React from "react";
import { Link } from "react-router-dom";
import MediaCard from "./MediaCard";

const MediaCarousel = ({
  title,
  items = [],
  getHref,
  getTitle,
  getSubtitle,
  getImage,
  getBadge,
  getBadgeLabel,
  emptyMessage = "Nessun elemento disponibile.",
  orientation = "portrait",
}) => {
  const renderItem = (item) => {
    const card = (
      <MediaCard
        imageSrc={getImage ? getImage(item) : undefined}
        title={getTitle ? getTitle(item) : ""}
        subtitle={getSubtitle ? getSubtitle(item) : ""}
        badge={getBadge ? getBadge(item) : undefined}
        badgeLabel={getBadgeLabel ? getBadgeLabel(item) : undefined}
        orientation={orientation}
      />
    );

    if (!getHref) {
      return card;
    }

    const href = getHref(item);
    if (!href) {
      return card;
    }

    return (
      <Link
        to={href}
        className="block transform transition-transform hover:scale-105">
        {card}
      </Link>
    );
  };

  return (
    <section className="max-w-5xl w-full mx-auto px-4 py-6">
      {title && (
        <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
      )}
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-zinc-400">{emptyMessage}</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <div className="flex gap-4 pb-4">
            {items.map((item) => (
              <div className="flex-none" key={item.id || item.name}>
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaCarousel;
