import JsonLd from "./JsonLd";
import { SITE } from "../config/site";

export default function ImageObjectSchema({ imageUrl, width, height, caption, pageUrl }) {
  if (!imageUrl) return null;

  const url =
    pageUrl ||
    (typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : SITE.url);

  const data = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${url}#primaryimage`,
    inLanguage: "en-IN",
    url: imageUrl,
    contentUrl: imageUrl,
    ...(width && { width }),
    ...(height && { height }),
    ...(caption && { caption }),
  };

  return <JsonLd id="primary-image" data={data} />;
}