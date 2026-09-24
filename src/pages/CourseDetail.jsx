import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight,
  Clock3,
  CalendarDays,
  BadgeCheck,
  ShieldCheck,
  Users,
  Plus,
  Minus,
  Award,
  Play,
} from "lucide-react";
import { fetchCourseDetails } from "../lib/api";
import { getRedirectSlug, getAliasSlug } from "../lib/redirects";
import { getCourseMeta } from "../lib/courseMeta";
import CourseImage from "../components/CourseImage";
import { DetailSkeleton } from "../components/Skeletons";
import ErrorState from "../components/ErrorState";
import Faq from "../components/Faq";
import LeadForm from "../components/LeadForm";
import { formatINR, formatDuration, formatStartDate, cleanText, typeClass } from "../lib/format";

// ✅ Certificate images (sidebar ke liye)
const CERTIFICATE_IMAGES = [
  {
    id: 1,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-22-at-3.50.35-PM.jpeg",
    alt: "Certificate sample 1",
  },
  {
    id: 2,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-22-at-3.51.36-PM.jpeg",
    alt: "Certificate sample 2",
  },
];

// ✅ Accreditation logos (sidebar ke liye)
const ACCREDITATION_LOGOS = [
  {
    id: 1,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-22-at-3.58.16-PM.jpeg",
    alt: "CPD Accreditation UK",
    name: "CPD (UK)",
  },
  {
    id: 2,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-24-at-12.17.06-PM.jpeg",
    alt: "ACTD Accreditation ASEAN Common Technical Dossier.",
    name: "ACTD (AMERICAN COUNCIL OF TRAINING AND DEVELOPMENT)",
  },
];

// ✅ YouTube video (sidebar ke liye) — clean embed URL
const PROGRAM_VIDEO_ID = "ONxaJyAtatQ";
const PROGRAM_VIDEO_EMBED =
  `https://www.youtube-nocookie.com/embed/${PROGRAM_VIDEO_ID}` +
  `?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&playsinline=1`;
const PROGRAM_VIDEO_THUMB = `https://img.youtube.com/vi/${PROGRAM_VIDEO_ID}/maxresdefault.jpg`;

const SITE_NAME = "Medical Global Academy";
const SITE_URL = "https://medicalglobalacademy.com";

