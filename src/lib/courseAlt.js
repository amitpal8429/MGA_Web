// Alt text kahan se aayega, priority order me:
// 1) courseSeo (sheet) ke fields  2) API course object ke fields  3) fallback: course name

const SEO_KEYS = ["imageAlt", "imgAlt", "altText", "alt", "image_alt"];

const API_KEYS = [
  "image_alt",
  "alt",
  "alt_text",
  "img_alt",
  "image_alt_text",
  "thumbnail_alt",
  "featured_image_alt",
];

const pick = (obj, keys) => {
  if (!obj || typeof obj !== "object") return "";
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "";
};

export function getImageAlt(course, seo) {
  const fromSeo = pick(seo, SEO_KEYS);
  if (fromSeo) return fromSeo;

  const fromApi = pick(course, API_KEYS);
  if (fromApi) return fromApi;

  // nested: course.image.alt / course.seo.image_alt
  const nested =
    (typeof course?.image === "object" && course.image?.alt) ||
    course?.seo?.image_alt ||
    "";
  if (typeof nested === "string" && nested.trim()) return nested.trim();

  return course?.name || course?.title || "";
}