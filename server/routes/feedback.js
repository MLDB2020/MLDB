const { Router } = require('express');
const { mysql } = require('../database/mysql');

const feedbackRouter = Router();


// GET USER FEEDBACK DATA INFORMATION
feedbackRouter.get('/', (req, res) => {
	mysql.select('*').from('userfeedback').then(data => {
		res.send(data);
	});
});


// USER (RELATIONSHIP) FEEDBACK
feedbackRouter.post("/", async (req, res) => {
	const { 
		firstVisit,
		satisfied,
		easyToNavigate,
		likelihoodToReturn,
		comments
	} = req.body;
	mysql.insert(
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


module.exports = { feedbackRouter };