const CACHE_NAME = 'podcast-tracker-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

// Installation du service worker et mise en cache des fichiers de base
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Intercepter les requêtes pour pouvoir charger l'app même sans connexion
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});