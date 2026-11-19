import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb";

const SITE_URL = "https://medicalglobalacademy.com";

/* Static pages ke labels. Naya static page add ho to yahan ek line add karein. */
const STATIC_LABELS = {
  about: "About",
  faculty: "Faculty",
  accreditation: "Accreditation",
  blog: "Blog",
  login: "Login",
  signup: "Sign up",
  "privacy-policy": "Privacy Policy",
  app: "App",
  terms: "Terms & Conditions",
  refund: "Refund & Cancellation Policy",
  sitemap: "Sitemap",
  support: "Support",
  cart: "Cart",
};

/* In pages par page ka apna breadcrumb already hai, isliye global wala nahi dikhega.
   Naya page aisa ho to yahan slug add karein. */
const PAGES_WITH_OWN_CRUMBS = ["app", "terms", "refund", "support", "accreditation"];

/* "pg-diploma" -> "Pg Diploma" */
const titleFromSlug = (s) =>
  s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export default function SiteBreadcrumb() {
  const { pathname } = useLocation();
  const parts = pathname
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);

  if (parts.length === 0) return null; // Home par breadcrumb nahi

  const [first, second] = parts;
  let items = null;

  if (first === "courses") {
    /* /courses              -> Home > Programs
       /courses/certificate  -> Home > Programs > Certificate */
    items = second
      ? [
          { label: "Home", to: "/", url: SITE_URL },
          { label: "Programs", to: "/courses", url: `${SITE_URL}/courses` },
          {
            label: titleFromSlug(second),
            url: `${SITE_URL}/courses/${second}`,
          },
        ]
      : [
          { label: "Home", to: "/", url: SITE_URL },
          { label: "Programs", url: `${SITE_URL}/courses` },
        ];
  } else if (first === "blog" && second) {
    /* /blog/:slug -> Home > Blog > Post */
    items = [
      { label: "Home", to: "/", url: SITE_URL },
      { label: "Blog", to: "/blog", url: `${SITE_URL}/blog` },
      { label: titleFromSlug(second), url: `${SITE_URL}/blog/${second}` },
    ];
  } else if (
    parts.length === 1 &&
    STATIC_LABELS[first] &&
    !PAGES_WITH_OWN_CRUMBS.includes(first)
  ) {
    /* /about -> Home > About */
    items = [
      { label: "Home", to: "/", url: SITE_URL },
      { label: STATIC_LABELS[first], url: `${SITE_URL}/${first}` },
    ];
  }

  /* Course detail (/:slug) aur 404 par koi global breadcrumb nahi.
     Course detail apna breadcrumb khud dikhata hai. */
  if (!items) return null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((i) => i.url)
      .map((i, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: i.label,
        item: i.url,
      })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      </Helmet>

      <div className="wrap site-crumbs">
        <Breadcrumb items={items} />
      </div>
    </>
  );
}