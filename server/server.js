const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const PORT = 3001 || process.env.PORT;
const DB_PASSWORD = '#####';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: DB_PASSWORD,
    database: 'mldb'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/get', (req, res) => {
    const sqlSelect = "SELECT * FROM tester";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/insert", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const sqlInsert = `INSERT INTO tester (userName, password) VALUES ("${userName}", "${password}")`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});