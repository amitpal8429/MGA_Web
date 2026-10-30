import React from "react";
import "./About.css";

const FOUNDED_YEAR = "2020";

const STATS = [
  { value: "321+", label: "Active programs" },
  { value: "210+", label: "Fellowships" },
  { value: "47+", label: "Certificates" },
  { value: "64+", label: "PG diplomas" },
  
];

const SPECIALITIES = [
  "Cardiology",
  "Medicine",
  "Oncology",
  "Nephrology",
  "Neurology",
  "Orthopedics",
  "Obstetrics & Gynecology",
  "and many more",
];

const STEPS = [
  {
    title: "Choose your programme",
    text: "Browse Certificate, Fellowship and PG Diploma programmes by speciality.",
  },
  {
    title: "Enrol online",
    text: "Pick the attending or non-attending format that suits your schedule.",
  },
  {
    title: "Learn your way",
    text: "Online learning, live faculty-led sessions and recorded sessions where available.",
  },
  {
    title: "Get certified",
    text: "Complete your programme and receive your certification.",
  },
];

const WHY = [
  {
    tone: "blue",
    title: "Flexible",
    text: "Learn around your professional schedule.",
    icon: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
  {
    tone: "teal",
    title: "Accessible",
    text: "Access online learning and available recorded sessions.",
    icon: (
      <>
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </>
    ),
  },
  {
    tone: "purple",
    title: "Faculty-led",
    text: "Learn from experienced medical professionals.",
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  },
  {
    tone: "amber",
    title: "Anywhere",
    text: "Access the online learning component from anywhere.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </>
    ),
  },
];

const svgProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Label({ children }) {
  return (
    <span className="about-label">
      <span className="about-label-dot" />
      {children}
    </span>
  );
}

