import JsonLd from "./JsonLd";
import { SITE } from "../config/site";

export default function BreadcrumbSchema({ pageTitle, pageUrl, parentLabel, parentUrl }) {
  const url =
    pageUrl ||
    (typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : SITE.url);

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: parentLabel, item: parentUrl },
      { "@type": "ListItem", position: 3, name: pageTitle },
    ],
  };

  return <JsonLd id="breadcrumb" data={data} />;
}