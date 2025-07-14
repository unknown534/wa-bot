# 🤖 WhatsApp Bot - Baileys Simple Bot

Bot WhatsApp sederhana berbasis Node.js yang menggunakan library [`@whiskeysockets/baileys`](https://github.com/WhiskeySockets/Baileys) untuk merespon pesan secara otomatis dan dapat membuat stiker dari gambar yang dikirim dengan caption `!sticker`.

---

## ✨ Fitur

- Auto-reply untuk beberapa perintah:
  - `!info` — menampilkan info bot dan VPS
  - `!sticker` — ubah gambar menjadi stiker
  - `p`, `assalamu alaikum`, dll — pesan sapaan
- Bisa di-host di VPS dan berjalan 24/7 dengan `pm2`
- QR code ditampilkan langsung di terminal saat pertama kali dijalankan
- Dukungan mention `@username` dalam balasan
- Format teks multi-line (`\n`)

---

## ⚙️ Cara Kerja

Bot menggunakan Web WhatsApp API (melalui Baileys) untuk login sebagai **perangkat tertaut**. Saat pengguna mengirim pesan, bot akan:
1. Menerima event `messages.upsert`
2. Mengecek apakah pesan cocok dengan perintah tertentu
3. Menjalankan aksi sesuai perintah (balas teks / konversi gambar ke stiker)
4. Mengirimkan balasan ke pengirim

Bot menyimpan sesi login di folder `./session`, jadi tidak perlu scan QR berulang kali selama file session tidak dihapus.

---

## 🧰 Alat dan Dependensi

Untuk menjalankan bot ini, kamu membutuhkan:

- ✅ Node.js versi **v18+** (direkomendasikan v20.x)
- ✅ npm (biasanya sudah terpasang dengan Node.js)
- ✅ Git (untuk clone & push repo)
- ✅ [pm2](https://pm2.keymetrics.io/) (opsional, agar bot tetap hidup 24/7)
- ✅ Akun WhatsApp aktif (untuk scan QR dari bot)
- VPS / server lokal / Termux

---

## 📦 Cara Instalasi & Menjalankan

### 1. Clone repository
```bash
git clone https://github.com/unknown534/wa-bot.git
cd wa-bot

2. Install dependencies

npm install

3. Jalankan bot

node index.js

Scan QR yang muncul di terminal menggunakan WhatsApp dari HP kamu (Menu > Perangkat tertaut).

4. (Opsional) Jalankan 24/7 dengan PM2

npm install -g pm2
pm2 start index.js --name wa-bot
pm2 save
pm2 startup


---

🛡️ Keamanan

File session/ jangan pernah di-push ke GitHub (sudah diatur di .gitignore)

Bot tidak membaca isi chat secara massal, hanya merespon pesan yang dikirim ke bot

Semua media disimpan sementara di memori, tidak disimpan di disk



---

🧑‍💻 Author

Made with ❤️ by @unknown534
License: MIT


---

❗ Catatan

Jangan gunakan bot untuk spam atau aktivitas yang melanggar ketentuan WhatsApp

WhatsApp bisa update sistem sewaktu-waktu — jika bot tidak berfungsi, cek versi Baileys terbaru
