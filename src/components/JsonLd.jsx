import { useEffect } from "react";

export default function JsonLd({ id, data }) {
  const json = data ? JSON.stringify(data) : "";

  useEffect(() => {
    if (!json) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "ld-" + id;
    el.text = json;
    document.head.appendChild(el);
    return () => el.remove();
  }, [id, json]);

  return null;
}