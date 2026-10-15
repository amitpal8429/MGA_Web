import JsonLd from "./JsonLd";
import { SITE } from "../config/site";

/* =========================================================
   HELPERS
   ========================================================= */

// "6 months" / "1 Year" / "12 weeks" -> "P6M" / "P1Y" / "P12W"
function toIsoDuration(raw) {
  if (!raw) return undefined;
  const m = String(raw).match(/(\d+)\s*(year|month|week|day)/i);
  if (!m) return undefined;
  const unit = { year: "Y", month: "M", week: "W", day: "D" }[
    m[2].toLowerCase()
  ];
  return `P${m[1]}${unit}`;
}

const isIsoDate = (d) =>
  typeof d === "string" && /^\d{4}-\d{2}-\d{2}/.test(d);

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;
const LOGO_ID = `${SITE.url}/#logo`;

/* =========================================================
   COURSE SCHEMA (with Organization + WebPage)
   ========================================================= */

export default function CourseSchema({
  name,
  description,
  url,
  image,
  duration, // raw duration (course.duration)
  price, // number
  startDate, // "YYYY-MM-DD"
  credential = "Certificate of Completion",
}) {
  if (!name) return null;

  const workload = toIsoDuration(duration);
  const webPageId = `${url}#webpage`;
  const courseId = `${url}#course`;
  const imageId = image ? `${url}#primaryimage` : undefined;

  /* 1) EducationalOrganization */
  const organization = {
    "@type": ["Organization", "EducationalOrganization"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: "MGA",
    url: `${SITE.url}/`,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: SITE.logo,
      contentUrl: SITE.logo,
    },
    image: { "@id": LOGO_ID },
    description: SITE.description,
    founder: SITE.founder
      ? { "@type": "Person", name: SITE.founder }
      : undefined,
    telephone: SITE.phone,
    email: SITE.email,
    ...(SITE.phone && {
      contactPoint: ["admissions", "customer support"].map((type) => ({
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: type,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      })),
    }),
    ...(SITE.address && {
      address: { "@type": "PostalAddress", ...SITE.address },
    }),
    sameAs: SITE.social,
    knowsAbout: SITE.knowsAbout,
    audience: {
      "@type": "Audience",
      audienceType: "MBBS students, doctors and healthcare professionals",
    },
    areaServed: { "@type": "Country", name: "India" },
    availableLanguage: ["English", "Hindi"],
  };

  /* 2) WebPage */
  const webPage = {
    "@type": "WebPage",
    "@id": webPageId,
    url,
    name,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": courseId },
    ...(imageId && { primaryImageOfPage: { "@id": imageId } }),
    inLanguage: "en-IN",
  };

  /* 3) ImageObject */
  const imageObject = image
    ? {
        "@type": "ImageObject",
        "@id": imageId,
        url: image,
        contentUrl: image,
        caption: name,
        inLanguage: "en-IN",
      }
    : null;

  /* 4) Course */
  const course = {
    "@type": "Course",
    "@id": courseId,
    name,
    description,
    url,
    ...(image && { image }),
    inLanguage: "en-IN",
    provider: { "@id": ORG_ID },
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

  /* Graph */
  const data = {
    "@context": "https://schema.org",
    "@graph": [organization, webPage, imageObject, course].filter(Boolean),
  };

  return <JsonLd id="course" data={data} />;
}