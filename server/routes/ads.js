const { Router } = require('express');
const { mysql } = require('../database/mysql');

const adsRouter = Router();


// GET COMPANIES ADS DATA INFORMATION
adsRouter.get('/', (req, res) => {
	mysql.select('*').from('company').then(data => {
		res.send(data);
	});
});


// REGISTER COMPANIES ADS
adsRouter.post("/", async (req, res) => {
	mysql.select('companyID').from('company')
	.where('coName', '=', req.body.coName)
	.then(async data => {
		if (data) {
			let companyID = data[0].companyID;
			await mysql.insert(
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


module.exports = { adsRouter };