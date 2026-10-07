import { useLocation } from "react-router-dom";
import JsonLd from "./JsonLd";
import { SITE } from "../config/site";
import { OFFER, isOfferLive } from "../config/offer";

export default function SiteSchema() {
  const { pathname } = useLocation();
  if (pathname !== "/") return null; // sirf home page

  const orgId = `${SITE.url}/#organization`;

  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization"],
    "@id": orgId,
    name: SITE.name,
    alternateName: "MGA",
    url: `${SITE.url}/`,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE.url}/#logo`,
      url: SITE.logo,
      contentUrl: SITE.logo,
    },
    image: { "@id": `${SITE.url}/#logo` },
    description: SITE.description,
    founder: { "@type": "Person", name: SITE.founder },
    telephone: SITE.phone,
    email: SITE.email,
    contactPoint: ["admissions", "customer support"].map((type) => ({
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: type,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    })),
    address: { "@type": "PostalAddress", ...SITE.address },
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
        provider: { "@id": orgId },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.websiteDescription,
    publisher: { "@id": orgId },
    inLanguage: "en-IN",
    ...(SITE.searchUrlTemplate && {
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: SITE.searchUrlTemplate },
        "query-input": "required name=search_term_string",
      },
    }),
  };

  const offer = isOfferLive() && {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: OFFER.headline,
    description: OFFER.subtext,
    url: `${SITE.url}/courses`,
    image: OFFER.imageUrl,
    validThrough: OFFER.expiresOn,
    availability: "https://schema.org/InStock",
    seller: { "@id": orgId },
  };

  return (
    <>
      <JsonLd id="organization" data={organization} />
      <JsonLd id="website" data={website} />
      {offer && <JsonLd id="offer" data={offer} />}
    </>
  );
}