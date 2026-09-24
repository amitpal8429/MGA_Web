import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="mga-about">

      {/* ================= HERO ================= */}
      <section className="about-hero">
        <div className="about-hero-blob" aria-hidden="true" />
        <div className="about-hero-blob about-hero-blob-2" aria-hidden="true" />

        <div className="about-container">
          <span className="about-label">
            <span className="about-label-dot" />
            ABOUT MGA
          </span>

          <h1>
            Medical Education That Fits
            <span className="about-gradient-text"> Your Career</span>
          </h1>

          <p>
            Medical Global Academy provides flexible  medical
            education for practising doctors across India and beyond.
          </p>

          <div className="about-hero-stats">
            <div className="about-hero-stat">
              <strong>228+</strong>
              <span>Active programs</span>
            </div>
            <div className="about-hero-stat-divider" />
            <div className="about-hero-stat">
              <strong>187+</strong>
              <span>Fellowships</span>
            </div>
            <div className="about-hero-stat-divider" />
            <div className="about-hero-stat">
              <strong>25+</strong>
              <span>Faculty mentors</span>
            </div>
          </div>
        </div>
      </section>


      {/* ================= WHO WE ARE ================= */}
      <section className="about-section">
        <div className="about-container about-grid">

          <div className="about-grid-left">
            <span className="about-label">
              <span className="about-label-dot" />
              WHO WE ARE
            </span>

            <h2>
              Learn without stepping away from
              <span className="about-gradient-text"> clinical practice.</span>
            </h2>

            <div className="about-decor-line" />
          </div>

          <div className="about-grid-right">
            <p>
              Medical Global Academy (MGA) is an online medical education
              platform designed for practising doctors who want to continue
              learning while managing their professional responsibilities.
            </p>

            <p>
              Our programmes combine structured online learning, live
              faculty-led sessions and programme-specific training where
              applicable.
            </p>
          </div>

        </div>
      </section>


      {/* ================= WHAT WE OFFER ================= */}
      <section className="about-section about-light">
        <div className="about-container">

          <div className="about-heading">
            <span className="about-label">
              <span className="about-label-dot" />
              WHAT WE OFFER
            </span>

            <h2>
              Programmes for continuous
              <span className="about-gradient-text"> medical learning.</span>
            </h2>
          </div>

          <div className="about-cards">

            <div className="about-card">
              <div className="about-card-icon about-card-icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3>Certificate Courses</h3>
              <p>
                Focused programmes for professional learning and development.
              </p>
            </div>

            <div className="about-card about-card-featured">
              <div className="about-card-badge">Most Popular</div>
              <div className="about-card-icon about-card-icon-teal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3>Fellowship Programmes</h3>
              <p>
                Speciality-focused learning with experienced faculty.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card-icon about-card-icon-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3>Clinical Training</h3>
              <p>
                Observation with real patient cases and hospital partners.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= FACULTY ================= */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-feature">

            <div className="about-feature-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <div className="about-feature-content">
              <span className="about-label">
                <span className="about-label-dot" />
                OUR FACULTY
              </span>

              <h2>
                Learn from experienced
                <span className="about-gradient-text"> medical professionals.</span>
              </h2>

              <p>
                Our programmes are delivered with experienced medical
                professionals and specialists who bring practical clinical
                perspectives into teaching.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= WHY MGA ================= */}
      <section className="about-section about-light">
        <div className="about-container">

          <div className="about-heading">
            <span className="about-label">
              <span className="about-label-dot" />
              WHY MGA
            </span>

            <h2>
              Flexible learning for
              <span className="about-gradient-text"> working doctors.</span>
            </h2>
          </div>

          <div className="why-grid">

            <div className="why-card">
              <div className="why-icon why-icon-blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </div>
              <strong>Flexible</strong>
              <p>Learn around your professional schedule.</p>
            </div>

            <div className="why-card">
              <div className="why-icon why-icon-teal">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              </div>
              <strong>Accessible</strong>
              <p>Access online learning and available recorded sessions.</p>
            </div>

            <div className="why-card">
              <div className="why-icon why-icon-purple">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <strong>Faculty-led</strong>
              <p>Learn from experienced medical professionals.</p>
            </div>

            <div className="why-card">
              <div className="why-icon why-icon-amber">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
                </svg>
              </div>
              <strong>Anywhere</strong>
              <p>Access the online learning component from anywhere.</p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= CTA ================= */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Ready to advance your medical career?</h2>
          <p>Browse our programs and find the right fit for your speciality.</p>
          <div className="about-buttons">
            <a href="/courses">Explore Programs</a>
            
          </div>
        </div>
      </section>

    </div>
  );
}