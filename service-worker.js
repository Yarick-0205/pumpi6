const CACHE_NAME = 'pumpi-cache-v1';
const urlsToCache = [
  'index.html',
  'style.css',
  'Логотип/Логотип2.png',
  'Музыка/Three_Days_Grace_-_I_Hate_Everything_About_You_47958582.mp3',
  'Музыка/Linkin_Park_-_In_The_End_47828874.mp3',
  'Музыка/Linkin_Park_-_Numb_47828673.mp3',
  'Музыка/smells-like-teen-spirit.mp3',
  // добавьте остальные ресурсы по мере необходимости
];

// Установка
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Активация
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

// Обработка fetch-запросов
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});