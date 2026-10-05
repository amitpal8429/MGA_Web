import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight,
  Clock3,
  BadgeCheck,
  ShieldCheck,
  Users,
  Plus,
  Minus,
  Award,
  Play,
  Check,
} from "lucide-react";

import { fetchCourseDetails } from "../lib/api";
import { getRedirectSlug, getAliasSlug } from "../lib/redirects";
import { getCourseMeta, cleanTitle } from "../lib/courseMeta";
import CourseImage from "../components/CourseImage";
import { DetailSkeleton } from "../components/Skeletons";
import ErrorState from "../components/ErrorState";
import Faq from "../components/Faq";
import LeadForm from "../components/LeadForm";

import {
  formatINR,
  formatDuration,
  formatStartDate,
  cleanText,
  typeClass,
} from "../lib/format";

/* =========================================================
   HANDS-ON FILTER
   ========================================================= */

const HANDS_ON_RE = /hands?[\s-]?on/i;

const hasHandsOn = (...texts) =>
  HANDS_ON_RE.test(texts.filter(Boolean).join(" "));

const stripHandsOnSentences = (text) => {
  if (!text) return text;

  return text
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !HANDS_ON_RE.test(sentence))
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim();
};

/* =========================================================
   COURSE OUTCOMES
   ========================================================= */

const COURSE_OUTCOMES = [
  "Manage common outpatient presentations across age groups with a structured approach",
  "Apply preventive-care and chronic-disease frameworks in daily OPD practice",
  "Strengthen clinical reasoning through case-based discussion",
  "Add a UK CPD & ACTD accredited credential to your professional profile",
];

/* =========================================================
   CERTIFICATE IMAGES
   ========================================================= */

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

/* =========================================================
   ACCREDITATION LOGOS
   ========================================================= */

const ACCREDITATION_LOGOS = [
  {
    id: 1,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/Untitled-design-8.png",
    alt: "CPD Accreditation UK",
    name: "CPD (UK)",
    href: "https://directory.cpdstandards.com/providers/medical-global-academy/",
  },
  {
    id: 2,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-24-at-12.17.06-PM.jpeg",
    alt: "ACTD Accreditation ASEAN Common Technical Dossier.",
    name: "ACTD (AMERICAN COUNCIL OF TRAINING AND DEVELOPMENT)",
    href: "https://www.actd.us/medicalglobalacademy/",
  },
];

/* =========================================================
   PAYMENT / VIDEO
   ========================================================= */

const RAZORPAY_PAYMENT_LINK =
  "https://pages.razorpay.com/pl_QNHxeBV9bAplqo/view";

const PROGRAM_VIDEO_ID = "ONxaJyAtatQ";

const PROGRAM_VIDEO_EMBED =
  `https://www.youtube-nocookie.com/embed/${PROGRAM_VIDEO_ID}` +
  `?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&playsinline=1`;

const PROGRAM_VIDEO_THUMB = `https://img.youtube.com/vi/${PROGRAM_VIDEO_ID}/maxresdefault.jpg`;

/* =========================================================
   SITE
   ========================================================= */

const SITE_URL = "https://medicalglobalacademy.com";

/* =========================================================
   BUTTON COLORS
   ========================================================= */

const BTN_BLUE = "#1f7ac4";
const BTN_BLUE_HOVER = "#1867a8";

const applyBtnBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  width: "100%",
  backgroundColor: BTN_BLUE,
  color: "#ffffff",
  border: `1px solid ${BTN_BLUE}`,
  fontWeight: 700,
  fontSize: "15px",
  padding: "14px 20px",
  borderRadius: "999px",
  textDecoration: "none",
  cursor: "pointer",
  transition:
    "background-color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease",
};

/* =========================================================
   PAGE CSS
   ========================================================= */

