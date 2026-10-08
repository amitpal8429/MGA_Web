import { useEffect, useState } from "react";
import { Link, useParams, Navigate, useLocation } from "react-router-dom";
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
  Tag,
  X,
  Lock,
} from "lucide-react";

import { fetchCourseDetails } from "../lib/api";
import { getRedirectSlug, getAliasSlug } from "../lib/redirects";
import { getCourseMeta, cleanTitle } from "../lib/courseMeta";
import CourseImage from "../components/CourseImage";
import { DetailSkeleton } from "../components/Skeletons";
import ErrorState from "../components/ErrorState";
import Faq from "../components/Faq";
import LeadForm from "../components/LeadForm";
import PayButton from "../components/PayButton";
import CourseSchema from "../components/CourseSchema";
import FaqSchema from "../components/FaqSchema";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import ImageObjectSchema from "../components/ImageObjectSchema";
import MetaDescription from "../components/MetaDescription";
import ReviewSlider from "../components/ReviewSlider";

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
   OVERVIEW READ MORE
   ========================================================= */

const OVERVIEW_LIMIT = 320;

const truncateAtWord = (text, limit) => {
  if (!text || text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).trim()}…`;
};

/* =========================================================
   CURRICULUM LOCK
   ========================================================= */

// Pehle kitne modules free dikhane hain
const FREE_MODULES = 4;

// Jin courses (slug) par visitor form bhar chuka hai, unki list yahan save hoti hai
const UNLOCK_KEY = "mga_unlocked_courses";

const getUnlockedCourses = () => {
  try {
    const list = JSON.parse(localStorage.getItem(UNLOCK_KEY));
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

const saveUnlockedCourse = (slug) => {
  try {
    const list = getUnlockedCourses();
    if (!list.includes(slug)) {
      localStorage.setItem(UNLOCK_KEY, JSON.stringify([...list, slug]));
    }
  } catch {
    /* ignore */
  }
};

/* =========================================================
   PROMO CODES
   ========================================================= */

const PROMO_CODES = {
  MGA005: 5,
  MGACADEMY: 10,
};

/* =========================================================
   PG COURSE DETECTION
   ========================================================= */

const PG_RE = /\bpg\b|post[\s-]?graduate|postgraduate/i;

const isPgCourse = (slug, name) => PG_RE.test(`${slug || ""} ${name || ""}`);

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
   VIDEO
   ========================================================= */

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
   PAYER DETAILS VALIDATION
   ========================================================= */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayer({ name, email, phone }) {
  if (name.trim().length < 2) return "Please enter your full name.";
  if (!EMAIL_RE.test(email.trim())) return "Please enter a valid email address.";
  if (phone.replace(/\D/g, "").length < 10)
    return "Please enter a valid phone number (at least 10 digits).";
  return "";
}

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

  .mga-pg-note {
    margin: 0 0 32px;
    padding: 20px 24px;
    background: #fff8e6;
    border: 1px solid #f3dca0;
    border-left: 4px solid #e0a800;
    border-radius: 14px;
    box-sizing: border-box;
  }

  .mga-pg-note-title {
    margin: 0 0 8px;
    color: #16324f;
    font-size: 18px;
    line-height: 1.3;
    font-weight: 750;
  }

  .mga-pg-note-text {
    margin: 0 0 8px;
    color: #596b7e;
    font-size: 15px;
    line-height: 1.6;
  }

  .mga-pg-note-text:last-child {
    margin-bottom: 0;
  }

  .overview-toggle {
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    color: #1f7ac4;
    font: inherit;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    white-space: nowrap;
  }

  .overview-toggle:hover {
    color: #1867a8;
  }

  /* ===== Curriculum lock ===== */

  .module-item.is-locked .module-toggle {
    cursor: pointer;
  }

  .module-item.is-locked .module-index,
  .module-item.is-locked .module-name {
    opacity: 0.6;
  }

  .module-item.is-locked .module-icon {
    color: #8a97a8;
  }

  .curriculum-unlock {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin-top: 14px;
    padding: 13px 16px;
    background: #f0f7fd;
    border: 1px dashed #1f7ac4;
    border-radius: 12px;
    color: #0c3a6b;
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .curriculum-unlock:hover {
    background: #e4f0fb;
  }

  .cur-lock-overlay {
    position: fixed;
    inset: 0;
    z-index: 1200;
    background: rgba(12, 18, 32, 0.62);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .cur-lock-modal {
    position: relative;
    width: min(94vw, 440px);
    max-height: 92vh;
    overflow-y: auto;
    background: #ffffff;
    border-radius: 18px;
    padding: 26px 22px 22px;
    box-shadow: 0 30px 80px rgba(8, 15, 40, 0.45);
    box-sizing: border-box;
  }

  .cur-lock-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 0;
    background: #eef1f6;
    color: #3a4357;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cur-lock-close:hover {
    background: #dfe4ee;
  }

  .cur-lock-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    margin-bottom: 12px;
    border-radius: 50%;
    background: #e8f3fc;
    color: #1f7ac4;
  }

  .cur-lock-title {
    margin: 0 0 6px;
    color: #16324f;
    font-size: 20px;
    line-height: 1.3;
    font-weight: 750;
  }

  .cur-lock-text {
    margin: 0 0 16px;
    color: #596b7e;
    font-size: 15px;
    line-height: 1.55;
  }

  /* ===== Promo section ===== */

  /* Collapsed trigger button */
  .promo-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    margin: 12px 0 16px;
    padding: 12px 16px;
    background: #f7f9fb;
    border: 1px dashed #c9d6e2;
    border-radius: 12px;
    color: #16324f;
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease;
  }

  .promo-trigger:hover {
    border-color: #1f7ac4;
    background: #eef5fc;
  }

  /* Expanded panel */
  .promo-wrap {
    margin: 12px 0 16px;
    padding: 14px 14px 16px;
    background: #f7f9fb;
    border: 1px dashed #c9d6e2;
    border-radius: 14px;
    box-sizing: border-box;
  }

  .promo-label {
    margin: 0 0 10px;
    font-size: 13px;
    font-weight: 700;
    color: #16324f;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .promo-mode-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .promo-mode-btn {
    padding: 10px 8px;
    background: #ffffff;
    color: #16324f;
    border: 1px solid #dce4ea;
    border-radius: 10px;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease;
  }

  .promo-mode-btn:hover {
    border-color: #1f7ac4;
  }

  .promo-mode-btn.is-active {
    background: #e8f3fc;
    border-color: #1f7ac4;
    color: #0c3a6b;
  }

  .promo-mode-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .promo-input-row {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .promo-input {
    flex: 1 1 auto;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid #dce4ea;
    border-radius: 10px;
    background: #ffffff;
    color: #16324f;
    font: inherit;
    font-size: 14px;
    text-transform: uppercase;
  }

  .promo-input:disabled {
    background: #f0f4f8;
    color: #16324f;
    cursor: not-allowed;
    opacity: 1;
  }

  .promo-input:focus {
    outline: 2px solid #1f7ac4;
    outline-offset: 1px;
    border-color: #1f7ac4;
  }

  .promo-apply-btn {
    padding: 10px 16px;
    background: #1f7ac4;
    color: #ffffff;
    border: 1px solid #1f7ac4;
    border-radius: 10px;
    font: inherit;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .promo-apply-btn:hover {
    background: #1867a8;
  }

  .promo-msg {
    margin: 10px 0 0;
    font-size: 13px;
    line-height: 1.45;
  }

  .promo-msg.is-error {
    color: #b42318;
  }

  .promo-msg.is-success {
    color: #166534;
    font-weight: 600;
  }

  /* Applied state */
  .promo-applied {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin: 12px 0 16px;
    padding: 12px 14px;
    background: #eafaf0;
    border: 1px solid #b7e4c7;
    border-radius: 12px;
    box-sizing: border-box;
  }

  .promo-applied-text {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    color: #166534;
    font-size: 14px;
    font-weight: 700;
  }

  .promo-applied-sub {
    display: block;
    margin-top: 2px;
    font-size: 12px;
    font-weight: 500;
    color: #3c7a54;
  }

  .promo-remove-btn {
    flex: 0 0 auto;
    padding: 6px 10px;
    background: #ffffff;
    color: #166534;
    border: 1px solid #b7e4c7;
    border-radius: 8px;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .promo-remove-btn:hover {
    background: #dff7e8;
  }

  /* Fee summary rows */
  .fee-row {
    margin-top: 6px;
    font-size: 15px;
    color: #596b7e;
    line-height: 1.5;
  }

  .fee-row s {
    opacity: 0.75;
    margin-right: 6px;
  }

  .fee-row .fee-final {
    color: #16324f;
    font-weight: 700;
  }

  .promo-discount-pill {
    display: inline-block;
    margin-left: 8px;
    padding: 2px 8px;
    background: #dff7e8;
    color: #166534;
    font-size: 12px;
    font-weight: 700;
    border-radius: 999px;
  }

  /* Payment details form */
  .mga-pay-fields {
    display: grid;
    gap: 10px;
    margin-bottom: 12px;
  }

  .mga-pay-input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px;
    border: 1px solid #dce4ea;
    border-radius: 12px;
    background: #ffffff;
    color: #16324f;
    font: inherit;
    font-size: 15px;
  }

  .mga-pay-input:focus {
    outline: 2px solid #1f7ac4;
    outline-offset: 1px;
    border-color: #1f7ac4;
  }

  .mga-pay-success {
    margin: 0;
    padding: 14px 16px;
    border-radius: 12px;
    background: #dff7e8;
    color: #166534;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.45;
    text-align: center;
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

    .mga-pg-note {
      padding: 18px 20px;
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

    .mga-pg-note {
      padding: 16px;
    }

    .mga-pg-note-title {
      font-size: 17px;
    }

    .mga-pg-note-text {
      font-size: 14px;
    }

    .cur-lock-modal {
      padding: 24px 16px 18px;
    }
  }
`;

