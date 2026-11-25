import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { fetchCourseList, fetchFacultyList } from "../lib/api";
import ErrorState from "../components/ErrorState";
import { initials } from "../lib/format";
import LeadForm from "../components/LeadForm";

const SITE_URL = "https://medicalglobalacademy.com";
const AD_PAGE_URL = `${SITE_URL}/ad`;

const AD_TITLE = "Apply Now | Medical Global Academy";
const AD_DESCRIPTION =
  "Certificate, PG Diploma and fellowship programs for doctors across medicine and surgery. UK CPD accredited, live online classes, 1-year mentorship.";

/* ---------- WhatsApp config (ad page only) ---------- */
const WHATSAPP_NUMBER = "919310027474";

const buildWhatsappUrl = (text) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;

const AD_MESSAGE = "Hi, I saw your ad and want to get more details.";
const AD_HERO_URL = buildWhatsappUrl(AD_MESSAGE);
const waCourseUrl = (courseName) =>
  buildWhatsappUrl(`${AD_MESSAGE} Course: ${courseName}`);

const PG_TYPE_RE = /\bpg\b|post[\s-]?graduate|diploma/i;
const CERT_TYPE_RE = /certificate/i;

const SPECIALITIES = [
  { name: "Cardiology", match: ["Cardiology"] },
  { name: "Medicine", match: ["Medicine"] },
  { name: "Oncology", match: ["Oncology"] },
  { name: "Nephrology", match: ["Nephrology"] },
  { name: "Neurology", match: ["Neurology"] },
  { name: "Orthopedics", match: ["Orthopedic", "Orthopedics"] },
  {
    name: "Obstetrics & Gynaecology",
    match: ["Obstetrics & Gynaecology", "Obstetrics & Gynecology"],
  },
];

const WHY_CHOOSE_US = [
  {
    icon: GraduationCap,
    title: "Experienced faculty",
    text: "Train under specialist doctors and healthcare leaders with real clinical expertise.",
  },
  {
    icon: Sparkles,
    title: "Practical, flexible learning",
    text: "Case-based, video-driven learning designed for working doctors, anytime and anywhere.",
  },
  {
    icon: BadgeCheck,
    title: "Recognised certification",
    text: "CPD and ACTD aligned certificates that add real, verifiable value to your career.",
  },
  {
    icon: HeartHandshake,
    title: "Career support & guidance",
    text: "Mentorship and career direction tailored to your goals and clinical interests.",
  },
];

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

const REVIEW_REELS = [
  "https://www.instagram.com/p/DcJeMk5h_RQ/",
  "https://www.instagram.com/p/Db2exf_BHJl/",
  "https://www.instagram.com/p/DbbBANvB1Ye/",
  "https://www.instagram.com/p/DbYp-lJhlqQ/",
  "https://www.instagram.com/p/DaShgNPBg0I/",
  "https://www.instagram.com/p/Da0EfJiBum0/",
  "https://www.instagram.com/p/Dak1cKHhkki/",
  "https://www.instagram.com/p/DaP6a2YBl2I/",
  "https://www.instagram.com/p/DaNZKcuoLFc/",
  "https://www.instagram.com/p/DaDCd99Bjyu/",
  "https://www.instagram.com/p/DaC7od3BTd5/",
  "https://www.instagram.com/p/DZrpp8BBo_t/",
];

