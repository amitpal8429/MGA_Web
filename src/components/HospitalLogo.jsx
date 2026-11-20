import React, { useEffect, useState } from "react";

function getInitials(name = "") {
  const letters = name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return letters || "H";
}

export default function HospitalLogo({ name, logo }) {
  const [failed, setFailed] = useState(false);

  // Naya logo aaye to purani error state reset karo
  useEffect(() => {
    setFailed(false);
  }, [logo]);

  const src = logo ? logo.trim().replace(/^http:\/\//, "https://") : null;

  if (!src || failed) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c3a6b",
          color: "#fff",
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      loading="lazy"
      onError={() => {
        console.warn("Logo failed to load:", name, src);
        setFailed(true);
      }}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        padding: 8,
        boxSizing: "border-box",
      }}
    />
  );
}