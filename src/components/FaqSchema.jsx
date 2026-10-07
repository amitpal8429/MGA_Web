import JsonLd from "./JsonLd";
import { FAQS } from "../lib/faqs";

export default function FaqSchema({ faqs = FAQS }) {
  if (!faqs || faqs.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return <JsonLd id="faq" data={data} />;
}