import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/* items: [{ label: "Home", to: "/" }, { label: "Programs", to: "/courses" }, { label: "Certificate" }]
   Aakhri item current page hota hai, uska link nahi banta. */
export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;

        return (
          <Fragment key={`${item.label}-${i}`}>
            {isLast || !item.to ? (
              <span
                className={isLast ? "muted" : undefined}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link to={item.to}>{item.label}</Link>
            )}

            {!isLast && <ChevronRight size={14} />}
          </Fragment>
        );
      })}
    </nav>
  );
}