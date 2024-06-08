// serviceWorker.js

const CACHE_NAME = "dinosaur-app-v1";
const urlsToCache = [
  "/",
  "../public/index.html",
  "../public/manifest.json",
  "../public/android-chrome-192x192.png",
  "../public/android-chrome-384x384.png",
  // Añade aquí otros recursos que desees que estén disponibles offline
];

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
