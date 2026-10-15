import { SITE } from "../config/site";

export const ORG_ID = `${SITE.url}/#organization`;
export const SITE_ID = `${SITE.url}/#website`;
export const LOGO_ID = `${SITE.url}/#logo`;

// FAQ items ko ek format me laata hai: {question, answer} ya {q, a} dono chalenge
export function normalizeFaqs(items = []) {
  return (Array.isArray(items) ? items : [])
    .map((f) => ({
      question: f?.question ?? f?.q ?? "",
      answer: f?.answer ?? f?.a ?? "",
    }))
    .filter((f) => f.question && f.answer);
}

export function buildOrganization() {
  return {
    "@context": "https://schema.org",
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Medical Global Academy Programs",
      itemListElement: SITE.programs.map((name) => ({
        "@type": "Course",
        name,
        courseMode: "online",
        provider: { "@id": ORG_ID },
      })),
    },
  };
}