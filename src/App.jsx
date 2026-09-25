import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import StickyContactBar from "./components/StickyContactBar";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Faculty from "./pages/Faculty";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AppPage from "./pages/AppPage";
import TermsPage from "./pages/TermsPage";
import RefundPage from "./pages/RefundPage";
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/:slug" element={<CourseDetail />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <StickyContactBar />
    </div>
  );
}