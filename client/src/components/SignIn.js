import React, { useState } from "react";

function SignIn({ onSignChange }) {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [userNameError, setUserNameError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	
	const onUserNameChange = (e) => {
		setUserName(e.target.value);
		setUserNameError(null);
	};

	const onPasswordChange = (e) => {
		setPassword(e.target.value);
		setPasswordError(null);
	};

	const validate = () => {
		let userNameError = userName.length === 0 ?
			"username cannot be empty" : null;
		let passwordError = password.length === 0 ?
			"password cannot be empty" : null;
		
		if (userNameError || passwordError) {
			setUserNameError(userNameError);
			setPasswordError(passwordError);
			return false;
		}
		return true;
	}

	const onSubmitSignIn = (e) => {
		e.preventDefault();
		let isValid = validate();
		if (isValid) {
			console.log("--- SUBMITTING FORM ---",
						"\nuserName: " + userName, 
						"\npassword: xxxxxx");
			fetch("http://localhost:3001/signin", {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					userName: userName,
					password: password
				}), 
			})
			.then(res => res.json())
			.then(data => {
				if (data.userID) {
					alert('Sucessful login');
					//loadUser(data);
					onSignChange("loggedIn");
					e.target.reset();
					setUserName("");
					setPassword("");    
				} else {
					alert('Wrong credentials. Try again.');
				}
			})
			.catch(err => {
				console.log('Something is wrong');
				console.log(err);
			});
		} else {
			console.log("### SOMETHING IS WRONG WITH: ###",
						"\nuserName: " + userName, 
						"\npassword: xxxxxx");
		}
	};

	return (
		<div className="signinreg__container">
			<div className="signinreg__form__container">
				<h1>Sign In</h1>
				<form className="signinreg__form" onSubmit={ onSubmitSignIn }>
					<input 
						className={ userNameError === null ? "" : "signinreg__error" }
						type="text" 
						name="userName"
						placeholder="Username" 
						onChange={ onUserNameChange }
					/>
					<span>{ userNameError }</span>
					<br/>
					<input 
						className={ passwordError === null ? "" : "signinreg__error" }
						type="password" 
						name="password"
						placeholder="Password"
						onChange={ onPasswordChange }
					/>
					<span>{ passwordError }</span>
					<br/>
					<button 
						className="signinreg__submit"
						type='submit' 
					>Sign In</button>
				</form>
				<div className="create__account">
					<hr/>
					<h3>New to MLDB?</h3>
					<button><a href="/register">Create an Account</a></button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
