import React from "react";

const PROVIDER_CATEGORIES = [
  { key: "flatrate", label: "Streaming" },
  { key: "rent", label: "Noleggio" },
  { key: "buy", label: "Acquisto" },
  { key: "ads", label: "Con pubblicità" },
  { key: "free", label: "Gratis" },
];

const buildLogoUrl = (path) =>
  path ? `https://image.tmdb.org/t/p/w92${path}` : null;

const WatchProvidersSection = ({ providers, region = "IT" }) => {
  const regionData = providers?.[region];

  const hasAnyProvider = PROVIDER_CATEGORIES.some(
    ({ key }) => regionData?.[key]?.length
  );

  if (!regionData || !hasAnyProvider) {
    return (
      <section className="max-w-5xl w-full mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Dove guardarlo
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Non abbiamo informazioni sulle piattaforme disponibili in Italia.
        </p>
        {regionData?.link && (
          <a
            href={regionData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Scopri di più su JustWatch
          </a>
        )}
      </section>
    );
  }

  return (
    <section className="max-w-5xl w-full mx-auto px-4 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Dove guardarlo
          </h2>
          <p className="text-sm text-zinc-400">
            Disponibilità aggiornata per l'Italia
          </p>
        </div>
        {regionData.link && (
          <a
            href={regionData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Vedi su JustWatch
          </a>
        )}
      </div>

      <div className="mt-6 space-y-6">
        {PROVIDER_CATEGORIES.map(({ key, label }) => {
          const entries = regionData[key];
          if (!entries?.length) return null;

          return (
            <div key={key} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                {label}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {entries.map((provider) => {
                  const logoUrl = buildLogoUrl(provider.logo_path);
                  return (
                    <li
                      key={`${key}-${provider.provider_id}`}
                      className="flex min-w-[150px] flex-1 items-center gap-3 rounded-2xl bg-zinc-900/60 px-4 py-3 text-sm text-white transition-colors hover:bg-zinc-800/60"
                    >
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={provider.provider_name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-xs text-zinc-400">
                          N/A
                        </div>
                      )}
                      <span className="font-medium">{provider.provider_name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WatchProvidersSection;
