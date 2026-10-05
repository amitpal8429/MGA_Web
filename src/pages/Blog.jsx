import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { fetchPosts } from "../lib/api";
import { getBlogMeta } from "../lib/blogMeta";

function decodeEntities(html) {
  if (!html) return "";
  const el = document.createElement("textarea");
  el.innerHTML = html;
  return el.value;
}

function stripHtml(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").trim();
}

function formatPostDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Everything a card (and the search) needs from one post
function toCard(post) {
  const manualMeta = getBlogMeta(post.slug);

  const wpImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const title = manualMeta?.h1 || decodeEntities(post.title?.rendered);
  const excerptText = stripHtml(post.excerpt?.rendered);

  return {
    id: post.id ?? post.slug,
    slug: post.slug,
    date: post.date,
    img: manualMeta?.image || wpImage,
    title,
    excerpt: manualMeta?.description || excerptText.slice(0, 100) + "…",
    haystack: [title, manualMeta?.description, excerptText, post.slug]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PER_PAGE = 9;
const SEARCH_PER_PAGE = 50;
const SEARCH_MAX_PAGES = 60;
const MIN_QUERY_LENGTH = 2;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Search
  const [query, setQuery] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchPartial, setSearchPartial] = useState(false);

  const aliveRef = useRef(true);
  const searchStartedRef = useRef(false);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  /* Normal paginated list (Load More) */

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchPosts({ page, perPage: PER_PAGE })
      .then(({ data }) => {
        if (cancelled) return;
        if (!data || data.length < PER_PAGE) setHasMore(false);
        setPosts((prev) => (page === 1 ? data : [...prev, ...data]));
        setInitialLoading(false);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
        setLoading(false);
        setInitialLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  const handleLoadMore = () => setPage((p) => p + 1);

  /* Search: loads every article once, the first time someone types */

  const loadAllForSearch = useCallback(async () => {
    if (searchStartedRef.current) return;
    searchStartedRef.current = true;
    setSearchLoading(true);

    for (let p = 1; p <= SEARCH_MAX_PAGES; p += 1) {
      let batch = null;

      for (let attempt = 1; attempt <= 2 && batch === null; attempt += 1) {
        try {
          const res = await fetchPosts({ page: p, perPage: SEARCH_PER_PAGE });
          batch = res?.data || [];
        } catch (e) {
          if (e?.status === 400) {
            batch = []; // past the last page
          } else if (attempt < 2) {
            await wait(600);
          }
        }
      }

      if (batch === null) {
        if (aliveRef.current) setSearchPartial(true);
        break;
      }

      if (!batch.length) break;
      if (aliveRef.current) setAllPosts((prev) => [...prev, ...batch]);
      if (batch.length < SEARCH_PER_PAGE) break;
    }

    if (aliveRef.current) setSearchLoading(false);
  }, []);

  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length >= MIN_QUERY_LENGTH;

  useEffect(() => {
    if (isSearching) loadAllForSearch();
  }, [isSearching, loadAllForSearch]);

  // Pool = posts already on screen + everything loaded for search (no duplicates)
  const searchIndex = useMemo(() => {
    if (!isSearching) return [];

    const map = new Map();
    [...posts, ...allPosts].forEach((p) => {
      if (p?.slug && !map.has(p.slug)) map.set(p.slug, toCard(p));
    });
    return [...map.values()];
  }, [isSearching, posts, allPosts]);

  const results = useMemo(() => {
    if (!isSearching) return [];
    const words = trimmedQuery.toLowerCase().split(/\s+/).filter(Boolean);
    return searchIndex.filter((c) => words.every((w) => c.haystack.includes(w)));
  }, [isSearching, trimmedQuery, searchIndex]);

  const cards = isSearching ? results : posts.map(toCard);

  const clearSearch = () => setQuery("");

  if (error) return <p className="blog-status">Could not load blog: {error}</p>;
  if (initialLoading) return <p className="blog-status">Loading articles…</p>;

  return (
    <section className="blog-section">
      <div className="container">
        {/* SEARCH */}

        <div className="blog-search" role="search">
          <Search size={18} className="blog-search-icon" aria-hidden="true" />

          <input
            type="search"
            className="blog-search-input"
            placeholder="Search articles"
            aria-label="Search blog articles"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") clearSearch();
            }}
          />

          {query && (
            <button
              type="button"
              className="blog-search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {isSearching && (
          <p className="blog-search-status" aria-live="polite">
            {results.length} {results.length === 1 ? "article" : "articles"} found
            for “{trimmedQuery}”
            {searchLoading && " · searching all articles…"}
            {!searchLoading && searchPartial && " · some articles could not be searched"}
          </p>
        )}

        {/* GRID */}

        <div className="blog-grid">
          {cards.map((card) => (
            <Link key={card.id} to={`/blog/${card.slug}`} className="blog-card">
              <div className="blog-card-media">
                {card.img && <img src={card.img} alt={card.title} loading="lazy" />}
              </div>
              <div className="blog-card-body">
                {formatPostDate(card.date) && (
                  <time className="blog-card-date" dateTime={card.date}>
                    {formatPostDate(card.date)}
                  </time>
                )}
                <h3 className="blog-card-title">{card.title}</h3>
                <p className="blog-card-excerpt">{card.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        {isSearching && !searchLoading && results.length === 0 && (
          <div className="blog-search-empty">
            <p>No articles match “{trimmedQuery}”. Try a different keyword.</p>
            <button type="button" className="blog-loadmore" onClick={clearSearch}>
              Clear search
            </button>
          </div>
        )}

        {!isSearching && hasMore && (
          <div className="blog-loadmore-wrap">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="blog-loadmore"
            >
              {loading ? "Loading…" : "Load More"}
            </button>
          </div>
        )}

        {!isSearching && !hasMore && posts.length > 0 && (
          <p className="blog-end">You've reached the end ✦</p>
        )}
      </div>
    </section>
  );
}