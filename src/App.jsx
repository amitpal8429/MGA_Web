import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import StickyContactBar from "./components/StickyContactBar";
import RemoveTrailingSlash from "./components/RemoveTrailingSlash";
import SiteBreadcrumb from "./components/SiteBreadcrumb";

import { CartProvider } from "./context/CartContext";
import { getRedirectSlug } from "./lib/redirects";

import Home from "./pages/Home";

const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const Faculty = lazy(() => import("./pages/Faculty"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const Accreditation = lazy(() => import("./pages/Accreditation"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AppPage = lazy(() => import("./pages/AppPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const RefundPage = lazy(() => import("./pages/RefundPage"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const HRFormPage = lazy(() => import("./pages/HRFormPage"));
const Support = lazy(() => import("./pages/Support"));
const Cart = lazy(() => import("./pages/Cart"));
const Hospitals = lazy(() => import("./pages/Hospitals"));
const Ad = lazy(() => import("./pages/ad"));

import "./site.css";

const CHATBOT_SRC = "https://app.getgabs.com/ai_answerbot/chatbot_widget.js";
const CHATBOT_AGENT_ID = "e1acaff4-acee-4521-8bc7-372e52105ece";

/* Standalone pages: header, footer, chatbot nahi. Website par inka koi link nahi. */
const STANDALONE_PATHS = ["/hr-form", "/ad"];

export default function App() {
  const location = useLocation();

  const isStandalone = STANDALONE_PATHS.includes(location.pathname);

  /* Courses ke sab pages ek hi key use karein, taaki type tab click par remount na ho */
  const isCoursesPath =
    location.pathname === "/courses" ||
    location.pathname.startsWith("/courses/");
  const routeKey = isCoursesPath ? "/courses" : location.pathname;

  /* Chatbot: page load ke baad, browser idle hone par load karein */
  useEffect(() => {
    if (isStandalone) return undefined;

    let script = null;
    let idleId = null;
    let timerId = null;

    const loadBot = () => {
      script = document.createElement("script");
      script.src = CHATBOT_SRC;
      script.setAttribute("data-agent-id", CHATBOT_AGENT_ID);
      script.async = true;
      document.body.appendChild(script);
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadBot, { timeout: 4000 });
      } else {
        timerId = window.setTimeout(loadBot, 3000);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timerId !== null) window.clearTimeout(timerId);
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, [isStandalone]);

  useEffect(() => {
    if (!isStandalone) {
      document.body.classList.add("has-sticky-bar");
    } else {
      document.body.classList.remove("has-sticky-bar");
    }

    return () => {
      document.body.classList.remove("has-sticky-bar");
    };
  }, [isStandalone]);

  /* Sheet wale redirects: sab paths ke liye (hooks ke baad) */
  const redirectTo = getRedirectSlug(location.pathname);
  if (redirectTo !== null) {
    return <Navigate to={`/${redirectTo}`} replace />;
  }

  return (
    <CartProvider>
      <div className={isStandalone ? "hr-site" : "site"}>
        {/* Trailing slash hatao: /abc/ -> /abc (poori site ke liye) */}
        <RemoveTrailingSlash />

        <ScrollToTop />

        {!isStandalone && <Navbar />}

        <main
          className={isStandalone ? "" : "page-enter"}
          key={routeKey}
        >
          {!isStandalone && <SiteBreadcrumb />}

          <Suspense
            fallback={
              <div
                style={{
                  minHeight: "60vh",
                }}
              />
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/courses" element={<Courses />} />

              {/* Type wise listing: /courses/certificate, /courses/pg-diploma */}
              <Route path="/courses/:type" element={<Courses />} />

              <Route path="/about" element={<About />} />

              <Route path="/faculty" element={<Faculty />} />

              <Route path="/accreditation" element={<Accreditation />} />

              <Route path="/hospitals" element={<Hospitals />} />

              <Route path="/blog" element={<Blog />} />

              <Route path="/blog/:slug" element={<BlogDetail />} />

              <Route path="/login" element={<Login />} />

              <Route path="/signup" element={<Signup />} />

              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              <Route path="/app" element={<AppPage />} />

              <Route path="/terms" element={<TermsPage />} />

              <Route path="/refund" element={<RefundPage />} />

              <Route path="/sitemap" element={<Sitemap />} />

              <Route path="/support" element={<Support />} />

              <Route path="/cart" element={<Cart />} />

              <Route path="/hr-form" element={<HRFormPage />} />

              {/* Ad landing page: sirf direct URL se khulta hai, koi link nahi */}
              <Route path="/ad" element={<Ad />} />

              <Route path="/:slug" element={<CourseDetail />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {!isStandalone && <Footer />}

        {!isStandalone && <StickyContactBar />}
      </div>
    </CartProvider>
  );
}