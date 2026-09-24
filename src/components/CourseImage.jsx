import { useMemo, useState } from "react";

// BASE_URL se nahi, directly hardcode karo
const ORIGIN = "https://24x7.medicalglobalacademy.com";

function candidatesFor(filename) {
  if (!filename) return [];
  return [
    `${ORIGIN}/storage/uploads/course/${filename}`,
    `${ORIGIN}/storage/${filename}`,
    `${ORIGIN}/storage/courses/${filename}`,
    `${ORIGIN}/uploads/${filename}`,
    `${ORIGIN}/images/${filename}`,
  ];
}

function hueFrom(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 360;
}

export default function CourseImage({ src, alt, className }) {
  const candidates = useMemo(() => candidatesFor(src), [src]);
  const [idx, setIdx] = useState(0);
  const exhausted = idx >= candidates.length;

  if (exhausted) {
    const hue = hueFrom(alt || src || "mga");
    return (
      <div
        className={`img-fallback ${className || ""}`}
        style={{
          background: `linear-gradient(135deg, hsl(${hue} 28% 20%), hsl(${(hue + 30) % 360} 24% 30%))`,
        }}
        role="img"
        aria-label={alt}
      >
        <span>{(alt || "MGA").slice(0, 2).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={candidates[idx]}
      alt={alt}
      loading="lazy"
      onError={() => setIdx((i) => i + 1)}
    />
  );
}