import { Link } from "react-router-dom";
import { useEffect } from "react";

const LAST_UPDATED = " 2026";

const SECTIONS = [
  {
    id: "overview",
    title: "1. Overview",
    body: [
      "At Medical Global Academy, we strive to provide high-quality training and educational content for MBBS, MD, and other degree holders in the medical field. However, we understand that there may be circumstances where you may request a refund. Please read our refund policy carefully before enrolling in any course.",
    ],
  },
  {
    id: "no-refunds",
    title: "2. No Refunds",
    body: [
      "Due to the nature of digital educational content, once access to the course materials has been granted, no refunds will be issued. By completing the registration and payment process, you agree that all sales are final.",
    ],
  },
  {
    id: "cancellation",
    title: "3. Course Cancellation",
    body: [
      "In the event that Medical Global Academy cancels a course due to unforeseen circumstances or technical issues, we will provide a full refund to all registered participants. The refund will be processed within 10 business days from the date of cancellation.",
    ],
  },
  {
    id: "duplicate-payment",
    title: "4. Duplicate Payment",
    body: [
      "If you mistakenly make multiple payments for the same course, please notify us immediately at support@medicalglobalacademy.com. We will process a refund for the duplicate payment after verifying the details, typically within 7 business days.",
    ],
    contactInline: {
      email: "support@medicalglobalacademy.com",
    },
  },
  {
    id: "technical-issues",
    title: "5. Technical Issues",
    body: [
      "If you experience any technical issues that prevent you from accessing course content, please contact our support team. While we do not offer refunds for technical problems, we will make every effort to resolve the issue and ensure you have access to the course material.",
    ],
  },
  {
    id: "exceptions",
    title: "6. Exceptions",
    body: [
      "Refunds will only be considered under exceptional circumstances, such as:",
    ],
    list: [
      "Incorrect payment made due to system error.",
      "Special cases with documented medical emergencies.",
    ],
    bodyAfter: [
      "All exceptions will be considered on a case-by-case basis, and the decision of Medical Global Academy will be final.",
    ],
  },
  {
    id: "refund-processing",
    title: "7. Refund Processing",
    body: [
      "Approved refunds will be processed back to the original payment method. Depending on the payment provider, it may take up to 7–10 business days for the refund to reflect in your account.",
    ],
  },
  {
    id: "contact",
    title: "8. Contact Us",
    body: [
      "For any inquiries related to refunds or payments, please contact us at:",
    ],
    contact: true,
  },
];

export default function RefundPage() {
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
          <span>Refund Policy</span>
        </nav>

        <header className="legal-header">
          <p className="legal-eyebrow">Legal</p>
          <h1 className="legal-title">Refund Policy</h1>
          <p className="legal-updated">
            Last updated: <strong>{LAST_UPDATED}</strong>
          </p>
          <p className="legal-lede">
            Please read our refund policy carefully before enrolling in any
            course. By enrolling in any of our courses, you acknowledge that you
            have read, understood, and agreed to this refund policy.
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

                {section.contactInline && (
                  <div className="legal-contact-card">
                    <p>
                      Email:{" "}
                      <a href={`mailto:${section.contactInline.email}`}>
                        {section.contactInline.email}
                      </a>
                    </p>
                  </div>
                )}

                {section.bodyAfter &&
                  section.bodyAfter.map((p, i) => <p key={i}>{p}</p>)}

                {section.contact && (
                  <div className="legal-contact-card">
                    <p>
                      <strong>Medical Global Academy — Support</strong>
                    </p>
                    <p>
                      Email:{" "}
                      <a href="mailto:support@medicalglobalacademy.com">
                        support@medicalglobalacademy.com
                      </a>
                    </p>
                    <p>
                      Phone:{" "}
                      <a href="tel:+91 9289994218
">+91 9289994218</a>
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