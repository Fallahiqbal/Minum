# 💧 MINUM BRO

PWA sederhana untuk mengingatkan minum air setiap 1 jam sekali. Bisa diinstall langsung di Android tanpa Play Store.

## Fitur

- Toggle ON/OFF pengingat
- Notifikasi lokal setiap 1 jam
- Countdown ke notifikasi berikutnya
- Counter pengingat hari ini
- Bisa diinstall ke home screen Android (PWA)

## Cara Install di Android

> Pastikan menggunakan **Chrome** — browser lain belum tentu mendukung PWA + notifikasi.

**Install ke Home Screen:**
1. Buka URL app di Chrome Android
2. Ketuk **⋮** (pojok kanan atas) → **Tambahkan ke layar utama**
3. Ketuk **Tambahkan** pada dialog konfirmasi
4. Ikon 💧 akan muncul di home screen seperti app biasa

**Aktifkan Pengingat:**
1. Buka app dari ikon di home screen
2. Ketuk tombol bulat di tengah layar
3. Saat muncul dialog izin notifikasi → ketuk **Izinkan**
4. Tombol berubah jadi biru + animasi → pengingat aktif
5. Notifikasi pertama akan muncul **1 jam** setelah diaktifkan
6. Countdown timer di bawah tombol menunjukkan sisa waktu

**Menonaktifkan Pengingat:**
1. Buka app
2. Ketuk tombol yang sedang aktif (biru)
3. Tombol kembali ke warna gelap → pengingat berhenti

## Troubleshooting

| Masalah | Solusi |
|---|---|
| Notifikasi tidak muncul | Pastikan izin notifikasi sudah **Diizinkan** di Settings HP → Notifikasi → Chrome |
| Perubahan teks tidak muncul setelah update | Naikkan versi cache di `sw.js` baris 2: `v1` → `v2`, lalu commit |
| App tiba-tiba berhenti mengirim notifikasi | Kemungkinan app ter-swipe dari recent apps — buka lagi dan aktifkan ulang |
| Tombol tidak bisa diklik | Refresh halaman, pastikan koneksi internet aktif saat pertama buka |

## Tips Penggunaan

- Jangan **swipe-close** app dari recent apps — cukup tekan tombol **Home**
- Aktifkan **"Jangan ganggu"** di HP kecuali untuk app ini agar notifikasi selalu muncul
- Counter **"Pengingat hari ini"** otomatis reset setiap tengah malam

## Struktur File

```
water-reminder/
├── index.html      # Halaman utama + logika
├── sw.js           # Service Worker (notifikasi & cache)
└── manifest.json   # Metadata PWA
```

## Catatan

- Jangan swipe-close app dari recent apps agar notifikasi tetap berjalan
- Jika update konten tidak muncul, naikkan versi cache di `sw.js` (`v1` → `v2`)

## Tech Stack

- Vanilla HTML / CSS / JS
- Web Notifications API
- Service Worker API
- Progressive Web App (PWA)
