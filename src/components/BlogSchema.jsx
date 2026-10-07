import JsonLd from "./JsonLd";
import { SITE } from "../config/site";

export default function BlogSchema({
  name = `${SITE.name} Blog`,
  description = "Articles on medical education, clinical training and career growth for doctors.",
  url = `${SITE.url}/blog`,
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name,
    description,
    url,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
  };

  return <JsonLd id="blog" data={data} />;
}