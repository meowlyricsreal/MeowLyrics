/**
 * 🐾 MEOWLYRICS - SERVER CORE
 * Diuruskan oleh: Admin MeowLyrics
 * Platform: Node.js + Express + Firebase
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
// Mengambil 'id' (slug) lagu untuk dipaparkan di lirik.ejs
app.get('/lirik/:id', (req, res) => {
    const songId = req.params.id;
    console.log(`🎵 Membuka lirik: ${songId}`);
    res.render('lirik', { id: songId });
});

// --- [ Halaman Akaun & Login ] ---
app.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// --- [ Halaman Admin Panel ] ---
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// ==========================================
// 3. PENGURUSAN RALAT (ERROR 404)
// ==========================================
// Jika user taip URL yang salah, hantar ke 404
app.use((req, res) => {
    res.status(404).send('<center><h1>🐾 404 - Alamat Tak Jumpa Meow!</h1><a href="/">Balik ke Home</a></center>');
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
