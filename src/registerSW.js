export function registerSW() {
  if (!("serviceWorker" in navigator)) return;
  if (!import.meta.env.PROD) return; // sirf production build me chalega

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then(reg => {
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          sw?.addEventListener("statechange", () => {
            if (sw.state === "installed" && navigator.serviceWorker.controller) {
              console.log("Naya version ready. Reload par update hoga.");
            }
          });
        });
      })
      .catch(err => console.error("SW registration failed:", err));
  });
}