const staticAssets = [
  "./images/favicon.png",
  "./static/js/main.chunk.js",
  "./static/js/runtime-main.js",
]

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open("staticCacheName")
    .then(cache => {
      return cache.addAll(staticAssets);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request)
  .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});