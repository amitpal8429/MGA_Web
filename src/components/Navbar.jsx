import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import LeadForm from "./LeadForm";
import OfferCracker from "./OfferCracker";
import SiteSchema from "./SiteSchema";
import InstallButton from "./InstallButton";
import { OFFER, isOfferLive } from "../config/offer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [offerSignal, setOfferSignal] = useState(0);
  const offerLive = isOfferLive();
  const { count } = useCart();

  const headerRef = useRef(null);
  const [headerH, setHeaderH] = useState(0);

  // Measure header height so the spacer keeps page content from hiding under it
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setHeaderH(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("mga_lead_submitted")) return;

    const firstTimer = setTimeout(() => setAuthOpen(true), 10000);

    let interval = null;
    const repeatTimer = setTimeout(() => {
      interval = setInterval(() => {
        if (localStorage.getItem("mga_lead_submitted")) {
          clearInterval(interval);
          return;
        }
        setAuthOpen((isOpen) => (isOpen ? isOpen : true));
      }, 60000);
    }, 10000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(repeatTimer);
      if (interval) clearInterval(interval);
    };
  }, []);

  const openSignup = () => {
    setOpen(false);
    setAuthOpen(true);
  };
  const closeAuth = () => setAuthOpen(false);
  const showOffer = () => setOfferSignal((n) => n + 1);

  return (
    <>
      <style>{`
        /* Fixed header: topbar + nav stay pinned while scrolling */
        .nav-wrap {
          position: fixed !important;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .nav-cart { position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 6px; color: inherit; }
        .nav-cart-badge {
          position: absolute; top: -4px; right: -6px; min-width: 18px; height: 18px; padding: 0 5px;
          display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box;
          background: #ef4444; color: #fff; font-size: 11px; font-weight: 700; line-height: 1; border-radius: 999px;
        }
      `}</style>
      <header className="nav-wrap" ref={headerRef}>
        <div className="topbar">
          <div className="wrap topbar-inner">
            <span>
              {offerLive
                ? OFFER.topbarText
                : "New intake now open — enroll before seats fill up"}
            </span>
            {offerLive && (
              <button type="button" className="topbar-offer-btn" onClick={showOffer}>
                View offer
              </button>
            )}
          </div>
        </div>

        <div className="nav">
          <div className="wrap nav-row">
            <Link to="/" className="brand" onClick={() => setOpen(false)}>
              <img
                src="https://medicalglobalacademy.com/wp-content/uploads/2026/08/logo_new.png"
                alt="Medical Global Academy"
                className="brand-logo"
              />
              <span className="brand-name">MGA</span>
            </Link>

            {/* Mobile Overlay Menu */}
            <nav className={`nav-links ${open ? "is-open" : ""}`}>
              <button
                type="button"
                className="nav-close-mobile"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink to="/courses" onClick={() => setOpen(false)}>Programs</NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
              <NavLink to="/faculty" onClick={() => setOpen(false)}>Faculty</NavLink>
              <NavLink to="/accreditation" onClick={() => setOpen(false)}>Accreditation</NavLink>
              <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>

              <span className="nav-divider" />

              <Link
                to="/cart"
                className="nav-cart"
                aria-label={`Cart${count ? ` (${count} item${count > 1 ? "s" : ""})` : ""}`}
                onClick={() => setOpen(false)}
              >
                <ShoppingCart size={22} />
                {count > 0 && <span className="nav-cart-badge">{count}</span>}
              </Link>

              <button type="button" className="nav-login" onClick={openSignup}>
                Enquire Now
              </button>

              <InstallButton />
            </nav>

            {/* Hamburger */}
            <button
              type="button"
              className={`nav-toggle ${open ? "is-active" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Reserves space for the fixed header */}
      <div style={{ height: headerH }} aria-hidden="true" />

      {/* Sitewide schema: Organization, WebSite, Offer */}
      <SiteSchema />

      {/* Offer popup (flyer + countdown) */}
      <OfferCracker onClaim={openSignup} openSignal={offerSignal} />

      {/* Simple enquiry form popup (no flyer) */}
      {authOpen && (
        <div className="mga-auth-overlay" onClick={closeAuth}>
          <div className="mga-auth-popup" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="mga-auth-close"
              onClick={closeAuth}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="mga-auth-logo">
              <img
                src="https://medicalglobalacademy.com/wp-content/uploads/2026/08/logo_new.png"
                alt="MGA"
              />
            </div>

            <div className="mga-auth-heading">
              <div className="mga-auth-label">ENQUIRE NOW</div>
              <h2>Get in touch</h2>
              <p>
                {offerLive
                  ? OFFER.formNote
                  : "Share your details and our team will help you pick the right program."}
              </p>
            </div>

            <LeadForm idPrefix="popup" />
          </div>
        </div>
      )}
    </>
  );
}