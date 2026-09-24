import { useEffect, useMemo, useState } from "react";
import { fetchFacultyList } from "../lib/api";
import ErrorState from "../components/ErrorState";
import { initials } from "../lib/format";

export default function Faculty() {
  const [faculty, setFaculty] = useState(null);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetchFacultyList()
      .then((data) => !cancelled && setFaculty(data))
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const grouped = useMemo(() => {
    if (!faculty) return [];
    const q = query.trim().toLowerCase();
    const filtered = faculty.filter(
      (f) =>
        !q ||
        f.name.toLowerCase().includes(q) ||
        (f.department || "").toLowerCase().includes(q)
    );
    const map = new Map();
    for (const f of filtered) {
      const key = f.department || "General";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(f);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [faculty, query]);

  return (
    <section className="section catalog">
      <div className="wrap">
        <div className="catalog-head">
          <h1>Faculty</h1>
          <p className="muted">
            {faculty ? `${faculty.length} practising specialists teach across MGA programs` : "Loading the faculty roster…"}
          </p>
        </div>

        <input
          type="search"
          placeholder="Search by name or department"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="catalog-search"
          aria-label="Search faculty"
        />

        {error && <ErrorState message={error} onRetry={() => setTick((t) => t + 1)} />}

        {!error && faculty === null && (
          <div className="faculty-grid" style={{ marginTop: 32 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="skel" style={{ height: 84 }} key={i} />
            ))}
          </div>
        )}

        {!error && faculty !== null && grouped.length === 0 && (
          <ErrorState title="No faculty found" message="Try a different search term." />
        )}

        {!error &&
          grouped.map(([dept, list]) => (
            <div key={dept} className="catalog-group">
              <h3 className="catalog-group-title">{dept}</h3>
              <div className="faculty-grid">
                {list.map((f) => (
                  <div className="faculty-card" key={f.id}>
                    <span className="avatar avatar-lg">{initials(f.name)}</span>
                    <div>
                      <h4 className="faculty-card-name">{f.name}</h4>
                      <p className="muted">{f.qualification}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
