import React, { useState } from "react";

const theme = {
  primary: "#0c3a6b",
};

function getInitials(name = "") {
  const letters = name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w) && !["&", "of", "and"].includes(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return letters || "H";
}

/*
 * Retry stages:
 * 0 -> normal load (referrerPolicy: no-referrer)
 * 1 -> retry with crossOrigin="anonymous"
 * 2 -> fallback to initials
 */
export default function HospitalLogo({ name, logo }) {
  const [stage, setStage] = useState(0);

  if (!logo || stage >= 2) {
    return <span style={styles.initials}>{getInitials(name)}</span>;
  }

  const useCors = stage === 1;

  return (
    <img
      key={stage}
      src={logo}
      alt={`${name} logo`}
      loading="lazy"
      referrerPolicy="no-referrer"
      crossOrigin={useCors ? "anonymous" : undefined}
      onError={() => {
        console.warn(`Logo failed (stage ${stage}):`, logo);
        setStage((s) => s + 1);
      }}
      style={styles.logoImg}
    />
  );
}

const styles = {
  logoImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: 8,
  },
  initials: {
    fontSize: 26,
    fontWeight: 700,
    color: theme.primary,
  },
};