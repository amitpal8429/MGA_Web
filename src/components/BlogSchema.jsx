import JsonLd from "./JsonLd";
import { SITE } from "../config/site";
import { ORG_ID, SITE_ID } from "./schemaNodes";

export default function BlogSchema({
  name = `${SITE.name} Blog`,
  description = "Articles on medical education, clinical training and career growth for doctors.",
  url = `${SITE.url}/blog`,
}) {
  const webPageId = `${url}#webpage`;
  const blogId = `${url}#blog`;
  const breadcrumbId = `${url}#breadcrumb`;

  const webPage = {
    "@type": "WebPage",
    "@id": webPageId,
    url,
    name,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": blogId },
    breadcrumb: { "@id": breadcrumbId },
    inLanguage: "en-IN",
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: url },
    ],
  };

  const blog = {
    "@type": "Blog",
    "@id": blogId,
    name,
    description,
    url,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumb, blog],
  };

  return <JsonLd id="blog" data={data} />;
}