import { useEffect, useState } from "react";
import { FaFacebookF, FaLink, FaLock } from "react-icons/fa";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import logo from "../assets/logo.webp";

const INITIAL_COUNT = 24;
const CARDS_PER_ROW = 6;

const TYPE_ORDER = ["mega", "super", "a", "b", "c", "c-"];

function sortByType(items) {
  return [...items].sort((a, b) => {
    const rankA = TYPE_ORDER.indexOf((a.type ?? "").toLowerCase());
    const rankB = TYPE_ORDER.indexOf((b.type ?? "").toLowerCase());
    const safeRankA = rankA === -1 ? TYPE_ORDER.length : rankA;
    const safeRankB = rankB === -1 ? TYPE_ORDER.length : rankB;
    return safeRankA - safeRankB;
  });
}

const LINK_OPTIONS = [
  { key: "orderLink", label: "Order online", Icon: FaLink },
  { key: "facebookLink", label: "Facebook", Icon: FaFacebookF },
  { key: "iosLink", label: "iOS app", Icon: FaApple },
  { key: "androidLink", label: "Android app", Icon: FaGooglePlay },
];

// Add manually maintained links here, keyed by restaurant ID from the API.
const MANUAL_LINKS = {};

function getExternalUrl(value) {
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

  const visibleRestaurants = expanded
    ? restaurants
    : restaurants.slice(0, INITIAL_COUNT);
  const rows = Array.from(
    { length: Math.ceil(visibleRestaurants.length / CARDS_PER_ROW) },
    (_, index) =>
      visibleRestaurants.slice(
        index * CARDS_PER_ROW,
        (index + 1) * CARDS_PER_ROW,
      ),
  );
  const showToggle = restaurants.length > INITIAL_COUNT;

  return (
    <main className="min-h-screen bg-section px-5 pb-16 pt-8 sm:px-8 sm:pt-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col items-center gap-8 text-center sm:mb-16">
          <a href="/" aria-label="Keeto home">
            <img src={logo} alt="Keeto" className="h-10 w-auto" />
          </a>
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Trusted by restaurants and cafés everywhere
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl">
              Our clients
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Explore the restaurants and cafés powered by Keeto. Visit their
              ordering pages and apps using the links on each card.
            </p>
          </div>
        </header>

        {loading ? (
          <div className="px-6 py-16 text-center text-sm text-gray-500">
            Loading restaurant partners...
          </div>
        ) : error ? (
          <div
            role="alert"
            className="px-6 py-16 text-center text-sm text-red-700"
          >
            {error}
          </div>
        ) : (
          <div className="overflow-hidden">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="overflow-hidden py-5">
                <div
                  className={`clients-marquee-track flex w-max gap-8 ${
                    rowIndex % 2 === 1 ? "reverse" : ""
                  }`}
                >
                  {[...row, ...row].map((restaurant, index) => {
                    const label =
                      restaurant.nameFr ||
                      restaurant.name ||
                      restaurant.nameAr ||
                      "Restaurant";

                    return (
                      <article
                        key={`${restaurant.id ?? restaurant.logo ?? label}-${index}`}
                        aria-hidden={index >= row.length ? "true" : undefined}
                        className="group flex min-h-72 w-[min(82vw,280px)] shrink-0 flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                      >
                        <div className="flex min-h-48 flex-1 items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 transition-colors duration-300 group-hover:border-primary/50">
                          {restaurant.logo ? (
                            <img
                              src={restaurant.logo}
                              alt={`${label} logo`}
                              loading="lazy"
                              className="max-h-44 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <span className="text-sm text-gray-500">
                              No logo
                            </span>
                          )}
                        </div>
                        <h2 className="mt-4 truncate text-center text-sm font-semibold text-secondary">
                          {label}
                        </h2>
                        <div className="mt-4 grid grid-cols-4 gap-2">
                          {LINK_OPTIONS.map(
                            ({ key, label: linkLabel, Icon }) => {
                              const href = getExternalUrl(
                                MANUAL_LINKS[restaurant.id]?.[key] ??
                                  restaurant[key],
                              );
                              const iconClassName =
                                "flex h-11 items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

                              return href ? (
                                <a
                                  key={key}
                                  href={href}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  aria-label={`${linkLabel} for ${label}`}
                                  title={linkLabel}
                                  tabIndex={index >= row.length ? -1 : undefined}
                                  className={`${iconClassName} border-gray-200 text-gray-600 hover:border-primary hover:bg-primary/10 hover:text-secondary`}
                                >
                                  <Icon aria-hidden="true" size={17} />
                                </a>
                              ) : (
                                <span
                                  key={key}
                                  aria-label={`${linkLabel} unavailable for ${label}`}
                                  title={`${linkLabel} unavailable`}
                                  className={`${iconClassName} cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300`}
                                >
                                  <FaLock aria-hidden="true" size={14} />
                                </span>
                              );
                            },
                          )}
                        </div>
                      </article>
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
                : `See ${restaurants.length - INITIAL_COUNT} more`}
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes clients-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .clients-marquee-track {
          animation: clients-marquee-scroll 14s linear infinite;
        }
        .clients-marquee-track.reverse {
          animation-direction: reverse;
          animation-duration: 20s;
        }
        .clients-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .clients-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
