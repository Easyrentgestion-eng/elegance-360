var CACHE = 'elegance360-v1';
var URLS = [
  '/elegance-360/index.html',
  '/elegance-360/icon.svg',
  '/elegance-360/manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) { return cache.addAll(URLS); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}));
    })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.url.indexOf('chrome-extension') === 0) return;
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(res) {
        return caches.open(CACHE).then(function(cache) {
          if (e.request.url.indexOf('http') === 0) cache.put(e.request, res.clone());
          return res;
        });
      }).catch(function() { return new Response('Hors-ligne', {status:503}); });
    })
  );
});
