import { useLocation } from "react-router-dom";
import JsonLd from "./JsonLd";
import { SITE } from "../config/site";
import { OFFER, isOfferLive } from "../config/offer";
import { ORG_ID, SITE_ID, LOGO_ID, buildOrganization } from "./schemaNodes";

export default function SiteSchema() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.websiteDescription,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
    ...(SITE.searchUrlTemplate && {
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: SITE.searchUrlTemplate },
        "query-input": "required name=search_term_string",
      },
    }),
  };

  const organization = buildOrganization();

  // WebPage: sirf home par
  const webPage = isHome && {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}/#webpage`,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.websiteDescription,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@id": LOGO_ID },
    inLanguage: "en-IN",
  };

  // Offer: sirf home par, jab live ho
  const offer = isHome &&
    isOfferLive() && {
      "@context": "https://schema.org",
      "@type": "Offer",
      "@id": `${SITE.url}/#offer`,
      name: OFFER.headline,
      description: OFFER.subtext,
      url: `${SITE.url}/courses`,
      image: OFFER.imageUrl,
      validThrough: OFFER.expiresOn,
      availability: "https://schema.org/InStock",
      seller: { "@id": ORG_ID },
    };

  return (
    <>
      <JsonLd id="website" data={website} />
      <JsonLd id="organization" data={organization} />
      {webPage && <JsonLd id="webpage" data={webPage} />}
      {offer && <JsonLd id="offer" data={offer} />}
    </>
  );
}