export default function About() {
  return (
    <div className="mga-about">

      <section className="about-hero">
        <div className="about-hero-blob" aria-hidden="true" />
        <div className="about-hero-blob about-hero-blob-2" aria-hidden="true" />
        <div className="about-hero-grid" aria-hidden="true" />

        <div className="about-container">
          <div className="about-reveal">
            <Label>ABOUT MGA</Label>

            <h1>
              Medical Education That Fits
              <span className="about-gradient-text"> Your Career</span>
            </h1>

            <p>
              Medical Global Academy provides flexible online medical
              education for practising doctors from every country, with
              Certificate, Fellowship and PG Diploma programmes in 150+
              specialities and sub-specialities.
            </p>

            <div className="about-hero-actions">
              <a href="/courses" className="about-btn about-btn-primary">
                Explore Programs
              </a>
              <a href="#our-story" className="about-btn about-btn-ghost">
                Our Story
              </a>
            </div>
          </div>

          <div className="about-stats-grid about-reveal about-reveal-2">
            {STATS.map((s) => (
              <div className="about-stat-card" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


   
      <section className="about-section" id="our-story">
        <div className="about-container about-grid">

          <div className="about-grid-left">
            <Label>WHO WE ARE</Label>

            <h2>
              Learn without stepping away from
              <span className="about-gradient-text"> clinical practice.</span>
            </h2>

            <div className="about-decor-line" />

            <div className="about-since">
              <span>Serving doctors since</span>
              <strong>{FOUNDED_YEAR}</strong>
            </div>
          </div>

          <div className="about-grid-right">
            <p>
              <strong>Who we are.</strong> Medical Global Academy (MGA) is an
              online medical education platform designed for practising
              doctors who want to continue learning while managing their
              professional responsibilities.
            </p>

            <p>
              <strong>What we do.</strong> We offer Certificate Courses,
              Fellowships and PG Diploma programmes across a wide range of
              specialities. Our programmes combine structured online
              learning, live faculty-led sessions and programme-specific
              training where applicable.
            </p>

            <p>
              <strong>Our journey.</strong> Since {FOUNDED_YEAR}, MGA has
              been helping doctors from all over the world upgrade their
              clinical knowledge and grow in their careers.
            </p>

            <p>
              <strong>Learning formats.</strong> Choose between attending and
              non-attending options, so you can study at your own
              convenience without compromising on quality.
            </p>
          </div>

        </div>
      </section>


      <section className="about-section about-light">
        <div className="about-container">

          <div className="about-heading">
            <Label>MISSION &amp; VISION</Label>
            <h2>
              Why we exist, and
              <span className="about-gradient-text"> where we're headed.</span>
            </h2>
          </div>

          <div className="about-mv-grid">

            <div className="about-mv-card">
              <div className="about-card-icon about-card-icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" {...svgProps}>
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3>Our Mission</h3>
              <p>
                To bridge the gap in healthcare education by providing
                accessible, flexible and high-quality learning opportunities.
                Through specialised programmes, we help medical professionals
                gain new skills, advance their careers and improve patient
                care.
              </p>
            </div>

            <div className="about-mv-card">
              <div className="about-card-icon about-card-icon-teal">
                <svg width="24" height="24" viewBox="0 0 24 24" {...svgProps}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted destination for continuing medical
                education worldwide, empowering every healthcare professional
                to learn, grow and lead.
              </p>
            </div>

          </div>
        </div>
      </section>


      <section className="about-section">
        <div className="about-container">

          <div className="about-heading">
            <Label>WHAT WE OFFER</Label>
            <h2>
              Programmes for continuous
              <span className="about-gradient-text"> medical learning.</span>
            </h2>
          </div>

          <div className="about-cards">

            <div className="about-card">
              <div className="about-card-icon about-card-icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" {...svgProps}>
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3>Certificate Courses</h3>
              <p>
                Short, focused programmes for professional learning and
                skill development.
              </p>
              <span className="about-card-count">41+ programmes</span>
            </div>

            <div className="about-card about-card-featured">
              <div className="about-card-badge">Most Popular</div>
              <div className="about-card-icon about-card-icon-teal">
                <svg width="24" height="24" viewBox="0 0 24 24" {...svgProps}>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3>Fellowship Programmes</h3>
              <p>
                Speciality-focused learning with experienced faculty.
              </p>
              <span className="about-card-count">203+ programmes</span>
            </div>

            <div className="about-card">
              <div className="about-card-icon about-card-icon-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" {...svgProps}>
                  <path d="M12 2v20M2 12h20" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3>PG Diploma Programmes</h3>
              <p>
                In-depth postgraduate-level learning to strengthen your
                clinical knowledge in your chosen speciality.
              </p>
              <span className="about-card-count">64+ programmes</span>
            </div>

          </div>
        </div>
      </section>


   
      <section className="about-section about-light">
        <div className="about-container">

          <div className="about-heading">
            <Label>HOW IT WORKS</Label>
            <h2>
              From enrolment to certification in
              <span className="about-gradient-text"> four simple steps.</span>
            </h2>
          </div>

          <div className="about-steps">
            {STEPS.map((step, i) => (
              <div className="about-step" key={step.title}>
                <div className="about-step-num">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      <section className="about-section">
        <div className="about-container">

          <div className="about-heading">
            <Label>SPECIALITIES</Label>
            <h2>
              Programmes across
              <span className="about-gradient-text"> every major speciality.</span>
            </h2>
            <p className="about-heading-sub">
              Whether you want to deepen expertise in your own field or
              broaden your medical knowledge, there is a programme for your
              goals.
            </p>
          </div>

          <div className="about-chips">
            {SPECIALITIES.map((s) => (
              <span className="about-chip" key={s}>{s}</span>
            ))}
          </div>

        </div>
      </section>


   
      <section className="about-section about-light">
        <div className="about-container">
          <div className="about-feature">

            <div className="about-feature-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" {...svgProps} strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>

            <div className="about-feature-content">
              <Label>ACCREDITATION</Label>

              <h2>
                Accredited by
                <span className="about-gradient-text"> CPD and ACTD.</span>
              </h2>

              <p>
                Our programmes are accredited by CPD and ACTD, supporting
                the quality and credibility of your continuing professional
                development.
              </p>

              <div className="about-badges">
                <span className="about-badge">CPD</span>
                <span className="about-badge">ACTD</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="about-section">
        <div className="about-container">
          <div className="about-feature">

            <div className="about-feature-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" {...svgProps} strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <div className="about-feature-content">
              <Label>OUR FACULTY</Label>

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


      <section className="about-section about-light">
        <div className="about-container">

          <div className="about-heading">
            <Label>WHY MGA</Label>
            <h2>
              Flexible learning for
              <span className="about-gradient-text"> working doctors.</span>
            </h2>
          </div>

          <div className="why-grid">
            {WHY.map((w) => (
              <div className="why-card" key={w.title}>
                <div className={`why-icon why-icon-${w.tone}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" {...svgProps}>
                    {w.icon}
                  </svg>
                </div>
                <strong>{w.title}</strong>
                <p>{w.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


   
      <section className="about-cta">
        <div className="about-container">
          <h2>Ready to advance your medical career?</h2>
          <p>Browse our programs and find the right fit for your speciality.</p>
          <div className="about-buttons">
            <a href="/courses">Explore Programs</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </section>

    </div>
  );
}