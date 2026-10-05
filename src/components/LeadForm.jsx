import { useEffect, useState } from "react";
import {
  ArrowRight, Mail, User, Phone, GraduationCap, BookOpen, Globe, CheckCircle,
} from "lucide-react";
import { BASE_URL } from "../lib/api";

const COUNTRY_CODES = ["+91","+1","+44","+971","+966","+974","+965","+973","+968","+65","+60","+61","+64","+27","+234","+254","+880","+92","+94","+977"];
const COUNTRIES = ["India","United States","United Kingdom","UAE","Saudi Arabia","Qatar","Kuwait","Bahrain","Oman","Singapore","Malaysia","Australia","New Zealand","South Africa","Nigeria","Kenya","Bangladesh","Pakistan","Sri Lanka","Nepal","Other"];
const COURSES = ["Fellowship in Orthopedic","Fellowship in Internal Medicine","Fellowship in Critical Care","Fellowship in Cardiology","Fellowship in Dermatology","Fellowship in Radiology","Fellowship in Obstetrics & Gynaecology","Certificate in Diabetes Mellitus","Certificate in Emergency Medicine","Certificate in Adolescent Health","Certificate in Acute Medicine","Certificate in Clinical Research","Other"];
const QUALIFICATIONS = ["MBBS","MBBS + MD","MBBS + MS","MBBS + DNB","MBBS + Diploma","BDS","BAMS","BHMS","Physiotherapy (BPT/MPT)","Nursing","Other"];

const UTM_STORAGE_KEY = "mga_utm";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/* ══════════════════════════════════════════
   TRAFFIC SOURCE DETECTION
   Determines: Platform (FB/Insta/Google/Direct)
               Type (Paid/Organic/Social/Direct)
               Is Paid (Paid/Unpaid)
══════════════════════════════════════════ */
function detectTrafficSource(utm, referrer) {
  const src = (utm.utm_source || "").toLowerCase();
  const med = (utm.utm_medium || "").toLowerCase();
  const ref = (referrer || "").toLowerCase();
  const currentHost = window.location.hostname.toLowerCase();

  // Paid medium indicators
  const paidMediums = ["cpc", "ppc", "paid", "paidsearch", "paidsocial", "display", "banner", "cpm", "ad"];
  const isPaid =
    paidMediums.some((m) => med.includes(m)) ||
    ["google_ads", "facebook_ads", "instagram_ads", "linkedin_ads"].includes(src);

  // Identify platform
  let platform = "Direct";
  if (src.includes("facebook") || src === "fb" || ref.includes("facebook.com")) platform = "Facebook";
  else if (src.includes("instagram") || src === "ig" || ref.includes("instagram.com")) platform = "Instagram";
  else if (src.includes("google") || ref.includes("google.")) platform = "Google";
  else if (src.includes("linkedin") || ref.includes("linkedin.com")) platform = "LinkedIn";
  else if (src.includes("youtube") || ref.includes("youtube.com")) platform = "YouTube";
  else if (src.includes("twitter") || src === "x" || ref.includes("twitter.com") || ref.includes("t.co")) platform = "Twitter/X";
  else if (src.includes("whatsapp") || ref.includes("whatsapp.com")) platform = "WhatsApp";
  else if (src.includes("bing") || ref.includes("bing.com")) platform = "Bing";
  else if (src.includes("email") || med.includes("email")) platform = "Email";
  else if (src) platform = src;

  // Overall traffic type
  let trafficType = "Direct";
  if (isPaid) trafficType = "Paid";
  else if (med === "organic" || platform === "Google" || platform === "Bing") trafficType = "Organic";
  else if (["Facebook", "Instagram", "LinkedIn", "YouTube", "Twitter/X", "WhatsApp"].includes(platform)) trafficType = "Social";
  else if (med === "email" || platform === "Email") trafficType = "Email";
  else if (med === "referral" || (ref && !ref.includes(currentHost))) trafficType = "Referral";

  return {
    platform,
    trafficType,
    isPaid: isPaid ? "Paid" : "Unpaid",
  };
}

/* ══════════════════════════════════════════
   CAPTURE UTM + REFERRER + LANDING PAGE
   Reads from URL, persists to localStorage,
   returns merged data (fresh > saved).
══════════════════════════════════════════ */
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

    fresh.landing_page = window.location.href;
    fresh.referrer = document.referrer || "";

    const detected = detectTrafficSource(fresh, document.referrer);
    fresh.platform = detected.platform;
    fresh.traffic_type = detected.trafficType;
    fresh.is_paid = detected.isPaid;

    // If URL had fresh UTM params, save & return
    if (foundAny) {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }

    // Otherwise use saved data, but keep current referrer/landing
    const saved = localStorage.getItem(UTM_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        landing_page: fresh.landing_page,
        referrer: parsed.referrer || fresh.referrer,
      };
    }

    // First-time visitor with no UTM & no saved data
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  } catch {
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

  // Capture UTM on page load
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
        name: form.name,
        email: form.email,
        phone: `${form.countryCode}${form.phone}`,
        country: form.country,
        course: form.course,
        qualification: form.qualification,

        // UTM
        utm_source:   utm.utm_source   || "",
        utm_medium:   utm.utm_medium   || "",
        utm_campaign: utm.utm_campaign || "",
        utm_content:  utm.utm_content  || "",
        utm_term:     utm.utm_term     || "",

        // Traffic source
        platform:     utm.platform     || "Direct",
        traffic_type: utm.traffic_type || "Direct",
        is_paid:      utm.is_paid      || "Unpaid",

        // Context
        referrer:     utm.referrer     || document.referrer || "",
        landing_page: utm.landing_page || window.location.href,
      };

      console.log("📤 Sending lead:", payload);

      const response = await fetch(`${BASE_URL}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Submission failed");

      setSuccess(data?.message || "Thank you! Our admissions team will contact you shortly.");
      localStorage.setItem("mga_lead_submitted", "1");
      localStorage.removeItem(UTM_STORAGE_KEY);

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