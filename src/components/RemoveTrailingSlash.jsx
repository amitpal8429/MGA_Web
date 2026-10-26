import { Navigate, useLocation } from "react-router-dom";

/* /abc/ -> /abc  (replace: history me extra entry nahi banegi) */
export default function RemoveTrailingSlash() {
  const { pathname, search, hash } = useLocation();

  if (pathname.length > 1 && pathname.endsWith("/")) {
    return (
      <Navigate
        to={pathname.replace(/\/+$/, "") + search + hash}
        replace
      />
    );
  }

  return null;
}