import { useState, useRef, useEffect } from "react";
import { Headset, Phone, Bot, Globe, X, MessageCircle } from "lucide-react";
import "./StickyContactBar.css";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/medicalglobalacademy/",
    color: "#e1306c",
    bg: "rgba(225, 48, 108, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47a4.9 4.9 0 0 1 1.77 1.15 4.9 4.9 0 0 1 1.15 1.77c.25.64.42 1.37.47 2.43C21.99 8.94 22 9.28 22 12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43a4.9 4.9 0 0 1 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2m0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.35-1.02.66-.31.31-.5.6-.66 1.02-.12.31-.26.78-.3 1.65C4.28 8.54 4.27 8.86 4.27 11.5s.01 2.96.06 4.01c.04.87.18 1.34.3 1.65.16.42.35.71.66 1.02.31.31.6.5 1.02.66.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.35 1.02-.66.31-.31.5-.6.66-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.01s-.01-2.96-.06-4.01c-.04-.87-.18-1.34-.3-1.65a2.7 2.7 0 0 0-.66-1.02 2.7 2.7 0 0 0-1.02-.66c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8m0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4m0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8m5.88-2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/108696261/",
    color: "#0a66c2",
    bg: "rgba(10, 102, 194, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
        <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0M3.2 8.5h3.5V21H3.2zM9.9 8.5h3.36v1.7h.05c.47-.87 1.6-1.79 3.3-1.79 3.53 0 4.18 2.32 4.18 5.35V21h-3.5v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V21H9.9z"/>
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://x.com/MGA_Courses",
    color: "#ffffff",
    bg: "rgba(255, 255, 255, 0.12)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@MedicalGlobalAcademy",
    color: "#ff0000",
    bg: "rgba(255, 0, 0, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/medicalglobalacademy1",
    color: "#1877f2",
    bg: "rgba(24, 119, 242, 0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12"/>
      </svg>
    ),
  },
];

// ===== WhatsApp SVG Icon =====
const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: "block" }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ===== Helper to open Gabs Chatbot =====
function openGabsChatbot() {
  const apis = [
    () => window.GabsChatbot?.open?.(),
    () => window.GabsChatbot?.toggle?.(),
    () => window.gabs?.open?.(),
    () => window.gabs?.toggle?.(),
    () => window.$gabs?.open?.(),
    () => window.$gabs?.toggle?.(),
    () => window.Gabs?.open?.(),
    () => window.Gabs?.toggle?.(),
    () => window.gabsWidget?.open?.(),
    () => window.GabsWidget?.open?.(),
  ];

  for (const api of apis) {
    try {
      const result = api();
      if (result !== undefined) return true;
    } catch (e) { /* try next */ }
  }

  // Fallback — click the launcher
  const selectors = [
    "#gabs-chatbot-button", "#gabs-widget-button", "#gabs-launcher",
    '[class*="gabs"][class*="launcher"]',
    '[class*="gabs"][class*="button"]',
    '[class*="gabs"][class*="bubble"]',
    '[id*="gabs"][class*="widget"]',
    '[data-gabs-launcher]',
    'iframe[src*="getgabs"]',
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el && typeof el.click === "function") {
      el.click();
      return true;
    }
  }

  window.open(
    "https://api.whatsapp.com/send/?phone=918048799926&text=Hello%2C+I+am+interested+in+MGA+Fellowship+courses.",
    "_blank"
  );
  return false;
}

