import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import LeadForm from "./LeadForm";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("mga_lead_submitted")) return;

    const firstTimer = setTimeout(() => setAuthOpen(true), 10000);

    let interval = null;
    const repeatTimer = setTimeout(() => {
      interval = setInterval(() => {
        if (localStorage.getItem("mga_lead_submitted")) {
          clearInterval(interval); return;
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

  const openSignup = () => { setOpen(false); setAuthOpen(true); };
  const closeAuth = () => setAuthOpen(false);

  return (
    <>
      <header className="nav-wrap">
        <div className="topbar">
          <div className="wrap topbar-inner">
            <span>New intake now open — enroll before seats fill up</span>
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
              <span className="brand-name">Medical Global Academy</span>
            </Link>

            <nav className={`nav-links ${open ? "is-open" : ""}`}>
              <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink to="/courses" onClick={() => setOpen(false)}>Programs</NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
              <NavLink to="/faculty" onClick={() => setOpen(false)}>Faculty</NavLink>
              <Link to="/blog" onClick={() => setOpen(false)}></Link>

              <span className="nav-divider" />

              <button type="button" className="nav-login" onClick={openSignup}>
                Enquire Now
              </button>

              <Link to="/courses" className="btn btn-primary nav-cta" onClick={() => setOpen(false)}>
                <span>Explore programs</span>
                <ArrowRight size={16} />
              </Link>
            </nav>

            <button
              type="button"
              className="nav-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {authOpen && (
        <div className="mga-auth-overlay" onClick={closeAuth}>
          <div className="mga-auth-popup" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="mga-auth-close" onClick={closeAuth}>
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
              <p>Share your details and our team will help you pick the right program.</p>
            </div>

            <LeadForm idPrefix="popup" />
          </div>
        </div>
      )}
    </>
  );
}