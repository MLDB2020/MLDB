import React, { useState } from 'react'
import validator from 'validator';

function Footer({ isSignedIn }) {
	const year = new Date().getFullYear();
	const [ customerSupport, setCustomerSupport ] = useState({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
		firstNameError: null,
		lastNameError: null,
		emailError: null,
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
			firstName: "",
			lastName: "",
			email: "",
			message: "",
			firstNameError: null,
			lastNameError: null,
			emailError: null,
			messageError: null
		});
	};

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

	const validateCustomerSupport = () => {
		let firstNameError = customerSupport.firstName.length < 3 ?
			"minimum 3 characters required" : null;
		let lastNameError = customerSupport.lastName.length < 3 ?
			"minimum 3 characters required" : null;
		let emailError = validator.isEmail(customerSupport.email) ? 
			null : "invalid email address";
		let messageError = customerSupport.message.length < 1 ?
			"message field is empty" : null;
		
		if (firstNameError || lastNameError || emailError || messageError) {
			setCustomerSupport({
				...customerSupport,
				firstNameError: firstNameError,
				lastNameError: lastNameError,
				emailError: emailError,
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
					firstName: customerSupport.firstName,
					lastName: customerSupport.lastName,
					email: customerSupport.email,
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
		}
	};

	return (
		<div>
			<div className="footer__container" id="footer">
				<button id="support" onClick={ openCustomerSupportModal } disabled={ isSignedIn ? false : true }>Get Customer Support</button>
				<p>&#169;Copyright - MLDB { year }</p>
			</div>

			{/* CUSTOMER SUPPORT MODAL */}
			<div style={{display: customerSupportDisplay}} className="signinreg__container">
				<div className="signinreg__form__container">
					<h1>Contact Customer Support</h1>
					<form className="signinreg__form" onSubmit={ onSubmitCustomerSupport }>
						<input 
							className={ customerSupport.firstNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="firstName"
							placeholder="Firstname" 
							onChange={ (e) => {
								setCustomerSupport({ 
									...customerSupport,
									firstName: e.target.value,
									firstNameError: null
								});
							} }
						/>
						<span>{ customerSupport.firstNameError }</span>
						<input 
							className={ customerSupport.lastNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="lastName"
							placeholder="Lastname" 
							onChange={ (e) => {
								setCustomerSupport({ 
									...customerSupport,
									lastName: e.target.value,
									lastNameError: null
								});
							} }
						/>
						<span>{ customerSupport.lastNameError }</span>
						<input 
							className={ customerSupport.emailError === null ? "" : "signinreg__error" }
							type="text" 
							name="email"
							placeholder="Email"
							onChange={ (e) => {
								setCustomerSupport({ 
									...customerSupport,
									email: e.target.value,
									emailError: null
								});
							} }
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
						<button className="signinreg__submit" onClick={ closeCustomerSupportModal }>Back to Home</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Footer;
