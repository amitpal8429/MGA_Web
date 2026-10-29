import { useEffect, useMemo, useState } from "react";
import { fetchFacultyList } from "../lib/api";
import ErrorState from "../components/ErrorState";
import { initials } from "../lib/format";

const BASE = "https://medicalglobalacademy.com/wp-content/uploads/2026/07/";
const BASE_OCT = "https://medicalglobalacademy.com/wp-content/uploads/2026/10/";

// Faculty entries that should never be shown on the site.
// Matched against id / name / code / registrationNo / slug (case-insensitive).
const HIDDEN_FACULTY_KEYS = new Set([
  "FACULTY1101",
  "FACULTY1103",
  "FACULTY1102",
]);

const isHiddenFaculty = (f) => {
  if (!f) return false;
  const candidates = [f.id, f.name, f.code, f.registrationNo, f.slug]
    .filter(Boolean)
    .map((v) => String(v).trim().toUpperCase());
  return candidates.some((v) => HIDDEN_FACULTY_KEYS.has(v));
};

// Keyed by normalized name (lowercase, no "Dr", no punctuation)
const FACULTY_PHOTOS = {
  "poonam pawadi": BASE + "WhatsApp-Image-2026-07-06-at-2.31.11-PM-1.jpeg",
  "aishwarya": BASE + "WhatsApp-Image-2026-07-06-at-2.31.11-PM.jpeg",
  "sandhya": BASE + "WhatsApp-Image-2026-07-06-at-2.31.12-PM-1.jpeg",
  "shivam talwar": BASE + "WhatsApp-Image-2026-07-06-at-2.31.13-PM-1.jpeg",
  "surbhi rastogi": BASE + "WhatsApp-Image-2026-07-06-at-2.31.13-PM.jpeg",
  "vismaya molly siby": BASE_OCT + "WhatsApp-Image-2026-10-28-at-10.36.27-AM.jpeg",
  "mahesh": BASE_OCT + "WhatsApp-Image-2026-10-28-at-10.46.15-AM.jpeg",
};

const normalizeName = (name = "") =>
  name
    .toLowerCase()
    .replace(/^dr\.?\s+/, "")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

function FacultyAvatar({ name, src }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <span className="avatar avatar-lg">{initials(name)}</span>;
  }

  return (
    <img
      className="avatar avatar-lg avatar-img"
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function Faculty() {
  const [faculty, setFaculty] = useState(null);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    setError(null);
    fetchFacultyList()
      .then((data) => {
        if (cancelled) return;
        // Drop the dummy/test entries before storing
        setFaculty(data.filter((f) => !isHiddenFaculty(f)));
      })
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
            {faculty
              ? `${faculty.length} practising specialists teach across MGA programs`
              : "Loading the faculty roster…"}
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
                    <FacultyAvatar
                      name={f.name}
                      src={f.photo || FACULTY_PHOTOS[normalizeName(f.name)]}
                    />
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