// Medical Global Academy - React (Vite) + WordPress API ke liye Service Worker
const VERSION = "v1";
const SHELL = "mga-shell-" + VERSION;
const ASSETS = "mga-assets-" + VERSION;

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(SHELL).then(c =>
      c.addAll(["/", "/offline.html", "/icons/icon-192.png", "/icons/icon-512.png"])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => ![SHELL, ASSETS].includes(k)).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);

  // Sirf GET, same-origin. WordPress API / admin / payment ko kabhi cache mat karo
  if (req.method !== "GET") return;
  if (url.origin !== location.origin) return;
  if (/^\/(wp-admin|wp-login|wp-json|api|payment|checkout)/.test(url.pathname)) return;

  // Pages (prerendered + hydrate): har route ka apna HTML cache hota hai.
  // Network-first -> isi route ka cache -> home page -> offline.html
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(SHELL).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(req)
            .then(r => r || caches.match("/"))
            .then(r => r || caches.match("/offline.html"))
        )
    );
    return;
  }

  // Static files (JS/CSS/images/fonts): cache-first
  if (/\.(js|css|png|jpg|jpeg|webp|svg|gif|woff2?|ico)$/i.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then(cached =>
        cached ||
        fetch(req).then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(ASSETS).then(c => c.put(req, copy));
          }
          return res;
        })
      )
    );
  }
});