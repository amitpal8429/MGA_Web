import { useEffect } from "react";

// In types se page par sirf EK node rehna chahiye
const SINGLETON_TYPES = new Set([
  "Organization",
  "EducationalOrganization",
  "WebSite",
  "WebPage",
  "BreadcrumbList",
  "BlogPosting",
  "Blog",
  "FAQPage",
  "Course",
]);

const nodesOf = (d) => {
  if (!d) return [];
  if (Array.isArray(d["@graph"])) return d["@graph"];
  return [d];
};

// Har node ke liye "keys" banate hain; jin nodes ki koi key match kare wo duplicate hain
const keysOf = (node) => {
  const keys = [];
  if (!node || typeof node !== "object") return keys;
  if (node["@id"]) keys.push("id:" + node["@id"]);
  const types = [].concat(node["@type"] || []);
  types.forEach((t) => {
    if (SINGLETON_TYPES.has(t)) keys.push("type:" + t);
  });
  if (types.includes("ImageObject") && (node.url || node.contentUrl)) {
    keys.push("img:" + (node.url || node.contentUrl));
  }
  return keys;
};

export default function JsonLd({ id, data }) {
  const json = data ? JSON.stringify(data) : "";

  useEffect(() => {
    if (!json) return;
    const elId = "ld-" + id;

    // 1) same id wali purani script hatao (remount / prerender)
    document
      .querySelectorAll(`script[id="${elId}"]`)
      .forEach((n) => n.remove());

    // 2) dusri scripts se wo nodes hatao jo ye component dubara de raha hai
    const myKeys = new Set();
    nodesOf(JSON.parse(json)).forEach((n) =>
      keysOf(n).forEach((k) => myKeys.add(k))
    );

    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((s) => {
        try {
          const parsed = JSON.parse(s.text);
          const nodes = nodesOf(parsed);
          const kept = nodes.filter(
            (n) => !keysOf(n).some((k) => myKeys.has(k))
          );
          if (kept.length === nodes.length) return; // koi overlap nahi
          if (kept.length === 0) {
            s.remove();
          } else {
            s.text = JSON.stringify({
              "@context": parsed["@context"] || "https://schema.org",
              "@graph": kept,
            });
          }
        } catch (e) {
          /* invalid JSON ko chhod do */
        }
      });

    // 3) apni script lagao
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = elId;
    el.text = json;
    document.head.appendChild(el);

    return () => el.remove();
  }, [id, json]);

  return null;
}