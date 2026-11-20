import React, { useEffect, useMemo, useState } from "react";
import HospitalLogo from "../components/HospitalLogo";

const API_URL = "https://24x7.medicalglobalacademy.com/api/all-hospitals";

const theme = {
  primary: "#0c3a6b",
  primaryDark: "#082a4f",
  bg: "#f4f7fb",
  card: "#ffffff",
  text: "#1d2b3a",
  muted: "#6b7a8c",
  border: "#e1e8f0",
};

function HospitalCard({ hospital }) {
  return (
    <article style={styles.card}>
      <div style={styles.logoWrap}>
        <HospitalLogo name={hospital.name} logo={hospital.logo} />
      </div>
      <h3 style={styles.name}>{hospital.name}</h3>
      {hospital.location && (
        <p style={styles.location}>📍 {hospital.location}</p>
      )}
    </article>
  );
}

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchHospitals() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!json.status || !Array.isArray(json.data)) {
          throw new Error("Invalid response format");
        }
        if (!cancelled) {
          const sorted = [...json.data].sort((a, b) =>
            (a.name || "").localeCompare(b.name || "")
          );
          setHospitals(sorted);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchHospitals();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hospitals;
    return hospitals.filter(
      (h) =>
        (h.name || "").toLowerCase().includes(q) ||
        (h.location || "").toLowerCase().includes(q)
    );
  }, [hospitals, query]);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>Medical Global Academy</div>
        <h1 style={styles.title}>Our Partner Hospitals</h1>
        <p style={styles.subtitle}>
          Discover hospitals across India that are part of our clinical and
          training network.
        </p>
      </header>

      <section style={styles.toolbarWrap}>
        <div style={styles.searchBox}>
          <span aria-hidden="true">🔍</span>
          <input
            type="search"
            placeholder="Search by hospital name or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.searchInput}
            aria-label="Search hospitals"
          />
          {!loading && !error && (
            <span style={styles.count}>
              {filtered.length} hospital{filtered.length === 1 ? "" : "s"}
            </span>
          )}
        </div>
      </section>

      <main style={styles.main}>
        {loading && <p style={styles.status}>Loading hospitals...</p>}

        {error && (
          <p style={styles.status}>
            Hospitals load nahi ho paaye. Thodi der baad try karein.
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p style={styles.status}>No hospitals match your search.</p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={styles.grid}>
            {filtered.map((h, idx) => (
              <HospitalCard key={`${h.name}-${idx}`} hospital={h} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    background: theme.bg,
    color: theme.text,
    lineHeight: 1.5,
  },
  header: {
    background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
    color: "#ffffff",
    padding: "48px 20px 56px",
    textAlign: "center",
  },
  brand: {
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#ffffff",
    opacity: 0.8,
    marginBottom: 10,
  },
  title: {
    fontSize: "clamp(26px, 4vw, 38px)",
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 10px",
  },
  subtitle: {
    color: "#ffffff",
    opacity: 0.85,
    maxWidth: 560,
    margin: "0 auto",
  },
  toolbarWrap: {
    maxWidth: 1100,
    margin: "-28px auto 0",
    padding: "0 20px",
    position: "relative",
  },
  searchBox: {
    background: theme.card,
    borderRadius: 14,
    boxShadow: "0 4px 16px rgba(12, 58, 107, 0.08)",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 16,
    color: theme.text,
    background: "transparent",
    minWidth: 0,
  },
  count: {
    fontSize: 14,
    color: theme.muted,
    whiteSpace: "nowrap",
  },
  main: {
    maxWidth: 1100,
    margin: "28px auto 60px",
    padding: "0 20px",
  },
  status: {
    textAlign: "center",
    color: theme.muted,
    padding: "40px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 18,
  },
  card: {
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: 14,
    padding: "22px 20px",
    boxShadow: "0 4px 16px rgba(12, 58, 107, 0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  logoWrap: {
    width: 84,
    height: 84,
    borderRadius: "50%",
    background: "#eef4fb",
    border: `1px solid ${theme.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.primary,
    margin: "0 0 6px",
    minHeight: 44,
  },
  location: {
    fontSize: 13.5,
    color: theme.muted,
    margin: 0,
  },
};