import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { X, Clock } from "lucide-react";
import { OFFER, isOfferLive } from "../config/offer";

const pad = (n) => String(n).padStart(2, "0");

function getTimeLeft() {
  const diff = new Date(OFFER.expiresOn + "T23:59:59") - new Date();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

function alreadyShown() {
  const key = "mga_offer_" + OFFER.id;
  if (OFFER.showOn === "oncePerSession") return !!sessionStorage.getItem(key);
  if (OFFER.showOn === "oncePerDay") {
    return localStorage.getItem(key) === new Date().toDateString();
  }
  return false;
}

function markShown() {
  const key = "mga_offer_" + OFFER.id;
  if (OFFER.showOn === "oncePerSession") sessionStorage.setItem(key, "1");
  if (OFFER.showOn === "oncePerDay") localStorage.setItem(key, new Date().toDateString());
}

export default function OfferCracker({ onClaim }) {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [left, setLeft] = useState(getTimeLeft());

  // Page change par popup trigger
  useEffect(() => {
    if (!isOfferLive() || alreadyShown()) return;
    const t = setTimeout(() => {
      setLeft(getTimeLeft());
      setShow(true);
      markShown();
    }, 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  // Countdown, scroll lock, Esc to close
  useEffect(() => {
    if (!show) return;
    const tick = setInterval(() => setLeft(getTimeLeft()), 1000);
    const onKey = (e) => e.key === "Escape" && setShow(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(tick);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [show]);

  const close = () => setShow(false);
  const claim = () => { setShow(false); onClaim?.(); };

  if (!show) return null;

  return (
    <div className="of-overlay" onClick={close}>
      <div
        className="of-card"
        role="dialog"
        aria-modal="true"
        aria-label={OFFER.headline}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="of-close" onClick={close} aria-label="Close">
          <X size={18} />
        </button>

        <div className="of-head">
          <span className="of-badge">{OFFER.badge}</span>
          <h3 className="of-title">{OFFER.headline}</h3>
        </div>

        <div className="of-flyer-wrap">
          <img src={OFFER.imageUrl} alt="Special offer" className="of-flyer" />
          <span className="of-sheen" />
        </div>

        {left && (
          <div className="of-timer" aria-label="Offer ends in">
            <Clock size={15} />
            <span className="of-timer-label">Ends in</span>
            {[
              [left.d, "Days"],
              [left.h, "Hrs"],
              [left.m, "Min"],
              [left.s, "Sec"],
            ].map(([v, l]) => (
              <div className="of-unit" key={l}>
                <b>{pad(v)}</b>
                <small>{l}</small>
              </div>
            ))}
          </div>
        )}

        <p className="of-sub">{OFFER.subtext}</p>

        <div className="of-actions">
          <button type="button" className="btn btn-primary of-cta" onClick={claim}>
            {OFFER.ctaLabel}
          </button>
          <button type="button" className="of-later" onClick={close}>
            {OFFER.secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}