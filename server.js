const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Set enjin paparan
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Fungsi untuk ambil data lagu
function getLaguData() {
    const data = fs.readFileSync('./lirik.json', 'utf-8');
    return JSON.parse(data);
}

// --- 1. HALAMAN UTAMA & CARIAN ---
app.get('/', (req, res) => {
    try {
        let lagu = getLaguData();
        const q = req.query.q || '';
        
        if (q) {
            lagu = lagu.filter(l => 
                l.tajuk.toLowerCase().includes(q.toLowerCase()) || 
                l.penyanyi.toLowerCase().includes(q.toLowerCase())
            );
        }
        res.render('index', { lagu, carian: q });
    } catch (err) {
        console.log("Ralat: Pastikan fail lirik.json wujud!");
        res.send("Sila pastikan fail lirik.json anda betul.");
    }
});

// --- 2. HALAMAN LIRIK ---
app.get('/lagu/:slug', (req, res) => {
    try {
        const slug = req.params.slug;
        const semuaLagu = getLaguData();
        const infoLagu = semuaLagu.find(l => l.slug === slug);
        
        if (!infoLagu) {
            return res.status(404).send("Lagu tidak ada dalam senarai!");
        }

        // Cari fail .txt dalam folder songs
        const lirikPath = path.join(__dirname, 'songs', `${slug}.txt`);
        
        let isiLirik = "Lirik belum tersedia 😿";
        if (fs.existsSync(lirikPath)) {
            isiLirik = fs.readFileSync(lirikPath, 'utf-8');
        }

        // KATA KUNCI: Dia akan cari fail 'views/lirik.ejs'
        res.render('lirik', { lagu: infoLagu, lirik: isiLirik });
        
    } catch (err) {
        console.log(err);
        res.send("Ada masalah teknikal berlaku.");
    }
});

// --- 3. HALAMAN ACCOUNT ---
app.get('/account', (req, res) => {
    res.render('account');
});

// Jalankan Server
app.listen(port, () => {
    console.log(`🐾 MEOW LYRICS BERJALAN!`);
    console.log(`Buka Chrome di: http://localhost:${port}`);
});
