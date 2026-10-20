import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock3,
  LogIn,
  KeyRound,
  ClipboardCheck,
  Unlock,
  Video,
  CreditCard,
  Award,
  Wrench,
  Smartphone,
  Trash2,
} from "lucide-react";

import { SITE } from "../config/site";
import JsonLd from "../components/JsonLd";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import MetaDescription from "../components/MetaDescription";



const APP_NAME = "Medical Global Academy";
const APP_PLATFORM = "Android & iOS";

const APP_VERSION = "";

const WHATSAPP_NUMBER = "+91 9289994218";
const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
  "Hi, I need help with the Medical Global Academy app."
)}`;

const PHONE_DISPLAY = "+91 9289994218";
const PHONE_LINK = "tel:+919289994218";

const SUPPORT_EMAIL = SITE?.email || "support@medicalglobalacademy.com";

const SUPPORT_HOURS = "Mon–Sat, 10:00 AM – 6:00 PM IST";


const FALLBACK_ADDRESS = "Medical Global Academy, India";

const buildAddress = (addr) => {
  if (!addr || typeof addr !== "object") return "";
  return [
    addr.streetAddress,
    addr.addressLocality,
    addr.addressRegion,
    addr.postalCode,
    addr.addressCountry,
  ]
    .filter(Boolean)
    .join(", ");
};

const OFFICE_ADDRESS = buildAddress(SITE?.address) || FALLBACK_ADDRESS;

const DELETION_REVIEW_DAYS = "30";

const RESPONSE_TIME = "We usually respond within 24–48 business hours.";



const SITE_URL = "https://medicalglobalacademy.com";

const META_TITLE = "Support | Medical Global Academy App";
const META_DESCRIPTION =
  "Get help with login, enrolment, course access, live classes, payments, certificates and account deletion for the Medical Global Academy app.";



const HELP_TOPICS = [
  {
    icon: LogIn,
    title: "Login & Account Issues",
    text: "Trouble signing in, wrong credentials or problems with your profile details.",
  },
  {
    icon: KeyRound,
    title: "Password Reset",
    text: "Forgot your password or unable to reset it? We will help you regain access.",
  },
  {
    icon: ClipboardCheck,
    title: "Course Enrollment",
    text: "Questions about eligibility, enrolling in a program and batch start dates.",
  },
  {
    icon: Unlock,
    title: "Course Access Issues",
    text: "Cannot see your course, modules are locked or content is not loading.",
  },
  {
    icon: Video,
    title: "Live Class & Video Issues",
    text: "Problems joining live classes, video buffering or audio and playback errors.",
  },
  {
    icon: CreditCard,
    title: "Payment & Refund Queries",
    text: "Payment not reflected, failed transactions, invoices and refund requests.",
  },
  {
    icon: Award,
    title: "Certificate Issues",
    text: "Certificate not received, name correction or verification questions.",
  },
  {
    icon: Wrench,
    title: "Technical Support",
    text: "App crashes, slow performance, installation or update problems.",
  },
  {
    icon: Smartphone,
    title: "General App Issues",
    text: "Any other question or feedback about the Medical Global Academy app.",
  },
];

const FAQS = [
  {
    q: "How do I log in?",
    a: "Open the app and sign in with the email address or phone number you registered with, along with your password. If you do not have an account yet, tap Sign up and create one.",
  },
  {
    q: "How do I enroll in a course?",
    a: "Browse the programs in the app, open the course you want and choose the enrolment option. Complete the registration payment, and our team will contact you with your enrolment details.",
  },
  {
    q: "How do I reset my password?",
    a: "On the login screen, tap Forgot password and follow the steps. If you do not receive the reset message, contact our support team with your registered email or phone number and we will help you.",
  },
  {
    q: "How do I contact support?",
    a: `You can reach us on WhatsApp or call ${PHONE_DISPLAY}, or email ${SUPPORT_EMAIL}. Our support hours are ${SUPPORT_HOURS}.`,
  },
  {
    q: "How do I request a refund?",
    a: "Please contact our support team with your name, registered phone number or email, and payment details. We will review your request as per our Refund & Cancellation Policy.",
  },
];

const DELETION_DELETED = [
  "Your account and profile information (name, email address, phone number)",
  "Your login credentials and saved app preferences",
  "Your course progress and activity linked to your account",
];

const DELETION_RETAINED = [
  "Payment and transaction records, which we may need to keep for accounting, tax and legal compliance",
  "Certificate issuance records, where required to verify certificates already issued",
];


const PAGE_CSS = `
  .sp-hero {
    padding: 48px 0 36px;
    background: linear-gradient(135deg, #eaf4fd 0%, #f7fbff 100%);
    border-bottom: 1px solid #cfe4f6;
  }

  .sp-breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #596b7e;
  }

  .sp-breadcrumb a {
    color: #1f7ac4;
    text-decoration: none;
  }

  .sp-title {
    margin: 0 0 12px;
    color: #16324f;
    font-size: 36px;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .sp-lead {
    margin: 0;
    max-width: 760px;
    color: #596b7e;
    font-size: 17px;
    line-height: 1.65;
  }

  .sp-section {
    padding: 40px 0 8px;
    scroll-margin-top: 90px;
  }

  .sp-h2 {
    margin: 0 0 20px;
    color: #16324f;
    font-size: 26px;
    line-height: 1.3;
    font-weight: 750;
    letter-spacing: -0.01em;
  }

  .sp-p {
    margin: 0 0 12px;
    max-width: 800px;
    color: #596b7e;
    font-size: 16px;
    line-height: 1.7;
  }

  .sp-contact-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .sp-contact-card {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #dce4ea;
    border-radius: 16px;
    box-sizing: border-box;
  }

  .sp-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #e8f3fc;
    color: #1f7ac4;
    flex: 0 0 auto;
  }

  .sp-card-label {
    margin: 0 0 4px;
    color: #596b7e;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .sp-card-value {
    margin: 0;
    color: #16324f;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 600;
    word-break: break-word;
  }

  .sp-card-value a {
    color: #16324f;
    text-decoration: none;
  }

  .sp-card-value a:hover {
    color: #1f7ac4;
    text-decoration: underline;
  }

  .sp-card-title {
    margin: 4px 0 0;
    color: #16324f;
    font-size: 18px;
    font-weight: 750;
  }

  .sp-card-text {
    margin: 0;
    color: #596b7e;
    font-size: 15px;
    line-height: 1.55;
  }

  .sp-topic-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  .sp-topic {
    padding: 22px;
    background: #f7f9fb;
    border: 1px solid #dce4ea;
    border-radius: 16px;
    box-sizing: border-box;
  }

  .sp-topic .sp-icon {
    margin-bottom: 12px;
  }

  .sp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 20px;
    background: #1f7ac4;
    color: #ffffff;
    border: 1px solid #1f7ac4;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .sp-btn:hover {
    background: #1867a8;
  }

  .sp-btn.is-ghost {
    background: #ffffff;
    color: #1f7ac4;
  }

  .sp-btn.is-ghost:hover {
    background: #eef5fc;
  }

  .sp-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 18px;
  }

  .sp-faq {
    display: grid;
    gap: 12px;
  }

  .sp-faq-item {
    background: #ffffff;
    border: 1px solid #dce4ea;
    border-radius: 14px;
    overflow: hidden;
  }

  .sp-faq-q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    padding: 16px 20px;
    background: none;
    border: 0;
    color: #16324f;
    font: inherit;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
  }

  .sp-faq-q svg {
    flex: 0 0 auto;
    transition: transform 0.2s ease;
  }

  .sp-faq-item.is-open .sp-faq-q svg {
    transform: rotate(180deg);
  }

  .sp-faq-a {
    padding: 0 20px 18px;
    color: #596b7e;
    font-size: 15px;
    line-height: 1.65;
  }

  .sp-delete {
    padding: 26px;
    background: #fff8e6;
    border: 1px solid #f3dca0;
    border-left: 4px solid #e0a800;
    border-radius: 16px;
    box-sizing: border-box;
  }

  .sp-delete h3 {
    margin: 18px 0 8px;
    color: #16324f;
    font-size: 17px;
    font-weight: 750;
  }

  .sp-delete h3:first-of-type {
    margin-top: 0;
  }

  .sp-list {
    margin: 0 0 4px;
    padding-left: 20px;
    color: #596b7e;
    font-size: 15px;
    line-height: 1.7;
  }

  .sp-steps {
    margin: 0 0 4px;
    padding-left: 22px;
    color: #596b7e;
    font-size: 15px;
    line-height: 1.7;
  }

  .sp-info {
    display: grid;
    gap: 0;
    max-width: 520px;
    margin: 0;
    border: 1px solid #dce4ea;
    border-radius: 14px;
    overflow: hidden;
    background: #ffffff;
  }

  .sp-info-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 18px;
    border-bottom: 1px solid #e6edf3;
    font-size: 15px;
  }

  .sp-info-row:last-child {
    border-bottom: 0;
  }

  .sp-info-row dt {
    color: #596b7e;
    font-weight: 600;
  }

  .sp-info-row dd {
    margin: 0;
    color: #16324f;
    font-weight: 700;
    text-align: right;
  }

  .sp-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .sp-links a {
    display: inline-block;
    padding: 10px 18px;
    background: #ffffff;
    color: #1f7ac4;
    border: 1px solid #cfe4f6;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
  }

  .sp-links a:hover {
    background: #eef5fc;
  }

  .sp-bottom-space {
    height: 56px;
  }

  @media (max-width: 900px) {
    .sp-contact-grid {
      grid-template-columns: 1fr;
    }

    .sp-topic-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .sp-hero { padding: 32px 0 26px; }
    .sp-title { font-size: 28px; }
    .sp-lead { font-size: 16px; }
    .sp-h2 { font-size: 22px; }
    .sp-topic-grid { grid-template-columns: 1fr; }
    .sp-delete { padding: 20px 16px; }
    .sp-info-row { flex-direction: column; gap: 2px; }
    .sp-info-row dd { text-align: left; }
  }