/* =========================================================
   COMPONENT
   ========================================================= */

export default function CourseDetail() {
  const { slug } = useParams();
  const { pathname } = useLocation();

  const redirectSlug = getRedirectSlug(slug);
  const fetchSlug = getAliasSlug(slug) || slug;

  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [openModule, setOpenModule] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  // CURRICULUM LOCK
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [leadDone, setLeadDone] = useState(false); // is course ka form bhara ja chuka hai?

  // PROMO
  const [promoOpen, setPromoOpen] = useState(false); // panel open/close
  const [feeMode, setFeeMode] = useState(null); // null | "online" | "hybrid"
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null); // { code, percent, mode }
  const [promoError, setPromoError] = useState("");

  // Payment
  const [paid, setPaid] = useState(false);
  const [payer, setPayer] = useState({ name: "", email: "", phone: "" });

  const updatePayer = (field) => (e) =>
    setPayer((prev) => ({ ...prev, [field]: e.target.value }));

  /* FETCH COURSE */

  useEffect(() => {
    if (redirectSlug) return undefined;

    let cancelled = false;

    setCourse(null);
    setError(null);
    setOpenModule(0);
    setPaid(false);
    setOverviewExpanded(false);
    setLockModalOpen(false);
    setLeadDone(getUnlockedCourses().includes(slug));

    // reset promo state
    setPromoOpen(false);
    setFeeMode(null);
    setPromoInput("");
    setAppliedPromo(null);
    setPromoError("");

    fetchCourseDetails(fetchSlug)
      .then((data) => {
        if (cancelled) return;
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
  }, [fetchSlug, redirectSlug, slug]);

  /* LOCK POPUP: Esc se band */

  useEffect(() => {
    if (!lockModalOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setLockModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lockModalOpen]);

  /* REDIRECT */

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

  const canonicalUrl = `${SITE_URL}${pathname}`;

  const filteredWhatYouLearn =
    course.what_you_learn?.filter(
      (w) => !hasHandsOn(w.heading, w.description)
    ) || [];

  const showPgNote = isPgCourse(slug, course.name);

  /* CURRICULUM LOCK: derived */

  const totalModules = course.module?.length || 0;
  const lockedCount = leadDone ? 0 : Math.max(0, totalModules - FREE_MODULES);

  /* OVERVIEW */

  const fullOverview = stripHandsOnSentences(cleanText(course.description));
  const isLongOverview =
    fullOverview && fullOverview.length > OVERVIEW_LIMIT;
  const visibleOverview =
    isLongOverview && !overviewExpanded
      ? truncateAtWord(fullOverview, OVERVIEW_LIMIT)
      : fullOverview;

  /* PROMO: derived */

  const hasHybrid = Number(course.hybrid_cpd) > 0;

  const onlineBaseAmount = Number(course.total_fee) || 0;
  const hybridBaseAmount = Number(course.hybrid_cpd) || 0;

  const onlineDiscountPercent =
    appliedPromo && appliedPromo.mode === "online" ? appliedPromo.percent : 0;
  const hybridDiscountPercent =
    appliedPromo && appliedPromo.mode === "hybrid" ? appliedPromo.percent : 0;

  const onlineFinalAmount = onlineDiscountPercent
    ? Math.round(
        onlineBaseAmount - (onlineBaseAmount * onlineDiscountPercent) / 100
      )
    : onlineBaseAmount;

  const hybridFinalAmount = hybridDiscountPercent
    ? Math.round(
        hybridBaseAmount - (hybridBaseAmount * hybridDiscountPercent) / 100
      )
    : hybridBaseAmount;

  /* PROMO: handlers */

  const handleOpenPromo = () => {
    setPromoOpen(true);
    setPromoError("");
  };

  const handleModeClick = (mode) => {
    // Once applied, don't allow switching mode
    if (appliedPromo) return;

    setFeeMode(mode);
    setPromoInput("");
    setPromoError("");
  };

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();

    if (!code) {
      setPromoError("Please enter a promo code.");
      return;
    }

    if (!feeMode) {
      setPromoError("Please select Online or Hybrid first.");
      return;
    }

    const percent = PROMO_CODES[code];

    if (!percent) {
      setPromoError("Invalid promo code. Please check and try again.");
      setAppliedPromo(null);
      return;
    }

    setPromoError("");
    setAppliedPromo({ code, percent, mode: feeMode });
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError("");
    setFeeMode(null);
    setPromoOpen(false);
  };

  /* LEAD FORM: success par is course ke saare modules unlock */

  const handleLeadSuccess = () => {
    saveUnlockedCourse(slug);
    setLeadDone(true);
    setLockModalOpen(false);
  };

  /* RENDER */

  return (
    <article>
      <style>{PAGE_CSS}</style>

      {/* SEO */}

      <Helmet>
        <title>{metaTitle}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="robots"
          content={
            slug === "pg-diploma-in-reproductive-and-child-health"
              ? "noindex, nofollow"
              : "index, follow"
          }
        />

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

      <MetaDescription content={metaDescription} />

      {/* SCHEMA: Course + FAQ + Breadcrumb + ImageObject */}

      <CourseSchema
        name={course.name}
        description={metaDescription}
        url={canonicalUrl}
        image={course.image}
        duration={course.duration}
        price={Number(course.fee) || 0}
        startDate={course.start_date}
      />
      <FaqSchema />
      <BreadcrumbSchema
        pageTitle={course.name}
        pageUrl={canonicalUrl}
        parentLabel="Programs"
        parentUrl={`${SITE_URL}/courses`}
      />
      <ImageObjectSchema
        imageUrl={course.image}
        caption={course.name}
        pageUrl={canonicalUrl}
      />

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

      <div className="wrap detail-grid">
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

          {/* PG NOTE */}

          {showPgNote && (
            <section className="mga-pg-note" aria-labelledby="pg-note-title">
              <h3 id="pg-note-title" className="mga-pg-note-title">
                Important Note – PG Diploma
              </h3>

              <p className="mga-pg-note-text">
                <strong>Please Note:</strong> This is not a 2-year Government PG Diploma
                program. The course is a professional upskilling/certification 1-Year
                program designed for eligible medical professionals.
              </p>

              <p className="mga-pg-note-text">
                <strong>Eligibility:</strong> The program is intended for
                medical professionals with qualifications such as MBBS, MD,
                MS,DNB or DGO, depending on the specific course and
                specialization.
              </p>
            </section>
          )}

          {/* OVERVIEW */}

          <section className="detail-block">
            <h2>Overview</h2>

            <p>
              {visibleOverview}
              {isLongOverview && (
                <>
                  {" "}
                  <button
                    type="button"
                    className="overview-toggle"
                    onClick={() => setOverviewExpanded((v) => !v)}
                    aria-expanded={overviewExpanded}
                  >
                    {overviewExpanded ? "Read less" : "Read more"}
                  </button>
                </>
              )}
            </p>
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

          {/* CURRICULUM (pehle FREE_MODULES khule, baaki locked) */}

          {totalModules > 0 && (
            <section className="detail-block">
              <div className="curriculum-head">
                <h2>Curriculum</h2>
                <span className="muted">{totalModules} modules</span>
              </div>

              <div className="module-list">
                {course.module.map((m, i) => {
                  const isLocked = !leadDone && i >= FREE_MODULES;
                  const isOpen = !isLocked && openModule === i;

                  const filteredSessions =
                    m.sessions?.filter((s) => !hasHandsOn(s.title)) || [];

                  return (
                    <div
                      className={`module-item ${isOpen ? "is-open" : ""} ${
                        isLocked ? "is-locked" : ""
                      }`}
                      key={m.id}
                    >
                      <button
                        type="button"
                        className="module-toggle"
                        onClick={() =>
                          isLocked
                            ? setLockModalOpen(true)
                            : setOpenModule(isOpen ? -1 : i)
                        }
                        aria-expanded={isLocked ? undefined : isOpen}
                        aria-haspopup={isLocked ? "dialog" : undefined}
                      >
                        <span className="module-index">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <span className="module-name">{cleanText(m.module)}</span>

                        <span className="muted module-count">
                          {isLocked
                            ? "Locked"
                            : `${filteredSessions.length || 0} lessons`}
                        </span>

                        <span className="module-icon">
                          {isLocked ? (
                            <Lock size={16} />
                          ) : isOpen ? (
                            <Minus size={16} />
                          ) : (
                            <Plus size={16} />
                          )}
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

              {lockedCount > 0 && (
                <button
                  type="button"
                  className="curriculum-unlock"
                  onClick={() => setLockModalOpen(true)}
                >
                  <Lock size={15} />
                  {lockedCount} more {lockedCount === 1 ? "module is" : "modules are"}{" "}
                  locked. Fill the form to unlock
                </button>
              )}
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

        {/* SIDEBAR */}

        <aside className="detail-sidebar">
          <div className="apply-card">
            {fee && (
              <div className="apply-price">
                <span className="apply-price-label">Registration fee</span>

                <span className="apply-price-value">{fee}</span>

                {/* Hybrid total */}
                {hybridFee && (
                  <p className="fee-row">
                    Total Hybrid program cost{" "}
                    {hybridDiscountPercent > 0 ? (
                      <>
                        <s>{formatINR(hybridBaseAmount)}</s>
                        <span className="fee-final">
                          {formatINR(hybridFinalAmount)}
                        </span>
                        <span className="promo-discount-pill">
                          {hybridDiscountPercent}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="fee-final">{hybridFee}</span>
                    )}
                  </p>
                )}

                {/* Online total */}
                {totalFee && totalFee !== fee && (
                  <p className="fee-row">
                    Total Online program cost{" "}
                    {onlineDiscountPercent > 0 ? (
                      <>
                        <s>{formatINR(onlineBaseAmount)}</s>
                        <span className="fee-final">
                          {formatINR(onlineFinalAmount)}
                        </span>
                        <span className="promo-discount-pill">
                          {onlineDiscountPercent}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="fee-final">{totalFee}</span>
                    )}
                  </p>
                )}
              </div>
            )}

            {/* PROMO SECTION */}

            {fee && (
              <>
                {!appliedPromo && !promoOpen && (
                  <button
                    type="button"
                    className="promo-trigger"
                    onClick={handleOpenPromo}
                  >
                    <Tag size={15} />
                    Have a promo code?
                  </button>
                )}

                {!appliedPromo && promoOpen && (
                  <div className="promo-wrap">
                    <p className="promo-label">Apply Promo Code</p>

                    <div className="promo-mode-row">
                      <button
                        type="button"
                        className={`promo-mode-btn ${
                          feeMode === "online" ? "is-active" : ""
                        }`}
                        onClick={() => handleModeClick("online")}
                      >
                        Online
                      </button>

                      <button
                        type="button"
                        className={`promo-mode-btn ${
                          feeMode === "hybrid" ? "is-active" : ""
                        }`}
                        onClick={() => handleModeClick("hybrid")}
                        disabled={!hasHybrid}
                        title={
                          !hasHybrid ? "Hybrid option not available" : undefined
                        }
                      >
                        Hybrid
                      </button>
                    </div>

                    {feeMode && (
                      <>
                        <div className="promo-input-row">
                          <input
                            type="text"
                            className="promo-input"
                            placeholder="Enter promo code"
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            aria-label="Promo code"
                          />

                          <button
                            type="button"
                            className="promo-apply-btn"
                            onClick={handleApplyPromo}
                          >
                            Apply
                          </button>
                        </div>

                        {promoError && (
                          <p className="promo-msg is-error">{promoError}</p>
                        )}
                      </>
                    )}
                  </div>
                )}

                {appliedPromo && (
                  <div className="promo-applied">
                    <div>
                      <p className="promo-applied-text">
                        <Tag size={15} />
                        {appliedPromo.code} applied
                      </p>
                      <span className="promo-applied-sub">
                        {appliedPromo.percent}% off on{" "}
                        {appliedPromo.mode === "hybrid" ? "Hybrid" : "Online"}{" "}
                        total
                      </span>
                    </div>

                    <button
                      type="button"
                      className="promo-remove-btn"
                      onClick={handleRemovePromo}
                      aria-label="Remove promo code"
                    >
                      <X size={12} style={{ marginRight: 4 }} />
                      Remove
                    </button>
                  </div>
                )}
              </>
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

            {paid ? (
              <p className="mga-pay-success" role="status">
                ✅ Payment successful! Our team will contact you shortly with
                your enrollment details.
              </p>
            ) : (
              <>
                <div className="mga-pay-fields">
                  <input
                    type="text"
                    className="mga-pay-input"
                    placeholder="Full name"
                    autoComplete="name"
                    value={payer.name}
                    onChange={updatePayer("name")}
                    aria-label="Full name"
                  />
                  <input
                    type="email"
                    className="mga-pay-input"
                    placeholder="Email address"
                    autoComplete="email"
                    value={payer.email}
                    onChange={updatePayer("email")}
                    aria-label="Email address"
                  />
                  <input
                    type="tel"
                    className="mga-pay-input"
                    placeholder="Phone number"
                    autoComplete="tel"
                    value={payer.phone}
                    onChange={updatePayer("phone")}
                    aria-label="Phone number"
                  />
                </div>

                <PayButton
                  course={course.name}
                  amount={Number(course.fee) || 0}
                  name={payer.name.trim()}
                  email={payer.email.trim()}
                  phone={payer.phone.trim()}
                  label="Enroll & Pay Now"
                  buttonStyle={{ ...applyBtnBase, fontFamily: "inherit" }}
                  hoverBg={BTN_BLUE_HOVER}
                  validate={() => validatePayer(payer)}
                  onSuccess={() => setPaid(true)}
                />
              </>
            )}

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

              <LeadForm
                idPrefix={`course-${slug}`}
                onSuccess={handleLeadSuccess}
              />
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

          {/* CAREER */}

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

          {/* LEARNER REVIEWS: Career ke neeche, sirf video slider */}

          <div style={{ marginTop: 24 }}>
            <ReviewSlider />
          </div>
        </aside>
      </div>

      {/* LOCKED MODULE POPUP */}

      {lockModalOpen && (
        <div
          className="cur-lock-overlay"
          onClick={() => setLockModalOpen(false)}
        >
          <div
            className="cur-lock-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cur-lock-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cur-lock-close"
              onClick={() => setLockModalOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <span className="cur-lock-icon">
              <Lock size={22} />
            </span>

            <h3 id="cur-lock-title" className="cur-lock-title">
              Fill the form to unlock the full curriculum
            </h3>

            <p className="cur-lock-text">
              The first {FREE_MODULES} modules are open for preview. Share your
              details and our team will give you the complete curriculum, fees
              and batch details for this program.
            </p>

            <LeadForm
              idPrefix={`curriculum-${slug}`}
              onSuccess={handleLeadSuccess}
            />
          </div>
        </div>
      )}
    </article>
  );
}