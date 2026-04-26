const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON, handy for PUT updates
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // save photos

// Setting up our SQLite db
const db = new sqlite3.Database('./inventory.db', (err) => {
    if (err) console.error('db connection error:', err);
    else console.log('db connected');
});

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inventory_name TEXT NOT NULL,
    description TEXT,
    photo_url TEXT
)`);

// Multer setup for file uploads (multipart/form-data)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 1. CREATE - POST /register
app.post('/register', upload.single('photo'), (req, res) => {
    const { inventory_name, description } = req.body;
    
    if (!inventory_name) {
        return res.status(400).json({ error: "Поле inventory_name є обов'язковим" });
    }

    const photo_url = req.file ? `/uploads/${req.file.filename}` : null;

    const sql = `INSERT INTO items (inventory_name, description, photo_url) VALUES (?, ?, ?)`;
    db.run(sql, [inventory_name, description, photo_url], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: "Інвентар успішно створено" });
    });
});

// 2. READ ALL (Inventory list) - GET /inventory
app.get('/inventory', (req, res) => {
    db.all(`SELECT * FROM items`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 3. READ ONE (View one) - GET /inventory/:id
app.get('/inventory/:id', (req, res) => {
    db.get(`SELECT * FROM items WHERE id = ?`, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Не знайдено" });
        res.json(row);
    });
});

// 4. UPDATE TEXT (Update text data) - PUT /inventory/:id (JSON)
app.put('/inventory/:id', (req, res) => {
    const { inventory_name, description } = req.body;
    const sql = `UPDATE items SET inventory_name = ?, description = ? WHERE id = ?`;
    
    db.run(sql, [inventory_name, description, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Текстові дані оновлено" });
    });
});

// 5. UPDATE PHOTO (Update photo) - PUT /inventory/:id/photo (multipart/form-data)
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Файл не передано" });
    }

    const new_photo_url = `/uploads/${req.file.filename}`;
    
    // delete the old photo if there were
    db.get(`SELECT photo_url FROM items WHERE id = ?`, [req.params.id], (err, row) => {
        if (row && row.photo_url) {
            const oldPath = path.join(__dirname, row.photo_url);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }

        db.run(`UPDATE items SET photo_url = ? WHERE id = ?`, [new_photo_url, req.params.id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Фотографію оновлено", photo_url: new_photo_url });
        });
    });
});

// 6. DELETE - DELETE /inventory/:id
app.delete('/inventory/:id', (req, res) => {
    // check name
    db.get(`SELECT photo_url FROM items WHERE id = ?`, [req.params.id], (err, row) => {
        if (row && row.photo_url) {
            const filePath = path.join(__dirname, row.photo_url);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath); // delete
        }

        // Then delete the record from db
        db.run(`DELETE FROM items WHERE id = ?`, [req.params.id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Позицію видалено" });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Backend server is running at http://localhost:${PORT}`);
});