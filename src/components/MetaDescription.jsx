import { useEffect } from "react";

// Page ke description tag ka content badalta hai, page chhodne par default wapas laga deta hai.
export default function MetaDescription({ content }) {
  useEffect(() => {
    if (!content) return undefined;

    let tag = document.head.querySelector('meta[name="description"]');
    let created = false;

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
      created = true;
    }

    const previous = tag.getAttribute("content");
    tag.setAttribute("content", content);

    return () => {
      if (created) tag.remove();
      else if (previous !== null) tag.setAttribute("content", previous);
    };
  }, [content]);

  return null;
}