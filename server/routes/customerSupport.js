const { Router } = require('express');
const { mysql } = require('../database/mysql');

const customerSupportRouter = Router();


// GET SUPPORT DATA INFORMATION
customerSupportRouter.get('/', (req, res) => {
	mysql.select('*').from('support').then(data => {
		res.send(data);
	});
});


// CUSTOMER SUPPORT
customerSupportRouter.post("/", async (req, res) => {
	mysql.select('userID').from('user')
	.where('userName', '=', req.body.userName)
	.then(async data => {
		if (data) {
			let userID = data[0].userID;
			await mysql.insert(
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


module.exports = { customerSupportRouter };