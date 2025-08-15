// sw.js — cache-first básico para funcionar offline
const CACHE_NAME = "patologia-cache-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json"
];

self.addEventListener("install", (e)=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate", (e)=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME && caches.delete(k)))).then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch", (e)=>{
  const req = e.request;
  const url = new URL(req.url);
  // Não intercepta terceiros (Firebase, Google, etc.)
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then(cached=>{
      return cached || fetch(req).then(res=>{
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(req, copy));
        return res;
      }).catch(()=>cached);
    })
  );
});