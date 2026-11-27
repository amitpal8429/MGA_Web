import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  GraduationCap,
  Users,
  BadgeCheck,
  HeartHandshake,
  Headset,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { fetchCourseList, fetchFacultyList } from "../lib/api";
import CourseCard from "../components/CourseCard";
import { CourseGridSkeleton } from "../components/Skeletons";
import ErrorState from "../components/ErrorState";
import Faq from "../components/Faq";
import { initials } from "../lib/format";
import LeadForm from "../components/LeadForm";

const SITE_URL = "https://medicalglobalacademy.com";

const HOME_TITLE = "Online Medical Courses: Fellowship, PG Diploma & Certificate";
const HOME_DESCRIPTION =
  "Certificate, PG Diploma and fellowship programs for doctors across medicine and surgery. UK CPD accredited, live online classes, 1-year mentorship.";

/* Course type detection (case-insensitive) */
const PG_TYPE_RE = /\bpg\b|post[\s-]?graduate|diploma/i;
const CERT_TYPE_RE = /certificate/i;

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Learn from highly experienced faculty",
    text: "Train under specialist doctors and healthcare leaders with real clinical expertise.",
  },
  {
    icon: Sparkles,
    title: "Practical, flexible learning",
    text: "Case-based, video-driven learning designed for working doctors — learn anytime, anywhere.",
  },
  {
    icon: BadgeCheck,
    title: "Recognised certification",
    text: "Industry-aligned certificates that add real, verifiable value to your medical career.",
  },
  {
    icon: HeartHandshake,
    title: "Career support & guidance",
    text: "Mentorship and career direction tailored to your goals and clinical interests.",
  },
  {
    icon: Headset,
    title: "Dedicated support",
    text: "Fast help with technical, course, and enrolment questions whenever you need it.",
  },
  {
    icon: Users,
    title: "Future-ready curriculum",
    text: "Modules stay current with modern protocols, global guidelines and emerging specialities.",
  },
];

// Accreditation data. Each logo links to its verification page.
const ACCREDITATIONS = [
  {
    id: 1,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/Untitled-design-8.png",
    alt: "CPD Accreditation",
    href: "https://directory.cpdstandards.com/providers/medical-global-academy/",
    certificate: {
      src: "https://medicalglobalacademy.com/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-17-at-10.15.41-AM.jpeg",
      alt: "CPD accreditation certificate – Medical Global Academy",
    },
  },
  {
    id: 2,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-24-at-12.17.06-PM.jpeg",
    alt: "ACTD Accreditation",
    href: "https://www.actd.us/medicalglobalacademy/",
    certificate: {
      src: "https://medicalglobalacademy.com/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-17-at-5.58.43-PM.jpeg",
      alt: "ACTD accreditation certificate – Medical Global Academy",
    },
  },
];

