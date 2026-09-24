import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  Users,
  BadgeCheck,
  HeartHandshake,
  Headset,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { fetchCourseList, fetchFacultyList } from "../lib/api";
import CourseCard from "../components/CourseCard";
import { CourseGridSkeleton } from "../components/Skeletons";
import ErrorState from "../components/ErrorState";
import Faq from "../components/Faq";
import { initials } from "../lib/format";
import LeadForm from "../components/LeadForm";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Learn from highly experienced faculty",
    text: "Train under specialist doctors and healthcare leaders with real clinical expertise.",
  },
  {
    icon: Sparkles,
    title: "Practical, flexible learning",
    text: "Case-based, video-driven learning designed for working doctors — learn anytime, anywhere.",
  },
  {
    icon: BadgeCheck,
    title: "Recognised certification",
    text: "Industry-aligned certificates that add real, verifiable value to your medical career.",
  },
  {
    icon: HeartHandshake,
    title: "Career support & guidance",
    text: "Mentorship and career direction tailored to your goals and clinical interests.",
  },
  {
    icon: Headset,
    title: "Dedicated support",
    text: "Fast help with technical, course, and enrolment questions whenever you need it.",
  },
  {
    icon: Users,
    title: "Future-ready curriculum",
    text: "Modules stay current with modern protocols, global guidelines and emerging specialities.",
  },
];

// ✅ Accreditation data (hero ke andar dikhega)
const ACCREDITATIONS = [
  {
    id: 1,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-22-at-3.58.16-PM.jpeg",
    alt: "CPD Accreditation",
  },
  {
    id: 2,
    src: "https://medicalglobalacademy.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-24-at-12.17.06-PM.jpeg",
    alt: "ACTD Accreditation",
  },
];

const TESTIMONIALS = [
  {
    name: "Dr. R. Sharma",
    role: "Fellowship in Internal Medicine",
    quote:
      "The clinical modules were far more practical than I expected. Weekly live sessions with faculty made complex cases easy to reason through.",
  },
  {
    name: "Dr. A. Iyer",
    role: "PG Diploma in Dermatology",
    quote:
      "Being able to study around OPD hours made this possible for me. The mentorship after each module was the most valuable part.",
  },
  {
    name: "Dr. S. Bano",
    role: "Fellowship in Critical Care",
    quote:
      "Hospital training combined with structured online modules gave me confidence to manage complex ICU cases independently.",
  },
];

