const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'b3h7kdisfbuqfbvbasaf-mysql.services.clever-cloud.com',
    user: 'uxltohhijgadjodb',
    password: 'infYxZIuoy7fOkINn943',
    database: 'b3h7kdisfbuqfbvbasaf'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware to parse JSON
app.use(express.json());

// API endpoints for CRUD operations
app.post('/api/students', (req, res) => {
    const student = req.body;
    connection.query('INSERT INTO students SET ?', student, (error, results) => {
        if (error) throw error;
        res.status(201).send(`Student added with ID: ${results.insertId}`);
    });
});

app.get('/api/students', (req, res) => {
    connection.query('SELECT * FROM students', (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
});

app.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const updatedStudent = req.body;
    connection.query('UPDATE students SET ? WHERE id = ?', [updatedStudent, id], (error) => {
        if (error) throw error;
        res.status(200).send(`Student with ID ${id} updated`);
    });
});

app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM students WHERE id = ?', id, (error) => {
        if (error) throw error;
        res.status(200).send(`Student with ID ${id} deleted`);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
