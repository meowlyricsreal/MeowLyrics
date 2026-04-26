/**
 * 🐾 MEOWLYRICS - SERVER CORE (FIXED)
 * Diuruskan oleh: Admin MeowLyrics
 * Platform: Node.js + Express
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. KONFIGURASI SERVER
// ==========================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// PENTING: Susunan fail statik
app.use(express.static(path.join(__dirname))); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. SISTEM ROUTING (NAVIGASI)
// ==========================================

// --- [ Halaman Utama ] ---
app.get('/', (req, res) => {
    res.render('index');
});

// --- [ Halaman Lirik (Jika Guna) ] ---
app.get('/lirik/:id', (req, res) => {
    res.render('lirik', { id: req.params.id });
});

// --- [ Halaman Akaun & Login (FIX 404) ] ---
// Kita buat dua-dua alamat /login dan /account pergi ke fail yang sama
app.get(['/login', '/account'], (req, res) => {
    console.log("🐾 Menghantar ke halaman Login...");
    res.sendFile(path.join(__dirname, 'login.html'));
});

// --- [ Halaman Admin Panel ] ---
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// ==========================================
// 3. PENGURUSAN RALAT (ERROR 404)
// ==========================================
app.use((req, res) => {
    res.status(404).send(`
        <center style="margin-top:50px; font-family:sans-serif;">
            <h1 style="font-size:50px;">🐾</h1>
            <h1>404 - Alamat Tak Jumpa!</h1>
            <p>Meow! Nampaknya alamat yang awak taip tu salah.</p>
            <a href="/" style="background:#FFD32D; color:#000; padding:10px 20px; border-radius:10px; text-decoration:none; font-weight:bold;">Balik ke Home</a>
        </center>
    `);
});

// ==========================================
// 4. PELANCARAN SERVER
// ==========================================
app.listen(PORT, () => {
    console.log('==========================================');
    console.log(`🚀 MEOWLYRICS SERVER AKTIF!`);
    console.log(`📍 PORT: ${PORT}`);
    console.log('==========================================');
});
