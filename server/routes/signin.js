const { Router } = require('express');
const { mysql } = require('../database/mysql');

const signInRouter = Router();


// USERS SIGN-IN
signInRouter.post("/", (req, res) => {
	const { userName, password } = req.body;
	mysql.select('userName', 'password').from('user')
		.where('userName', '=', userName)
		.then(async data => {
			const isValid = password === data[0].password;
			if (isValid) {
				try {
					const user = await mysql.select('*').from('user')
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


module.exports = { signInRouter };