`;



export default function Support() {
  const { pathname } = useLocation();
  const [openFaq, setOpenFaq] = useState(0);

  const canonicalUrl = `${SITE_URL}${pathname}`;

  const deleteMailto =
    `mailto:${SUPPORT_EMAIL}` +
    `?subject=${encodeURIComponent("Account Deletion Request")}` +
    `&body=${encodeURIComponent(
      "Hello Medical Global Academy Support,\n\nI would like to request deletion of my account.\n\nRegistered name:\nRegistered email:\nRegistered phone number:\n\nThank you."
    )}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article>
      <style>{PAGE_CSS}</style>

      {/* SEO */}

      <Helmet>
        <title>{META_TITLE}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
      </Helmet>

      <MetaDescription content={META_DESCRIPTION} />

      <BreadcrumbSchema
        pageTitle="Support"
        pageUrl={canonicalUrl}
        parentLabel="Home"
        parentUrl={`${SITE_URL}/`}
      />
      <JsonLd id="support-faq" data={faqSchema} />


      <section className="sp-hero">
        <div className="wrap">
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>Support</span>
          </nav>

          <h1 className="sp-title">Medical Global Academy Support</h1>

          <p className="sp-lead">
            Need help with the Medical Global Academy app? You are in the right
            place.
          </p>
        </div>
      </section>

      <div className="wrap">
   

        <section className="sp-section" id="about" aria-labelledby="sp-about-title">
          <h2 id="sp-about-title" className="sp-h2">
            About
          </h2>

          <p className="sp-p">
            Medical Global Academy is an online learning platform for doctors
            and healthcare professionals. Through our Android and iOS app, you
            can enrol in certificate, fellowship and PG diploma programs,
            access course content, attend live classes and earn certificates
            while continuing your clinical work.
          </p>
          <p className="sp-p">
            Our support team helps you with account access, enrolment, course
            and live class issues, payments, certificates and any technical
            problem you face in the app.
          </p>
        </section>


        <section
          className="sp-section"
          id="contact-information"
          aria-labelledby="sp-contact-title"
        >
          <h2 id="sp-contact-title" className="sp-h2">
            Contact Information
          </h2>

          <div className="sp-contact-grid">
            <div className="sp-contact-card">
              <span className="sp-icon" aria-hidden="true">
                <Mail size={20} />
              </span>
              <div>
                <p className="sp-card-label">Support Email</p>
                <p className="sp-card-value">
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                </p>
              </div>
            </div>

            <div className="sp-contact-card">
              <span className="sp-icon" aria-hidden="true">
                <Phone size={20} />
              </span>
              <div>
                <p className="sp-card-label">Phone / WhatsApp</p>
                <p className="sp-card-value">
                  <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
                </p>
              </div>
            </div>

            <div className="sp-contact-card">
              <span className="sp-icon" aria-hidden="true">
                <MapPin size={20} />
              </span>
              <div>
                <p className="sp-card-label">Office Address</p>
                <p className="sp-card-value">{OFFICE_ADDRESS}</p>
              </div>
            </div>

            <div className="sp-contact-card">
              <span className="sp-icon" aria-hidden="true">
                <Clock3 size={20} />
              </span>
              <div>
                <p className="sp-card-label">Support Hours</p>
                <p className="sp-card-value">{SUPPORT_HOURS}</p>
              </div>
            </div>
          </div>

          <div className="sp-actions">
            <a
              className="sp-btn"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <a className="sp-btn is-ghost" href={`mailto:${SUPPORT_EMAIL}`}>
              <Mail size={18} />
              Email Support
            </a>
          </div>
        </section>


        <section className="sp-section" id="how-we-can-help" aria-labelledby="sp-help-title">
          <h2 id="sp-help-title" className="sp-h2">
            How We Can Help
          </h2>

          <div className="sp-topic-grid">
            {HELP_TOPICS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="sp-topic">
                <span className="sp-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h3 className="sp-card-title">{title}</h3>
                <p className="sp-card-text" style={{ marginTop: 6 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>


        <section className="sp-section" id="faqs" aria-labelledby="sp-faq-title">
          <h2 id="sp-faq-title" className="sp-h2">
            Frequently Asked Questions (FAQs)
          </h2>

          <div className="sp-faq">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;

              return (
                <div
                  key={f.q}
                  className={`sp-faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="sp-faq-q"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{f.q}</span>
                    <ChevronDown size={18} />
                  </button>

                  {isOpen && <div className="sp-faq-a">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </section>

       

        <section
          className="sp-section"
          id="delete-account"
          aria-labelledby="sp-delete-title"
        >
          <h2 id="sp-delete-title" className="sp-h2">
            Delete Account Request
          </h2>

          <div className="sp-delete">
            <p className="sp-p">
              You can request deletion of your Medical Global Academy account at
              any time by contacting our support team.
            </p>

            <h3>How to request deletion</h3>
            <ol className="sp-steps">
              <li>
                Email us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{" "}
                with the subject “Account Deletion Request”, or message us on
                WhatsApp.
              </li>
              <li>
                Include your registered name, email address and phone number so
                we can verify your account.
              </li>
              <li>
                We will confirm your request and complete the deletion within{" "}
                {DELETION_REVIEW_DAYS} days of verification.
              </li>
            </ol>

            <h3>Data that will be deleted</h3>
            <ul className="sp-list">
              {DELETION_DELETED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Data that may be retained</h3>
            <ul className="sp-list">
              {DELETION_RETAINED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="sp-p" style={{ marginTop: 10, fontSize: 14 }}>
              Retained records are kept only for as long as required by law and
              are not used for any other purpose.
            </p>

            <div className="sp-actions">
              <a className="sp-btn" href={deleteMailto}>
                <Trash2 size={18} />
                Request Account Deletion
              </a>
            </div>
          </div>
        </section>


        <section className="sp-section" id="response-time" aria-labelledby="sp-response-title">
          <h2 id="sp-response-title" className="sp-h2">
            Response Time
          </h2>

          <p className="sp-p">{RESPONSE_TIME}</p>
        </section>

     

        <section className="sp-section" id="useful-links" aria-labelledby="sp-links-title">
          <h2 id="sp-links-title" className="sp-h2">
            Useful Links
          </h2>

          <ul className="sp-links">
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms &amp; Conditions</Link>
            </li>
            <li>
              <a href="#contact-information">Contact Us</a>
            </li>
          </ul>
        </section>


        <section className="sp-section" id="app-information" aria-labelledby="sp-app-title">
          <h2 id="sp-app-title" className="sp-h2">
            App Information
          </h2>

          <dl className="sp-info">
            <div className="sp-info-row">
              <dt>App Name</dt>
              <dd>{APP_NAME}</dd>
            </div>
            <div className="sp-info-row">
              <dt>Platform</dt>
              <dd>{APP_PLATFORM}</dd>
            </div>
            {APP_VERSION && (
              <div className="sp-info-row">
                <dt>Latest Version</dt>
                <dd>{APP_VERSION}</dd>
              </div>
            )}
          </dl>
        </section>

        <div className="sp-bottom-space" />
      </div>
    </article>
  );
}