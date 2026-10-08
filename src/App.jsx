import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import StickyContactBar from "./components/StickyContactBar";

// Home
import Home from "./pages/Home";

// Lazy pages
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const Faculty = lazy(() => import("./pages/Faculty"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AppPage = lazy(() => import("./pages/AppPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const RefundPage = lazy(() => import("./pages/RefundPage"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const HRFormPage = lazy(() => import("./pages/HRFormPage"));

import "./site.css";


export default function App() {

  const location = useLocation();


  // =====================================================
  // HR FORM PAGE CHECK
  // =====================================================

  const isHRFormPage =
    location.pathname === "/hr-form";


  // =====================================================
  // GETGABS CHATBOT
  // =====================================================

  useEffect(() => {

    // Don't load chatbot on HR page
    if (isHRFormPage) {
      return;
    }


    const script =
      document.createElement("script");


    script.src =
      "https://app.getgabs.com/ai_answerbot/chatbot_widget.js";


    script.setAttribute(
      "data-agent-id",
      "e1acaff4-acee-4521-8bc7-372e52105ece"
    );


    script.async = true;


    document.body.appendChild(script);


    return () => {

      if (script.parentNode) {

        script.parentNode.removeChild(
          script
        );

      }

    };

  }, [isHRFormPage]);


  // =====================================================
  // STICKY BAR
  // =====================================================

  useEffect(() => {

    if (!isHRFormPage) {

      document.body.classList.add(
        "has-sticky-bar"
      );

    } else {

      document.body.classList.remove(
        "has-sticky-bar"
      );

    }


    return () => {

      document.body.classList.remove(
        "has-sticky-bar"
      );

    };

  }, [isHRFormPage]);


  // =====================================================
  // APP
  // =====================================================

  return (

    <div
      className={
        isHRFormPage
          ? "hr-site"
          : "site"
      }
    >

      <ScrollToTop />


      {/* =================================================
          NAVBAR
      ================================================= */}

      {!isHRFormPage && (
        <Navbar />
      )}


      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className={
          isHRFormPage
            ? ""
            : "page-enter"
        }
        key={location.pathname}
      >

        <Suspense
          fallback={
            <div
              style={{
                minHeight: "60vh"
              }}
            />
          }
        >

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/courses"
              element={<Courses />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/faculty"
              element={<Faculty />}
            />

            <Route
              path="/blog"
              element={<Blog />}
            />

            <Route
              path="/blog/:slug"
              element={<BlogDetail />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/signup"
              element={<Signup />}
            />

            <Route
              path="/privacy-policy"
              element={<PrivacyPolicy />}
            />

            <Route
              path="/app"
              element={<AppPage />}
            />

            <Route
              path="/terms"
              element={<TermsPage />}
            />

            <Route
              path="/refund"
              element={<RefundPage />}
            />

            <Route
              path="/sitemap"
              element={<Sitemap />}
            />


            {/* =========================================
                HR FORM
            ========================================= */}

            <Route
              path="/hr-form"
              element={<HRFormPage />}
            />


            {/* =========================================
                COURSE DETAIL
            ========================================= */}

            <Route
              path="/:slug"
              element={<CourseDetail />}
            />


            {/* =========================================
                NOT FOUND
            ========================================= */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        </Suspense>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      {!isHRFormPage && (
        <Footer />
      )}


      {/* =================================================
          STICKY CONTACT
      ================================================= */}

      {!isHRFormPage && (
        <StickyContactBar />
      )}

    </div>

  );

}