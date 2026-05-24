const CACHE_NAME = 'ciob-titanic-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/images/logo.png',
  '/images/logo-ciob.jpg',
  '/images/slider/autocuiseur-titanic-usine-ciob-fes-maroc.jpg',
  '/images/slider/couscote-titanic-usine-ciob-fes-maroc.jpg',
  '/images/usine-ciob-fes-machine.jpg',
  '/images/a-propos-ciob-maroc-fes.jpg',
  '/images/couscous-7-legumes-ciob-maroc.jpg',
  '/images/veritas.jpg',
  '/images/cgem.jpg'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching App Shell and key images...');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Error during caching on install:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event (Network First, fall back to Cache)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If the request succeeds, clone and save it to the cache
        if (networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // If network fails, serve from cache
        return caches.match(event.request).then((fallbackResponse) => {
          if (fallbackResponse) {
            return fallbackResponse;
          }
          // If it's a page navigation request, return index.html
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
