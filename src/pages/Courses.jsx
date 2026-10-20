import { useEffect, useMemo, useRef, useState } from "react";
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

  const urlQuery = params.get("q") || "";
  const activeType = params.get("type") || "";
  const activeCategory = params.get("category") || "";

  const [searchText, setSearchText] = useState(urlQuery);


  const pushedRef = useRef(urlQuery);


  useEffect(() => {
    if (searchText === pushedRef.current) return undefined;

    const t = setTimeout(() => {
      pushedRef.current = searchText;

      const next = new URLSearchParams(params);
      if (searchText) next.set("q", searchText);
      else next.delete("q");

      setParams(next, { replace: true });
    }, 250);

    return () => clearTimeout(t);
  
  }, [searchText]);

  
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

        console.log("[Courses] Total from API:", data.length);
        console.log(
          "[Courses] Unique types:",
          [...new Set(data.map((c) => c.type))]
        );

        setCourses(data);
      })
      .catch((e) => !cancelled && setError(e.message));

    return () => {
      cancelled = true;
    };
  }, [tick]);

 
  const types = useMemo(() => {
    if (!courses) return [];
    return [...new Set(courses.map((c) => c.type).filter(Boolean))].sort();
  }, [courses]);

  const categories = useMemo(() => {
    if (!courses) return [];
    const set = new Set(courses.map((c) => c.category?.name).filter(Boolean));
    return Array.from(set).sort();
  }, [courses]);

  const filtered = useMemo(() => {
    if (!courses) return [];
    const q = searchText.trim().toLowerCase();

    return courses.filter((c) => {
    
      if (
        activeType &&
        (c.type || "").toLowerCase() !== activeType.toLowerCase()
      ) {
        return false;
      }

      if (activeCategory && (c.category?.name || "") !== activeCategory) {
        return false;
      }

      if (q && !c.name.toLowerCase().includes(q)) return false;

      return true;
    });
  }, [courses, searchText, activeType, activeCategory]);

  function updateParam(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);

    if (searchText) next.set("q", searchText);
    else next.delete("q");

    pushedRef.current = searchText;
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

        
        {error && (
          <ErrorState
            message={error}
            onRetry={() => setTick((t) => t + 1)}
          />
        )}

        {!error && courses === null && <CourseGridSkeleton count={9} />}

        {/* EMPTY */}
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