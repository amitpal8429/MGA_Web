import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

import { useAuth } from "../auth/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await signup(form);

      setSuccess(
        "Account created successfully. Please login."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      setError(
        err.message || "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mga-signup-page">

        {/* =====================================
            LEFT SIDE
        ====================================== */}

        <section className="mga-signup-left">

          <div className="mga-signup-brand">

            <div className="mga-signup-logo">
              MGA
            </div>

            <span>
              Medical Global Academy
            </span>

          </div>


          <div className="mga-signup-left-content">

            <div className="mga-signup-icon">
              <GraduationCap size={32} />
            </div>

            <span className="mga-signup-eyebrow">
              JOIN MGA
            </span>

            <h2>
              Start your
              <br />
              medical learning
              <br />
              journey.
            </h2>

            <p>
              Create your MGA account and get access to
              professional medical education, programs,
              faculty resources and your personalised
              learning experience.
            </p>


            <div className="mga-signup-benefits">

              <div>
                <CheckCircle size={19} />
                <span>
                  Personalised learner account
                </span>
              </div>

              <div>
                <CheckCircle size={19} />
                <span>
                  Access medical programs
                </span>
              </div>

              <div>
                <CheckCircle size={19} />
                <span>
                  Manage your academic journey
                </span>
              </div>

            </div>

          </div>


          <div className="mga-signup-copyright">
            © {new Date().getFullYear()} Medical Global Academy
          </div>

        </section>


        {/* =====================================
            RIGHT SIDE
        ====================================== */}

        <section className="mga-signup-right">

          <div className="mga-signup-card">

            {/* MOBILE BRAND */}

            <div className="mga-signup-mobile-brand">

              <div className="mga-signup-logo">
                MGA
              </div>

              <span>
                Medical Global Academy
              </span>

            </div>


            {/* HEADING */}

            <div className="mga-signup-heading">

              <span className="mga-signup-label">
                CREATE ACCOUNT
              </span>

              <h1>
                Join MGA
              </h1>

              <p>
                Create your account to get started.
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="mga-signup-error">

                <span>!</span>

                {error}

              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="mga-signup-success">

                <CheckCircle size={18} />

                {success}

              </div>
            )}


            {/* =================================
                FORM
            ================================== */}

            <form
              className="mga-signup-form"
              onSubmit={handleSubmit}
            >

              {/* ===============================
                  NAME
              ================================ */}

              <div className="mga-signup-group">

                <label htmlFor="name">
                  Full name
                </label>

                <div className="mga-signup-input">

                  <User
                    size={18}
                    className="mga-signup-input-icon"
                  />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />

                </div>

              </div>


              {/* ===============================
                  EMAIL
              ================================ */}

              <div className="mga-signup-group">

                <label htmlFor="email">
                  Email address
                </label>

                <div className="mga-signup-input">

                  <Mail
                    size={18}
                    className="mga-signup-input-icon"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />

                </div>

              </div>


              {/* ===============================
                  PHONE
              ================================ */}

              <div className="mga-signup-group">

                <label htmlFor="phone">
                  Phone number
                </label>

                <div className="mga-signup-input">

                  <Phone
                    size={18}
                    className="mga-signup-input-icon"
                  />

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />

                </div>

              </div>


              {/* ===============================
                  PASSWORD
              ================================ */}

              <div className="mga-signup-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="mga-signup-input">

                  <Lock
                    size={18}
                    className="mga-signup-input-icon"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="mga-signup-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>


              {/* ===============================
                  SUBMIT
              ================================ */}

              <button
                type="submit"
                className="mga-signup-submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="mga-signup-spinner" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={18} />
                  </>
                )}

              </button>

            </form>


            {/* ===============================
                LOGIN
            ================================ */}

            <div className="mga-signup-login">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign in
              </Link>

            </div>


            {/* ===============================
                TERMS
            ================================ */}

            <p className="mga-signup-terms">

              By creating an account, you agree to MGA's{" "}

              <span>
                Terms of Service
              </span>

              {" "}and{" "}

              <span>
                Privacy Policy
              </span>.

            </p>

          </div>

        </section>

      </div>


      {/* =====================================
          CSS
      ====================================== */}

      <style>{`

        /* ================================
           MAIN
        ================================= */

        .mga-signup-page {
          min-height: calc(100vh - 90px);

          display: grid;

          grid-template-columns: 46% 54%;

          background: #f5f8fc;
        }


        /* ================================
           LEFT
        ================================= */

        .mga-signup-left {
          position: relative;

          min-height: 700px;

          padding: 42px 8%;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(54,177,202,0.24),
              transparent 34%
            ),
            linear-gradient(
              145deg,
              #08294d 0%,
              #0c4777 55%,
              #087f8d 100%
            );

          color: #fff;
        }


        .mga-signup-left::before {
          content: "";

          position: absolute;

          width: 500px;
          height: 500px;

          border-radius: 50%;

          border: 1px solid rgba(255,255,255,0.10);

          right: -250px;
          bottom: -220px;
        }


        .mga-signup-left::after {
          content: "";

          position: absolute;

          width: 280px;
          height: 280px;

          border-radius: 50%;

          border: 1px solid rgba(255,255,255,0.08);

          right: 50px;
          bottom: 50px;
        }


        /* ================================
           BRAND
        ================================= */

        .mga-signup-brand {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;

          gap: 12px;

          font-size: 19px;
          font-weight: 700;
        }


        .mga-signup-logo {
          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          background: #fff;

          color: #0a3c70;

          font-size: 14px;
          font-weight: 900;

          box-shadow:
            0 10px 30px rgba(0,0,0,0.15);
        }


        /* ================================
           LEFT CONTENT
        ================================= */

        .mga-signup-left-content {
          position: relative;
          z-index: 2;

          max-width: 530px;

          margin: auto 0;
        }


        .mga-signup-icon {
          width: 64px;
          height: 64px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 23px;

          border-radius: 18px;

          background: rgba(255,255,255,0.12);

          border: 1px solid rgba(255,255,255,0.15);

          color: #fff;
        }


        .mga-signup-eyebrow {
          display: block;

          margin-bottom: 13px;

          font-size: 11px;
          font-weight: 800;

          letter-spacing: 1.7px;

          color: #75ded1;
        }


        .mga-signup-left h2 {
          margin: 0 0 21px;

          font-size: clamp(38px,4vw,57px);

          line-height: 1.06;

          letter-spacing: -2px;

          color: #fff;
        }


        .mga-signup-left-content > p {
          max-width: 510px;

          margin: 0;

          font-size: 15px;

          line-height: 1.75;

          color: rgba(255,255,255,0.77);
        }


        /* ================================
           BENEFITS
        ================================= */

        .mga-signup-benefits {
          display: flex;
          flex-direction: column;

          gap: 15px;

          margin-top: 30px;
        }


        .mga-signup-benefits div {
          display: flex;
          align-items: center;

          gap: 11px;

          font-size: 13px;

          color: rgba(255,255,255,0.88);
        }


        .mga-signup-benefits svg {
          flex-shrink: 0;

          color: #75ded1;
        }


        /* ================================
           COPYRIGHT
        ================================= */

        .mga-signup-copyright {
          position: relative;
          z-index: 2;

          font-size: 11px;

          color: rgba(255,255,255,0.45);
        }


        /* ================================
           RIGHT
        ================================= */

        .mga-signup-right {
          display: flex;

          align-items: center;
          justify-content: center;

          padding: 55px 8%;
        }


        .mga-signup-card {
          width: 100%;

          max-width: 470px;
        }


        /* ================================
           MOBILE BRAND
        ================================= */

        .mga-signup-mobile-brand {
          display: none;
        }


        /* ================================
           HEADING
        ================================= */

        .mga-signup-heading {
          margin-bottom: 25px;
        }


        .mga-signup-label {
          display: inline-block;

          margin-bottom: 10px;

          font-size: 11px;
          font-weight: 800;

          letter-spacing: 1.5px;

          color: #0879c9;
        }


        .mga-signup-heading h1 {
          margin: 0 0 8px;

          font-size: 40px;

          line-height: 1.1;

          letter-spacing: -1.4px;

          color: #102d50;
        }


        .mga-signup-heading p {
          margin: 0;

          color: #708095;

          font-size: 14px;

          line-height: 1.6;
        }


        /* ================================
           ERROR
        ================================= */

        .mga-signup-error {
          display: flex;
          align-items: center;

          gap: 10px;

          margin-bottom: 18px;

          padding: 12px 14px;

          border-radius: 10px;

          border: 1px solid #ffd5d5;

          background: #fff1f1;

          color: #c62828;

          font-size: 13px;
        }


        .mga-signup-error span {
          width: 20px;
          height: 20px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 50%;

          background: #c62828;

          color: #fff;

          font-size: 12px;
          font-weight: 800;
        }


        /* ================================
           SUCCESS
        ================================= */

        .mga-signup-success {
          display: flex;
          align-items: center;

          gap: 9px;

          margin-bottom: 18px;

          padding: 12px 14px;

          border-radius: 10px;

          border: 1px solid #c9eadb;

          background: #effaf5;

          color: #18794e;

          font-size: 13px;
        }


        /* ================================
           FORM
        ================================= */

        .mga-signup-form {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 17px 15px;
        }


        .mga-signup-group {
          display: flex;
          flex-direction: column;

          gap: 7px;
        }


        .mga-signup-group:nth-child(1),
        .mga-signup-group:nth-child(2),
        .mga-signup-group:nth-child(3),
        .mga-signup-group:nth-child(4) {
          grid-column: 1 / -1;
        }


        .mga-signup-group label {
          font-size: 12px;

          font-weight: 700;

          color: #263d56;
        }


        /* ================================
           INPUT
        ================================= */

        .mga-signup-input {
          position: relative;
        }


        .mga-signup-input input {
          width: 100%;

          height: 51px;

          box-sizing: border-box;

          padding: 0 42px;

          border: 1px solid #d8e1eb;

          border-radius: 11px;

          outline: none;

          background: #fff;

          color: #162f4c;

          font-size: 13px;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }


        .mga-signup-input input::placeholder {
          color: #a4afbc;
        }


        .mga-signup-input input:hover {
          border-color: #b8c9d9;
        }


        .mga-signup-input input:focus {
          border-color: #087bc9;

          box-shadow:
            0 0 0 4px rgba(8,123,201,0.09);
        }


        .mga-signup-input-icon {
          position: absolute;

          left: 14px;
          top: 50%;

          transform: translateY(-50%);

          color: #8999aa;

          pointer-events: none;
        }


        /* ================================
           PASSWORD
        ================================= */

        .mga-signup-password-toggle {
          position: absolute;

          right: 12px;
          top: 50%;

          transform: translateY(-50%);

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 4px;

          border: none;

          background: transparent;

          color: #8796a8;

          cursor: pointer;
        }


        .mga-signup-password-toggle:hover {
          color: #087bc9;
        }


        /* ================================
           SUBMIT
        ================================= */

        .mga-signup-submit {
          grid-column: 1 / -1;

          width: 100%;
          height: 54px;

          margin-top: 3px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          border: none;

          border-radius: 11px;

          background:
            linear-gradient(
              135deg,
              #087bc9,
              #075ca4
            );

          color: #fff;

          font-size: 14px;
          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 10px 23px rgba(8,123,201,0.20);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            opacity 0.2s ease;
        }


        .mga-signup-submit:hover:not(:disabled) {
          transform: translateY(-2px);

          box-shadow:
            0 15px 29px rgba(8,123,201,0.27);
        }


        .mga-signup-submit:disabled {
          opacity: 0.7;

          cursor: not-allowed;
        }


        /* ================================
           SPINNER
        ================================= */

        .mga-signup-spinner {
          width: 17px;
          height: 17px;

          border-radius: 50%;

          border: 2px solid rgba(255,255,255,0.35);

          border-top-color: #fff;

          animation:
            mgaSignupSpin 0.7s linear infinite;
        }


        @keyframes mgaSignupSpin {
          to {
            transform: rotate(360deg);
          }
        }


        /* ================================
           LOGIN
        ================================= */

        .mga-signup-login {
          margin-top: 21px;

          text-align: center;

          font-size: 13px;

          color: #7a899a;
        }


        .mga-signup-login a {
          margin-left: 5px;

          color: #087bc9;

          font-weight: 700;

          text-decoration: none;
        }


        .mga-signup-login a:hover {
          text-decoration: underline;
        }


        /* ================================
           TERMS
        ================================= */

        .mga-signup-terms {
          max-width: 400px;

          margin: 17px auto 0;

          text-align: center;

          font-size: 10.5px;

          line-height: 1.7;

          color: #9aa6b3;
        }


        .mga-signup-terms span {
          color: #60758b;
        }


        /* ================================
           TABLET
        ================================= */

        @media (max-width: 1000px) {

          .mga-signup-page {
            grid-template-columns: 1fr;
          }


          .mga-signup-left {
            display: none;
          }


          .mga-signup-right {
            min-height: calc(100vh - 90px);

            padding: 45px 25px;
          }


          .mga-signup-mobile-brand {
            display: flex;

            align-items: center;
            justify-content: center;

            gap: 10px;

            margin-bottom: 38px;

            color: #123456;

            font-size: 17px;
            font-weight: 700;
          }


          .mga-signup-mobile-brand .mga-signup-logo {
            width: 43px;
            height: 43px;

            background: #0b4277;

            color: #fff;

            border-radius: 12px;
          }

        }


        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 600px) {

          .mga-signup-right {
            padding: 30px 18px;
          }


          .mga-signup-heading h1 {
            font-size: 33px;
          }


          .mga-signup-form {
            grid-template-columns: 1fr;

            gap: 16px;
          }


          .mga-signup-submit {
            grid-column: auto;
          }

        }

      `}</style>
    </>
  );
}