import React, { useEffect, useState } from "react";
import "./About.css";

const COURSE_API = "https://24x7.medicalglobalacademy.com/api/course-list";

/* Fallback values, used until the API responds or if it fails */
const FALLBACK = {
  total: 507,
  fellowship: 396,
  certificate: 47,
  pgDiploma: 64,
};

/* Speciality chips. `match` = category.name values from the API. */
/* Speciality chips. `match` = category.name values from the API. `href` = path-based category URL. */
const SPECIALITIES = [
  { name: "Cardiology", match: ["Cardiology"], href: "/courses/cardiology" },
  { name: "Medicine", match: ["Medicine"], href: "/courses/medicine" },
  { name: "Oncology", match: ["Oncology"], href: "/courses/oncology" },
  { name: "Nephrology", match: ["Nephrology"], href: "/courses/nephrology" },
  { name: "Neurology", match: ["Neurology"], href: "/courses/neurology" },
  { name: "Orthopedics", match: ["Orthopedic", "Orthopedics"], href: "/courses/orthopedic" },
  {
    name: "Obstetrics & Gynaecology",
    match: ["Obstetrics & Gynaecology", "Obstetrics & Gynecology"],
    href: "/courses/obstetrics--gynaecology",
  },
];

/* Accreditation logos, shown as badge backgrounds */
const ACCREDITATIONS = [
  {
    name: "CPD",
    logo: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/Untitled-design-8.png",
  },
  {
    name: "ACTD",
    logo: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-24-at-12.17.06-PM.jpeg",
  },
];

const STEPS = [
  { title: "Choose your programme", text: "Browse Certificate, Fellowship and PG Diploma programmes by speciality." },
  { title: "Enrol online", text: "Pick the attending or non-attending format that suits your schedule." },
  { title: "Learn your way", text: "Online learning, live faculty-led sessions and recorded sessions where available." },
  { title: "Get certified", text: "Complete your programme and receive your certification." },
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
    tone: "navy",
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
    tone: "slate",
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

/* Returns the course list from the API, or null if it is unavailable. */
function useCourses() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(COURSE_API, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => setCourses(Array.isArray(data) ? data : null))
      .catch(() => setCourses(null));

    return () => controller.abort();
  }, []);

  return courses;
}

const countType = (list, type) =>
  list.filter((c) => c.type?.toLowerCase() === type.toLowerCase()).length;

