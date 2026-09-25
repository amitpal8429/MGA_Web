import { Link } from "react-router-dom";
import { useEffect } from "react";

const LAST_UPDATED = "September 25, 2026";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      "Welcome to Medical Global Academy. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Medical Global Academy if you do not agree to all the terms and conditions stated on this page.",
    ],
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    body: [
      "Medical Global Academy provides training facilities for MBBS, MD, and other degree holders in the medical field. To enroll in our courses, you must hold a valid degree in a related field (e.g., MBBS, MD, etc.) from a recognized institution.",
    ],
  },
  {
    id: "services",
    title: "3. Services Offered",
    body: [
      "Medical Global Academy offers professional training programs aimed at enhancing the skills and knowledge of medical professionals. Our training programs are developed by experts in the field, but they do not substitute for any medical board certification or licensing requirements.",
    ],
  },
  {
    id: "user-responsibilities",
    title: "4. User Responsibilities",
    body: [
      "By using our website and enrolling in our courses, you agree to:",
    ],
    list: [
      "Provide accurate information during registration.",
      "Use the website and training materials solely for your personal, professional development.",
      "Comply with all applicable laws and regulations.",
    ],
  },
  {
    id: "payment",
    title: "5. Payment and Fees",
    body: [
      "All courses offered by Medical Global Academy are subject to fees, which are listed on the website. Payments must be made in full at the time of registration. No refunds will be issued once access to the course materials has been granted.",
    ],
  },
  {
    id: "ip",
    title: "6. Intellectual Property",
    body: [
      "All content on the Medical Global Academy website, including course materials, videos, and resources, is the property of Medical Global Academy.",
      "Users may not reproduce, distribute, or use the content for any purpose other than personal education without prior written consent.",
    ],
  },
  {
    id: "privacy",
    title: "7. Privacy Policy",
    body: [
      "Your privacy is important to us. We collect and use personal information according to our Privacy Policy, which is available on our website.",
    ],
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    body: [
      "Medical Global Academy is not responsible for any errors or omissions in the content provided or any adverse outcomes that arise from applying the skills learned in our courses. Use of the information provided is at your own risk.",
    ],
  },
  {
    id: "termination",
    title: "9. Termination of Access",
    body: [
      "Medical Global Academy reserves the right to terminate your access to the website and its services if you breach any of these terms.",
    ],
  },
  {
    id: "changes",
    title: "10. Changes to the Terms",
    body: [
      "Medical Global Academy may update these terms and conditions from time to time. Any changes will be posted on this page, and continued use of the website implies acceptance of the updated terms.",
    ],
  },
  {
    id: "governing",
    title: "11. Governing Law",
    body: [
      "These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts in India.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact Us",
    body: [
      "If you have any questions or need further clarification on these terms, please contact us at:",
    ],
    contact: true,
  },
];

export default function TermsPage() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section className="legal-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Terms &amp; Conditions</span>
        </nav>

        <header className="legal-header">
          <p className="legal-eyebrow">Legal</p>
          <h1 className="legal-title">Terms &amp; Conditions</h1>
          <p className="legal-updated">
            Last updated: <strong>{LAST_UPDATED}</strong>
          </p>
          <p className="legal-lede">
            Please read these Terms &amp; Conditions carefully before using the
            Medical Global Academy website or enrolling in any of our courses.
            By accessing our website, you accept these terms in full.
          </p>
        </header>

        <div className="legal-grid">
          <aside className="legal-toc" aria-label="Table of contents">
            <p className="legal-toc-title">On this page</p>
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="legal-content">
            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="legal-section"
              >
                <h2>{section.title}</h2>

                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                {section.list && (
                  <ul className="legal-list">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.contact && (
                  <div className="legal-contact-card">
                    <p>
                      <strong>Medical Global Academy</strong>
                    </p>
                    <p>
                      Email:{" "}
                      <a href="mailto:support@medicalglobalacademy.com">
                        support@medicalglobalacademy.com
                      </a>
                    </p>
                    <p>
                      Website:{" "}
                      <a
                        href="https://medicalglobalacademy.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        medicalglobalacademy.com
                      </a>
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}