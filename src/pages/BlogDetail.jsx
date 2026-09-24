import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostBySlug } from "../lib/api";

function decodeEntities(html) {
  if (!html) return "";
  const el = document.createElement("textarea");
  el.innerHTML = html;
  return el.value;
}

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setPost(null);
    setError(null);
    fetchPostBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        if (!data) setError("notfound");
        else setPost(data);
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error === "notfound")
    return (
      <p style={{ padding: 40 }}>
        Article not found. <Link to="/blog">Back to blog</Link>
      </p>
    );
  if (error)
    return <p style={{ padding: 40 }}>Could not load article: {error}</p>;
  if (!post) return <p style={{ padding: 40 }}>Loading…</p>;

  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article style={{ padding: "40px 20px", maxWidth: 800, margin: "0 auto" }}>
      <Link to="/blog">← Back to blog</Link>
      <h1 style={{ margin: "16px 0" }}>
        {decodeEntities(post.title.rendered)}
      </h1>
      {img && (
        <img
          src={img}
          alt=""
          style={{ width: "100%", borderRadius: 12, marginBottom: 24 }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}