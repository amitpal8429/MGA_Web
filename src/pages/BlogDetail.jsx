import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fetchPostBySlug } from "../lib/api";
import { getBlogMeta, cleanTitle } from "../lib/blogMeta";
import BlogPostSchema from "../components/BlogPostSchema";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import ImageObjectSchema from "../components/ImageObjectSchema";
import MetaDescription from "../components/MetaDescription";

const SITE_URL = "https://medicalglobalacademy.com";

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

function safeTitle(text) {
  if (!text) return "";
  return text

    .replace(/[\|\-–—:•]\s*(MGA|Medical\s*Global\s*Academy)\s*$/i, "")
   
    .replace(/^\s*(MGA|Medical\s*Global\s*Academy)\s*[\|\-–—:•]\s*/i, "")
   
    .replace(/\b(MGA|Medical\s*Global\s*Academy)\b/gi, "")
    
    .replace(/\s{2,}/g, " ")
    .replace(/^[\|\-–—:•\s]+|[\|\-–—:•\s]+$/g, "")
    .trim();
}

function formatPostDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
      <p className="detail-status">
        Article not found. <Link to="/blog">Back to blog</Link>
      </p>
    );
  if (error)
    return <p className="detail-status">Could not load article: {error}</p>;
  if (!post) return <p className="detail-status">Loading…</p>;


  const manualMeta = getBlogMeta(slug);

  const wpImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const wpTitle = decodeEntities(post.title.rendered);

  const h1 = manualMeta?.h1 || wpTitle;
  const image = manualMeta?.image || wpImage;

  const metaTitle = safeTitle(
    manualMeta?.title ? manualMeta.title : cleanTitle(wpTitle) || wpTitle
  );

  const metaDescription =
    manualMeta?.description || stripHtml(post.excerpt?.rendered).slice(0, 155);
  const canonicalSlug = manualMeta?.canonical || slug;
  const canonicalUrl = `${SITE_URL}/blog/${canonicalSlug}`;
  const keywords = manualMeta?.keywords || "";
  const tags = manualMeta?.tags?.length ? manualMeta.tags : [];

  // Publish / modified dates
  const publishedDate = formatPostDate(post.date);
  const publishedISO = post.date_gmt ? `${post.date_gmt}Z` : post.date;
  const modifiedISO = post.modified_gmt ? `${post.modified_gmt}Z` : post.modified;

  return (
    <article className="detail-article">
      <Helmet>
        <title>{metaTitle}</title>
 
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="article" />
        {publishedISO && (
          <meta property="article:published_time" content={publishedISO} />
        )}
        {modifiedISO && (
          <meta property="article:modified_time" content={modifiedISO} />
        )}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {image && <meta property="og:image" content={image} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {image && <meta name="twitter:image" content={image} />}
      </Helmet>

      <MetaDescription content={metaDescription} />

    
      <BlogPostSchema
        title={h1}
        description={metaDescription}
        url={canonicalUrl}
        image={image}
        datePublished={publishedISO}
        dateModified={modifiedISO}
        keywords={keywords}
      />
      <BreadcrumbSchema
        pageTitle={h1}
        pageUrl={canonicalUrl}
        parentLabel="Blog"
        parentUrl={`${SITE_URL}/blog`}
      />
      <ImageObjectSchema
        imageUrl={image}
        caption={h1}
        pageUrl={canonicalUrl}
      />

      <div className="container">
        <Link to="/blog">← Back to blog</Link>

        <h1>{h1}</h1>

        {publishedDate && (
          <p className="blog-date">
            Published on <time dateTime={post.date}>{publishedDate}</time>
          </p>
        )}

        {image && <img src={image} alt={h1} />}

        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {tags.length > 0 && (
          <div className="blog-tags" style={{ marginTop: 24 }}>
            {tags.map((tag) => (
              <span key={tag} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}