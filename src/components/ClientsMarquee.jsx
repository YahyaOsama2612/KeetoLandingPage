import { useEffect, useState } from "react";

const INITIAL_COUNT = 24;
const CLIENTS_PER_ROW = 8;
const TYPE_ORDER = ["mega", "super", "a", "b", "c", "c-"];

function sortByType(items) {
  return [...items].sort((first, second) => {
    const firstValue =
      typeof first.type === "string" ? first.type.trim().toLowerCase() : "";
    const secondValue =
      typeof second.type === "string" ? second.type.trim().toLowerCase() : "";
    const firstType = TYPE_ORDER.indexOf(firstValue);
    const secondType = TYPE_ORDER.indexOf(secondValue);
    return (firstType === -1 ? TYPE_ORDER.length : firstType) -
      (secondType === -1 ? TYPE_ORDER.length : secondType);
  });
}

function getOrderUrl(value) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export default function ClientsMarquee() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://keetobcknd.keeto.org/api/user/landing-page/restaurants", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load restaurant data");
        return res.json();
      })
      .then((data) => {
        const items = data?.data?.data ?? [];
        setRestaurants(sortByType(items));
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const clients = restaurants;
  const visibleClients = expanded
    ? clients
    : clients.slice(0, INITIAL_COUNT);
  const rows = [];
  for (let index = 0; index < visibleClients.length; index += CLIENTS_PER_ROW) {
    rows.push(visibleClients.slice(index, index + CLIENTS_PER_ROW));
  }
  const showMore = clients.length > INITIAL_COUNT;

  return (
    <section
      aria-labelledby="clients-grid-title"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
            Growing together with Keeto
          </p>
          <h2
            id="clients-grid-title"
            className="text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl"
          >
            Some of our restaurant partners
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Meet the restaurants and cafés powered by Keeto.
          </p>
        </header>

        {loading ? (
          <p className="py-12 text-center text-sm text-gray-500">
            Loading restaurant partners...
          </p>
        ) : error ? (
          <p role="alert" className="py-12 text-center text-sm text-red-700">
            {error}
          </p>
        ) : clients.length === 0 ? (
          <p className="py-12 text-center text-sm text-gray-500">
            No restaurant partners are available right now.
          </p>
        ) : (
          <div className="clients-marquee-rows" aria-label="Restaurant partners">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="clients-marquee"
                role="list"
                aria-label={`Restaurant partner row ${rowIndex + 1}`}
              >
                <div
                  className={`clients-marquee-track ${
                    rowIndex % 2 === 0
                      ? "clients-marquee-track-right"
                      : "clients-marquee-track-left"
                  }`}
                >
                  {[0, 1].map((copy) => (
                    <div
                      key={copy}
                      className="clients-marquee-group"
                      aria-hidden={copy === 1}
                    >
                      {row.map((restaurant, clientIndex) => {
                        const name =
                          restaurant.nameFr ||
                          restaurant.name ||
                          restaurant.nameAr ||
                          "Restaurant";
                        const orderUrl = getOrderUrl(restaurant.orderLink);
                        const clientKey =
                          restaurant.id ?? restaurant.logo ?? name;

                        return (
                          <article
                            key={`${clientKey}-${clientIndex}`}
                            role="listitem"
                            className="w-44 shrink-0 overflow-hidden rounded-3xl border-2 border-amber-100 bg-white shadow-[0_12px_35px_rgba(17,24,39,0.08)] sm:w-60"
                          >
                            <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-white">
                              {restaurant.logo ? (
                                orderUrl ? (
                                  <a
                                    href={orderUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Order from ${name}`}
                                    className="h-full w-full"
                                  >
                                    <img
                                      src={restaurant.logo}
                                      alt={`${name} logo`}
                                      loading="lazy"
                                      className="h-full w-full object-cover"
                                    />
                                  </a>
                                ) : (
                                  <img
                                    src={restaurant.logo}
                                    alt={`${name} logo`}
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                  />
                                )
                              ) : (
                                <span className="text-center text-xs text-gray-500">
                                  No logo
                                </span>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {showMore && !loading && !error && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((previous) => !previous)}
              className="rounded-full border border-primary bg-white px-6 py-3 text-sm font-semibold text-secondary hover:bg-primary hover:text-white"
            >
              {expanded
                ? "Show less"
                : `See ${clients.length - INITIAL_COUNT} more`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
