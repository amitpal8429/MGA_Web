import { Link } from "react-router-dom";
import "./AppPage.css";

const HERO_IMAGE =
  "https://medicalglobalacademy.com/wp-content/uploads/2026/08/2026-08-03-right-panel-teal.png";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.medicalglobalacademy.mga.learning.mga&pcampaignid=web_share";

export default function AppPage() {
  return (
    <section className="app-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>App</span>
        </nav>

        {/* Hero */}
        <div className="app-hero">
          <div className="app-hero-copy">
            <p className="app-eyebrow">MGA Mobile App</p>
            <h1 className="app-title">
              Learn on the go with the Medical Global Academy App
            </h1>
            <p className="app-lede">
              Access your courses, certificates, and faculty sessions anytime,
              anywhere. Download the app to continue learning from your phone
              or tablet.
            </p>

            <div className="app-actions">
              <a
                className="app-store-btn app-store-btn-primary"
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="app-store-icon" aria-hidden="true">
                  ▶
                </span>
                <span className="app-store-text">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </span>
              </a>
            </div>

            <ul className="app-bullets">
              <li>✔ Offline access to purchased courses</li>
              <li>✔ Instant certificate downloads</li>
              <li>✔ Push notifications for live sessions</li>
            </ul>
          </div>

          {/* Right panel: image + QR */}
          <aside className="app-hero-side">
            <div className="app-hero-image-wrap">
              <img
                src={HERO_IMAGE}
                alt="Medical Global Academy app preview"
                loading="lazy"
              />
            </div>

            <div className="app-qr-card">
              <p className="app-qr-title">Scan to download</p>
              <div className="app-qr-image-wrap">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=8&data=${encodeURIComponent(
                    PLAY_STORE_URL
                  )}`}
                  alt="QR code to download the Medical Global Academy app on Google Play"
                  width="300"
                  height="300"
                  loading="lazy"
                />
              </div>
              <p className="app-qr-hint">
                Point your phone camera at the QR code to open the Play Store.
              </p>
            </div>
          </aside>
        </div>

        {/* Features */}
        <div className="app-features">
          <h2>Why learners love our app</h2>
          <div className="app-features-grid">
            <div className="app-feature-card">
              <div className="app-feature-icon">📚</div>
              <h3>All your courses</h3>
              <p>Continue watching right where you left off on any device.</p>
            </div>
            <div className="app-feature-card">
              <div className="app-feature-icon">🎓</div>
              <h3>Certificates</h3>
              <p>Download verifiable certificates immediately after completion.</p>
            </div>
            <div className="app-feature-card">
              <div className="app-feature-icon">🔔</div>
              <h3>Live alerts</h3>
              <p>Never miss a webinar, workshop, or faculty Q&amp;A.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}