import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Trash2, Tag, ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";
import PayButton from "../components/PayButton";
import CourseImage from "../components/CourseImage";
import { formatINR } from "../lib/format";

const GST_RATE = 18;
const COUPONS = {
  MGACADEMY: 10, // percent
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BTN_BLUE = "#1f7ac4";
const BTN_BLUE_HOVER = "#1867a8";

const CSS = `
  .mga-cart { padding: 32px 0 64px; overflow-x: hidden; }
  .mga-cart *, .mga-cart *::before, .mga-cart *::after { box-sizing: border-box; }
  .mga-cart h1 { margin: 0 0 24px; color: #16324f; font-size: 32px; font-weight: 800; }
  .mga-cart-grid { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 28px; align-items: start; }
  .mga-cart-grid > * { min-width: 0; }
  .mga-cart-list { display: grid; gap: 14px; min-width: 0; }
  .mga-cart-item {
    display: flex; align-items: center; gap: 16px; padding: 16px;
    background: #fff; border: 1px solid #dce4ea; border-radius: 16px;
  }
  .mga-cart-thumb { width: 96px; height: 72px; border-radius: 10px; object-fit: cover; background: #eef3f8; flex: 0 0 auto; }
  .mga-cart-info { flex: 1 1 auto; min-width: 0; }
  .mga-cart-name { display: block; overflow-wrap: anywhere; color: #16324f; font-size: 17px; font-weight: 700; text-decoration: none; }
  .mga-cart-mode { margin-top: 2px; color: #596b7e; font-size: 13px; font-weight: 600; }
  .mga-cart-price { margin-top: 4px; color: ${BTN_BLUE}; font-size: 16px; font-weight: 700; }
  .mga-cart-remove {
    flex: 0 0 auto; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
    background: transparent; border: 0; border-radius: 10px; color: #6b7a8c; cursor: pointer;
  }
  .mga-cart-remove:hover { background: #fdecea; color: #b42318; }

  .mga-summary { padding: 24px; background: #fff; border: 1px solid #dce4ea; border-radius: 18px; position: sticky; top: 100px; }
  .mga-summary h2 { margin: 0 0 16px; padding-bottom: 16px; border-bottom: 1px solid #e6ecf1; color: #16324f; font-size: 22px; font-weight: 800; }
  .mga-coupon-label { margin: 0 0 8px; color: #596b7e; font-size: 14px; font-weight: 600; }
  .mga-coupon-row { display: flex; gap: 8px; }
  .mga-coupon-input {
    flex: 1 1 auto; min-width: 0; padding: 11px 12px; border: 1px solid #dce4ea; border-radius: 10px;
    font: inherit; font-size: 14px; text-transform: uppercase; color: #16324f;
  }
  .mga-coupon-input:focus { outline: 2px solid ${BTN_BLUE}; outline-offset: 1px; border-color: ${BTN_BLUE}; }
  .mga-coupon-btn {
    padding: 11px 18px; background: ${BTN_BLUE}; color: #fff; border: 0; border-radius: 10px;
    font: inherit; font-size: 14px; font-weight: 700; cursor: pointer;
  }
  .mga-coupon-btn:hover { background: ${BTN_BLUE_HOVER}; }
  .mga-coupon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .mga-coupon-msg { margin: 8px 0 0; font-size: 13px; }
  .mga-coupon-msg.is-error { color: #b42318; }
  .mga-coupon-msg.is-ok { color: #166534; font-weight: 600; display: flex; align-items: center; gap: 6px; }
  .mga-coupon-remove { margin-left: auto; background: none; border: 0; color: #166534; text-decoration: underline; cursor: pointer; font: inherit; font-size: 12px; }

  .mga-rows { margin: 18px 0; padding: 16px 0; border-top: 1px solid #e6ecf1; border-bottom: 1px solid #e6ecf1; display: grid; gap: 12px; }
  .mga-row { display: flex; justify-content: space-between; gap: 12px; color: #596b7e; font-size: 16px; }
  .mga-row.is-discount { color: #166534; }
  .mga-total { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 18px; color: #16324f; font-size: 22px; font-weight: 800; }

  .mga-checkout-btn {
    width: 100%; padding: 14px 20px; background: ${BTN_BLUE}; color: #fff; border: 0; border-radius: 999px;
    font: inherit; font-size: 16px; font-weight: 700; cursor: pointer;
  }
  .mga-checkout-btn:hover { background: ${BTN_BLUE_HOVER}; }

  .mga-pay-fields { display: grid; gap: 10px; margin-bottom: 12px; }
  .mga-pay-input {
    width: 100%; box-sizing: border-box; padding: 12px 16px; border: 1px solid #dce4ea; border-radius: 12px;
    font: inherit; font-size: 15px; color: #16324f;
  }
  .mga-pay-input:focus { outline: 2px solid ${BTN_BLUE}; outline-offset: 1px; border-color: ${BTN_BLUE}; }
  .mga-pay-success { margin: 0; padding: 14px 16px; border-radius: 12px; background: #dff7e8; color: #166534; font-weight: 700; text-align: center; }

  .mga-cart-empty { padding: 56px 20px; text-align: center; background: #f7f9fb; border: 1px dashed #c9d6e2; border-radius: 18px; color: #596b7e; }
  .mga-cart-empty svg { color: #9fb0c1; margin-bottom: 12px; }
  .mga-cart-empty a {
    display: inline-block; margin-top: 16px; padding: 12px 24px; background: ${BTN_BLUE}; color: #fff;
    border-radius: 999px; font-weight: 700; text-decoration: none;
  }

  /* Tablet */
  @media (max-width: 1024px) {
    .mga-cart-grid { grid-template-columns: minmax(0, 1fr) 340px; gap: 20px; }
  }

  /* Tablet portrait / large phones: single column */
  @media (max-width: 900px) {
    .mga-cart { padding: 24px 0 120px; } /* niche sticky bar ke liye jagah */
    .mga-cart-grid { grid-template-columns: minmax(0, 1fr); }
    .mga-summary { position: static; }
    .mga-cart h1 { font-size: 26px; margin-bottom: 18px; }
  }

  /* Phones */
  @media (max-width: 480px) {
    .mga-cart-item { gap: 12px; padding: 12px; }
    .mga-cart-thumb { width: 72px; height: 56px; }
    .mga-cart-name { font-size: 15px; }
    .mga-cart-price { font-size: 15px; }
    .mga-cart-remove { width: 34px; height: 34px; }

    .mga-summary { padding: 18px 14px; border-radius: 16px; }
    .mga-summary h2 { font-size: 19px; margin-bottom: 14px; padding-bottom: 12px; }
    .mga-coupon-btn { padding: 11px 14px; }
    .mga-rows { gap: 10px; padding: 14px 0; }
    .mga-row { font-size: 15px; }
    .mga-total { font-size: 19px; }
    .mga-checkout-btn { padding: 13px 16px; font-size: 15px; }
    .mga-pay-input { padding: 11px 14px; }
  }

  /* Very small phones (<= 360px) */
  @media (max-width: 360px) {
    .mga-cart h1 { font-size: 22px; }
    .mga-cart-thumb { display: none; }
    .mga-coupon-row { flex-direction: column; }
    .mga-coupon-btn { width: 100%; }
    .mga-row { font-size: 14px; }
    .mga-total { font-size: 18px; }
  }
`;

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null); // { code, percent }
  const [couponError, setCouponError] = useState("");

  const [checkout, setCheckout] = useState(false);
  const [payer, setPayer] = useState({ name: "", email: "", phone: "" });
  const [paid, setPaid] = useState(false);

  const updatePayer = (f) => (e) =>
    setPayer((p) => ({ ...p, [f]: e.target.value }));

  /* Totals */
  const price = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);
  const discount = coupon ? Math.round((price * coupon.percent) / 100) : 0;
  const subtotal = price - discount;
  const gst = Math.round((subtotal * GST_RATE) / 100);
  const total = subtotal + gst;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return setCouponError("Please enter a coupon code.");
    const percent = COUPONS[code];
    if (!percent) return setCouponError("Invalid coupon code.");
    setCoupon({ code, percent });
    setCouponError("");
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponInput("");
  };

  const validatePayer = () => {
    if (payer.name.trim().length < 2) return "Please enter your full name.";
    if (!EMAIL_RE.test(payer.email.trim())) return "Please enter a valid email address.";
    if (payer.phone.replace(/\D/g, "").length < 10)
      return "Please enter a valid phone number (at least 10 digits).";
    return "";
  };

  return (
    <section className="mga-cart">
      <style>{CSS}</style>

      <Helmet>
        <title>Cart | Medical Global Academy</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="wrap">
        <h1>Cart</h1>

        {items.length === 0 && !paid ? (
          <div className="mga-cart-empty">
            <ShoppingCart size={40} />
            <p>Your cart is empty.</p>
            <Link to="/courses">Browse programs</Link>
          </div>
        ) : paid ? (
          <p className="mga-pay-success" role="status">
            ✅ Payment successful! Our team will contact you shortly with your
            enrollment details.
          </p>
        ) : (
          <div className="mga-cart-grid">
            {/* ITEMS */}
            <div className="mga-cart-list">
              {items.map((item) => (
                <div className="mga-cart-item" key={item.slug}>
                  <CourseImage
                    src={item.image}
                    alt={item.name}
                    className="mga-cart-thumb"
                  />

                  <div className="mga-cart-info">
                    <Link to={`/${item.slug}`} className="mga-cart-name">
                      {item.name}
                    </Link>
                    {item.mode && (
                      <div className="mga-cart-mode">
                        {item.mode === "hybrid" ? "Hybrid" : "Online"} program
                      </div>
                    )}
                    <div className="mga-cart-price">{formatINR(item.price)}</div>
                  </div>

                  <button
                    type="button"
                    className="mga-cart-remove"
                    onClick={() => removeItem(item.slug)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <aside className="mga-summary">
              <h2>Order Summary</h2>

              <p className="mga-coupon-label">Have a coupon code?</p>
              <div className="mga-coupon-row">
                <input
                  className="mga-coupon-input"
                  placeholder="Enter code..."
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  disabled={Boolean(coupon)}
                  aria-label="Coupon code"
                />
                <button
                  type="button"
                  className="mga-coupon-btn"
                  onClick={applyCoupon}
                  disabled={Boolean(coupon) || !couponInput.trim()}
                >
                  Apply
                </button>
              </div>

              {couponError && <p className="mga-coupon-msg is-error">{couponError}</p>}
              {coupon && (
                <p className="mga-coupon-msg is-ok">
                  <Tag size={14} />
                  {coupon.code} applied ({coupon.percent}% off)
                  <button type="button" className="mga-coupon-remove" onClick={removeCoupon}>
                    Remove
                  </button>
                </p>
              )}

              <div className="mga-rows">
                <div className="mga-row">
                  <span>Price</span>
                  <span>{formatINR(price)}</span>
                </div>
                {discount > 0 && (
                  <div className="mga-row is-discount">
                    <span>Discount ({coupon.percent}%)</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="mga-row">
                  <span>Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="mga-row">
                  <span>GST ({GST_RATE}%)</span>
                  <span>+{formatINR(gst)}</span>
                </div>
              </div>

              <div className="mga-total">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>

              {!checkout ? (
                <button
                  type="button"
                  className="mga-checkout-btn"
                  onClick={() => setCheckout(true)}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <>
                  <div className="mga-pay-fields">
                    <input
                      className="mga-pay-input"
                      placeholder="Full name"
                      autoComplete="name"
                      value={payer.name}
                      onChange={updatePayer("name")}
                      aria-label="Full name"
                    />
                    <input
                      type="email"
                      className="mga-pay-input"
                      placeholder="Email address"
                      autoComplete="email"
                      value={payer.email}
                      onChange={updatePayer("email")}
                      aria-label="Email address"
                    />
                    <input
                      type="tel"
                      className="mga-pay-input"
                      placeholder="Phone number"
                      autoComplete="tel"
                      value={payer.phone}
                      onChange={updatePayer("phone")}
                      aria-label="Phone number"
                    />
                  </div>

                  <PayButton
                    course={items.map((i) => i.name).join(", ")}
                    amount={total}
                    name={payer.name.trim()}
                    email={payer.email.trim()}
                    phone={payer.phone.trim()}
                    label={`Pay ${formatINR(total)}`}
                    buttonStyle={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      backgroundColor: BTN_BLUE,
                      color: "#fff",
                      border: `1px solid ${BTN_BLUE}`,
                      fontWeight: 700,
                      fontSize: "15px",
                      padding: "14px 20px",
                      borderRadius: "999px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                    hoverBg={BTN_BLUE_HOVER}
                    validate={validatePayer}
                    onSuccess={() => {
                      setPaid(true);
                      clearCart();
                    }}
                  />
                </>
              )}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}