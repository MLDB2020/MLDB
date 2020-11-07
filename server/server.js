const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const app = express();

const PORT = 3001 || process.env.PORT;
const DB_PASSWORD = 'Ninil1985!';

const db = knex({
    // Enter your own database information here based on what you created
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : DB_PASSWORD,
      database : 'mldb'
    }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next();
});

app.get('/get', (req, res) => {
   db.select('*').from('tester').then(data => {
       res.send(data);
   });
});

app.post("/signin", (req, res) => {
    const { userName, password } = req.body;
    db.select('userName', 'password').from('tester')
        .where('userName', '=', userName)
        .then(data => {
            const isValid = data[0].password === password;
            if (isValid) {
                return db.select('*').from('tester')
                .where('userName', '=', userName)
                .then(user => {
                    res.json(user);
                })
                .catch(err => res.status(400).json('Unable to get user'));
            } else {
                res.status(400).json('Wrong credentials');
            }
        })
        .catch(err => res.status(400).json('Something is wrong'));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});