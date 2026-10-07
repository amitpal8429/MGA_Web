import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fetchCourseList, fetchPosts } from "../lib/api";
import { getBlogMeta } from "../lib/blogMeta";
import { cleanText } from "../lib/format";
import "./Sitemap.css";

const SITE_URL = "https://medicalglobalacademy.com";

/* =========================================================
   STATIC PAGES
   ========================================================= */

const MAIN_PAGES = [
  { title: "Home", to: "/" },
  { title: "About Us", to: "/about" },
  { title: "All Courses", to: "/courses" },
  { title: "Faculty", to: "/faculty" },
  { title: "Blog", to: "/blog" },
  { title: "Mobile App", to: "/app" },
  { title: "Terms of Service", to: "/terms" },
  { title: "Refund Policy", to: "/refund" },
  { title: "Privacy Policy", to: "/privacy-policy" },
  { title: "Sitemap", to: "/sitemap" },
];

const TAG_PAGES = [
  { title: "Diploma in Pulmonology", to: "/tag/diploma-in-pulmonology" },
  {
    title: "Reproductive & Child Health",
    to: "/tag/pg-diploma-in-reproductive-in-child-health",
  },
  { title: "Internal Medicine", to: "/tag/pg-diploma-in-internal-medicine" },
  {
    title: "Cosmetic Gynecology",
    to: "/tag/fellowship-in-cosmetic-gynecology",
  },
];

const TYPE_ORDER = ["Certificate", "Fellowship", "PG Diploma"];

/* =========================================================
   HELPERS
   ========================================================= */

function decodeEntities(html) {
  if (!html) return "";
  const el = document.createElement("textarea");
  el.innerHTML = html;
  return el.value;
}

// "Pg Diploma" / "PG Diploma" -> one group
function normalizeType(type) {
  if (!type) return "Other";
  return /^pg\s*diploma$/i.test(type.trim()) ? "PG Diploma" : type.trim();
}

const toId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Loads blog posts page after page until the API has no more.
// Each batch is handed over immediately so links appear while the rest loads.
async function loadAllPosts(onBatch) {
  const seen = new Set();

  for (let page = 1; page <= 50; page += 1) {
    let batch;

    try {
      const res = await fetchPosts({ page, perPage: 50 });
      batch = res?.data || [];
    } catch (e) {
      // WordPress errors when asking for a page past the end -> done
      break;
    }

    if (!batch.length) break;

    const fresh = batch.filter((p) => {
      if (!p?.slug || seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });

    if (fresh.length) onBatch(fresh);
  }
}

function SitemapSection({ id, title, items }) {
  if (!items.length) return null;

  return (
    <section className="sitemap-section" id={id}>
      <h2 className="sitemap-section-title">
        {title}
        <span className="sitemap-count">{items.length}</span>
      </h2>

      <ul className="sitemap-list">
        {items.map((item) => (
          <li key={item.to}>
            {/* External / static file links use <a>, internal uses <Link> */}
            {item.external ? (
              <a
                href={item.to}
                target={item.newTab ? "_blank" : undefined}
                rel={item.newTab ? "noopener noreferrer" : undefined}
              >
                {item.title}
              </a>
            ) : (
              <Link to={item.to}>{item.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* =========================================================
   PAGE
   ========================================================= */

export default function Sitemap() {
  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetchCourseList()
      .then((list) => {
        if (!cancelled) setCourses(list || []);
      })
      .catch(() => {});

    loadAllPosts((fresh) => {
      if (!cancelled) setPosts((prev) => [...prev, ...fresh]);
    }).catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  // Courses grouped by type: Certificate, Fellowship, PG Diploma, then others
  const courseGroups = useMemo(() => {
    const groups = new Map();

    courses
      .filter((c) => c?.slug)
      .forEach((c) => {
        const type = normalizeType(c.type);
        if (!groups.has(type)) groups.set(type, []);
        groups.get(type).push({
          title: cleanText(c.name) || c.name,
          to: `/${c.slug}`,
        });
      });

    return [...groups.entries()]
      .sort(([a], [b]) => {
        const ia = TYPE_ORDER.indexOf(a);
        const ib = TYPE_ORDER.indexOf(b);
        if (ia !== -1 || ib !== -1) {
          return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        }
        return a.localeCompare(b);
      })
      .map(([type, items]) => ({
        type,
        items: items.sort((x, y) => x.title.localeCompare(y.title)),
      }));
  }, [courses]);

  const blogItems = useMemo(
    () =>
      posts.map((post) => {
        const manualMeta = getBlogMeta(post.slug);
        return {
          title:
            manualMeta?.h1 || decodeEntities(post.title?.rendered) || post.slug,
          to: `/blog/${post.slug}`,
        };
      }),
    [posts]
  );

  // Main pages list — with the XML sitemap added
  const mainPages = useMemo(
    () => [
      ...MAIN_PAGES,
      {
        title: "XML Sitemap (sitemap.xml)",
        to: `${SITE_URL}/sitemap.xml`,
        external: true,
        newTab: true,
      },
    ],
    []
  );

  const totalPages =
    mainPages.length +
    TAG_PAGES.length +
    courseGroups.reduce((n, g) => n + g.items.length, 0) +
    blogItems.length;

  return (
    <div className="sitemap-page">
      <Helmet>
        <title>Sitemap: All Courses, Programs and Blog Articles</title>
        <meta
          name="description"
          content="Browse every page on Medical Global Academy: certificate, fellowship and PG diploma programs for doctors, blog articles and key information pages."
        />
        <link rel="canonical" href={`${SITE_URL}/sitemap`} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="sitemap-wrap">
        <header className="sitemap-header">
          <h1>Website Sitemap</h1>
          <p>
            Every program and article on Medical Global Academy, in one place.{" "}
            <strong>{totalPages}</strong> pages listed.
          </p>
        </header>

        <nav className="sitemap-jump" aria-label="Jump to section">
          <a href="#main-pages">Main pages</a>
          {courseGroups.map((g) => (
            <a key={g.type} href={`#type-${toId(g.type)}`}>
              {g.type} programs
            </a>
          ))}
          {blogItems.length > 0 && <a href="#blog-articles">Blog articles</a>}
          <a href="#tag-pages">Tag pages</a>
        </nav>

        <SitemapSection
          id="main-pages"
          title="Main Pages"
          items={mainPages}
        />

        {courseGroups.map((g) => (
          <SitemapSection
            key={g.type}
            id={`type-${toId(g.type)}`}
            title={`${g.type} Programs`}
            items={g.items}
          />
        ))}

        <SitemapSection
          id="blog-articles"
          title="Blog Articles"
          items={blogItems}
        />

        <SitemapSection id="tag-pages" title="Tag Pages" items={TAG_PAGES} />
      </div>
    </div>
  );
}