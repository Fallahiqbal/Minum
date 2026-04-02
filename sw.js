// sw.js — Service Worker untuk Water Reminder PWA

// FIX: Naikkan versi cache agar browser mau download ulang aset baru
const CACHE_NAME = 'water-reminder-v6';

// FIX: Ganti semua slash `/` menjadi relative `./` agar tidak nyasar ke root github.io
const ASSETS = ['./', './index.html', './manifest.json'];

// ─── Install: cache semua aset ───────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ─── Activate: hapus cache lama ──────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ─── Fetch: sajikan dari cache (offline-first) ────────────────────────────────
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

// ─── Message: terima perintah dari halaman utama ──────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const messages = [
      '💧 Waktunya minum air! Tubuhmu butuh hidrasi sekarang.',
      '🌊 Sudah 1 jam! Segera minum air putih ya.',
      '💦 Jangan lupa minum air! Tetap terhidrasi itu penting.',
      '🫧 Ping! Saatnya minum air agar tetap sehat & fokus.',
      '💧 Reminder: Minum 1 gelas air sekarang!',
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    self.registration.showNotification('Pengingat Minum Air 💧', {
      body: randomMsg,
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><text y='52' font-size='56'>💧</text></svg>",
      badge: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><text y='52' font-size='56'>💧</text></svg>",
      
      // FIX: Pola getaran diperkuat (500ms nyala, 200ms mati)
      vibrate: [500, 200, 500, 200, 500],
      
      // FIX: Tambahkan requireInteraction agar notif tidak hilang sebelum di-swipe/klik
      requireInteraction: true,
      
      silent: false,
      tag: 'water-reminder',
      renotify: true,
      data: { timestamp: Date.now() },
    });
  }
});

// ─── NotificationClick: buka app saat notif diklik ───────────────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      if (clients.length > 0) return clients[0].focus();
      
      // FIX: openWindow pakai path relative
      return self.clients.openWindow('./');
    })
  );
});
