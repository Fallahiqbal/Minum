// Naikkan versi cache agar HP men-download ulang!
const CACHE_NAME = 'water-reminder-v12';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const messages = [
      '💧 Waktunya minum air! Tubuhmu butuh hidrasi sekarang.',
      '🌊 Sudah 1 jam! Segera minum air putih ya.',
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    self.registration.showNotification('Pengingat Minum Air 💧', {
      body: randomMsg,
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><text y='52' font-size='56'>💧</text></svg>",
      badge: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><text y='52' font-size='56'>💧</text></svg>",
      vibrate: [500, 200, 500, 200, 500],
      requireInteraction: true,
      tag: 'water-reminder',
      renotify: true,
      // INI EFEK WOW-NYA: Tambahan tombol interaktif di notifikasi Android
      actions: [
        { action: 'minum_ok', title: '✅ Sudah Minum!' }
      ]
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // Logika jika tombol "Sudah Minum!" ditekan
  if (event.action === 'minum_ok') {
    console.log('User sudah minum dari tombol notifikasi');
    // Karena ini PWA sederhana, kita cukup menutup notifikasinya saja.
    return;
  }

  // Jika notifikasinya di-tap di area biasa, buka aplikasinya
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      if (clients.length > 0) return clients[0].focus();
      return self.clients.openWindow('./');
    })
  );
});