export default function CourseDetail() {
  const { slug } = useParams();

  // 1️⃣ FULL REDIRECT — old slug list me mila to URL hi badal do
  const redirectSlug = getRedirectSlug(slug);
  if (redirectSlug) {
    return <Navigate to={`/${redirectSlug}`} replace />;
  }

  // 2️⃣ CONTENT ALIAS — URL wahi rahegi, fetch ke liye target slug
  const fetchSlug = getAliasSlug(slug) || slug;

  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [openModule, setOpenModule] = useState(0);
  const [showVideo, setShowVideo] = useState(false); // ✅ video click-to-play

  useEffect(() => {
    let cancelled = false;
    setCourse(null);
    setError(null);
    setOpenModule(0);

    fetchCourseDetails(fetchSlug)
      .then((data) => {
        if (cancelled) return;

        if (data.type === "PG Diploma") {
          setError("notfound");
          return;
        }

        setCourse(data);
      })
      .catch((e) => !cancelled && setError(e.status === 404 ? "notfound" : e.message));

    return () => {
      cancelled = true;
    };
  }, [fetchSlug]);

  // 🔒 Copy protection — Ctrl+S / Ctrl+U / Ctrl+Shift+I/J/C / F12 block
  useEffect(() => {
    const blockKeys = (e) => {
      if (
        (e.ctrlKey && ["s", "u"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", blockKeys);
    return () => document.removeEventListener("keydown", blockKeys);
  }, []);

  if (error === "notfound") {
    return (
      <div className="wrap detail-error">
        <ErrorState
          title="We couldn't find that program"
          message="It may have been renamed or removed from the catalog."
        />
        <Link to="/courses" className="btn btn-primary">Back to all programs</Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrap detail-error">
        <ErrorState message={error} />
        <Link to="/courses" className="btn btn-ghost">Back to all programs</Link>
      </div>
    );
  }

  if (!course) return <DetailSkeleton />;

  const fee = formatINR(course.fee);
  const totalFee = formatINR(course.total_fee);
  const hybridFee = course.hybrid_cpd ? formatINR(course.hybrid_cpd) : null;

  const duration = formatDuration(course.duration);
  const start = formatStartDate(course.start_date);

  // 🏷️ Per-course SEO meta
  const manualMeta = getCourseMeta(slug);

  const metaTitle =
    manualMeta?.title || course.meta_title || `${course.name} | ${SITE_NAME}`;

  const metaDescription =
    manualMeta?.description ||
    course.meta_description ||
    cleanText(course.description).slice(0, 155);

  const canonicalUrl = `${SITE_URL}/${slug}`;

  return (
    <article>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {course.image && <meta property="og:image" content={course.image} />}

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {course.image && <meta name="twitter:image" content={course.image} />}
      </Helmet>

      <section className="detail-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/courses">Programs</Link>
            <ChevronRight size={14} />
            <span className="muted">{course.name}</span>
          </div>

          <div className="detail-badges">
            {duration && <span className="badge"><Clock3 size={13} /> {duration}</span>}
            <span className={`badge ${typeClass(course.type)}`}>{course.type}</span>
            <span className="badge badge-muted">English</span>
          </div>

          <h1 className="detail-title">{course.name}</h1>
        </div>
      </section>

      <div className="wrap detail-grid">
        <div className="detail-main">
          <CourseImage src={course.image} alt={course.name} className="detail-image" />

          {course.highlight?.length > 0 && (
            <section className="detail-block outcome-block">
              <h2>Course outcomes</h2>
              <ul className="check-list">
                {course.highlight.map((h) => (
                  <li key={h.id}>{cleanText(h.highlight)}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="detail-block">
            <h2>Overview</h2>
            <p>{cleanText(course.description)}</p>
          </section>

          {course.what_you_learn?.length > 0 && (
            <section className="detail-block">
              <h2>What you'll learn</h2>
              <div className="learn-grid">
                {course.what_you_learn.map((w) => (
                  <div key={w.id} className="learn-card">
                    <span className="learn-card-icon"><BadgeCheck size={18} /></span>
                    <div>
                      <h4>{cleanText(w.heading)}</h4>
                      <p className="muted">{cleanText(w.description)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {course.module?.length > 0 && (
            <section className="detail-block">
              <div className="curriculum-head">
                <h2>Curriculum</h2>
                <span className="muted">{course.module.length} modules</span>
              </div>
              <div className="module-list">
                {course.module.map((m, i) => {
                  const isOpen = openModule === i;
                  return (
                    <div className={`module-item ${isOpen ? "is-open" : ""}`} key={m.id}>
                      <button
                        className="module-toggle"
                        onClick={() => setOpenModule(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                      >
                        <span className="module-index">{String(i + 1).padStart(2, "0")}</span>
                        <span className="module-name">{cleanText(m.module)}</span>
                        <span className="muted module-count">{m.sessions?.length || 0} lessons</span>
                        <span className="module-icon">{isOpen ? <Minus size={16} /> : <Plus size={16} />}</span>
                      </button>
                      {isOpen && m.sessions?.length > 0 && (
                        <ul className="session-list">
                          {m.sessions.map((s) => (
                            <li key={s.id}>{cleanText(s.title)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {course.workshop && (
            <section className="detail-block">
              <h2>{course.workshop.title || "Workshops"}</h2>
              {course.workshop.subtitle && (
                <p className="muted" style={{ marginBottom: 20 }}>{cleanText(course.workshop.subtitle)}</p>
              )}
              {course.workshop.parts?.map((part) => (
                <div key={part.id} className="workshop-part">
                  <h4>{part.title}</h4>
                  {part.subtitle && <p className="muted">{cleanText(part.subtitle)}</p>}
                  {part.key_points?.length > 0 && (
                    <ul className="check-list">
                      {part.key_points.map((k) => (
                        <li key={k.id}>{cleanText(k.content)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          <section className="detail-block" id="faq">
            <h2>Frequently asked questions</h2>
            <Faq />
          </section>
        </div>

        <aside className="detail-sidebar">
          {/* 1. Apply card */}
          <div className="apply-card">
            {fee && (
              <div className="apply-price">
                <span className="apply-price-label">Registration fee</span>
                <span className="apply-price-value">{fee}</span>

                {hybridFee && (
                  <span className="muted apply-price-total" style={{ marginTop: "6px", display: "block" }}>
                    Total Hybrid program cost {hybridFee}
                  </span>
                )}

                {totalFee && totalFee !== fee && (
                  <span className="muted apply-price-total" style={{ marginTop: "6px", display: "block" }}>
                    Total Online program cost {totalFee}
                  </span>
                )}
              </div>
            )}

            <a
              href="https://api.whatsapp.com/send?phone=919310027474&text=Hi%2C%20I%20would%20like%20to%20download%20the%20course%20brochure."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost apply-btn"
              style={{
                backgroundColor: "#087bc9",
                color: "#fff",
                border: "1px solid #087bc9",
              }}
            >
              Download brochure
            </a>

            <ul className="apply-trust">
              <li><ShieldCheck size={16} /> CPD-aligned certification</li>
              <li><ShieldCheck size={16} /> ACTD-aligned certification</li>
              <li><Users size={16} /> Mentorship from practising faculty</li>
              <li><Award size={16} /> Certificate on completion</li>
              {duration && <li><Clock3 size={16} /> {duration} program</li>}
            </ul>
          </div>

          {/* 2. Lead form card */}
          <div className="hero-form-card" style={{ marginTop: 24 }}>
            <div className="hero-form-head">
              <p className="hero-form-eyebrow">⚡ LIMITED SEATS</p>
              <h3>Apply for this Program</h3>
              <p className="hero-form-sub">
                Get curriculum & fee details on WhatsApp
              </p>
            </div>
            <div className="hero-form-body">
              <h4>Start Your Application</h4>
              <p className="hero-form-desc">
                Fill the form and our team will contact you with full course
                details, batch dates, and eligibility.
              </p>
              <LeadForm idPrefix={`course-${slug}`} />
            </div>
          </div>

          {/* ✅ 3. Accreditation card — CPD (UK) & ACTD (America) badges */}
          <div className="accreditation-card" style={{ marginTop: 24 }}>
            <div className="accreditation-card-head">
              <span className="accreditation-icon">
                <ShieldCheck size={20} />
              </span>
              <p className="accreditation-eyebrow">ACCREDITATION</p>
            </div>

            <h4 className="accreditation-title">
              Globally recognised CPD &amp; ACTD-aligned certification
            </h4>

            <div className="accreditation-grid">
              {ACCREDITATION_LOGOS.map((item) => (
                <div key={item.id} className="accreditation-item">
                  <div className="accreditation-item-img-wrap">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="accreditation-item-img"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <span className="accreditation-item-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Certificate card */}
          <div className="certificate-card" style={{ marginTop: 24 }}>
            <div className="certificate-card-head">
              <span className="certificate-icon">
                <Award size={22} />
              </span>
              <div>
                <h4>Certificate</h4>
                <p className="muted">On successful completion</p>
              </div>
            </div>

            <p className="certificate-card-desc">
              Receive a verifiable certificate from Medical Global Academy.
            </p>

            <div className="certificate-gallery">
              {CERTIFICATE_IMAGES.map((img) => (
                <div
                  key={img.id}
                  className="certificate-image-wrap"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="certificate-image"
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <span className="certificate-image-overlay" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          {/* ✅ 5. Video card — YouTube (custom thumbnail + click to play) */}
          <div className="video-card" style={{ marginTop: 24 }}>
            <div className="video-card-head">
              <span className="video-icon">
                <Play size={20} />
              </span>
              <div>
                <h4>How We Work</h4>
                <p className="muted">Our learning process explained</p>
              </div>
            </div>

            <div
              className="video-wrap"
              onContextMenu={(e) => e.preventDefault()}
            >
              {showVideo ? (
                <iframe
                  className="certificate-video"
                  src={`${PROGRAM_VIDEO_EMBED}&autoplay=1`}
                  title="How We Work — Medical Global Academy"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="video-thumb-btn"
                  onClick={() => setShowVideo(true)}
                  aria-label="Play video"
                >
                  <img
                    src={PROGRAM_VIDEO_THUMB}
                    alt="How We Work — Medical Global Academy"
                    className="video-thumb-img"
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="video-play-overlay">
                    <Play size={36} fill="#fff" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}