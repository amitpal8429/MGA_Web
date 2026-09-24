import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { fetchCourseList } from "../lib/api";
import CourseCard from "../components/CourseCard";
import { CourseGridSkeleton } from "../components/Skeletons";
import ErrorState from "../components/ErrorState";

// CHANGE 1: Removed "Pg Diploma" from the TYPES array so the button doesn't show
const TYPES = ["Certificate", "Fellowship"];

export default function Courses() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);
  const [params, setParams] = useSearchParams();

  const query = params.get("q") || "";
  const activeType = params.get("type") || "";
  const activeCategory = params.get("category") || "";

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetchCourseList()
      .then((data) => {
        if (cancelled) return;
        
        // CHANGE 2: Filter out PG Diploma courses from the API data
        // Checking both "Pg Diploma" and "PG Diploma" to be safe with casing
        const visibleCourses = data.filter(
          (c) => c.type !== "Pg Diploma" && c.type !== "PG Diploma"
        );
        
        setCourses(visibleCourses);
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const categories = useMemo(() => {
    if (!courses) return [];
    const set = new Set(courses.map((c) => c.category?.name).filter(Boolean));
    return Array.from(set).sort();
  }, [courses]);

  const filtered = useMemo(() => {
    if (!courses) return [];
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (activeType && c.type !== activeType) return false;
      if (activeCategory && (c.category?.name || "") !== activeCategory) return false;
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
            {courses ? `${filtered.length} of ${courses.length} programs` : "Loading the catalog…"}
          </p>
        </div>

        <div className="catalog-controls">
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

          <div className="pill-row">
            <button
              className={`pill ${!activeType ? "is-active" : ""}`}
              onClick={() => updateParam("type", "")}
            >
              All types
            </button>
            {TYPES.map((t) => (
              <button
                key={t}
                className={`pill ${activeType === t ? "is-active" : ""}`}
                onClick={() => updateParam("type", activeType === t ? "" : t)}
              >
                {t}
              </button>
            ))}
          </div>

          {categories.length > 0 && (
            <select
              className="catalog-select"
              value={activeCategory}
              onChange={(e) => updateParam("category", e.target.value)}
              aria-label="Filter by speciality"
            >
              <option value="">All specialities</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
        </div>

        {error && <ErrorState message={error} onRetry={() => setTick((t) => t + 1)} />}

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