export default function StickyContactBar() {
  const [open, setOpen] = useState(null);
  const contactRef = useRef(null);
  const aiRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e) => {
      const refs = { contact: contactRef, ai: aiRef, social: socialRef };
      const currentRef = refs[open];
      if (currentRef?.current && !currentRef.current.contains(e.target)) {
        setOpen(null);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  const toggle = (menu) => setOpen((prev) => (prev === menu ? null : menu));

  return (
    <>
      {open && <div className="scb-backdrop" onClick={() => setOpen(null)} />}

      <div className="sticky-contact-bar">

        {/* ============ 1. CONTACT US ============ */}
        <div className="scb-menu-wrap" ref={contactRef}>
          <button
            type="button"
            className={`scb-item scb-icon-only ${open === "contact" ? "is-open" : ""}`}
            onClick={() => toggle("contact")}
            aria-expanded={open === "contact"}
            aria-label="Contact Us"
          >
            <span className="scb-icon scb-icon-coral">
              {open === "contact" ? <X size={22} /> : <Headset size={22} />}
            </span>
            <span className="scb-label">Contact</span>
          </button>

          {open === "contact" && (
            <div className="scb-dropdown">
              <div className="scb-dropdown-header">Get in touch</div>

              {/* Call Us */}
              <a href="tel:+919289994218" className="scb-dropdown-item">
                <span className="scb-dropdown-icon" style={{ background: "rgba(255,140,66,0.15)", color: "#ff8c42" }}>
                  <Phone size={18} />
                </span>
                <span className="scb-dropdown-text">
                  <strong>Call Us</strong>
                  <small>+91 92899 94218</small>
                </span>
              </a>

              {/* Chatbot */}
              <button
                type="button"
                className="scb-dropdown-item scb-dropdown-btn"
                onClick={() => { setOpen(null); openGabsChatbot(); }}
              >
                <span className="scb-dropdown-icon" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>
                  <Bot size={18} />
                </span>
                <span className="scb-dropdown-text">
                  <strong>Chatbot <em className="scb-badge">24×7</em></strong>
                  <small>Open live AI chat</small>
                </span>
              </button>

              {/* Download Brochure */}
              <a
                href="https://api.whatsapp.com/send?phone=919310027474&text=Hi%2C%20I%20would%20like%20to%20download%20the%20course%20brochure."
                target="_blank"
                rel="noopener noreferrer"
                className="scb-dropdown-item"
              >
                <span className="scb-dropdown-icon" style={{ background: "rgba(37,211,102,0.15)", color: "#25d366" }}>
                  <WhatsAppIcon size={18} />
                </span>
                <span className="scb-dropdown-text">
                  <strong>Download Brochure</strong>
                  <small>+91 93100 27474</small>
                </span>
              </a>
            </div>
          )}
        </div>

        {/* ============ 2. WHATSAPP ============ */}
        <a
          href="https://api.whatsapp.com/send?phone=919310027474&text=Hi%2C%20I%20would%20like%20to%20download%20the%20course%20brochure."
          target="_blank"
          rel="noopener noreferrer"
          className="scb-item scb-icon-only"
          aria-label="WhatsApp"
        >
          <span className="scb-icon scb-icon-whatsapp">
            <WhatsAppIcon size={22} />
          </span>
          <span className="scb-label">WhatsApp</span>
        </a>

        {/* ============ 3. AI SUPPORT — DROPDOWN WITH 3 ITEMS ============ */}
       {/* ============ 3. AI SUPPORT — DROPDOWN ============ */}
<div className="scb-menu-wrap" ref={aiRef}>
  <button
    type="button"
    className={`scb-item scb-icon-only ${open === "ai" ? "is-open" : ""}`}
    onClick={() => toggle("ai")}
    aria-expanded={open === "ai"}
    aria-label="AI Support"
  >
    <span className="scb-icon scb-icon-ai">
      {open === "ai" ? <X size={22} /> : <Bot size={22} />}
    </span>
    <span className="scb-label">Support Team 24×7</span>
  </button>

  {open === "ai" && (
    <div className="scb-dropdown">
      <div className="scb-dropdown-header">AI Support — 24×7</div>

      {/* 1. WHATSAPP — +91 87961 22980 (WHATSAPP ICON) */}
      <a
        href="https://api.whatsapp.com/send/?phone=918796122980&text=Hello%2C+I+am+interested+in+MGA+Fellowship+courses.+Source%3A+Organic+Search&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        className="scb-dropdown-item"
      >
        <span className="scb-dropdown-icon" style={{ background: "rgba(37,211,102,0.15)", color: "#25d366" }}>
          <WhatsAppIcon size={18} />
        </span>
        <span className="scb-dropdown-text">
          <strong>WhatsApp AI Support</strong>
          <small>+91 87961 22980</small>
        </span>
      </a>

      {/* 2. CALL — +91 80487 99926 (CALL ICON) */}
      <a href="tel:+918048799926" className="scb-dropdown-item">
        <span className="scb-dropdown-icon" style={{ background: "rgba(255,140,66,0.15)", color: "#ff8c42" }}>
          <Phone size={18} />
        </span>
        <span className="scb-dropdown-text">
          <strong>Call AI Support</strong>
          <small>+91 80487 99926</small>
        </span>
      </a>

      {/* 3. CHATBOT — Opens Gabs */}
      <button
        type="button"
        className="scb-dropdown-item scb-dropdown-btn"
        onClick={() => {
          setOpen(null);
          openGabsChatbot();
        }}
      >
        <span className="scb-dropdown-icon" style={{ background: "rgba(167,139,250,0.15)", color: "#a78bfa" }}>
          <Bot size={18} />
        </span>
        <span className="scb-dropdown-text">
          <strong>Chatbot <em className="scb-badge">24×7</em></strong>
          <small>Live AI chat assistant</small>
        </span>
      </button>
    </div>
  )}
</div>

        {/* ============ 4. CALL ============ */}
        <a
          href="tel:+919289994218"
          className="scb-item scb-icon-only"
          aria-label="Call"
        >
          <span className="scb-icon scb-icon-phone">
            <Phone size={22} />
          </span>
          <span className="scb-label">Call</span>
        </a>

        {/* ============ 5. SOCIAL MEDIA ============ */}
        <div className="scb-menu-wrap" ref={socialRef}>
          <button
            type="button"
            className={`scb-item scb-icon-only ${open === "social" ? "is-open" : ""}`}
            onClick={() => toggle("social")}
            aria-expanded={open === "social"}
            aria-label="Social Media"
          >
            <span className="scb-icon scb-icon-globe">
              {open === "social" ? <X size={22} /> : <Globe size={22} />}
            </span>
            <span className="scb-label">Social Media</span>
          </button>

          {open === "social" && (
            <div className="scb-dropdown">
              <div className="scb-dropdown-header">Follow MGA</div>

              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scb-dropdown-item"
                  onClick={() => setOpen(null)}
                >
                  <span className="scb-dropdown-icon" style={{ background: s.bg, color: s.color }}>
                    {s.icon}
                  </span>
                  <span className="scb-dropdown-text">
                    <strong>{s.name}</strong>
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}