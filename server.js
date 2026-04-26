/**
 * 🐾 MEOWLYRICS - SERVER CORE
 * Platform: Node.js + Express
 * Status: Fixed Login & Account Routes
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. KONFIGURASI SERVER
// ==========================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Benarkan akses fail statik di folder utama dan public
// Ini penting supaya CSS dan Gambar boleh dibaca
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. SISTEM ROUTING (NAVIGASI)
// ==========================================

// --- [ Halaman Utama ] ---
app.get('/', (req, res) => {
    console.log("🐾 Seseorang melawat Home");
    res.render('index');
});

// --- [ Halaman Lirik ] ---
app.get('/lirik/:id', (req, res) => {
    const songId = req.params.id;
    console.log(`🎵 Membuka lirik: ${songId}`);
    res.render('lirik', { id: songId });
});

// --- [ Halaman Akaun & Login (FIXED) ] ---
// Kod ini memastikan /login dan /account dua-dua buka fail yang sama
app.get(['/login', '/account'], (req, res) => {
    console.log("👤 User membuka halaman Login/Akaun");
    res.sendFile(path.join(__dirname, 'login.html'));
});

// --- [ Halaman Admin Panel ] ---
app.get('/admin', (req, res) => {
    console.log("🛠 Admin cuba masuk ke panel");
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// ==========================================
// 3. PENGURUSAN RALAT (ERROR 404)
// ==========================================
// Jika user taip URL yang salah, hantar ke halaman 404 yang cantik
app.use((req, res) => {
    res.status(404).send(`
        <center style="margin-top:100px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <h1 style="font-size: 80px; margin: 0;">🐾</h1>
            <h1 style="color: #2D3436;">404 - Tak Jumpa Meow!</h1>
            <p style="color: #888;">Alamat yang awak taip tu tak wujud dalam sistem kami.</p>
            <br>
            <a href="/" style="background: #FFD32D; color: #000; padding: 12px 25px; border-radius: 15px; text-decoration: none; font-weight: bold; box-shadow: 0 10px 20px rgba(255, 211, 45, 0.3);">Balik ke Home</a>
        </center>
    `);
});

// ==========================================
// 4. PELANCARAN SERVER
// ==========================================
app.listen(PORT, () => {
    console.log('==========================================');
    console.log(`🚀 MEOWLYRICS SERVER AKTIF!`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log('==========================================');
});
