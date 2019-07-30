const CACHE_NAME = 'weather-app-v1';

const urlsToCache = [
  '/',
  'bundle.js',
  'compass.svg',
  'plus.svg',
  'https://fonts.googleapis.com/css?family=K2D:300,400,500,700',
];

self.addEventListener('install', function(event) {
  console.log('installing');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache).then(function() {
        console.log('All resources have been fetched and cached.');
      });
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