const HOME_CSS = `
  /* ---------- Hero grid: no stretching, so no extra white space ---------- */
  .hero-grid {
    align-items: start;
  }

  /* ---------- Compact hero form (shorter height) ---------- */
  .hero-form-card {
    max-width: 370px;
    width: 100%;
    justify-self: end;
    align-self: start;
  }

  .hero-form-card .hero-form-head,
  .hero-form-card .hero-form-body {
    padding: 14px 16px;
  }

  .hero-form-card h2 {
    font-size: 17px;
    margin: 4px 0;
    color: #ffffff;
  }

  .hero-form-card h3 {
    font-size: 15px;
    margin: 0 0 4px;
  }

  .hero-form-card .hero-form-desc {
    margin: 0 0 8px;
    font-size: 12px;
    line-height: 1.4;
  }

  .hero-form-card input,
  .hero-form-card select,
  .hero-form-card textarea {
    padding-top: 7px !important;
    padding-bottom: 7px !important;
    font-size: 13px !important;
  }

  .hero-form-card label {
    margin-bottom: 3px !important;
    font-size: 12px !important;
  }

  .hero-form-card form > * + *,
  .hero-form-card form .field,
  .hero-form-card form .form-group {
    margin-top: 6px;
  }

  .hero-form-card button[type="submit"],
  .hero-form-card .btn {
    padding-top: 9px !important;
    padding-bottom: 9px !important;
  }

  /* ---------- Hero stat boxes ---------- */
  .hero-stat-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    margin-top: 28px;
    max-width: 680px;
  }

  .hero-stat-card {
    background: #ffffff;
    border: 1px solid #dce4ea;
    border-radius: 16px;
    padding: 20px;
    min-height: 110px;
    box-shadow: 0 6px 18px rgba(15, 39, 68, 0.06);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-stat-card strong {
    display: block;
    font-size: 32px;
    font-weight: 700;
    color: #1e3a5f;
    line-height: 1.1;
  }

  .hero-stat-card span {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #64748b;
    line-height: 1.3;
  }

  /* ---------- Section headings (same style on every section) ---------- */
  .section-head.section-head-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .section-head.section-head-center .eyebrow-sm {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #1e3a5f;
    margin: 0 0 6px;
  }

  .section-head.section-head-center h2 {
    font-size: 15px;
    font-weight: 700;
    color: #0f2744;
    margin: 0;
    line-height: 1.4;
  }

  /* ---------- Accreditation boxes ---------- */
  .accred-single-row {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    max-width: 1200px;
    margin: 0 auto;
    align-items: stretch;
  }

  .accred-item {
    min-width: 0;
    width: 100%;
  }

  /* Same fixed size for logo boxes and certificate boxes */
  .accred-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 220px;
    box-sizing: border-box;
    padding: 16px;
    margin: 0;
    border-radius: 14px;
    border: 1px solid #dce4ea;
    background: #ffffff;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
  }

  a.accred-box {
    cursor: pointer;
  }

  .accred-box img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  /* ---------- Programs box ---------- */
  .course-box {
    background: #ffffff;
    border: 1px solid #dce4ea;
    border-radius: 22px;
    padding: 28px;
    box-shadow: 0 10px 30px rgba(15, 39, 68, 0.07);
    box-sizing: border-box;
  }

  /* ---------- Blog cards ---------- */
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }

  .blog-card {
    background: #ffffff;
    border: 1px solid #dce4ea;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(15, 39, 68, 0.08);
  }

  .blog-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background: #f1f5f9;
  }

  .blog-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .blog-date {
    font-size: 12px;
    font-weight: 600;
    color: #066daf;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  .blog-title {
    font-size: 17px;
    font-weight: 700;
    color: #0f2744;
    margin: 0 0 12px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-title a {
    color: inherit;
    text-decoration: none;
  }

  .blog-title a:hover {
    color: #066daf;
  }

  .blog-excerpt {
    font-size: 14px;
    color: #64748b;
    line-height: 1.5;
    margin: 0 0 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  /* ---------- Blog footer: View all button below cards ---------- */
  .blog-footer {
    display: flex;
    justify-content: center;
    margin-top: 32px;
  }

  .blog-view-all-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 22px;
    border-radius: 999px;
    border: 1.5px solid #066daf;
    background: #ffffff;
    color: #066daf;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
  }

  .blog-view-all-btn:hover {
    background: #066daf;
    color: #ffffff;
  }

  /* ---------- Media queries ---------- */
  @media (max-width: 1024px) {
    .accred-single-row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      max-width: 760px;
    }
    .blog-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 760px) {
    .hero-stat-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .accred-single-row {
      grid-template-columns: 1fr;
      max-width: 420px;
    }
    .blog-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .course-box { padding: 16px; border-radius: 16px; }
    .accred-box { height: 200px; }
    .hero-stat-card strong { font-size: 26px; }
    .hero-stat-card { min-height: 96px; padding: 14px; }
    .section-head.section-head-center .eyebrow-sm { font-size: 17px; }
  }
`;

