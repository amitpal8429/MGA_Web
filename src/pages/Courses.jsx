import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { fetchCourseList } from "../lib/api";
import { toSlug } from "../lib/programs";
import CourseCard from "../components/CourseCard";
import { CourseGridSkeleton } from "../components/Skeletons";
import ErrorState from "../components/ErrorState";
import NotFound from "./NotFound";

const SITE_URL = "https://medicalglobalacademy.com";

export default function Courses() {
  const { type: typeSlug = "" } = useParams();
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);
  const [params, setParams] = useSearchParams();

  const urlQuery = params.get("q") || "";
  const activeCategory = params.get("category") || "";
  const legacyType = params.get("type") || ""; // purana ?type=Certificate

  const [searchText, setSearchText] = useState(urlQuery);
  const pushedRef = useRef(urlQuery);

  /* Search text ko debounce karke ?q= mein likhna */
  useEffect(() => {
    if (searchText === pushedRef.current) return undefined;

    const t = setTimeout(() => {
      pushedRef.current = searchText;

      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (searchText) next.set("q", searchText);
          else next.delete("q");
          return next;
        },
        { replace: true }
      );
    }, 250);

    return () => clearTimeout(t);
  }, [searchText]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Browser back/forward par URL ka q, input mein bhi aaye */
  useEffect(() => {
    if (urlQuery !== pushedRef.current) {
      pushedRef.current = urlQuery;
      setSearchText(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    fetchCourseList()
      .then((data) => {
        if (cancelled) return;
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const types = useMemo(() => {
    if (!courses) return [];
    return [...new Set(courses.map((c) => c.type).filter(Boolean))].sort();
  }, [courses]);

  /* URL ka type slug -> asli type name (data se). Jaise "pg-diploma" -> "Pg Diploma" */
  const activeType = useMemo(() => {
    if (!typeSlug) return "";
    const wanted = toSlug(typeSlug);
    return types.find((t) => toSlug(t) === wanted) || "";
  }, [types, typeSlug]);

  const categories = useMemo(() => {
    if (!courses) return [];
    const set = new Set(courses.map((c) => c.category?.name).filter(Boolean));
    return Array.from(set).sort();
  }, [courses]);

  const filtered = useMemo(() => {
    if (!courses) return [];
    const q = searchText.trim().toLowerCase();

    return courses.filter((c) => {
      if (activeType && (c.type || "").toLowerCase() !== activeType.toLowerCase()) {
        return false;
      }

      if (activeCategory && (c.category?.name || "") !== activeCategory) {
        return false;
      }

      if (q && !(c.name || "").toLowerCase().includes(q)) return false;

      return true;
    });
  }, [courses, searchText, activeType, activeCategory]);

  /* Tab ke links: type path mein, baaki filters query mein (q, category) */
  const buildSearch = (includeCategory = true) => {
    const next = new URLSearchParams(params);
    next.delete("type");

    if (searchText) next.set("q", searchText);
    else next.delete("q");

    if (!includeCategory) next.delete("category");

    const s = next.toString();
    return s ? `?${s}` : "";
  };

  const typeHref = (typeName) =>
    typeName
      ? `/courses/${toSlug(typeName)}${buildSearch()}`
      : `/courses${buildSearch()}`;

  function updateCategory(value) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set("category", value);
        else next.delete("category");
        return next;
      },
      { replace: true }
    );
  }

  /* Purana link: /courses?type=Certificate -> /courses/certificate */
  if (legacyType && !typeSlug) {
    const next = new URLSearchParams(params);
    next.delete("type");
    const s = next.toString();
    return (
      <Navigate
        replace
        to={{ pathname: `/courses/${toSlug(legacyType)}`, search: s ? `?${s}` : "" }}
      />
    );
  }

  /* Type slug galat hai (data load hone ke baad check) */
  if (typeSlug && courses !== null && !activeType) {
    return <NotFound />;
  }

  const canonical = activeType
    ? `${SITE_URL}/courses/${toSlug(activeType)}`
    : `${SITE_URL}/courses`;

  const title = activeType
    ? `${activeType} Programs | Medical Global Academy`
    : "All Programs | Medical Global Academy";

  const heading = activeType ? `${activeType} Programs` : "All programs";

  return (
    <section className="section catalog">
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="wrap">
        <div className="catalog-head">
          <p className="eyebrow eyebrow-sm">Full catalog</p>
          <h1>{heading}</h1>
          <p className="muted">
            {courses
              ? `${filtered.length} of ${courses.length} programs`
              : "Loading the catalog…"}
          </p>
        </div>

        <div className="catalog-controls">
          <div className="catalog-search-wrap">
            <Search size={17} className="catalog-search-icon" />
            <input
              type="search"
              placeholder="Search by program name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="catalog-search"
              aria-label="Search programs"
            />
          </div>

          <nav className="pill-row" aria-label="Program types">
            <Link
              to={typeHref("")}
              className={`pill ${!activeType ? "is-active" : ""}`}
              aria-current={!activeType ? "page" : undefined}
            >
              All types
            </Link>

            {types.map((t) => {
              const active = t === activeType;
              return (
                <Link
                  key={t}
                  to={typeHref(t)}
                  className={`pill ${active ? "is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {t}
                </Link>
              );
            })}
          </nav>

          {categories.length > 0 && (
            <select
              className="catalog-select"
              value={activeCategory}
              onChange={(e) => updateCategory(e.target.value)}
              aria-label="Filter by speciality"
            >
              <option value="">All specialities</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
        </div>

        {error && (
          <ErrorState message={error} onRetry={() => setTick((t) => t + 1)} />
        )}

        {!error && courses === null && <CourseGridSkeleton count={9} />}

        {!error && courses !== null && filtered.length === 0 && (
          <ErrorState
            title="No programs match that search"
            message="Try a different keyword or clear the filters."
          />
        )}

        {!error && courses !== null && filtered.length > 0 && (
          <div className="course-grid">
            {filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}