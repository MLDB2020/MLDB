import React, { useState } from 'react'

function Footer({ isSignedIn, user }) {
	const year = new Date().getFullYear();

	// GENERAL FUNCTIONS
	const opacityOn = () => {
		let nav = document.getElementById("nav");
		let movies = document.getElementById("movies");
		let footer = document.getElementById("footer");
		nav.style.opacity = "10%";
		movies.style.opacity = "10%";
		footer.style.opacity = "10%";
	}

	const opacityOff = () => {
		let nav = document.getElementById("nav");
		let movies = document.getElementById("movies");
		let footer = document.getElementById("footer");
		nav.style.opacity = "100%";
		movies.style.opacity = "100%";
		footer.style.opacity = "100%";
	}


	/* HANDLING CUSTOMER SUPPORT */
	const [ customerSupport, setCustomerSupport ] = useState({
		message: "",
		messageError: null
	});
	const [ customerSupportDisplay, setCustomerSupportDisplay] = useState("none");

	const openCustomerSupportModal = () => {
		setCustomerSupportDisplay("flex");
		opacityOn();
	}

	const closeCustomerSupportModal = () => {
		setCustomerSupportDisplay("none");
		opacityOff();
	}

	const resetCustomerSupport = () => {
		setCustomerSupport({
			message: "",
			messageError: null
		});
	};

	const validateCustomerSupport = () => {
		let messageError = customerSupport.message.length < 1 ?
			"message field is empty" : null;
		
		if (messageError) {
			setCustomerSupport({
				...customerSupport,
				messageError: messageError,
			});
			return false;
		}
		return true;
	}

	const onSubmitCustomerSupport = async (e) => {
		e.preventDefault();
		const isValid = validateCustomerSupport();
		if (isValid) {
			const res = await fetch("http://localhost:3001/support", {
				method: 'post',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify({
					userName: user.userName,
					message: customerSupport.message
				}), 
			})
			if (res.status === 200) {
				alert('Thanks for contacting us!');
				e.target.reset();
				resetCustomerSupport();
				closeCustomerSupportModal();
			} else {
				alert('Unable to send message!');
				openCustomerSupportModal();
			}
		} else {
			alert('Please fill out all the fields!')
		}
	};


	/* HANDLING FEEDBACK */
	const [ feedback, setFeedback ] = useState({
		firstVisit: "",
		satisfied: "",
		easyToNavigate: "",
		likelihoodToReturn: "",
		comments: "",
	});
	const [ feedbackDisplay, setFeedbackDisplay] = useState("none");
	let feedbackBtn = document.getElementById("feedback");

	const openFeedbackModal = () => {
		setFeedbackDisplay("flex");
		opacityOn();
	}

	const closeFeedbackModal = () => {
		setFeedbackDisplay("none");
		opacityOff();
	}

	const resetFeedback = () => {
		setFeedback({
			firstVisit: "",
			satisfied: "",
			easyToNavigate: "",
			likelihoodToReturn: "",
			comments: "",
		});
	};

	const onSubmitFeedback = async (e) => {
		e.preventDefault();
		if (feedback.firstVisit && feedback.satisfied && feedback.easyToNavigate && feedback.likelihoodToReturn) {
			const res = await fetch("http://localhost:3001/userfeedback", {
				method: 'post',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify({
					firstVisit: feedback.firstVisit,
					satisfied: feedback.satisfied,
					easyToNavigate: feedback.easyToNavigate,
					likelihoodToReturn: feedback.likelihoodToReturn,
					comments: feedback.comments,
				}), 
			})
			if (res.status === 200) {
				alert('Thanks for giving your feedback!');
				e.target.reset();
				resetFeedback();
				closeFeedbackModal();
				feedbackBtn.setAttribute("disabled", true);
				feedbackBtn.innerText = "Thanks for the feedback"
			} else {
				alert('Unable to give feedback!');
				openFeedbackModal();
			}
		} else {
			alert('Please answer the questions before submitting')
		}
	};

	return (
		<div>
			<div className="footer__container" id="footer">
				<button id="feedback" onClick={ openFeedbackModal }>Give Feedback</button>
				{ isSignedIn && <button id="support" onClick={ openCustomerSupportModal }>Customer Support</button> }
				<p>&#169;Copyright - MLDB { year }</p>
			</div>

			{/* CUSTOMER SUPPORT MODAL */}
			<div style={{display: customerSupportDisplay}} className="signinreg__container">
				<div className="signinreg__form__container">
					<h1>Contact Customer Support</h1>
					<form className="signinreg__form" onSubmit={ onSubmitCustomerSupport }>
						<input 
							type="text" 
							name="firstName"
							value={ user.firstName }
							readOnly
						/>
						<span>{ customerSupport.firstNameError }</span>
						<input 
							type="text" 
							name="lastName"
							value={ user.lastName }
							readOnly
						/>
						<span>{ customerSupport.lastNameError }</span>
						<input 
							type="text" 
							name="email"
							value={ user.email }
							readOnly
						/>
						<span>{ customerSupport.emailError }</span>
						<textarea 
							className={ customerSupport.messageError === null ? "" : "signinreg__error" }
							name="message"
							placeholder="Message" 
							onChange={ (e) => {
								setCustomerSupport({ 
									...customerSupport,
									message: e.target.value,
									messageError: null
								});
							} }
						/>
						<span>{ customerSupport.messageError }</span>
						<button 
							className="signinreg__submit"
							type='submit' 
						>Send Message</button>
						<hr style={{border: "1px solid whitesmoke"}}/>
					</form>
					<button className="signinreg__submit" onClick={ closeCustomerSupportModal }>Back to Home</button>
				</div>
			</div>

			{/* FEEDBACK MODAL */}
			<div style={{display: feedbackDisplay}} className="signinreg__container">
				<div className="signinreg__form__container">
					<h1>User Feedback</h1>
					<h6>Please complete the following form and help us improve our user relationship.</h6>
					<form className="signinreg__form" onSubmit={ onSubmitFeedback }>
						<label>1. Is this your first visit to the website?</label>
						<br/>
						<select
							onChange={ (e) => {
								setFeedback({ 
									...feedback,
									firstVisit: e.target.value
								});
							} }
						>
							<option defaultValue></option>
							<option value="Yes">Yes</option>
							<option value="No">No</option>
						</select>
						<br/>
						<label>2. Are you satisfied with the content of the site?</label>
						<br/>
						<select
							onChange={ (e) => {
								setFeedback({ 
									...feedback,
									satisfied: e.target.value
								});
							} }
						>
							<option defaultValue></option>
							<option value="Yes">Yes</option>
							<option value="No">No</option>
						</select>
						<br/>
						<label>3. How easy is it to navigate through the site?</label>
						<br/>
						<select
							onChange={ (e) => {
								setFeedback({ 
									...feedback,
									easyToNavigate: e.target.value
								});
							} }
						>
							<option defaultValue></option>
							<option value="Very Easy">Very Easy</option>
							<option value="Easy">Easy</option>
							<option value="Average">Average</option>
							<option value="Difficult">Difficult</option>
							<option value="Very Difficult">Very Difficult</option>
						</select>
						<label>4. What is the likelihood that you will return to the site?</label>
						<br/>
						<select
							onChange={ (e) => {
								setFeedback({ 
									...feedback,
									likelihoodToReturn: e.target.value
								});
							} }
						>
							<option defaultValue></option>
							<option value="Extremely Likely">Extremely Likely</option>
							<option value="Very Likely">Very Likely</option>
							<option value="Moderately Likely">Moderately Likely</option>
							<option value="Slightly Likely">Slightly Likely</option>
							<option value="Unlikely to Return">Unlikely to Return</option>
						</select>
						<br/>
						<label>5. Please provide any comments: (optional)</label>
						<textarea 
							name="comments"
							placeholder="Comments" 
							onChange={ (e) => {
								setFeedback({ 
									...feedback,
									comments: e.target.value,
								});
							} }
						/>
						<button 
							className="signinreg__submit"
							type='submit' 
						>Send Feedback</button>
						<hr style={{border: "1px solid whitesmoke"}}/>
					</form>
					<button className="signinreg__submit" onClick={ closeFeedbackModal }>Back to Home</button>
				</div>
			</div>
		</div>
	)
}

export default Footer;