export default function Home() {
  const [courses, setCourses] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  // Blog state
  const [blogs, setBlogs] = useState(null);
  const [blogError, setBlogError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setCourses(null);
    Promise.all([fetchCourseList(), fetchFacultyList()])
      .then(([c, f]) => {
        if (cancelled) return;
        setCourses(c);
        setFaculty(f);
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [tick]);

  // Fetch latest 3 blogs from WordPress API
  useEffect(() => {
    let cancelled = false;
    fetch("https://medicalglobalacademy.com/wp-json/wp/v2/posts?per_page=3&_embed")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setBlogs(data);
      })
      .catch((err) => {
        if (!cancelled) setBlogError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = useMemo(() => {
    if (!courses) return [];
    const top = courses.filter((c) => c.top_courses === 1);
    if (top.length >= 6) return top.slice(0, 6);
    const topIds = new Set(top.map((c) => c.id));
    const others = courses.filter((c) => !topIds.has(c.id));
    return [...top, ...others].slice(0, 6);
  }, [courses]);

  const stats = useMemo(() => {
    if (!courses) return null;
    const typeOf = (c) => String(c.type || "");
    return {
      total: courses.length,
      fellowships: courses.filter((c) => c.type === "Fellowship").length,
      pgDiplomas: courses.filter((c) => PG_TYPE_RE.test(typeOf(c))).length,
      certificates: courses.filter(
        (c) => CERT_TYPE_RE.test(typeOf(c)) && !PG_TYPE_RE.test(typeOf(c))
      ).length,
      faculty: faculty?.length ?? null,
    };
  }, [courses, faculty]);

  return (
    <>
      <style>{HOME_CSS}</style>

      <Helmet>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={HOME_TITLE} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
      </Helmet>

      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero-blob" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Fast-track your medical career with</p>
            <h1 className="hero-title">
              Your Trusted Platform for Online Medical Courses & Professional Upskilling
            </h1>
            <p className="hero-lede">
              Online certificate, PG Diploma and fellowship programs for doctors across medicine, surgery, radiology and obstetrics — combining advanced medical education with live clinical mentorship.
            </p>
            <div className="hero-actions">
              <Link
                to="/courses"
                className="btn btn-primary"
                style={{ backgroundColor: "#066daf", borderColor: "#066daf", color: "#ffffff" }}
              >
                Explore programs <ArrowRight size={16} />
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=919310027474&text=Hi%2C%20I%20would%20like%20to%20download%20the%20course%20brochure"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Need expert help?
              </a>
            </div>

            {stats && (
              <div className="hero-stat-grid">
                <div className="hero-stat-card">
                  <strong>{stats.total}+</strong>
                  <span>Active programs</span>
                </div>
                <div className="hero-stat-card">
                  <strong>{stats.fellowships}+</strong>
                  <span>Fellowships</span>
                </div>
                <div className="hero-stat-card">
                  <strong>{stats.certificates}+</strong>
                  <span>Certificates</span>
                </div>
                <div className="hero-stat-card">
                  <strong>{stats.pgDiplomas}+</strong>
                  <span>PG diplomas</span>
                </div>
              </div>
            )}
          </div>

          <div className="hero-form-card">
            <div className="hero-form-head">
              <p className="hero-form-eyebrow">⚡ PRIORITY 2026 BATCH APPLICATION</p>
              <h2>Apply for Clinical Fellowship</h2>
              <p className="hero-form-sub">
                Get full clinical curriculum & hospital slots on WhatsApp
              </p>
            </div>
            <div className="hero-form-body">
              <h3>Fast-Track Your Medical Career</h3>
              <p className="hero-form-desc">
                Advance your clinical expertise with CPD-accredited
                Fellowship, PG Diploma, and Certification programs.
              </p>
              <LeadForm idPrefix="hero" />
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="wrap">
          <ErrorState message={error} onRetry={() => setTick((t) => t + 1)} />
        </div>
      )}

      {!error && (
        <>
          {/* ---------- ACCREDITATION ---------- */}
          <section className="section section-alt">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">
                  <ShieldCheck size={18} style={{ marginRight: 8, verticalAlign: "-3px" }} />
                  Accreditation
                </p>
                <h2>Globally recognised CPD & ACTD-aligned certification</h2>
              </div>

              <div className="accred-single-row">
                {ACCREDITATIONS.map((a) => (
                  <div className="accred-item" key={`logo-${a.id}`}>
                    <a
                      className="accred-box"
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${a.alt} - verify accreditation (opens in new tab)`}
                    >
                      <img src={a.src} alt={a.alt} loading="lazy" draggable={false} />
                    </a>
                  </div>
                ))}

                {ACCREDITATIONS.filter((a) => a.certificate).map((a) => (
                  <div className="accred-item" key={`cert-${a.id}`}>
                    <figure className="accred-box" onContextMenu={(e) => e.preventDefault()}>
                      <img
                        src={a.certificate.src}
                        alt={a.certificate.alt}
                        loading="lazy"
                        draggable={false}
                      />
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- PROGRAMS ---------- */}
          <section className="section">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">Our programs</p>
                <h2>Advance your career with programs built for practising doctors</h2>
              </div>

              <div className="course-box">
                {courses === null ? (
                  <CourseGridSkeleton count={6} />
                ) : (
                  <div className="course-grid">
                    {featured.map((c) => (
                      <CourseCard key={c.id} course={c} />
                    ))}
                  </div>
                )}
              </div>

              <div className="blog-footer">
                <Link to="/courses" className="blog-view-all-btn">
                  View all courses <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </section>

          {/* ---------- WHAT TO EXPECT ---------- */}
          <section className="section section-alt">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">What to expect</p>
                <h2>A complete learning experience for working doctors</h2>
                <p className="muted section-sub">
                  Expert guidance, flexible learning and clinical
                  training, all built around your existing practice.
                </p>
              </div>

              <div className="feature-grid">
                {FEATURES.map((f) => (
                  <div className="feature-card" key={f.title}>
                    <span className="feature-icon"><f.icon size={22} /></span>
                    <h3 className="feature-title">{f.title}</h3>
                    <p className="muted">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- FACULTY ---------- */}
          <section className="section">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">Our faculty</p>
                <h2>Learn from practising specialists</h2>
              </div>

              {faculty === null ? (
                <div className="skel" style={{ height: 110, borderRadius: 16 }} />
              ) : (
                <div className="faculty-strip">
                  {faculty.slice(0, 6).map((f) => (
                    <div className="faculty-chip" key={f.id}>
                      <span className="avatar">{initials(f.name)}</span>
                      <span className="faculty-chip-text">
                        <strong>{f.name}</strong>
                        <span className="muted">{f.department}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ---------- LATEST BLOGS ---------- */}
          <section className="section">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">Latest Insights</p>
                <h2>Medical Blogs & Articles</h2>
              </div>

              {!blogs && !blogError && (
                <div className="blog-grid">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="skel" style={{ height: 350, borderRadius: 16 }} />
                  ))}
                </div>
              )}

              {blogError && (
                <p className="muted" style={{ textAlign: "center" }}>
                  Could not load blogs at the moment.
                </p>
              )}

              {blogs && (
                <div className="blog-grid">
                  {blogs.map((post) => {
                    const imageUrl =
                      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "https://medicalglobalacademy.com/wp-content/uploads/2026/10/placeholder.jpg";
                    const date = new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                    const cleanExcerpt = post.excerpt?.rendered.replace(/<[^>]+>/g, "");

                    return (
                      <div className="blog-card" key={post.id}>
                        <Link to={`/blog/${post.slug}`}>
                          <img
                            src={imageUrl}
                            alt={post.title.rendered}
                            className="blog-img"
                            loading="lazy"
                          />
                        </Link>
                        <div className="blog-content">
                          <span className="blog-date">{date}</span>
                          <h3 className="blog-title">
                            <Link
                              to={`/blog/${post.slug}`}
                              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                            />
                          </h3>
                          <p className="blog-excerpt">{cleanExcerpt}</p>
                          <Link
                            to={`/blog/${post.slug}`}
                            style={{
                              color: "#066daf",
                              fontWeight: 600,
                              fontSize: 14,
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            Read Article <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="blog-footer">
                <a
                  href="https://medicalglobalacademy.com/blog/"
                  target="_blank"
                  rel="noreferrer"
                  className="blog-view-all-btn"
                >
                  View all blogs <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </section>

          {/* ---------- FAQ ---------- */}
          <section className="section section-alt" id="faq">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">Frequently asked questions</p>
              </div>
              <Faq />
            </div>
          </section>
        </>
      )}
    </>
  );
}