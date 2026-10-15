import JsonLd from "./JsonLd";
import { SITE } from "../config/site";
import { ORG_ID, SITE_ID, normalizeFaqs } from "./schemaNodes";

export default function BlogPostSchema({
  title,
  description,
  url,
  image,
  datePublished, // ISO string
  dateModified,
  keywords, // "a, b, c"
  authorName = SITE.name,
  authorUrl,

  breadcrumbParentLabel = "Blog",
  breadcrumbParentUrl = `${SITE.url}/blog`,

  // [{question, answer}] ya [{q, a}] dono chalenge
  faqItems = [],
}) {
  if (!title || !url) return null;

  const webPageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;
  const articleId = `${url}#article`;
  const faqId = `${url}#faq`;
  const imageId = image ? `${url}#primaryimage` : undefined;

  const webPage = {
    "@type": "WebPage",
    "@id": webPageId,
    url,
    name: title,
    description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": articleId },
    breadcrumb: { "@id": breadcrumbId },
    ...(imageId && { primaryImageOfPage: { "@id": imageId } }),
    inLanguage: "en-IN",
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbParentLabel,
        item: breadcrumbParentUrl,
      },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  const imageObject = image
    ? {
        "@type": "ImageObject",
        "@id": imageId,
        url: image,
        contentUrl: image,
        caption: title,
        inLanguage: "en-IN",
      }
    : null;

  const article = {
    "@type": "BlogPosting",
    "@id": articleId,
    mainEntityOfPage: { "@id": webPageId },
    headline: title,
    ...(description && { description }),
    ...(image && { image: [image] }),
    ...(datePublished && { datePublished }),
    ...((dateModified || datePublished) && {
      dateModified: dateModified || datePublished,
    }),
    ...(keywords && { keywords }),
    inLanguage: "en-IN",
    author: {
      "@type": authorName === SITE.name ? "Organization" : "Person",
      name: authorName,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: { "@id": ORG_ID },
  };

  const faqs = normalizeFaqs(faqItems);
  const faqPage =
    faqs.length > 0
      ? {
          "@type": "FAQPage",
          "@id": faqId,
          isPartOf: { "@id": webPageId },
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const data = {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumb, imageObject, article, faqPage].filter(
      Boolean
    ),
  };

  return <JsonLd id="blog-post" data={data} />;
}