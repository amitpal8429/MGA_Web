import { useEffect, useState } from "react";
import {
  ArrowRight, Mail, User, Phone, GraduationCap, BookOpen, Globe, CheckCircle,
} from "lucide-react";
import { BASE_URL } from "../lib/api";

const COUNTRY_CODES = ["+91","+1","+44","+971","+966","+974","+965","+973","+968","+65","+60","+61","+64","+27","+234","+254","+880","+92","+94","+977"];
const COUNTRIES = ["India","United States","United Kingdom","UAE","Saudi Arabia","Qatar","Kuwait","Bahrain","Oman","Singapore","Malaysia","Australia","New Zealand","South Africa","Nigeria","Kenya","Bangladesh","Pakistan","Sri Lanka","Nepal","Other"];
const COURSES = ["Fellowship in Orthopedic","Fellowship in Internal Medicine","Fellowship in Critical Care","Fellowship in Cardiology","Fellowship in Dermatology","Fellowship in Radiology","Fellowship in Obstetrics & Gynaecology","Certificate in Diabetes Mellitus","Certificate in Emergency Medicine","Certificate in Adolescent Health","Certificate in Acute Medicine","Certificate in Clinical Research","Other"];
const QUALIFICATIONS = ["MBBS","MBBS + MD","MBBS + MS","MBBS + DNB","MBBS + Diploma","BDS","BAMS","BHMS","Physiotherapy (BPT/MPT)","Nursing","Other"];

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
const UTM_STORAGE_KEY = "mga_utm";

// Reads utm_* params from the current URL and persists them to
// localStorage, so the values survive even if the user browses
// a few pages before actually submitting the form. Returns the
// most recently captured set (new values win over old ones).
function captureUTM() {
  try {
    const params = new URLSearchParams(window.location.search);
    const fresh = {};
    let foundAny = false;

    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) {
        fresh[key] = value;
        foundAny = true;
      }
    });

    if (foundAny) {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }

    const saved = localStorage.getItem(UTM_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    // localStorage can throw in some private-browsing modes — fail quietly
    return {};
  }
}

export default function LeadForm({ idPrefix = "lead" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+91", phone: "",
    country: "India", course: "", qualification: "",
  });

  // Capture UTM params as soon as this page loads, in case the
  // user doesn't submit right away.
  useEffect(() => {
    captureUTM();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    try {
      const utm = captureUTM();

      const payload = {
        name: form.name, email: form.email,
        phone: `${form.countryCode}${form.phone}`,
        country: form.country, course: form.course,
        qualification: form.qualification,
        utm_source: utm.utm_source || "",
        utm_medium: utm.utm_medium || "",
        utm_campaign: utm.utm_campaign || "",
        utm_content: utm.utm_content || "",
      };
      const response = await fetch(`${BASE_URL}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Submission failed");
      setSuccess(data?.message || "Thank you! Our admissions team will contact you shortly.");
      localStorage.setItem("mga_lead_submitted", "1");
      setForm({ name: "", email: "", countryCode: "+91", phone: "", country: "India", course: "", qualification: "" });
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mga-lead-form" onSubmit={handleSubmit}>
      {error && <div className="mga-auth-error">{error}</div>}
      {success && <div className="mga-auth-success"><CheckCircle size={16} />{success}</div>}

      <div className="mga-field">
        <label>Doctor Full Name *</label>
        <div className="mga-input-box">
          <User size={18} className="mga-input-icon" />
          <input type="text" name="name" placeholder="e.g. Dr. Rajesh Kumar" value={form.name} onChange={handleChange} required />
        </div>
      </div>

      <div className="mga-field">
        <label>Email *</label>
        <div className="mga-input-box">
          <Mail size={18} className="mga-input-icon" />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
        </div>
      </div>

      <div className="mga-field">
        <label>Mobile Number *</label>
        <div className="mga-phone-wrap">
          <div className="mga-input-box mga-code-box">
            <Globe size={16} className="mga-input-icon" />
            <input type="text" name="countryCode" list={`${idPrefix}-country-codes`} placeholder="+91" value={form.countryCode} onChange={handleChange} required />
            <datalist id={`${idPrefix}-country-codes`}>
              {COUNTRY_CODES.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div className="mga-input-box mga-phone-input">
            <Phone size={18} className="mga-input-icon" />
            <input type="tel" name="phone" placeholder="Mobile No." value={form.phone} onChange={handleChange} required />
          </div>
        </div>
      </div>

      <div className="mga-field">
        <label>Country *</label>
        <div className="mga-input-box">
          <Globe size={18} className="mga-input-icon" />
          <input type="text" name="country" list={`${idPrefix}-countries`} placeholder="Country" value={form.country} onChange={handleChange} required />
          <datalist id={`${idPrefix}-countries`}>
            {COUNTRIES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>
      </div>

      <div className="mga-field">
        <label>Course Program *</label>
        <div className="mga-input-box">
          <BookOpen size={18} className="mga-input-icon" />
          <input type="text" name="course" list={`${idPrefix}-courses`} placeholder="- Select Course Program -" value={form.course} onChange={handleChange} required />
          <datalist id={`${idPrefix}-courses`}>
            {COURSES.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>
      </div>

      <div className="mga-field">
        <label>Highest Qualification *</label>
        <div className="mga-input-box">
          <GraduationCap size={18} className="mga-input-icon" />
          <input type="text" name="qualification" list={`${idPrefix}-qualifications`} placeholder="Select Qualification" value={form.qualification} onChange={handleChange} required />
          <datalist id={`${idPrefix}-qualifications`}>
            {QUALIFICATIONS.map((q) => <option key={q} value={q} />)}
          </datalist>
        </div>
      </div>

      <button type="submit" className="mga-auth-submit" disabled={loading}>
        {loading ? <><span className="mga-spinner" />Submitting...</> : <>Submit Form<ArrowRight size={18} /></>}
      </button>
    </form>
  );
}