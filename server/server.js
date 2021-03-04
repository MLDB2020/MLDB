const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const PORT = 3001 || process.env.PORT;

const db = knex({
	// Enter your own database information here based on what you created and run the SQL_Statements to create the tables
	client: 'mysql',
	connection: {
	  host : 'localhost',           // Your hostname
	  user : 'root',                // Your user name
	  password : 'PasswordMLDB',    // Your password
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
			const isValid = bcrypt.compareSync(req.body.password, data[0].password);
			if (isValid) {
				try {
					const user = await db.select('*').from('user')
						.where('userName', '=', userName);
					console.log(`${userName} logged in.`)
					return res.json(user[0]);
				} catch (err) {
					console.log(err);
				}
			} else {
				console.log("Wrong credentials. Try again.")
				res.status(400).json("Wrong credentials. Try again.");
			}
		})
		.catch(err => {
			console.log("Username does not exist.");
			res.status(400).json("Username does not exist.");
		});
});

app.post("/register", async (req, res) => {
	const { 
		userID,
		userName, 
		password,
		firstName,
		lastName,
		email,
	} = req.body;
	const hashPassword = bcrypt.hashSync(password, 10);
	db.select('userName').from('user')
	.where('userName', '=', userName)
	.orWhere('email', '=', email)
	.then(async data => {
		let userAlreadyExist = false;
		let emailAlreadyExist = false;
		if (data.length > 0) {
			userAlreadyExist = data[0].userName === userName;
			emailAlreadyExist = data[0].email === email;
		}
		if (userAlreadyExist || emailAlreadyExist) {
			try {
				console.log("User/Email already exists.");
				return res.status(500).json("User/Email already exists.");
			} catch (err) {
				console.log(err);
			}
		} else {
			await db.insert(
				{
					userID: userID,
					userName: userName,
					password: hashPassword,
					firstName: firstName,
					lastName: lastName,
					email: email,
				}
			)
			.into('user')
			.then(user => {
				res.json(user);
				console.log("User registered successfully.");
			})
			.catch(err => {
				console.log(err);
				res.status(400).json('Unable to register');
			});
		}
	});
});

app.put("/edit", async (req, res) => {
	const {  
		userName,
		firstName,
		lastName,
		street,
		city,
		state,
		zip
	} = req.body;
	db.select('userName').from('user')
	.where('userName', '=', userName)
	.then(async data => {
		if (data.length > 0) {
			await db('user').where('userName', '=', userName).update({
				firstName: firstName,
				lastName: lastName,
				street: street,
				city: city,
				state: state,
				zipCode: zip
			})
			.then(user => {
				res.json(user);
				console.log(`${userName} information edited.`);
			})
			.catch(err => {
				console.log(err);
				res.status(400).json('Unable to edit information');
			})
		} else {
			console.log("User not found");
		}
	})
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});