import { useState } from "react";
import PayButton from "./PayButton";

// Drop-in replacement for the "Enroll & Pay Now" button.
// Click -> modal asks name/email/phone -> Razorpay checkout -> verified on server.
export default function EnrollPayModal({
  course,                       // exact course name, e.g. "Fellowship in Orthopedic"
  fee,                          // registration fee in rupees, e.g. 50000
  label = "Enroll & Pay Now",
  buttonClassName = "",         // reuse your current button's class
  buttonStyle = {},             // inline styles (e.g., from applyBtnBase)
  hoverBg = "#1867a8",         // hover color
  user = null,                  // optional logged-in user to pre-fill
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const valid =
    form.name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(form.email) &&
    form.phone.replace(/\D/g, "").length >= 8;

  const close = () => { setOpen(false); setDone(false); };

  const inputStyle = {
    width: "100%", padding: "12px 14px", marginTop: 6, marginBottom: 14,
    border: "1px solid #d5dde6", borderRadius: 10, fontSize: 15, boxSizing: "border-box",
  };

  return (
    <>
      <button 
        type="button" 
        className={buttonClassName} 
        style={buttonStyle}
        onClick={() => setOpen(true)}
        onMouseEnter={(e) => {
          if (buttonStyle?.backgroundColor) {
            e.currentTarget.style.backgroundColor = hoverBg;
          }
        }}
        onMouseLeave={(e) => {
          if (buttonStyle?.backgroundColor) {
            e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
          }
        }}
      >
        {label}
      </button>

      {open && (
        <div
          onClick={close}
          style={{
            position: "fixed", inset: 0, background: "rgba(10,25,45,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 16, padding: 24,
              width: "100%", maxWidth: 420, maxHeight: "90vh", overflowY: "auto",
            }}
          >
            {done ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 44 }}>✅</div>
                <h3 style={{ margin: "8px 0" }}>Payment successful</h3>
                <p style={{ color: "#5b6b7c" }}>
                  Thank you, {form.name}. Our admissions team will contact you shortly.
                </p>
                <button type="button" onClick={close} style={{ marginTop: 12, padding: "10px 24px", borderRadius: 10, border: "none", background: "#1a7fd4", color: "#fff", cursor: "pointer" }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ margin: 0 }}>Complete your enrollment</h3>
                  <button type="button" onClick={close} aria-label="Close" style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>×</button>
                </div>
                <p style={{ color: "#5b6b7c", margin: "6px 0 18px" }}>
                  {course} · Registration fee ₹{Number(fee).toLocaleString("en-IN")}
                </p>

                <label>Full name</label>
                <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="Dr. Rajesh Kumar" />

                <label>Email</label>
                <input style={inputStyle} type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />

                <label>Phone</label>
                <input style={inputStyle} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />

                {valid ? (
                  <PayButton
                    amount={fee}
                    course={course}
                    name={form.name}
                    email={form.email}
                    phone={form.phone}
                    label={`Pay ₹${Number(fee).toLocaleString("en-IN")}`}
                    className={buttonClassName}
                    buttonStyle={buttonStyle}
                    hoverBg={hoverBg}
                    onSuccess={() => setDone(true)}
                  />
                ) : (
                  <button type="button" disabled className={buttonClassName} style={{ ...buttonStyle, opacity: 0.5, cursor: "not-allowed" }}>
                    Fill details to continue
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}