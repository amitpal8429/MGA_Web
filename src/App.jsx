import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components (always needed, so loaded normally)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import StickyContactBar from "./components/StickyContactBar";

// Home loads normally so the landing page appears instantly
import Home from "./pages/Home";

// Other pages load only when visited
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

import "./site.css";

export default function App() {
  const location = useLocation();

  // Load Gabs chatbot
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.getgabs.com/ai_answerbot/chatbot_widget.js";
    script.setAttribute("data-agent-id", "e1acaff4-acee-4521-8bc7-372e52105ece");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // Bottom padding for sticky bar
  useEffect(() => {
    document.body.classList.add("has-sticky-bar");
    return () => document.body.classList.remove("has-sticky-bar");
  }, []);

  return (
    <div className="site">
      <ScrollToTop />
      <Navbar />

      <main className="page-enter" key={location.pathname}>
        <Suspense fallback={<div style={{ minHeight: "60vh" }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/:slug" element={<CourseDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
}