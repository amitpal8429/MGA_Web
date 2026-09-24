import { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="announce">
      <div className="wrap announce-row">
        <span>New cohorts open every month — certificate, PG diploma and fellowship seats filling fast.</span>
        <button
          className="announce-close"
          aria-label="Dismiss announcement"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
