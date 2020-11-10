const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const PORT = 3001 || process.env.PORT;

const db = knex({
    // Enter your own database information here based on what you created
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'PasswordMLDB',
      database : 'mldb'
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/get', (req, res) => {
   db.select('*').from('user').then(data => {
       res.send(data);
   });
});

app.post("/signin", (req, res) => {
    const { userName, password } = req.body;
    db.select('userName', 'password').from('user')
        .where('userName', '=', userName)
        .then(async data => {
            const isValid = data[0].password === password;
            if (isValid) {
                try {
                    const user = await db.select('*').from('user')
                        .where('userName', '=', userName);
                    return res.json(user[0]);
                } catch (err) {
                    return res.status(400).json('Unable to get user');
                }
            } else {
                res.status(400).json('Wrong credentials.Try again.');
            }
        })
        .catch(err => res.status(400).json('Something is wrong'));
});

app.post("/register", async (req, res) => {
    const { 
        userID,
        userName, 
        password,
        firstName,
        lastName,
        email,
        phone,
        street,
        city,
        state,
        zipCode,
        preferableGenre
    } = req.body;

    db.select('userName').from('user')
    .where('userName', '=', userName)
    .then(async data => {
        const userAlreadyExist = data[0].userName === userName;
        if (userAlreadyExist) {
            try {
                return res.status(500).json('User already exists. Please try another username.');
            } catch (err) {
                console.log(err);
            }
        }    
    });

    await db.insert(
        {
            userID: userID,
            userName: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            street: street,
            city: city,
            state: state,
            zipCode: zipCode,
            preferableGenre: preferableGenre
        }
    )
    .into('user')
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json('Unable to register');
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});