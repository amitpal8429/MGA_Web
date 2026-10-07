import JsonLd from "./JsonLd";
import { SITE } from "../config/site";

// "6 months" / "1 Year" / "12 weeks" -> "P6M" / "P1Y" / "P12W". Samajh na aaye to undefined.
function toIsoDuration(raw) {
  if (!raw) return undefined;
  const m = String(raw).match(/(\d+)\s*(year|month|week|day)/i);
  if (!m) return undefined;
  const unit = { year: "Y", month: "M", week: "W", day: "D" }[m[2].toLowerCase()];
  return `P${m[1]}${unit}`;
}

const isIsoDate = (d) => typeof d === "string" && /^\d{4}-\d{2}-\d{2}/.test(d);

export default function CourseSchema({
  name,
  description,
  url,
  image,
  duration,    // raw duration (course.duration)
  price,       // number
  startDate,   // "YYYY-MM-DD"
  credential = "Certificate of Completion",
}) {
  if (!name) return null;

  const workload = toIsoDuration(duration);

  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url,
    ...(image && { image }),
    inLanguage: "en-IN",
    provider: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: SITE.logo,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      ...(workload && { courseWorkload: workload }),
      ...(isIsoDate(startDate) && { startDate: startDate.slice(0, 10) }),
    },
    educationalCredentialAwarded: credential,
    ...(price > 0 && {
      offers: {
        "@type": "Offer",
        category: "Paid",
        price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url,
      },
    }),
  };

  return <JsonLd id="course" data={data} />;
}