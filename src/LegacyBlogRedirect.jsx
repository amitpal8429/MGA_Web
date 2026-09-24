import { useParams, Navigate } from "react-router-dom";
import { legacyRedirects } from "./legacyRedirects";

export default function LegacyBlogRedirect() {
  const { slug } = useParams();
  const newSlug = legacyRedirects[slug];

  // Agar mapping mil gayi, to /blog/new-slug pe redirect karo
  if (newSlug) {
    return <Navigate to={`/blog/${newSlug}`} replace />;
  }

  // Warna 404 pe bhejo
  return <Navigate to="/404" replace />;
}