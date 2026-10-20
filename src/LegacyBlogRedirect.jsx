import { useParams, Navigate } from "react-router-dom";
import { legacyRedirects } from "./legacyRedirects";

export default function LegacyBlogRedirect() {
  const { slug } = useParams();
  const newSlug = legacyRedirects[slug];

  if (newSlug) {
    return <Navigate to={`/blog/${newSlug}`} replace />;
  }


  return <Navigate to="/404" replace />;
}