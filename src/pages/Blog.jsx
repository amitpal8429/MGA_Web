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

  if (error) return <p className="blog-status">Could not load blog: {error}</p>;
  if (initialLoading) return <p className="blog-status">Loading articles…</p>;

  return (
    <section className="blog-section">
      <div className="container">
        <div className="blog-grid">
          {posts.map((post) => {
            const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            return (
              <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-media">
                  {img && <img src={img} alt="" loading="lazy" />}
                </div>
                <div className="blog-card-body">
                  <h3 className="blog-card-title">
                    {decodeEntities(post.title.rendered)}
                  </h3>
                  <p className="blog-card-excerpt">
                    {stripHtml(post.excerpt.rendered).slice(0, 100)}…
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {hasMore && (
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

        {!hasMore && posts.length > 0 && (
          <p className="blog-end">You've reached the end ✦</p>
        )}
      </div>
    </section>
  );
}