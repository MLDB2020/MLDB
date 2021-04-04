const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
//const bcrypt = require('bcrypt');

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

// ========================== ROUTES ============================== //

// GET USER DATA INFORMATION
app.get('/getuser', (req, res) => {
   db.select('*').from('user').then(data => {
	   res.send(data);
   });
});


// GET SUPPORT DATA INFORMATION
app.get('/getsupport', (req, res) => {
	db.select('*').from('support').then(data => {
		res.send(data);
	});
});

// GET USERFEEDBACK DATA INFORMATION
app.get('/getuserfeedback', (req, res) => {
	db.select('*').from('userfeedback').then(data => {
		res.send(data);
	});
});

// GET COMPANY DATA INFORMATION
app.get('/getcompany', (req, res) => {
	db.select('*').from('company').then(data => {
		res.send(data);
	});
});


// USER SIGN-IN
app.post("/signin", (req, res) => {
	const { userName, password } = req.body;
	db.select('userName', 'password').from('user')
		.where('userName', '=', userName)
		.then(async data => {
			//const isValid = bcrypt.compareSync(password, data[0].password);
			const isValid = password === data[0].password;
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


// REGISTER USER
app.post("/register", async (req, res) => {
	const { 
		userName, 
		password,
		firstName,
		lastName,
		email,
	} = req.body;
	//const hashPassword = bcrypt.hashSync(password, 10);
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
					userName: userName,
					password: password,
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


// CUSTOMER SUPPORT
app.post("/support", async (req, res) => {
	db.select('userID').from('user')
	.where('userName', '=', req.body.userName)
	.then(async data => {
		if (data) {
			let userID = data[0].userID;
			await db.insert(
			{
					userID: userID,
					message: req.body.message
			})
			.into('support')
			.then(data => {
				res.json(data);
				console.log("Message received by our Customer Support.");
			})
			.catch(err => {
				console.log(err);
				res.status(400).json('Something is wrong.');
			});
		} else {
			console.log('User doesn\'t exist');
		}
	});
});


// USER (RELATIONSHIP) FEEDBACK
app.post("/userfeedback", async (req, res) => {
	const { 
		firstVisit,
		satisfied,
		easyToNavigate,
		likelihoodToReturn,
		comments
	} = req.body;
	db.insert(
		{
			firstVisit: firstVisit,
			satisfied: satisfied,
			easyToNavigate: easyToNavigate,
			likelihoodToReturn: likelihoodToReturn,
			comments: comments
		}
	)
	.into('userfeedback')
	.then(data => {
		res.json(data);
		console.log("Feedback received.");
	})
	.catch(err => {
		console.log(err);
		res.status(400).json('Something is wrong.');
	});
});


// EDIT INFORMATION
app.put("/edit", async (req, res) => {
	const {  
		userName,
		firstName,
		lastName,
		password,
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
				password: password,
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


// DELETE ACCOUNT
app.delete("/delete", async (req, res) => {
	const { 
		userName
	} = req.body;
	db('user')
	.where('userName', userName)
	.del()
	.then(result => {
		console.log(`${userName} account deleted`);
		res.sendStatus(200);
	})	
	.catch(err => {
		console.log(err);
		res.status(400).json('Something is wrong.');
	});
});


// ADS
app.post("/ads", async (req, res) => {
	db.select('companyID').from('company')
	.where('coName', '=', req.body.coName)
	.then(async data => {
		if (data) {
			let companyID = data[0].companyID;
			await db.insert(
			{
					companyID: companyID,
					paymentAmount: 0
			})
			.into('ads')
			.then(data => {
				res.json(data);
				console.log("Ad added to the database.");
			})
			.catch(err => {
				console.log(err);
				res.status(400).json('Something is wrong.');
			});
		} else {
			console.log('Company doesn\'t exist');
		}
	});
});


// LISTEN PORT
app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});