export default function About() {
  const courses = useCourses();

  /* Use live API counts when available, otherwise the fallback values */
  const counts = courses
    ? {
        total: courses.length,
        fellowship: countType(courses, "Fellowship"),
        certificate: countType(courses, "Certificate"),
        pgDiploma: countType(courses, "Pg Diploma"),
      }
    : FALLBACK;

  /* Each stat links to the matching listing page (internal linking) */
  const STATS = [
    { value: counts.total, label: "Active programs", href: "/courses" },
    { value: counts.fellowship, label: "Fellowships", href: "/courses/fellowship" },
    { value: counts.certificate, label: "Certificates", href: "/courses/certificate" },
    { value: counts.pgDiploma, label: "PG diplomas", href: "/courses/pg-diploma" },
  ];

  return (
    <main className="mga-about">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-container">
          <div className="about-hero-content">
            <Label>About MGA</Label>
            <h1>
              Medical education that fits <span>your career</span>
            </h1>
            <p>
              Medical Global Academy provides flexible online medical education
              for practising doctors from every country, with Certificate,
              Fellowship and PG Diploma programmes in 150+ specialities and
              sub-specialities.
            </p>
          </div>

          <ul className="about-stats" aria-label="MGA at a glance">
            {STATS.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="about-stat" title={`Browse ${s.label.toLowerCase()}`}>
                  <strong>{s.value}+</strong>
                  <span>{s.label}</span>
                  <em className="about-stat-cta">Browse &rarr;</em>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section" id="our-story">
        <div className="about-container about-grid">
          <div>
            <Label>Who we are</Label>
            <h2>Learn without stepping away from clinical practice.</h2>
            <div className="about-since">
              <span>Serving doctors since</span>
              <strong>2020</strong>
            </div>
          </div>

          <div className="about-copy">
            <p>
              <strong>Who we are.</strong> Medical Global Academy (MGA) is an
              online medical education platform designed for practising doctors
              who want to continue learning while managing their professional
              responsibilities.
            </p>
            <p>
              <strong>What we do.</strong> We offer Certificate Courses,
              Fellowships and PG Diploma programmes across a wide range of
              specialities. Our programmes combine structured online learning,
              live faculty-led sessions and programme-specific training where
              applicable.
            </p>
            <p>
              <strong>Our journey.</strong> Since 2020, MGA has been helping
              doctors from all over the world upgrade their clinical knowledge
              and grow in their careers.
            </p>
            <p>
              <strong>Learning formats.</strong> Choose between attending and
              non-attending options, so you can study at your own convenience
              without compromising on quality.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="about-section about-muted">
        <div className="about-container">
          <div className="about-heading">
            <Label>Mission &amp; vision</Label>
            <h2>Why we exist, and where we're headed.</h2>
          </div>

          <div className="about-mv-grid">
            <article className="about-mv-card">
              <div className="about-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" {...svgProps}>
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3>Our mission</h3>
              <p>
                To bridge the gap in healthcare education by providing
                accessible, flexible and high-quality learning opportunities.
                Through specialised programmes, we help medical professionals
                gain new skills, advance their careers and improve patient care.
              </p>
            </article>

            <article className="about-mv-card">
              <div className="about-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" {...svgProps}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Our vision</h3>
              <p>
                To be the most trusted destination for continuing medical
                education worldwide, empowering every healthcare professional to
                learn, grow and lead.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-heading">
            <Label>How it works</Label>
            <h2>From enrolment to certification in four simple steps.</h2>
          </div>

          <ol className="about-steps">
            {STEPS.map((step, i) => (
              <li className="about-step" key={step.title}>
                <span className="about-step-num">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SPECIALITIES (interlinked, live counts) */}
      <section className="about-section about-muted" aria-labelledby="specialities-heading">
        <div className="about-container">
          <div className="about-heading">
            <Label>Specialities</Label>
            <h2 id="specialities-heading">Programmes across every major speciality.</h2>
            <p className="about-heading-sub">
              Whether you want to deepen expertise in your own field or broaden
              your medical knowledge, there is a programme for your goals.
            </p>
          </div>

          <nav className="about-chips" aria-label="Browse courses by speciality">
            {SPECIALITIES.map((s) => {
              const n = courses
                ? courses.filter((c) => s.match.includes(c.category?.name)).length
                : 0;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  className="about-chip"
                  title={`View ${s.name} programmes`}
                >
                  {s.name}
                  {n > 0 && <span className="about-chip-count">{n}</span>}
                </a>
              );
            })}
            <a href="/courses" className="about-chip about-chip-all">
              and many more
            </a>
          </nav>

          <p className="about-chips-footer">
            <a href="/courses">View all programmes &rarr;</a>
          </p>
        </div>
      </section>

      {/* ACCREDITATION */}
      <section className="about-section">
        <div className="about-container about-feature">
          <div className="about-feature-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" {...svgProps}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <Label>Accreditation</Label>
            <h2>Accredited by CPD and ACTD.</h2>
            <p>
              Our programmes are accredited by CPD and ACTD, supporting the
              quality and credibility of your continuing professional
              development.
            </p>
            <div className="about-badges">
              {ACCREDITATIONS.map((a) => (
                <span
                  key={a.name}
                  className="about-badge"
                  style={{ "--badge-logo": `url("${a.logo}")` }}
                >
                  <span className="about-badge-check" aria-hidden="true">✓</span>
                  {a.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section className="about-section about-muted">
        <div className="about-container about-feature">
          <div className="about-feature-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" {...svgProps}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <Label>Our faculty</Label>
            <h2>Learn from experienced medical professionals.</h2>
            <p>
              Our programmes are delivered with experienced medical professionals
              and specialists who bring practical clinical perspectives into
              teaching.
            </p>
          </div>
        </div>
      </section>

      {/* WHY MGA */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-heading">
            <Label>Why MGA</Label>
            <h2>Flexible learning for working doctors.</h2>
          </div>

          <div className="why-grid">
            {WHY.map((w) => (
              <article className="why-card" key={w.title}>
                <div className={`why-icon why-icon-${w.tone}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" {...svgProps}>
                    {w.icon}
                  </svg>
                </div>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Ready to advance your medical career?</h2>
          <p>Browse our programmes and find the right fit for your speciality.</p>
          <div className="about-buttons">
            <a href="/courses" className="about-btn about-btn-light">
              Explore Programs
            </a>
           
          </div>
        </div>
      </section>
    </main>
  );
}