const AD_CSS = `
  .hero-grid { align-items: start; }

  .hero-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .hero-logo {
    display: block;
    height: 55px;
    width: auto;
  }
  .hero-brand-name {
    font-size: 24px;
    font-weight: 800;
    color: #0c3a6b;
    line-height: 1.1;
    letter-spacing: -0.5px;
  }

  .hero-form-card {
    max-width: 330px;
    width: 100%;
    justify-self: end;
    align-self: start;
  }
  .hero-form-card .hero-form-head { padding: 12px 14px; }
  .hero-form-card .hero-form-body { padding: 12px 14px; }
  .hero-form-card .hero-form-eyebrow {
    font-size: 9px;
    padding: 3px 8px;
    margin: 0 0 6px;
  }
  .hero-form-card h2 { font-size: 15px; margin: 2px 0; color: #ffffff; line-height: 1.25; }
  .hero-form-card .hero-form-sub { font-size: 11px; margin: 0; }
  .hero-form-card h3 { font-size: 14px; margin: 0 0 2px; line-height: 1.3; }
  .hero-form-card .hero-form-desc { font-size: 11px; margin: 0 0 6px; line-height: 1.4; }
  .hero-form-card .mga-field { margin-bottom: 8px !important; }
  .hero-form-card .mga-field label {
    font-size: 11px !important;
    margin-bottom: 4px !important;
  }
  .hero-form-card .mga-input-box { height: 38px !important; }
  .hero-form-card .mga-input-box input {
    height: 38px !important;
    padding: 0 10px 0 34px !important;
    font-size: 12px !important;
  }
  .hero-form-card .mga-input-icon { left: 11px; }
  .hero-form-card .mga-code-box input { padding-left: 34px !important; }
  .hero-form-card .mga-phone-wrap { grid-template-columns: 88px 1fr !important; gap: 8px !important; }
  .hero-form-card .mga-phone-input input { padding-left: 34px !important; }
  .hero-form-card .mga-auth-submit {
    min-height: 40px !important;
    font-size: 13px !important;
    margin-top: 2px !important;
  }
  .hero-form-card .mga-terms-check {
    font-size: 11px !important;
    margin: 4px 0 8px !important;
  }

  .section { padding-top: 40px !important; padding-bottom: 40px !important; }
  .section-head { margin-bottom: 24px !important; }
  .section-head.section-head-center h2 { margin-bottom: 0; }
  .dept-intro { margin: 0 0 16px !important; }
  .reviews-section { padding-bottom: 40px !important; }
  .review-slider { padding-bottom: 12px !important; }
  .review-nav { margin-top: 0 !important; }

  @media (max-width: 760px) {
    .section { padding-top: 28px !important; padding-bottom: 28px !important; }
    .section-head { margin-bottom: 18px !important; }
    .hero-logo { height: 45px; }
    .hero-brand-name { font-size: 20px; }
  }

  .hero-stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 28px; max-width: 680px; }
  .hero-stat-card { background: #ffffff; border: 1px solid #dce4ea; border-radius: 16px; padding: 20px; min-height: 110px; box-shadow: 0 6px 18px rgba(15, 39, 68, 0.06); box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
  .hero-stat-card strong { display: block; font-size: 32px; font-weight: 700; color: #1e3a5f; line-height: 1.1; }
  .hero-stat-card span { display: block; margin-top: 8px; font-size: 14px; font-weight: 500; color: #64748b; line-height: 1.3; }

  .section-head.section-head-center { display: flex; flex-direction: column; align-items: center; text-align: center; }
  .section-head.section-head-center .eyebrow-sm { font-size: 20px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #1e3a5f; margin: 0 0 6px; }
  .section-head.section-head-center h2 { font-size: 15px; font-weight: 700; color: #0f2744; margin: 0; line-height: 1.4; }

  .why-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin: 0; padding: 0; list-style: none; }
  .why-card { display: flex; flex-direction: column; align-items: center; text-align: center; height: 100%; padding: 22px 18px; background: #ffffff; border: 1px solid #dce4ea; border-radius: 14px; box-sizing: border-box; box-shadow: 0 6px 18px rgba(15, 39, 68, 0.05); transition: box-shadow 0.2s ease, transform 0.2s ease; }
  .why-card:hover { box-shadow: 0 10px 24px rgba(15, 39, 68, 0.08); transform: translateY(-2px); }
  .why-icon { display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; margin-bottom: 14px; border-radius: 14px; background: #e8f1fa; color: #0c3a6b; }
  .why-title { margin: 0 0 6px; font-size: 16px; font-weight: 700; color: #0f2744; line-height: 1.3; }
  .why-text { margin: 0; font-size: 14px; color: #64748b; line-height: 1.55; }

  .accred-single-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; max-width: 1200px; margin: 0 auto; align-items: stretch; }
  .accred-item { min-width: 0; width: 100%; }
  .accred-box { display: flex; align-items: center; justify-content: center; width: 100%; height: 220px; box-sizing: border-box; padding: 16px; margin: 0; border-radius: 14px; border: 1px solid #dce4ea; background: #ffffff; overflow: hidden; text-decoration: none; color: inherit; }
  a.accred-box { cursor: pointer; }
  .accred-box img { display: block; max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; }

  .dept-intro { text-align: center; font-size: 16px; color: #4a5a6e; margin: 0 0 24px; line-height: 1.6; }
  .dept-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin: 0; padding: 0; list-style: none; }
  .dept-card { display: flex; flex-direction: column; height: 100%; padding: 18px 20px; background: #ffffff; border: 1px solid #dce4ea; border-top: 3px solid #0c3a6b; border-radius: 14px; box-sizing: border-box; transition: box-shadow 0.2s ease, transform 0.2s ease; }
  .dept-card:hover { box-shadow: 0 10px 24px rgba(15, 39, 68, 0.08); transform: translateY(-2px); }
  .dept-card strong { display: block; font-size: 28px; font-weight: 700; color: #0c3a6b; line-height: 1.2; }
  .dept-card-name { display: block; margin-top: 2px; font-size: 14px; font-weight: 500; color: #4a5a6e; line-height: 1.35; }
  .dept-card-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; align-self: flex-start; margin-top: auto; padding: 8px 18px; border-radius: 999px; background: #066daf; border: 1px solid #066daf; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; transition: background 0.2s ease, transform 0.15s ease; }
  .dept-card-btn:hover { background: #055a91; border-color: #055a91; color: #ffffff; transform: translateY(-1px); }
  .dept-card-btn:focus-visible { outline: 2px solid #066daf; outline-offset: 3px; }
  .dept-card-body { margin-bottom: 12px; }
  .dept-skel { min-height: 118px; border-radius: 14px; background: #eef3f7; }

  .reviews-section { background: #f7fafc; overflow: hidden; }
  .review-slider-wrap { position: relative; }
  .review-slider { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; padding: 8px 4px 20px; scrollbar-width: none; -ms-overflow-style: none; }
  .review-slider::-webkit-scrollbar { display: none; }
  .review-card { flex: 0 0 320px; max-width: 320px; scroll-snap-align: start; background: #ffffff; border: 1px solid #dce4ea; border-radius: 16px; overflow: hidden; box-shadow: 0 6px 18px rgba(15, 39, 68, 0.06); display: flex; flex-direction: column; }
  .review-card-inner { width: 100%; height: 520px; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 16px; position: relative; }
  .review-card-inner .instagram-media { margin: 0 auto !important; min-width: 100% !important; width: 100% !important; max-width: 100% !important; border-radius: 0 !important; box-shadow: none !important; border: none !important; transform: scale(1.35); transform-origin: top center; }
  .review-card-inner iframe { width: 100% !important; min-width: 100% !important; height: 650px !important; border: none !important; }

  .review-nav { display: flex; justify-content: center; gap: 10px; margin-top: 4px; }
  .review-nav button { width: 42px; height: 42px; border-radius: 50%; border: 1px solid #dce4ea; background: #ffffff; color: #0c3a6b; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s ease, transform 0.15s ease; }
  .review-nav button:hover { background: #066daf; border-color: #066daf; color: #ffffff; transform: translateY(-1px); }
  .review-nav button:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  @media (max-width: 1024px) {
    .accred-single-row { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 760px; }
    .why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 760px) {
    .hero-stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .accred-single-row { grid-template-columns: 1fr; max-width: 420px; }
    .dept-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .hero-form-card { max-width: 100%; }
  }

  @media (max-width: 560px) {
    .why-grid { grid-template-columns: 1fr; gap: 12px; }
    .why-card { padding: 18px 16px; flex-direction: row; text-align: left; align-items: flex-start; }
    .why-icon { margin: 0 14px 0 0; flex-shrink: 0; width: 44px; height: 44px; }
    .accred-box { height: 200px; }
    .hero-stat-card strong { font-size: 26px; }
    .hero-stat-card { min-height: 96px; padding: 14px; }
    .section-head.section-head-center .eyebrow-sm { font-size: 17px; }
    .dept-grid { gap: 12px; }
    .dept-card { padding: 14px; }
    .dept-card strong { font-size: 24px; }
    .review-card { flex: 0 0 85%; max-width: 85%; }
    .review-card-inner { height: 480px; }
  }
`;

