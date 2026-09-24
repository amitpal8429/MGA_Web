export function formatINR(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDuration(months) {
  const n = Number(months);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n === 1 ? "1 month" : `${n} months`;
}

export function formatStartDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

/** Strip stray double-spaces / stray line breaks the source content contains. */
export function cleanText(str) {
  if (!str) return "";
  return str.replace(/\r\n/g, " ").replace(/\s+/g, " ").trim();
}

export function initials(name) {
  if (!name) return "?";
  const parts = name.replace(/^Dr\.?\s*/i, "").trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

const TAG_CLASS = {
  Certificate: "tag-certificate",
  Fellowship: "tag-fellowship",
  "Pg Diploma": "tag-pgdiploma",
};

export function typeClass(type) {
  return TAG_CLASS[type] || "tag-certificate";
}
