const express = require('express');
const animalsRouter = require('./routes/animals');

const mysql = require('mysql2');

const app = express();

// Middleware untuk menangani JSON request body
app.use(express.json());

app.use('/animals', animalsRouter);

// Koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'data_hewan'
});

// Cek koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to the MySQL database!');
});

// Route untuk melihat data binatang (GET)
app.get('/animals', (req, res) => {
    db.query('SELECT * FROM animals', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        res.send(`
            <h1>Animals List</h1>
            <ul>
                ${results.map(animal => `
                    <li>${animal.name} - ${animal.type}</li>
                `).join('')}
            </ul>
        `);
    });
});

// Route untuk menambah data binatang (POST)
app.post('/animals', (req, res) => {
    const { name, type } = req.body;
    db.query('INSERT INTO animals (name, type) VALUES (?, ?)', [name, type], (err, result) => {
        if (err) {
            console.error('Database query error:', err); // Menampilkan error lebih rinci di terminal
            return res.status(500).send('Error adding data');
        }
        res.status(201).send('Animal added successfully');
    });
});


// Route untuk mengedit data binatang (PUT)
app.put('/animals/:id', (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body; // Ambil data baru dari request body
    db.query('UPDATE animals SET name = ?, type = ? WHERE id = ?', [name, type, id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send('Error updating data');
        }
        res.send('Animal updated successfully');
    });
});

// Route untuk menghapus data binatang (DELETE)
app.delete('/animals/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM animals WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).send('Error deleting data');
        }
        res.send('Animal deleted successfully');
    });
});

// Port untuk menjalankan server
const port = 6000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
