import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { fetchCourseList } from "../lib/api";
import CourseCard from "../components/CourseCard";
import { CourseGridSkeleton } from "../components/Skeletons";
import ErrorState from "../components/ErrorState";

export default function Courses() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);
  const [params, setParams] = useSearchParams();

  const query = params.get("q") || "";
  const activeType = params.get("type") || "";
  const activeCategory = params.get("category") || "";

  /* =========================================================
     FETCH ALL COURSES — no filtering, no exclusions
     ========================================================= */
  useEffect(() => {
    let cancelled = false;
    setError(null);

    fetchCourseList()
      .then((data) => {
        if (cancelled) return;

        // 🔍 DEBUG — open DevTools Console to verify types
        console.log("[Courses] Total from API:", data.length);
        console.log(
          "[Courses] Unique types:",
          [...new Set(data.map((c) => c.type))]
        );

        // Show EVERYTHING the API returns
        setCourses(data);
      })
      .catch((e) => !cancelled && setError(e.message));

    return () => {
      cancelled = true;
    };
  }, [tick]);

  /* =========================================================
     DYNAMIC TYPES — pulled from actual API data
     So "PG Diploma" shows up automatically even if the
     casing is different ("Pg Diploma", "PG diploma", etc.)
     ========================================================= */
  const types = useMemo(() => {
    if (!courses) return [];
    return [...new Set(courses.map((c) => c.type).filter(Boolean))].sort();
  }, [courses]);

  /* =========================================================
     CATEGORIES — dynamic from API
     ========================================================= */
  const categories = useMemo(() => {
    if (!courses) return [];
    const set = new Set(courses.map((c) => c.category?.name).filter(Boolean));
    return Array.from(set).sort();
  }, [courses]);

  /* =========================================================
     FILTERED — case-insensitive type matching
     ========================================================= */
  const filtered = useMemo(() => {
    if (!courses) return [];
    const q = query.trim().toLowerCase();

    return courses.filter((c) => {
      // Type filter (case-insensitive)
      if (
        activeType &&
        (c.type || "").toLowerCase() !== activeType.toLowerCase()
      ) {
        return false;
      }

      // Category filter
      if (
        activeCategory &&
        (c.category?.name || "") !== activeCategory
      ) {
        return false;
      }

      // Search filter
      if (q && !c.name.toLowerCase().includes(q)) return false;

      return true;
    });
  }, [courses, query, activeType, activeCategory]);

  function updateParam(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  }

  return (
    <section className="section catalog">
      <div className="wrap">
        <div className="catalog-head">
          <p className="eyebrow eyebrow-sm">Full catalog</p>
          <h1>All programs</h1>
          <p className="muted">
            {courses
              ? `${filtered.length} of ${courses.length} programs`
              : "Loading the catalog…"}
          </p>
        </div>

        <div className="catalog-controls">
          {/* SEARCH */}
          <div className="catalog-search-wrap">
            <Search size={17} className="catalog-search-icon" />
            <input
              type="search"
              placeholder="Search by program name"
              value={query}
              onChange={(e) => updateParam("q", e.target.value)}
              className="catalog-search"
              aria-label="Search programs"
            />
          </div>

          {/* TYPE PILLS — dynamically generated from API data */}
          <div className="pill-row">
            <button
              className={`pill ${!activeType ? "is-active" : ""}`}
              onClick={() => updateParam("type", "")}
            >
              All types
            </button>

            {types.map((t) => (
              <button
                key={t}
                className={`pill ${
                  activeType.toLowerCase() === t.toLowerCase()
                    ? "is-active"
                    : ""
                }`}
                onClick={() =>
                  updateParam(
                    "type",
                    activeType.toLowerCase() === t.toLowerCase() ? "" : t
                  )
                }
              >
                {t}
              </button>
            ))}
          </div>

          {/* CATEGORY DROPDOWN */}
          {categories.length > 0 && (
            <select
              className="catalog-select"
              value={activeCategory}
              onChange={(e) => updateParam("category", e.target.value)}
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

        {/* ERROR */}
        {error && (
          <ErrorState
            message={error}
            onRetry={() => setTick((t) => t + 1)}
          />
        )}

        {/* LOADING */}
        {!error && courses === null && <CourseGridSkeleton count={9} />}

        {/* EMPTY */}
        {!error && courses !== null && filtered.length === 0 && (
          <ErrorState
            title="No programs match that search"
            message="Try a different keyword or clear the filters."
          />
        )}

        {/* GRID */}
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