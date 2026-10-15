import React, { useState, useEffect } from "react";
import "./HRFormPage.css";

// =====================================================
// GOOGLE APPS SCRIPT WEB APP URL
// =====================================================
const FORM_URL =
  "https://script.google.com/macros/s/AKfycbx8lIPrX-w75_rPZX-rKeUuuyHT5P4aeeYHC5L_uWHl_gtQvy77o75P52kWK9AMYULuwA/exec";

// =====================================================
// INITIAL FORM
// =====================================================
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

export default function HRFormPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Anti-screenshot: content hidden state
  const [hidden, setHidden] = useState(false);

  // =====================================================
  // ANTI-SCREENSHOT PROTECTION
  // =====================================================
  useEffect(() => {
    // 1) Right click block
    const handleContextMenu = (e) => e.preventDefault();

    // 2) Copy / cut block
    const handleCopy = (e) => e.preventDefault();
    const handleCut = (e) => e.preventDefault();

    // 3) Drag block (images/text)
    const handleDragStart = (e) => e.preventDefault();

    // 4) Select start block (text selection)
    const handleSelectStart = (e) => {
      const tag = e.target?.tagName;
      // Allow typing in form fields
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
    };

    // 5) Keyboard shortcuts block
    const handleKeyDown = (e) => {
      const k = e.key?.toLowerCase();

      // Ctrl/Cmd + P (print), S (save), U (view source), A (select all)
      if ((e.ctrlKey || e.metaKey) && ["p", "s", "u", "a"].includes(k)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl/Cmd + Shift + I / J / C (devtools)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        ["i", "j", "c"].includes(k)
      ) {
        e.preventDefault();
        return false;
      }

      // F12 (devtools)
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }

      // PrintScreen — content hide karo (screenshot avoid)
      if (e.key === "PrintScreen" || k === "printscreen") {
        // Clipboard ko blank kar do (best effort — sirf modern browsers mein)
        try {
          navigator.clipboard.writeText("");
        } catch {
          /* ignore */
        }
        setHidden(true);
        setTimeout(() => setHidden(false), 1200);
      }
    };

    // 6) KeyUp par bhi PrintScreen check (kuch browsers keydown miss karte hain)
    const handleKeyUp = (e) => {
      if (e.key === "PrintScreen") {
        setHidden(true);
        setTimeout(() => setHidden(false), 1200);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // =====================================================
  // HANDLE FORM SUBMIT
  // =====================================================
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

  // =====================================================
  // PAGE
  // =====================================================
  return (
    <section
      className={`hr-page ${hidden ? "is-hidden" : ""}`}
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="hr-container">
        {/* HEADER */}
        <div className="hr-header">
          <span className="hr-badge">CAREERS</span>
          <h1>HR Candidate Form</h1>
          <p>Join Medical Global Academy and grow your career with us.</p>
        </div>

        {/* FORM */}
        <form className="hr-form" onSubmit={handleSubmit}>
          {/* PERSONAL INFORMATION */}
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

          {/* PROFESSIONAL DETAILS */}
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

          {/* ABOUT YOU */}
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
              <label>
                Reason for leaving current/previous company
              </label>
              <textarea
                name="leaving"
                value={form.leaving}
                onChange={handleChange}
                placeholder="Please share your reason..."
                rows="4"
              />
            </div>
          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={
                success ? "form-message success" : "form-message error"
              }
            >
              {message}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

          {/* PRIVACY */}
          <p className="privacy-text">
            By submitting this form, you agree that the information provided
            may be used for recruitment purposes.
          </p>
        </form>
      </div>

      {/* PrintScreen overlay — jab user PrintScreen dabaye */}
      {hidden && (
        <div className="anti-screenshot-overlay" aria-hidden="true">
          <div className="anti-screenshot-box">
            <p>Screenshots are not allowed on this page.</p>
          </div>
        </div>
      )}
    </section>
  );
}