const PAGE_CSS = `
  .mga-course-outcomes-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 52px;
    row-gap: 18px;
    margin-top: 20px;
  }

  .mga-course-outcome-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-width: 0;
  }

  .mga-course-outcome-text {
    margin: 0;
    color: #596b7e;
    font-size: 16px;
    line-height: 1.45;
    font-weight: 400;
  }

  .mga-course-outcome-card {
    margin-top: 32px;
    margin-bottom: 32px;
    padding: 28px 32px 30px;
    background: #f7f9fb;
    border: 1px solid #dce4ea;
    border-radius: 18px;
    box-sizing: border-box;
  }

  .mga-course-outcome-title {
    margin: 0;
    color: #16324f;
    font-size: 21px;
    line-height: 1.35;
    font-weight: 750;
    letter-spacing: -0.01em;
  }

  .mga-course-outcome-check {
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    border-radius: 50%;
    background: #dff7e8;
    color: #25b765;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mga-sidebar-career {
    padding: 22px 22px 24px;
    background: #ffffff;
    border: 1px solid #dce4ea;
    border-radius: 16px;
    box-sizing: border-box;
  }

  .mga-sidebar-career-title {
    margin: 0 0 12px;
    color: #16324f;
    font-size: 18px;
    line-height: 1.3;
    font-weight: 750;
  }

  .mga-sidebar-career-text {
    margin: 0;
    color: #596b7e;
    font-size: 15px;
    line-height: 1.65;
  }

  .mga-course-audience-section {
    margin-top: 34px;
    margin-bottom: 34px;
  }

  .mga-course-audience-title,
  .mga-course-eligibility-title {
    margin: 0;
    color: #16324f;
    font-weight: 750;
    letter-spacing: -0.01em;
  }

  .mga-course-audience-title {
    font-size: 24px;
    line-height: 1.3;
  }

  .mga-course-audience-list {
    margin: 14px 0 24px;
    padding-left: 0;
    list-style: none;
  }

  .mga-course-audience-list li {
    position: relative;
    margin: 0 0 10px;
    padding-left: 14px;
    color: #596b7e;
    font-size: 16px;
    line-height: 1.5;
  }

  .mga-course-audience-list li::before {
    content: "•";
    position: absolute;
    left: 0;
    top: 0;
    color: #596b7e;
  }

  .mga-course-eligibility-title {
    margin-top: 4px;
    margin-bottom: 12px;
    font-size: 23px;
    line-height: 1.3;
  }

  .mga-course-eligibility-box {
    padding: 22px 24px;
    border: 1px solid #dce4ea;
    border-radius: 16px;
    background: #ffffff;
  }

  .mga-course-eligibility-item {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    margin: 0 0 10px;
    color: #596b7e;
    font-size: 16px;
    line-height: 1.45;
  }

  .mga-course-eligibility-item:last-child {
    margin-bottom: 0;
  }

  .mga-course-eligibility-check {
    flex: 0 0 auto;
    color: #596b7e;
    font-weight: 500;
    line-height: 1.45;
  }

  @media (max-width: 768px) {
    .mga-course-outcome-card {
      padding: 22px 20px 24px;
      border-radius: 16px;
    }

    .mga-course-outcome-title {
      font-size: 19px;
    }

    .mga-course-outcomes-grid {
      grid-template-columns: 1fr;
      row-gap: 16px;
      margin-top: 18px;
    }

    .mga-course-outcome-text {
      font-size: 15px;
      line-height: 1.45;
    }

    .mga-course-audience-section {
      margin-top: 28px;
      margin-bottom: 28px;
    }

    .mga-course-audience-title {
      font-size: 21px;
    }

    .mga-course-eligibility-title {
      font-size: 20px;
    }

    .mga-course-eligibility-box {
      padding: 20px;
    }

    .mga-course-audience-list li,
    .mga-course-eligibility-item {
      font-size: 15px;
    }

  }

  @media (max-width: 480px) {
    .mga-course-outcome-card {
      padding: 20px 16px 22px;
    }

    .mga-course-outcome-title {
      font-size: 18px;
    }

    .mga-course-outcome-text {
      font-size: 14px;
    }

    .mga-course-audience-title {
      font-size: 20px;
    }

    .mga-course-eligibility-title {
      font-size: 19px;
    }

    .mga-course-eligibility-box {
      padding: 18px 16px;
      border-radius: 14px;
    }

    .mga-course-audience-list li,
    .mga-course-eligibility-item {
      font-size: 14px;
    }
  }
`;

