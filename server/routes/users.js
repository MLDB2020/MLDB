const { Router } = require('express');
const { mysql } = require('../database/mysql');

const usersRouter = Router();

// GET USERS DATA INFORMATION
usersRouter.get('/', (req, res) => {
  mysql.select('*').from('user').then(data => {
    res.send(data);
  });
});


// REGISTER USERS
usersRouter.post("/", async (req, res) => {
	const { 
		userName, 
		password,
		firstName,
		lastName,
		email,
	} = req.body;
	mysql.select('userName').from('user')
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
			await mysql.insert(
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


// EDIT USERS INFORMATION
usersRouter.put("/", async (req, res) => {
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
	mysql.select('userName').from('user')
	.where('userName', '=', userName)
	.then(async data => {
		if (data.length > 0) {
			await mysql('user').where('userName', '=', userName).update({
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


// DELETE USERS ACCOUNT
usersRouter.delete("/", async (req, res) => {
	const { 
		userName
	} = req.body;
	mysql('user')
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


module.exports = { usersRouter };