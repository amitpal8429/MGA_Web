import JsonLd from "./JsonLd";
import { FAQS } from "../lib/faqs";
import { normalizeFaqs } from "./schemaNodes";

export default function FaqSchema({ faqs = FAQS, url }) {
  const items = normalizeFaqs(faqs);
  if (items.length === 0) return null;

  const pageUrl =
    url ||
    (typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "");

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl && { "@id": `${pageUrl}#faq` }),
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return <JsonLd id="faq" data={data} />;
}