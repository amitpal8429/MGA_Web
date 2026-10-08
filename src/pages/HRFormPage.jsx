import React, { useState } from "react";
import "./HRFormPage.css";


// =====================================================
// GOOGLE APPS SCRIPT WEB APP URL
// =====================================================
//
// IMPORTANT:
// Deploy Google Apps Script as Web App.
// Then paste the URL here.
//
// Example:
// https://script.google.com/macros/s/XXXXXXXXXXXX/exec
//
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

  const [form, setForm] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };


  // =====================================================
  // HANDLE FORM SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Clear old message
    setMessage("");

    setSuccess(false);

    // Start loading
    setLoading(true);


    try {

      // Send form data to Google Apps Script
      await fetch(FORM_URL, {

        method: "POST",

        mode: "no-cors",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8",
        },

        body: JSON.stringify(form),

      });


      /**
       * no-cors means browser cannot read
       * the Apps Script response.
       *
       * If fetch itself completes without
       * throwing an error, we show success.
       */

      setSuccess(true);

      setMessage(
        "Application submitted successfully!"
      );


      // Clear form after submission
      setForm(initialForm);


    } catch (error) {

      console.error(
        "HR FORM SUBMISSION ERROR:",
        error
      );

      setSuccess(false);

      setMessage(
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // PAGE
  // =====================================================

  return (

    <section className="hr-page">

      <div className="hr-container">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="hr-header">

          <span className="hr-badge">
            CAREERS
          </span>

          <h1>
            HR Candidate Form
          </h1>

          <p>
            Join Medical Global Academy and
            grow your career with us.
          </p>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="hr-form"
          onSubmit={handleSubmit}
        >


          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <div className="form-section">

            <h2>
              Personal Information
            </h2>

            <p className="section-description">
              Please provide your basic contact
              information.
            </p>


            <div className="form-grid">


              {/* NAME */}

              <div className="form-group">

                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="form-group">

                <label>
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>


              {/* PHONE */}

              <div className="form-group">

                <label>
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />

              </div>


              {/* POSITION */}

              <div className="form-group">

                <label>
                  Position Applied For *
                </label>

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


          {/* =================================================
              PROFESSIONAL DETAILS
          ================================================= */}

          <div className="form-section">

            <h2>
              Professional Details
            </h2>

            <p className="section-description">
              Tell us about your professional
              experience and expectations.
            </p>


            <div className="form-grid">


              {/* EXPERIENCE */}

              <div className="form-group">

                <label>
                  Experience (Years) *
                </label>

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


              {/* CURRENT CTC */}

              <div className="form-group">

                <label>
                  Current CTC
                </label>

                <input
                  type="text"
                  name="ctc"
                  value={form.ctc}
                  onChange={handleChange}
                  placeholder="e.g. ₹4 LPA"
                />

              </div>


              {/* EXPECTED CTC */}

              <div className="form-group">

                <label>
                  Expected CTC *
                </label>

                <input
                  type="text"
                  name="ectc"
                  value={form.ectc}
                  onChange={handleChange}
                  placeholder="e.g. ₹6 LPA"
                  required
                />

              </div>


              {/* NOTICE PERIOD */}

              <div className="form-group">

                <label>
                  Notice Period *
                </label>

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


            {/* RELOCATE */}

            <div className="form-group">

              <label>
                Are you willing to relocate? *
              </label>

              <select
                name="relocate"
                value={form.relocate}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select an option
                </option>

                <option value="Yes">
                  Yes
                </option>

                <option value="No">
                  No
                </option>

              </select>

            </div>

          </div>


          {/* =================================================
              ABOUT YOU
          ================================================= */}

          <div className="form-section">

            <h2>
              About You
            </h2>

            <p className="section-description">
              Help us understand your goals,
              strengths and motivation.
            </p>


            {/* WHY HIRE YOU */}

            <div className="form-group">

              <label>
                Why should we hire you? *
              </label>

              <textarea
                name="why"
                value={form.why}
                onChange={handleChange}
                placeholder="Tell us why you are a good fit for this position..."
                rows="5"
                required
              />

            </div>


            {/* STRENGTHS */}

            <div className="form-group">

              <label>
                What are your strengths? *
              </label>

              <textarea
                name="strengths"
                value={form.strengths}
                onChange={handleChange}
                placeholder="Tell us about your key strengths..."
                rows="4"
                required
              />

            </div>


            {/* WEAKNESS */}

            <div className="form-group">

              <label>
                What is your weakness? *
              </label>

              <textarea
                name="weakness"
                value={form.weakness}
                onChange={handleChange}
                placeholder="Tell us about an area you are working to improve..."
                rows="4"
                required
              />

            </div>


            {/* FUTURE GOALS */}

            <div className="form-group">

              <label>
                Where do you see yourself in 5 years?
              </label>

              <textarea
                name="future"
                value={form.future}
                onChange={handleChange}
                placeholder="Describe your career goals..."
                rows="4"
              />

            </div>


            {/* REASON FOR LEAVING */}

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


          {/* =================================================
              SUCCESS / ERROR MESSAGE
          ================================================= */}

          {message && (

            <div
              className={
                success
                  ? "form-message success"
                  : "form-message error"
              }
            >

              {message}

            </div>

          )}


          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >

            {loading
              ? "Submitting..."
              : "Submit Application"}

          </button>


          {/* =================================================
              PRIVACY
          ================================================= */}

          <p className="privacy-text">

            By submitting this form, you agree
            that the information provided may be
            used for recruitment purposes.

          </p>


        </form>

      </div>

    </section>

  );
}