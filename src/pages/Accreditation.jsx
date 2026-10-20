import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const SITE_URL = "https://medicalglobalacademy.com";

const TITLE = "Accreditation | Medical Global Academy";
const DESCRIPTION =
  "Verify Medical Global Academy's CPD (UK) and ACTD accreditation directly with the accrediting bodies, and view our accreditation certificate.";


const ACCREDITATIONS = [
  {
    id: "cpd",
    name: "CPD (UK)",
    logo: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/Untitled-design-8.png",
    description:
      "Our certificate programs carry CPD-aligned certification. Check our listing on the CPD website.",
    verifyHref:
      "https://directory.cpdstandards.com/providers/medical-global-academy/",
    certificate: {
      image:
        "https://medicalglobalacademy.com/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-17-at-10.15.41-AM.jpeg",
      alt: "CPD accreditation certificate – Medical Global Academy",
    },
  },
  {
    id: "actd",
    name: "ACTD (American Council of Training and Development)",
    logo: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-24-at-12.17.06-PM.jpeg",
    description:
      "Our certificate programs carry ACTD-aligned certification. Check our listing on the ACTD website.",
    verifyHref: "https://www.actd.us/medicalglobalacademy/",
    certificate: {
      image:
        "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-22-at-3.50.35-PM.jpeg",
      alt: "ACTD fellowship completion certificate (sample)",
      sample: true,
    },
  },
];

const PAGE_CSS = `
  .mga-acc-hero {
    padding: 48px 0 12px;
  }

  .mga-acc-title {
    margin: 0 0 10px;
    color: #16324f;
    font-size: clamp(28px, 4vw, 40px);
    line-height: 1.15;
    font-weight: 750;
    letter-spacing: -0.02em;
  }

  .mga-acc-sub {
    margin: 0;
    max-width: 60ch;
    color: #596b7e;
    font-size: 17px;
    line-height: 1.6;
  }

  .mga-acc-section {
    padding: 28px 0 64px;
  }

  .mga-acc-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    align-items: start;
  }

  .mga-acc-card {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 1px solid #dce4ea;
    border-radius: 18px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .mga-acc-card-top {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 170px;
    padding: 24px;
    background: #f7f9fb;
    border-bottom: 1px solid #dce4ea;
  }

  .mga-acc-logo {
    display: block;
    max-width: 100%;
    max-height: 130px;
    object-fit: contain;
  }

  .mga-acc-card-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 22px 24px 24px;
  }

  .mga-acc-name {
    margin: 0;
    color: #16324f;
    font-size: 20px;
    line-height: 1.3;
    font-weight: 750;
  }

  .mga-acc-desc {
    margin: 0;
    color: #596b7e;
    font-size: 15px;
    line-height: 1.6;
  }

  .mga-acc-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 4px;
  }

  .mga-acc-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 18px;
    border-radius: 999px;
    border: 1px solid #1f7ac4;
    background: #1f7ac4;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    transition: background-color 0.15s ease;
  }

  .mga-acc-btn:hover {
    background: #1867a8;
  }

  .mga-acc-btn:focus-visible {
    outline: 3px solid #9cc9ee;
    outline-offset: 2px;
  }

  .mga-acc-cert-wrap {
    padding: 0 24px 24px;
  }

  .mga-acc-cert-label {
    margin: 0 0 10px;
    color: #16324f;
    font-size: 14px;
    font-weight: 700;
  }

  .mga-acc-cert {
    display: block;
    border: 1px solid #dce4ea;
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
  }

  .mga-acc-cert img {
    display: block;
    width: 100%;
    height: auto;
  }

  .mga-acc-footer {
    margin-top: 40px;
    padding: 22px 24px;
    background: #f0f7fd;
    border: 1px solid #cfe4f6;
    border-radius: 16px;
    color: #2c3e50;
    font-size: 15px;
    line-height: 1.6;
  }

  .mga-acc-footer p {
    margin: 0 0 12px;
  }

  .mga-acc-footer p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .mga-acc-hero { padding: 32px 0 8px; }
    .mga-acc-grid { grid-template-columns: 1fr; }
    .mga-acc-sub  { font-size: 16px; }
  }
`;

export default function Accreditation() {
  const canonicalUrl = `${SITE_URL}/accreditation`;

  return (
    <>
      <style>{PAGE_CSS}</style>

      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={canonicalUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Helmet>

      <section className="mga-acc-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="muted"> / Accreditation</span>
          </div>

          <h1 className="mga-acc-title">Accreditation</h1>
          <p className="mga-acc-sub">
            Verify our certification directly with the accrediting bodies.
          </p>
        </div>
      </section>

      <section className="mga-acc-section">
        <div className="wrap">
          <div className="mga-acc-grid">
            {ACCREDITATIONS.map((a) => (
              <article className="mga-acc-card" key={a.id}>
                <div className="mga-acc-card-top">
                  <img
                    src={a.logo}
                    alt={`${a.name} accreditation logo`}
                    className="mga-acc-logo"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                <div className="mga-acc-card-body">
                  <h2 className="mga-acc-name">{a.name}</h2>
                  <p className="mga-acc-desc">{a.description}</p>

                  <div className="mga-acc-actions">
                    <a
                      href={a.verifyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mga-acc-btn"
                      aria-label={`Verify ${a.name} listing (opens in new tab)`}
                    >
                      Verify listing
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {a.certificate?.image && (
                  <div className="mga-acc-cert-wrap">
                    <p className="mga-acc-cert-label">
                      {a.certificate.sample ? "Sample certificate" : "Our certificate"}
                    </p>

                    <div
                      className="mga-acc-cert"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <img
                        src={a.certificate.image}
                        alt={a.certificate.alt}
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mga-acc-footer">
            <p>
              Please note that these are professional upskilling and
              certification programs. They are not a substitute for a
              government-recognised postgraduate degree.
            </p>
            <p>
              Questions about accreditation? Write to{" "}
              <a href="mailto:support@medicalglobalacademy.com" className="link">
                support@medicalglobalacademy.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}