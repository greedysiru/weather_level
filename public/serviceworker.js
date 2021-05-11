const CACHE_NAME = "version-2"
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install Service worker
self.addEventListener('install', (event) => {
  event.waiteUntill(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');

        return cache.addAll(urlsToCache);
      })
  )
});

// Listen for Requests
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
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waiteUntill(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!chacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);

        }
      })
    ))
  )
});