/* =========================================================
   COMPONENT
   ========================================================= */

export default function CourseDetail() {
  const { slug } = useParams();

  const redirectSlug = getRedirectSlug(slug);
  const fetchSlug = getAliasSlug(slug) || slug;

  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [openModule, setOpenModule] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  /* FETCH COURSE */

  useEffect(() => {
    if (redirectSlug) return undefined;

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
      .catch((e) => {
        if (!cancelled) {
          setError(e.status === 404 ? "notfound" : e.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetchSlug, redirectSlug]);

  /* REDIRECT (after all hooks) */

  if (redirectSlug) {
    return <Navigate to={`/${redirectSlug}`} replace />;
  }

  /* ERROR STATES */

  if (error === "notfound") {
    return (
      <div className="wrap detail-error">
        <ErrorState
          title="We couldn't find that program"
          message="It may have been renamed or removed from the catalog."
        />

        <Link to="/courses" className="btn btn-primary">
          Back to all programs
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrap detail-error">
        <ErrorState message={error} />

        <Link to="/courses" className="btn btn-ghost">
          Back to all programs
        </Link>
      </div>
    );
  }

  if (!course) {
    return <DetailSkeleton />;
  }

  /* COURSE DATA */

  const fee = formatINR(course.fee);
  const totalFee = formatINR(course.total_fee);
  const hybridFee = course.hybrid_cpd ? formatINR(course.hybrid_cpd) : null;

  const duration = formatDuration(course.duration);
  const start = formatStartDate(course.start_date); // eslint-disable-line no-unused-vars

  const manualMeta = getCourseMeta(slug);

  const metaTitle =
    cleanTitle(
      manualMeta?.title || course.meta_title || course.name || ""
    ) || course.name;

  const metaDescription =
    manualMeta?.description ||
    course.meta_description ||
    cleanText(course.description).slice(0, 155);

  const canonicalUrl = `${SITE_URL}/${slug}/`;

  const filteredWhatYouLearn =
    course.what_you_learn?.filter(
      (w) => !hasHandsOn(w.heading, w.description)
    ) || [];

  /* RENDER */

  return (
    <article>
      <style>{PAGE_CSS}</style>

      {/* SEO */}

      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {course.image && <meta property="og:image" content={course.image} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {course.image && <meta name="twitter:image" content={course.image} />}
      </Helmet>

      {/* HERO */}

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
            {duration && (
              <span className="badge">
                <Clock3 size={13} />
                {duration}
              </span>
            )}

            <span className={`badge ${typeClass(course.type)}`}>
              {course.type}
            </span>

            <span className="badge badge-muted">English</span>
          </div>

          <h1 className="detail-title">{course.name}</h1>
        </div>
      </section>

      {/* MAIN GRID: content + sidebar */}

      <div className="wrap detail-grid">
        {/* LEFT / MAIN CONTENT */}

        <div className="detail-main">
          <CourseImage
            src={course.image}
            alt={course.name}
            className="detail-image"
          />

          {/* COURSE OUTCOMES */}

          <section
            className="mga-course-outcome-card"
            aria-labelledby="course-outcomes-title"
          >
            <h2 id="course-outcomes-title" className="mga-course-outcome-title">
              By the end of this program, you'll be able to
            </h2>

            <div className="mga-course-outcomes-grid">
              {COURSE_OUTCOMES.map((outcome, index) => (
                <div className="mga-course-outcome-item" key={index}>
                  <span className="mga-course-outcome-check" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>

                  <p className="mga-course-outcome-text">{outcome}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHO IS THIS COURSE FOR + ELIGIBILITY */}

          <section
            className="mga-course-audience-section"
            aria-labelledby="who-is-this-course-for-title"
          >
            <h2
              id="who-is-this-course-for-title"
              className="mga-course-audience-title"
            >
              Who Is This Course For?
            </h2>

            <ul className="mga-course-audience-list">
              <li>
                MBBS doctors in general practice or OPD roles who want a
                structured primary-care refresher
              </li>
              <li>
                Doctors early in independent practice building a broader
                clinical foundation
              </li>
              <li>
                MBBS graduates seeking a short, flexible program alongside
                clinical work
              </li>
            </ul>

            <h3 className="mga-course-eligibility-title">Eligibility</h3>

            <div className="mga-course-eligibility-box">
              <div className="mga-course-eligibility-item">
                <span className="mga-course-eligibility-check" aria-hidden="true">
                  ✓
                </span>
                <span>
                  MBBS degree with valid NMC / State Medical Council
                  registration
                </span>
              </div>

              <div className="mga-course-eligibility-item">
                <span className="mga-course-eligibility-check" aria-hidden="true">
                  ✓
                </span>
                <span>
                  Minimum 1 year of post-qualification clinical experience
                </span>
              </div>

              <div className="mga-course-eligibility-item">
                <span className="mga-course-eligibility-check" aria-hidden="true">
                  ✓
                </span>
                <span>Open to doctors practising in India and internationally</span>
              </div>
            </div>
          </section>

          {/* OVERVIEW */}

          <section className="detail-block">
            <h2>Overview</h2>

            <p>{stripHandsOnSentences(cleanText(course.description))}</p>
          </section>

          {/* WHAT YOU'LL LEARN */}

          {filteredWhatYouLearn.length > 0 && (
            <section className="detail-block">
              <h2>What you'll learn</h2>

              <div className="learn-grid">
                {filteredWhatYouLearn.map((w) => (
                  <div key={w.id} className="learn-card">
                    <span className="learn-card-icon">
                      <BadgeCheck size={18} />
                    </span>

                    <div>
                      <h4>{cleanText(w.heading)}</h4>
                      <p className="muted">{cleanText(w.description)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CURRICULUM */}

          {course.module?.length > 0 && (
            <section className="detail-block">
              <div className="curriculum-head">
                <h2>Curriculum</h2>
                <span className="muted">{course.module.length} modules</span>
              </div>

              <div className="module-list">
                {course.module.map((m, i) => {
                  const isOpen = openModule === i;

                  const filteredSessions =
                    m.sessions?.filter((s) => !hasHandsOn(s.title)) || [];

                  return (
                    <div
                      className={`module-item ${isOpen ? "is-open" : ""}`}
                      key={m.id}
                    >
                      <button
                        className="module-toggle"
                        onClick={() => setOpenModule(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                      >
                        <span className="module-index">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <span className="module-name">{cleanText(m.module)}</span>

                        <span className="muted module-count">
                          {filteredSessions.length || 0} lessons
                        </span>

                        <span className="module-icon">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>

                      {isOpen && filteredSessions.length > 0 && (
                        <ul className="session-list">
                          {filteredSessions.map((s) => (
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

          {/* WORKSHOP */}

          {course.workshop && (
            <section className="detail-block">
              <h2>{course.workshop.title || "Workshops"}</h2>

              {course.workshop.subtitle && (
                <p className="muted" style={{ marginBottom: 20 }}>
                  {stripHandsOnSentences(cleanText(course.workshop.subtitle))}
                </p>
              )}

              {course.workshop.parts?.map((part) => {
                const filteredKeyPoints =
                  part.key_points?.filter((k) => !hasHandsOn(k.content)) || [];

                return (
                  <div key={part.id} className="workshop-part">
                    <h4>{part.title}</h4>

                    {part.subtitle && (
                      <p className="muted">
                        {stripHandsOnSentences(cleanText(part.subtitle))}
                      </p>
                    )}

                    {filteredKeyPoints.length > 0 && (
                      <ul className="check-list">
                        {filteredKeyPoints.map((k) => (
                          <li key={k.id}>{cleanText(k.content)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </section>
          )}

          {/* FAQ */}

          <section className="detail-block" id="faq">
            <h2>Frequently asked questions</h2>

            <Faq />
          </section>
        </div>

        {/* RIGHT SIDEBAR */}

        <aside className="detail-sidebar">
          {/* APPLY / PAYMENT CARD */}

          <div className="apply-card">
            {fee && (
              <div className="apply-price">
                <span className="apply-price-label">Registration fee</span>

                <span className="apply-price-value">{fee}</span>

                {hybridFee && (
                  <span
                    className="muted apply-price-total"
                    style={{ marginTop: "6px", display: "block" }}
                  >
                    Total Hybrid program cost {hybridFee}
                  </span>
                )}

                {totalFee && totalFee !== fee && (
                  <span
                    className="muted apply-price-total"
                    style={{ marginTop: "6px", display: "block" }}
                  >
                    Total Online program cost {totalFee}
                  </span>
                )}
              </div>
            )}

            {/* BROCHURE */}

            <a
              href="https://api.whatsapp.com/send?phone=919310027474&text=Hi%2C%20I%20would%20like%20to%20download%20the%20course%20brochure."
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...applyBtnBase, marginBottom: "12px" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BTN_BLUE_HOVER;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BTN_BLUE;
              }}
            >
              Download brochure
            </a>

            {/* PAYMENT */}

            <a
              href={RAZORPAY_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={applyBtnBase}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BTN_BLUE_HOVER;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BTN_BLUE;
              }}
            >
              Enroll &amp; Pay Now
            </a>

            {/* TRUST */}

            <ul className="apply-trust" style={{ marginTop: "20px" }}>
              <li>
                <ShieldCheck size={16} />
                CPD-aligned certification
              </li>

              <li>
                <ShieldCheck size={16} />
                ACTD-aligned certification
              </li>

              <li>
                <Users size={16} />
                Mentorship from practising faculty
              </li>

              <li>
                <Award size={16} />
                Certificate on completion
              </li>

              {duration && (
                <li>
                  <Clock3 size={16} />
                  {duration} program
                </li>
              )}
            </ul>
          </div>

          {/* APPLICATION FORM */}

          <div className="hero-form-card" style={{ marginTop: 24 }}>
            <div className="hero-form-head">
              <p className="hero-form-eyebrow">⚡ LIMITED SEATS</p>

              <h3>Apply for this Program</h3>

              <p className="hero-form-sub">
                Get curriculum &amp; fee details on WhatsApp
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

          {/* ACCREDITATION */}

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
              {ACCREDITATION_LOGOS.map((item) => {
                const content = (
                  <>
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
                  </>
                );

                return item.href ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accreditation-item"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                    aria-label={`${item.name} - verify accreditation (opens in new tab)`}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.id} className="accreditation-item">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CERTIFICATE */}

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

          {/* VIDEO */}

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

            <div className="video-wrap" onContextMenu={(e) => e.preventDefault()}>
              {showVideo ? (
                <iframe
                  className="certificate-video"
                  src={`${PROGRAM_VIDEO_EMBED}&autoplay=1`}
                  title="How We Work"
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
                    alt="How We Work"
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
          {/* CAREER / PROFESSIONAL RELEVANCE (below video) */}

          <div className="mga-sidebar-career" style={{ marginTop: 24 }}>
            <h4 className="mga-sidebar-career-title">
              Career / Professional Relevance
            </h4>

            <p className="mga-sidebar-career-text">
              Completing this Certificate can support your professional profile
              as a generalist or primary-care-focused practitioner, adding a
              structured, internationally accredited credential to your CV. It's
              a knowledge and confidence-building step for doctors managing
              broad outpatient caseloads — not a substitute for a postgraduate
              degree.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}