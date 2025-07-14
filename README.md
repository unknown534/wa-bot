# 🤖 WhatsApp Bot - Baileys Simple Bot

Bot WhatsApp sederhana berbasis Node.js menggunakan [`@whiskeysockets/baileys`](https://github.com/WhiskeySockets/Baileys). Bot ini mampu merespons pesan otomatis dan mengubah gambar menjadi stiker dengan caption `!sticker`.

---

## ✨ Fitur

- Auto-reply untuk beberapa perintah (bisa di edit di index.js):
  - `!info` — info bot & VPS
  - `!sticker` — gambar jadi stiker
- Dukungan stiker dengan `wa-sticker-formatter`
- Jalan 24/7 di VPS dengan `pm2`

---

## ⚙️ Cara Kerja

Bot bekerja dengan koneksi sebagai perangkat tertaut (seperti WhatsApp Web) dan memantau pesan yang masuk. Jika ada pesan cocok dengan perintah, maka bot akan merespons dengan teks atau stiker.

Session disimpan di folder `./session`, jadi selama file-nya tidak dihapus, kamu tidak perlu scan QR ulang.

---

## 🧰 Alat & Dependensi

### Diperlukan:
- Node.js v18 atau lebih baru
- npm (sudah termasuk dengan Node.js)
- Git
- PM2 (opsional, untuk jalan terus di VPS)
- WhatsApp aktif (untuk scan QR)

### Dependensi NPM:
```
npm install @whiskeysockets/baileys@^6.7.4 
qrcode-terminal 
wa-sticker-formatter
```
Jika kamu ingin install sekaligus:
```bash
npm install
```
dan pastikan file package.json sudah memuat dependensi berikut:
```
"dependencies": {
  "@whiskeysockets/baileys": "^6.7.4",
  "qrcode-terminal": "^0.12.0",
  "wa-sticker-formatter": "^4.4.4"
}

```
---

# 🚀 Cara Menjalankan

1. Clone Repository
```
git clone https://github.com/unknown534/wa-bot.git
cd wa-bot
```
2. Install Semua Dependensi
```   
npm install
```
4. Jalankan Bot
```
node index.js
```
QR akan muncul, scan dari WhatsApp kamu:
WhatsApp → Menu (⋮) → Perangkat Tertaut → Tautkan Perangkat.

4. (Opsional) Jalankan Permanen dengan PM2
```
npm install -g pm2
pm2 start index.js --name wa-bot
pm2 save
pm2 startup

```
---
---

🧑‍💻 Author

Made by @unknown534
License: MIT
