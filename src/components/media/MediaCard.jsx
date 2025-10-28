import React from "react";

const MediaCard = ({
  imageSrc,
  title,
  subtitle,
  badge,
  badgeLabel,
  orientation = "portrait",
}) => {
  const hasImage = Boolean(imageSrc);

  return (
    <article className="flex w-40 flex-col gap-2 text-white">
      <div className="relative">
        {hasImage ? (
          <img
            src={imageSrc}
            alt={title}
            className={`h-60 w-full rounded-xl object-cover ${
              orientation === "landscape" ? "h-32" : ""
            }`}
          />
        ) : (
          <div className="flex h-60 w-full items-center justify-center rounded-xl bg-zinc-800 text-sm text-zinc-400">
            Immagine non disponibile
          </div>
        )}
        {badge && (
          <div className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold">
            <span aria-label={badgeLabel}>{badge}</span>
          </div>
        )}
      </div>
      <div className="text-center text-xs">
        <h2 className="font-semibold leading-4 line-clamp-2">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-[11px] text-zinc-400 leading-4">{subtitle}</p>
        )}
      </div>
    </article>
  );
};

export default MediaCard;
