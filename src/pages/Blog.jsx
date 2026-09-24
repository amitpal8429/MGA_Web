import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../lib/api";

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

const PER_PAGE = 9;

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchPosts({ page, perPage: PER_PAGE })
      .then(({ data }) => {
        if (cancelled) return;

        // If fewer than PER_PAGE returned, no more pages left
        if (!data || data.length < PER_PAGE) {
          setHasMore(false);
        }

        // Append new posts (or set on first page)
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

  const handleLoadMore = () => {
    setPage((p) => p + 1);
  };

  if (error) return <p style={{ padding: 40 }}>Could not load blog: {error}</p>;
  if (initialLoading) return <p style={{ padding: 40 }}>Loading articles…</p>;

  return (
    <section style={{ padding: "40px 20px", maxWidth: 1100, margin: "0 auto" }}>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          marginTop: 24,
        }}
      >
        {posts.map((post) => {
          const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          return (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #ddd",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {img && (
                <img
                  src={img}
                  alt=""
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
              )}
              <div style={{ padding: 16 }}>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>
                  {decodeEntities(post.title.rendered)}
                </h3>
                <p style={{ fontSize: 14, color: "#666" }}>
                  {stripHtml(post.excerpt.rendered).slice(0, 100)}…
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ================= LOAD MORE ================= */}
      {hasMore && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            onClick={handleLoadMore}
            disabled={loading}
            style={{
              padding: "12px 32px",
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              background: "#2563eb",
              border: "none",
              borderRadius: 8,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "all 0.2s ease",
            }}
          >
            {loading ? "Loading…" : "Load More"}
          </button>
        </div>
      )}

      {/* No more posts */}
      {!hasMore && posts.length > 0 && (
        <p style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
          You've reached the end ✦
        </p>
      )}
    </section>
  );
}