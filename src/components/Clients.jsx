import { useEffect, useState } from "react";

const INITIAL_ROWS = 4;
const EXPANDED_ROWS = 8;
const COLUMNS_PER_ROW = 6;
const VISIBLE_COUNT = INITIAL_ROWS * COLUMNS_PER_ROW;
const EXPANDED_COUNT = EXPANDED_ROWS * COLUMNS_PER_ROW;

export default function Clients() {
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
        setRestaurants(items);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const visibleCount = expanded
    ? Math.min(EXPANDED_COUNT, restaurants.length)
    : Math.min(VISIBLE_COUNT, restaurants.length);
  const visibleRestaurants = restaurants.slice(0, visibleCount);
  const rowCount = Math.ceil(visibleRestaurants.length / COLUMNS_PER_ROW);
  const rows = Array.from({ length: rowCount }, (_, rowIndex) =>
    visibleRestaurants.slice(
      rowIndex * COLUMNS_PER_ROW,
      rowIndex * COLUMNS_PER_ROW + COLUMNS_PER_ROW,
    ),
  );
  const showToggle = restaurants.length > VISIBLE_COUNT;

  return (
    <section id="clients" className="reveal py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-10">
          Trusted by restaurants and cafés everywhere
        </p>

        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-gray-500">
            Loading restaurant partners...
          </div>
        ) : error ? (
          <div className="px-6 py-10 text-center text-sm text-red-700">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="overflow-hidden">
                <div
                  className={`flex gap-4 w-max marquee-track ${rowIndex % 2 === 1 ? "reverse" : ""}`}
                >
                  {[...row, ...row].map((restaurant, index) => {
                    const href = restaurant.orderLink?.startsWith("http")
                      ? restaurant.orderLink
                      : null;
                    const label =
                      restaurant.nameFr ||
                      restaurant.name ||
                      restaurant.nameAr ||
                      "Restaurant logo";

                    return (
                      <a
                        key={`${rowIndex}-${restaurant.logo ?? label}-${index}`}
                        href={href ?? "#contact"}
                        target={href ? "_blank" : undefined}
                        rel={href ? "noreferrer noopener" : undefined}
                        className="flex items-center justify-center shrink-0 px-4 py-3 transition-transform duration-300 hover:scale-105"
                        style={{ width: 220, height: 110 }}
                      >
                        {restaurant.logo ? (
                          <img
                            src={restaurant.logo}
                            alt={label}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-sm text-gray-500">No logo</span>
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {showToggle && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="rounded-full border border-primary bg-white px-6 py-3 text-sm font-semibold text-secondary shadow-sm transition hover:bg-primary hover:text-white"
            >
              {expanded
                ? "Show less"
                : `See ${Math.min(EXPANDED_COUNT, restaurants.length) - VISIBLE_COUNT} more`}
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 14s linear infinite;
        }
        .marquee-track.reverse {
          animation-direction: reverse;
          animation-duration: 20s;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
