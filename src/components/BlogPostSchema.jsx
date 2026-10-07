import JsonLd from "./JsonLd";
import { SITE } from "../config/site";

export default function BlogPostSchema({
  title,
  description,
  url,
  image,
  datePublished, // ISO string
  dateModified,
  keywords,      // "a, b, c" string, optional
  authorName = SITE.name,
  authorUrl,
}) {
  if (!title || !url) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
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
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
  };

  return <JsonLd id="blogpost" data={data} />;
}