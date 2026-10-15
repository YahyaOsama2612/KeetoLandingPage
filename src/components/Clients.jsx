import { useEffect, useState } from "react";
import { FaFacebookF, FaLink, FaLock, FaWhatsapp } from "react-icons/fa";
import { FaApple, FaGooglePlay } from "react-icons/fa6";

const INITIAL_COUNT = 24;

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
  { key: "andriodLink", label: "Android app", Icon: FaGooglePlay },
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
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileColumns, setMobileColumns] = useState(1);

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
        setTotalCount(
          typeof data?.data?.count === "number"
            ? data.data.count
            : items.length,
        );
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredRestaurants = normalizedSearch
    ? restaurants.filter((restaurant) =>
        [restaurant.name, restaurant.nameAr, restaurant.nameFr]
          .filter((name) => typeof name === "string")
          .some((name) => name.toLocaleLowerCase().includes(normalizedSearch)),
      )
    : restaurants;
  const visibleRestaurants = expanded
    ? filteredRestaurants
    : filteredRestaurants.slice(0, INITIAL_COUNT);
  const showToggle = filteredRestaurants.length > INITIAL_COUNT;

  return (
    <section
      id="clients"
      className="bg-section px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center sm:mb-12">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Trusted by restaurants and cafés everywhere
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl">
              Our clients <span className="text-accent">({totalCount})</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Explore the restaurants and cafés powered by Keeto. Visit their
              ordering pages and apps using the links on each card.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-md">
            <label htmlFor="client-search" className="sr-only">
              Search clients
            </label>
            <input
              id="client-search"
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setExpanded(false);
              }}
              placeholder="Search restaurants and cafés..."
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-secondary shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div
            role="group"
            aria-label="Client card layout on small screens"
            className="mt-4 inline-flex rounded-xl border border-gray-200 bg-white p-1"
          >
            {[1, 2].map((columns) => (
              <button
                key={columns}
                type="button"
                aria-pressed={mobileColumns === columns}
                onClick={() => setMobileColumns(columns)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold sm:text-sm ${
                  mobileColumns === columns
                    ? "bg-primary text-secondary"
                    : "text-gray-600 hover:text-secondary"
                }`}
              >
                {columns} {columns === 1 ? "card" : "cards"} per row
              </button>
            ))}
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
          <div
            className={`grid ${
              mobileColumns === 2
                ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            } gap-3 sm:gap-6`}
          >
            {visibleRestaurants.map((restaurant) => {
              const label =
                restaurant.nameFr ||
                restaurant.name ||
                restaurant.nameAr ||
                "Restaurant";

              return (
                <article
                  key={restaurant.id ?? restaurant.logo ?? label}
                  className={`flex flex-col rounded-[1.75rem] border border-white bg-white p-3 shadow-[0_12px_35px_rgba(17,24,39,0.08)] ring-1 ring-gray-200/70 sm:p-5 ${
                    mobileColumns === 2
                      ? "min-w-0"
                      : "min-h-72"
                  }`}
                >
                  <div
                    className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] border border-amber-100 bg-white p-1"
                  >
                    {restaurant.logo ? (
                      <img
                        src={restaurant.logo}
                        alt={`${label} logo`}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-500 sm:text-sm">
                        No logo
                      </span>
                    )}
                  </div>
                  <h2
                    className={`mt-3 truncate text-center font-semibold text-secondary sm:mt-4 sm:text-sm ${
                      mobileColumns === 2
                        ? "text-xs"
                        : "text-sm"
                    }`}
                  >
                    {label}
                  </h2>
                  <div
                    className={`mt-3 grid grid-cols-4 sm:mt-4 ${
                      mobileColumns === 2 ? "gap-1.5 sm:gap-2" : "gap-2"
                    }`}
                  >
                    {LINK_OPTIONS.map(({ key, label: linkLabel, Icon }) => {
                      const href = getExternalUrl(
                        MANUAL_LINKS[restaurant.id]?.[key] ?? restaurant[key],
                      );
                      const iconClassName =
                        `flex items-center justify-center rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                          mobileColumns === 2
                            ? "h-9 sm:h-11"
                            : "h-11"
                        }`;

                      return href ? (
                        <a
                          key={key}
                          href={href}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${linkLabel} for ${label}`}
                          title={linkLabel}
                          className={`${iconClassName} border-gray-200 text-gray-600 hover:border-primary hover:bg-primary/10 hover:text-secondary`}
                        >
                          <Icon
                            aria-hidden="true"
                            size={mobileColumns === 2 ? 15 : 17}
                          />
                        </a>
                      ) : (
                        <span
                          key={key}
                          aria-label={`${linkLabel} unavailable for ${label}`}
                          title={`${linkLabel} unavailable`}
                          className={`${iconClassName} cursor-not-allowed border-gray-100 bg-gray-50 text-gray-300`}
                        >
                          <FaLock
                            aria-hidden="true"
                            size={mobileColumns === 2 ? 12 : 14}
                          />
                        </span>
                      );
                    })}
                  </div>
                </article>
              );
            })}
            {visibleRestaurants.length === 0 && (
              <p className="col-span-full py-12 text-center text-sm text-gray-500">
                No restaurants or cafés match your search.
              </p>
            )}
          </div>
        )}

        {showToggle && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="rounded-full border border-primary bg-white px-6 py-3 text-sm font-semibold text-secondary hover:bg-primary hover:text-white"
            >
              {expanded
                ? "Show less"
                : `See ${filteredRestaurants.length - INITIAL_COUNT} more`}
            </button>
          </div>
        )}
      </div>
      <a
        href="https://wa.me/+201111771103"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Keeto on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg sm:bottom-8 sm:right-8"
      >
        <FaWhatsapp aria-hidden="true" size={28} />
      </a>
    </section>
  );
}
