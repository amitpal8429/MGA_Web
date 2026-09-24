import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "What is the eligibility criteria for these programs?",
    a: "Most certificate and PG diploma programs require an MBBS degree with valid registration. Fellowships generally expect MBBS, MD, MS or DNB — the exact requirement is listed on each program's detail page.",
  },
  {
    q: "How are the programs delivered?",
    a: "Programs combine self-paced online modules with live faculty-led sessions. Fellowships and diplomas add a  hospital-based clinical training component in the later months.",
  },
  {
    q: "How do I enrol in a program?",
    a: "Open any program page and use the Enquire Now button — our admissions team will reach out with the fee structure, intake dates, and next steps.",
  },
  {
    q: "Is the certification recognised?",
    a: "Yes. Certificates are ACTD,CPD-aligned and issued on successful completion of the assessments and, where applicable, the clinical training component.",
  },
  {
    q: "Can I enrol in more than one program at a time?",
    a: "Yes, you can enrol in multiple programs and access each of them at your own pace, provided the schedules don't clinically overlap.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
            <button
              className="faq-question"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span className="faq-icon">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
            </button>
            {isOpen && <p className="faq-answer muted">{item.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