export default function Ad() {
  const [courses, setCourses] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  const [sliderRef, setSliderRef] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const existing = document.getElementById("instagram-embed-script");
    if (existing) {
      existing.addEventListener("load", () => window.instgrm?.Embeds.process());
      return;
    }
    const script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (window.instgrm && sliderRef) {
      const t = setTimeout(() => window.instgrm.Embeds.process(), 300);
      return () => clearTimeout(t);
    }
  }, [sliderRef]);

  const updateScrollButtons = () => {
    if (!sliderRef) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollButtons();
  }, [sliderRef]);

  const scrollSlider = (dir) => {
    if (!sliderRef) return;
    const amount = sliderRef.clientWidth * 0.8;
    sliderRef.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

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
    };
  }, [courses]);

  const specialityCounts = useMemo(() => {
    if (!courses) return null;
    return SPECIALITIES.map((s) =>
      courses.filter((c) => s.match.includes(c.category?.name)).length
    );
  }, [courses]);

  return (
    <>
      <style>{AD_CSS}</style>

      <Helmet>
        <title>{AD_TITLE}</title>
        <meta name="description" content={AD_DESCRIPTION} />
        <link rel="canonical" href={AD_PAGE_URL} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={AD_TITLE} />
        <meta property="og:description" content={AD_DESCRIPTION} />
        <meta property="og:url" content={AD_PAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={AD_TITLE} />
        <meta name="twitter:description" content={AD_DESCRIPTION} />
      </Helmet>

      <section className="hero">
        <div className="hero-blob" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-brand">
              <img
                src="https://medicalglobalacademy.com/wp-content/uploads/2026/08/logo_new.png"
                alt="Medical Global Academy Logo"
                className="hero-logo"
              />
              <span className="hero-brand-name">Medical Global Academy</span>
            </div>

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
                href={AD_HERO_URL}
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
              <LeadForm idPrefix="ad" />
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
          <section className="section">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">Why choose us</p>
                <h2>Built for working doctors who want real clinical growth</h2>
              </div>

              <ul className="why-grid" aria-label="Why choose Medical Global Academy">
                {WHY_CHOOSE_US.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title}>
                      <div className="why-card">
                        <span className="why-icon" aria-hidden="true">
                          <Icon size={24} />
                        </span>
                        <div>
                          <h3 className="why-title">{item.title}</h3>
                          <p className="why-text">{item.text}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

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

                {ACCREDITATIONS.map((a) => (
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

          <section className="section">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">Our programs</p>
                <h2>Advance your career with programs built for practising doctors</h2>
              </div>

              <p className="dept-intro">
                Whether you want to deepen expertise in your own field or broaden
                your medical knowledge, there is a programme for your goals.
              </p>

              {courses === null ? (
                <div className="dept-grid" aria-hidden="true">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <div key={n} className="dept-skel" />
                  ))}
                </div>
              ) : (
                <ul className="dept-grid" aria-label="Programs by department">
                  {SPECIALITIES.map((s, i) => (
                    <li key={s.name}>
                      <div className="dept-card">
                        <div className="dept-card-body">
                          <strong>{specialityCounts[i]}</strong>
                          <span className="dept-card-name">{s.name}</span>
                        </div>
                        <a
                          href={waCourseUrl(s.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="dept-card-btn"
                          aria-label={`View more ${s.name} programmes on WhatsApp (opens in new tab)`}
                        >
                          View more <ArrowRight size={14} />
                        </a>
                      </div>
                    </li>
                  ))}

                  <li>
                    <div className="dept-card">
                      <div className="dept-card-body">
                        <strong>{stats?.total ?? 0}+</strong>
                        <span className="dept-card-name">All programmes</span>
                      </div>
                      <a
                        href={AD_HERO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dept-card-btn"
                        aria-label="View more programmes on WhatsApp (opens in new tab)"
                      >
                        View more <ArrowRight size={14} />
                      </a>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          </section>

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

          <section className="section reviews-section">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">Student reviews</p>
                <h2>Hear from doctors who advanced their careers with us</h2>
              </div>

              <div className="review-slider-wrap">
                <div
                  className="review-slider"
                  ref={setSliderRef}
                  onScroll={updateScrollButtons}
                >
                  {REVIEW_REELS.map((url) => (
                    <div className="review-card" key={url}>
                      <div className="review-card-inner">
                        <blockquote
                          className="instagram-media"
                          data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                          data-instgrm-version="14"
                        >
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            View this reel on Instagram
                          </a>
                        </blockquote>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="review-nav">
                  <button
                    type="button"
                    onClick={() => scrollSlider(-1)}
                    disabled={!canScrollLeft}
                    aria-label="Previous reviews"
                  >
                    <ArrowRight size={18} style={{ transform: "rotate(180deg)" }} />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollSlider(1)}
                    disabled={!canScrollRight}
                    aria-label="Next reviews"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}