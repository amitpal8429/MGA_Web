import React, { useState, useEffect, useMemo } from "react";
import "./HRFormPage.css";


const FORM_URL =
  "https://script.google.com/macros/s/AKfycbx8lIPrX-w75_rPZX-rKeUuuyHT5P4aeeYHC5L_uWHl_gtQvy77o75P52kWK9AMYULuwA/exec";


const initialForm = {
  name: "",
  email: "",
  phone: "",
  position: "",
  exp: "",
  ctc: "",
  ectc: "",
  notice: "",
  relocate: "",
  why: "",
  strengths: "",
  weakness: "",
  future: "",
  leaving: "",
};


const isFormField = (el) => {
  const tag = el?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
};

export default function HRFormPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);


  const [keyHidden, setKeyHidden] = useState(false);
  const [awayHidden, setAwayHidden] = useState(false);
  const hidden = keyHidden || awayHidden;

  const watermarkStyle = useMemo(() => {
    const stamp = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' width='360' height='220'>` +
      `<text x='20' y='120' transform='rotate(-25 180 110)' ` +
      `font-family='Arial, sans-serif' font-size='15' font-weight='700' ` +
      `fill='rgba(16,47,82,0.10)'>MGA CONFIDENTIAL - ${stamp}</text>` +
      `</svg>`;

    return {
      backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
    };
  }, []);

  useEffect(() => {
    let keyTimer;

    const hideTemporarily = (ms = 1500) => {
      setKeyHidden(true);
      clearTimeout(keyTimer);
      keyTimer = setTimeout(() => setKeyHidden(false), ms);
    };

    const handleContextMenu = (e) => e.preventDefault();

    const handleCopy = (e) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };
    const handleCut = (e) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

  
    const handleDragStart = (e) => e.preventDefault();

    const handleSelectStart = (e) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      const k = e.key?.toLowerCase();
      const mod = e.ctrlKey || e.metaKey;

      
      if (mod && ["p", "s", "u"].includes(k)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }


      if (mod && k === "a" && !isFormField(e.target)) {
        e.preventDefault();
        return false;
      }

   
      if (mod && e.shiftKey && ["i", "j", "c"].includes(k)) {
        e.preventDefault();
        return false;
      }

      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      if (e.metaKey && e.shiftKey && ["3", "4", "5", "#", "$", "%"].includes(e.key)) {
        hideTemporarily(2000);
      }

 
      if (e.metaKey && e.shiftKey && k === "s") {
        hideTemporarily(2000);
      }

      if (e.key === "PrintScreen" || k === "printscreen") {
        try {
          navigator.clipboard.writeText("");
        } catch {
         
        }
        hideTemporarily(1500);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "PrintScreen") {
        try {
          navigator.clipboard.writeText("");
        } catch {
          
        }
        hideTemporarily(1500);
      }
    };

    const handleWindowBlur = () => setAwayHidden(true);
    const handleWindowFocus = () => setAwayHidden(false);
    const handleVisibility = () => {
      setAwayHidden(document.visibilityState === "hidden");
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      clearTimeout(keyTimer);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    setLoading(true);

    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(form),
      });

      setSuccess(true);
      setMessage("Application submitted successfully!");
      setForm(initialForm);
    } catch (error) {
      console.error("HR FORM SUBMISSION ERROR:", error);
      setSuccess(false);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section
      className={`hr-page ${hidden ? "is-hidden" : ""}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >

      <div className="hr-watermark" style={watermarkStyle} aria-hidden="true" />

      <div className="hr-container">
     
        <div className="hr-header">
          <span className="hr-badge">CAREERS</span>
          <h1>HR Candidate Form</h1>
          <p>Join Medical Global Academy and grow your career with us.</p>
        </div>

 
        <form className="hr-form" onSubmit={handleSubmit}>
       
          <div className="form-section">
            <h2>Personal Information</h2>
            <p className="section-description">
              Please provide your basic contact information.
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Position Applied For *</label>
                <input
                  type="text"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  placeholder="e.g. HR Executive"
                  required
                />
              </div>
            </div>
          </div>

       
          <div className="form-section">
            <h2>Professional Details</h2>
            <p className="section-description">
              Tell us about your professional experience and expectations.
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label>Experience (Years) *</label>
                <input
                  type="number"
                  name="exp"
                  value={form.exp}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  min="0"
                  step="0.1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Current CTC</label>
                <input
                  type="text"
                  name="ctc"
                  value={form.ctc}
                  onChange={handleChange}
                  placeholder="e.g. ₹4 LPA"
                />
              </div>

              <div className="form-group">
                <label>Expected CTC *</label>
                <input
                  type="text"
                  name="ectc"
                  value={form.ectc}
                  onChange={handleChange}
                  placeholder="e.g. ₹6 LPA"
                  required
                />
              </div>

              <div className="form-group">
                <label>Notice Period *</label>
                <input
                  type="text"
                  name="notice"
                  value={form.notice}
                  onChange={handleChange}
                  placeholder="e.g. 30 Days"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Are you willing to relocate? *</label>
              <select
                name="relocate"
                value={form.relocate}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

         
          <div className="form-section">
            <h2>About You</h2>
            <p className="section-description">
              Help us understand your goals, strengths and motivation.
            </p>

            <div className="form-group">
              <label>Why should we hire you? *</label>
              <textarea
                name="why"
                value={form.why}
                onChange={handleChange}
                placeholder="Tell us why you are a good fit for this position..."
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label>What are your strengths? *</label>
              <textarea
                name="strengths"
                value={form.strengths}
                onChange={handleChange}
                placeholder="Tell us about your key strengths..."
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>What is your weakness? *</label>
              <textarea
                name="weakness"
                value={form.weakness}
                onChange={handleChange}
                placeholder="Tell us about an area you are working to improve..."
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Where do you see yourself in 5 years?</label>
              <textarea
                name="future"
                value={form.future}
                onChange={handleChange}
                placeholder="Describe your career goals..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Reason for leaving current/previous company</label>
              <textarea
                name="leaving"
                value={form.leaving}
                onChange={handleChange}
                placeholder="Please share your reason..."
                rows="4"
              />
            </div>
          </div>

        
          {message && (
            <div
              className={
                success ? "form-message success" : "form-message error"
              }
            >
              {message}
            </div>
          )}

          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

         
          <p className="privacy-text">
            By submitting this form, you agree that the information provided
            may be used for recruitment purposes.
          </p>
        </form>
      </div>

      
      {hidden && (
        <div className="anti-screenshot-overlay" aria-hidden="true">
          <div className="anti-screenshot-box">
            <p>
              {keyHidden
                ? "Screenshots are not allowed on this page."
                : "Content is hidden while this window is not active. Return to this tab to continue."}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}