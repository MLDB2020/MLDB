import React, { useState, useEffect } from "react";
import axios from "axios";
import validator from 'validator';

function Register() {
	const [userID, setUserID] = useState(1);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [firstNameError, setFirstNameError] = useState(null);
	const [lastNameError, setLastNameError] = useState(null);
	const [emailError, setEmailError] = useState(null);
	const [userNameError, setUserNameError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	const getUserID = async () => {
		const response = await axios("http://localhost:3001/get");
		const data = await response.data;
		if (data.length === 0) {
			setUserID(1);
		} else {
			let userID = data[data.length-1].userID + 1;
			setUserID(userID);
		}
	};

	useEffect(() => {
		getUserID();
	}, []);

	const onFirstNameChange = (e) => {
		const { value } = e.target;
		setFirstName(value);
		setFirstNameError(null);
	}

	const onLastNameChange = (e) => {
		const { value } = e.target;
		setLastName(value);
		setLastNameError(null);
	}

	const onEmailChange = (e) => {
		const { value } = e.target;
		setEmail(value);
		setEmailError(null);
	}

	const onUserNameChange = (e) => {
		const { value } = e.target;
		setUserName(value);
		setUserNameError(null);
	}

	const onPasswordChange = (e) => {
		const { value } = e.target;
		setPassword(value);
		setPasswordError(null);
	}
 
	const validate = () => {
		let firstNameError = firstName.length < 3 ?
			"minimum 3 characters required" : null;
		let lastNameError = lastName.length < 3 ?
			"minimum 3 characters required" : null;
		let emailError = validator.isEmail(email) ? 
			null : "invalid email address";
		let userNameError = userName.length < 3 ?
			"minimum 3 characters required" : null;
		let passwordError = password.length < 6 ?
			"minimum 6 characters required" : null;
		
		if (firstNameError || lastNameError || emailError || userNameError || passwordError) {
			setFirstNameError(firstNameError);
			setLastNameError(lastNameError);
			setEmailError(emailError);
			setUserNameError(userNameError);
			setPasswordError(passwordError);
			return false;
		}
		return true;
	}

	const onHandleSubmit = (e) => {
		e.preventDefault();
		const isValid = validate();
		if (isValid) {
			console.log("--- SUBMITTING FORM ---",
						"\nfirstName: " + firstName, 
						"\nlastName: " + lastName,
						"\nemail: " + email,
						"\nuserName: " + userName,
						"\npassword: xxxxxx",
						"\nfirstNameError: " + firstNameError, 
						"\nlastNameError: " + lastNameError,
						"\nemailError: " + emailError,
						"\nuserNameError: " + userNameError,
						"\npasswordError: " + passwordError);
			fetch("http://localhost:3001/register", {
				method: 'post',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify({
					userID: userID,
					userName: userName,
					password: password,
					firstName: firstName,
					lastName: lastName,
					email: email,
				}), 
			})
			.then(res => {
				console.log(res)
				if (res.status === 400) {
					alert('Unable to register!');
				} else if (res.status === 500) {
					alert('User or Email already registered. Please try again.')
					e.target.reset();
				} else {
					alert('User registered!');
					e.target.reset();
				}
				res.text();
			})
			.catch(err => {
				console.log('Something is wrong');
				console.log(err);
			});
			setFirstName("");
			setLastName("");
			setEmail("");
			setUserName("");
			setPassword("");
		} else {
			console.log("### SOMETHING IS WRONG ###",
						"\nfirstName: " + firstName, 
						"\nlastName: " + lastName,
						"\nemail: " + email,
						"\nuserName: " + userName,
						"\npassword: xxxxxx",
						"\nfirstNameError: " + firstNameError, 
						"\nlastNameError: " + lastNameError,
						"\nemailError: " + emailError,
						"\nuserNameError: " + userNameError,
						"\npasswordError: " + passwordError);
		}
	};

	return (
		<div>
			<div className="signinreg__container">
				<div className="signinreg__form__container">
					<h1>Sign Up</h1>
					<form className="signinreg__form" onSubmit={ onHandleSubmit }>
						<input 
							className={ firstNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="firstName"
							placeholder="Firstname" 
							onChange={ onFirstNameChange }
						/>
						<span>{ firstNameError }</span>
						<input 
							className={ lastNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="lastName"
							placeholder="Lastname" 
							onChange={ onLastNameChange }
						/>
						<span>{ lastNameError }</span>
						<input 
							className={ emailError === null ? "" : "signinreg__error" }
							type="text" 
							name="email"
							placeholder="Email"
							onChange={ onEmailChange }
						/>
						<span>{ emailError }</span>
						<input 
							className={ userNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="userName"
							placeholder="Username" 
							onChange={ onUserNameChange }
						/>
						<span>{ userNameError }</span>
						<input 
							className={ passwordError === null ? "" : "signinreg__error" }
							type="password" 
							name="password"
							placeholder="Password"
							onChange={ onPasswordChange }
						/>
						<span>{ passwordError }</span>
						<button 
							className="signinreg__submit"
							type='submit' 
						>Sign Up</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