export default function Home() {
  const [courses, setCourses] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setCourses(null);
    Promise.all([fetchCourseList(), fetchFacultyList()])
      .then(([c, f]) => {
        if (cancelled) return;

        const visibleCourses = c.filter(
          (course) => course.type !== "Pg Diploma" && course.type !== "PG Diploma"
        );

        setCourses(visibleCourses);
        setFaculty(f);
      })
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [tick]);

  const featured = useMemo(() => {
    if (!courses) return [];
    const top = courses.filter((c) => c.top_courses === 1);
    if (top.length >= 6) return top.slice(0, 6);
    const topIds = new Set(top.map((c) => c.id));
    const others = courses.filter((c) => !topIds.has(c.id));
    return [...top, ...others].slice(0, 6);
  }, [courses]);

  const stats = useMemo(() => {
    if (!courses) return null;
    return {
      total: courses.length,
      fellowships: courses.filter((c) => c.type === "Fellowship").length,
      faculty: faculty?.length ?? null,
    };
  }, [courses, faculty]);

  return (
    <>
      <section className="hero">
        <div className="hero-blob" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Fast-track your medical career with</p>
            <h1 className="hero-title">
              India's most trusted upskilling platform for doctors
            </h1>
            <p className="hero-lede">
              Certificate, and fellowship programs across medicine,
              surgery, radiology and obstetrics — built around live clinical
              mentorship, not a lecture hall.
            </p>
            <div className="hero-actions">
              <Link
                to="/courses"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#066daf",
                  borderColor: "#066daf",
                  color: "#ffffff",
                }}
              >
                Explore programs <ArrowRight size={16} />
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=919310027474&text=Hi%2C%20I%20would%20like%20to%20download%20the%20course%20brochure"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Need expert help?
              </a>
            </div>

            {stats && (
              <div className="hero-trust">
                <span><strong>{stats.total}+</strong> active programs</span>
                <span className="dot" />
                <span><strong>{stats.fellowships}+</strong> fellowships</span>
                {stats.faculty && (
                  <>
                    <span className="dot" />
                    <span><strong>{stats.faculty}+</strong> faculty mentors</span>
                  </>
                )}
              </div>
            )}

            {/* ✅ NAYA: Accreditation — trust stats ke NICHE, hero ke andar hi */}
            <div className="hero-accreditation">
              <p className="hero-accreditation-eyebrow">
                <ShieldCheck size={14} /> Accreditation
              </p>
              <p className="hero-accreditation-text">
                Globally recognised CPD & ACTD-aligned certification
              </p>
              <div className="hero-accreditation-logos">
                {ACCREDITATIONS.map((a) => (
                  <div className="hero-accreditation-card" key={a.id}>
                    <img
                      src={a.src}
                      alt={a.alt}
                      className="hero-accreditation-image"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero ke right side me inline lead form */}
          <div className="hero-form-card">
            <div className="hero-form-head">
              <p className="hero-form-eyebrow">
                ⚡ PRIORITY 2026 BATCH APPLICATION
              </p>
              <h3>Apply for Clinical Fellowship</h3>
              <p className="hero-form-sub">
                Get full clinical curriculum & hospital slots on WhatsApp
              </p>
            </div>
            <div className="hero-form-body">
              <h4>Fast-Track Your Medical Career</h4>
              <p className="hero-form-desc">
                Advance your clinical expertise with CPD-accredited
                Fellowship, and Certification programs.
              </p>
              <LeadForm idPrefix="hero" />
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
              <div className="section-head">
                <div>
                  <p className="eyebrow eyebrow-sm">Our programs</p>
                  <h2>Advance your career with programs built for practising doctors</h2>
                </div>
                <Link to="/courses" className="section-link">
                  View all programs <ArrowRight size={15} />
                </Link>
              </div>

              {courses === null ? (
                <CourseGridSkeleton count={6} />
              ) : (
                <div className="course-grid">
                  {featured.map((c) => (
                    <CourseCard key={c.id} course={c} />
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="section section-alt">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">What to expect</p>
                <h2>A complete learning experience for working doctors</h2>
                <p className="muted section-sub">
                  Expert guidance, flexible learning and clinical
                  training, all built around your existing practice.
                </p>
              </div>

              <div className="feature-grid">
                {FEATURES.map((f) => (
                  <div className="feature-card" key={f.title}>
                    <span className="feature-icon"><f.icon size={22} /></span>
                    <h3 className="feature-title">{f.title}</h3>
                    <p className="muted">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <p className="eyebrow eyebrow-sm">Our faculty</p>
                  <h2>Learn from practising specialists</h2>
                </div>
                <Link to="/faculty" className="section-link">
                  View full faculty <ArrowRight size={15} />
                </Link>
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

          <section className="section section-alt">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">Testimonials</p>
                <h2>What our doctors say</h2>
                <p className="muted section-sub">
                  Real clinical experience, meaningful mentorship, and a
                  training environment that pushes doctors to grow.
                </p>
              </div>

              <div className="testimonial-grid">
                {TESTIMONIALS.map((t) => (
                  <div className="testimonial-card" key={t.name}>
                    <p className="testimonial-quote">"{t.quote}"</p>
                    <div className="testimonial-person">
                      <span className="avatar">{initials(t.name)}</span>
                      <span>
                        <strong>{t.name}</strong>
                        <span className="muted testimonial-role">{t.role}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="faq">
            <div className="wrap">
              <div className="section-head section-head-center">
                <p className="eyebrow eyebrow-sm">Frequently asked questions</p>
                <h2>Still have questions?</h2>
                <p className="muted section-sub">
                  Contact our admissions team at{" "}
                  <a href="mailto:support@medicalglobalacademy.com" className="link">
                    support@medicalglobalacademy.com
                  </a>
                </p>
              </div>
              <Faq />
            </div>
          </section>

          <section className="cta-band">
            <div className="wrap cta-band-inner">
              <div>
                <h2 className="cta-title">Ready to specialise without pausing your practice?</h2>
                <p className="cta-sub">Browse the full catalog and find the program that fits your speciality.</p>
              </div>
              <Link to="/courses" className="btn btn-navy">
                Explore programs <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}