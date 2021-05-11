const CACHE_NAME = "cache-1"
const urlsToCache = [
  '/public/offline.html',
  '/public/manifest.json',
  '/public/favicon.ico',
  '/public/assets/logo/logo.png',
  '/public/assets/logo//logo152.png',
  '/public/assets/logo/logo167.png',
  '/public/assets/logo/logo180.png',
  '/public/assets/logo/logo192.png',
  '/public/assets/logo/logo256.png',
  '/public/assets/logo/logo384.png',
  '/public/assets/logo/logo512.png',
  '/public/assets/logo/logo64.png',
  '/public/assets/weather/01d.png',
  '/public/assets/weather/01n.png',
  '/public/assets/weather/02d.png',
  '/public/assets/weather/02n.png',
  '/public/assets/weather/03d.png',
  '/public/assets/weather/03n.png',
  '/public/assets/weather/04.png',
  '/public/assets/weather/09.png',
  '/public/assets/weather/10d.png',
  '/public/assets/weather/10n.png',
  '/public/assets/weather/11.png',
  '/public/assets/weather/13.png',
  '/public/assets/weather/50.png',
];


const self = this;

// Install Service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');

        return cache.addAll(urlsToCache);
      })
  )
});

// Listen for Requests
const DYNAMIC_CACHE_NAME = 'dynamic-cahe-1'
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(() => {
        return fetch(event.request)
          .catch(() => caches.match('offline.html'))
      })
  )
});

// Activate the Service Worker
self.addEventListener('activate', (event) => {
  console.log('activate')
  const cacheWhitelist = [CACHE_NAME, DYNAMIC_CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))

  )
  return self.clients.claim();
});