import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { AuthProvider } from "./auth/AuthContext";

import "./index.css";

const container = document.getElementById("root");

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// react-snap jab prerender karta hai, us waqt #root me pehle se HTML hota hai (childNodes).
// Us case me hydrateRoot use hota hai (existing HTML ko "zinda" karta hai),
// normal browser me createRoot use hota hai (fresh render).
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}