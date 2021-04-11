// import axios from "axios";
import React, { useState } from "react";
import validator from 'validator';
import MLDB_logo from '../MLDB_logo.png';

function NavBar({ onSearch, isSignedIn, setIsSignedIn, user, setUser, resetUser, onOpacity }) {

	/* HANDLING SIGN IN */
	const [ signIn, setSignIn ] = useState({
		userName: "",
		password: "",
		userNameError: null,
		passwordError: null
	});
	const [ signInDisplay, setSignInDisplay] = useState("none");

	const validateSignIn = () => {
		let userNameError = signIn.userName.length === 0 ?
			"username cannot be empty" : null;
		let passwordError = signIn.password.length === 0 ?
			"password cannot be empty" : null;
		
		if (userNameError || passwordError) {
			setSignIn({
				...signIn,
				userNameError: userNameError,
				passwordError: passwordError
			});
			return false;
		}
		return true;
	}

	const onSubmitSignIn = async (e) => {
		e.preventDefault();
		let isValid = validateSignIn();
		if (isValid) {
			console.log("--- SUBMITTING SIGN IN FORM ---");
			const res = await fetch("http://localhost:3001/signin", {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					userName: signIn.userName,
					password: signIn.password
				}), 
			});
			const data = await res.json();
			if (data.userID) {
				alert('Successful login');
				setUser({
					...data
				});
				setIsSignedIn(true);
				e.target.reset();
				closeSignInModal();
			} else {
				alert('Wrong credentials. Try again.');
				e.target.reset();
				openSignInModal();
			}
		} else {
			console.log("### SOMETHING IS WRONG ###");
		}
	};

	const resetSignIn = () => {
		setSignIn({
			userName: "",
			password: "",
			userNameError: null,
			passwordError: null
		});
	};

	const onSignOut = () => {
		resetSignIn();
		resetRegister();
		resetUser();
		setIsSignedIn(!isSignedIn);
	};

	const openSignInModal = () => {
		setSignInDisplay("flex");
		setRegisterDisplay("none");
		onOpacity(true);
	}

	const closeSignInModal = () => {
		setSignInDisplay("none");
		onOpacity(false);
	}


	/* HANDLING REGISTER */
	const [ register, setRegister ] = useState({
		firstName: "",
		lastName: "",
		email: "",
		userName: "",
		password: "",
		firstNameError: null,
		lastNameError: null,
		emailError: null,
		userNameError: null,
		passwordError: null
	});
	const [ registerDisplay, setRegisterDisplay] = useState("none");
 
	const validateReg = () => {
		let firstNameError = register.firstName.length < 3 ?
			"minimum 3 characters required" : null;
		let lastNameError = register.lastName.length < 3 ?
			"minimum 3 characters required" : null;
		let emailError = validator.isEmail(register.email) ? 
			null : "invalid email address";
		let userNameRegError = register.userName.length < 3 ?
			"minimum 3 characters required" : null;
		let passwordRegError = register.password.length < 6 ?
			"minimum 6 characters required" : null;
		
		if (firstNameError || lastNameError || emailError || userNameRegError || passwordRegError) {
			setRegister({
				...register,
				firstNameError: firstNameError,
				lastNameError: lastNameError,
				emailError: emailError,
				userNameError: userNameRegError,
				passwordError: passwordRegError
			});
			return false;
		}
		return true;
	}

	const onSubmitRegister = async (e) => {
		e.preventDefault();
		const isValid = validateReg();
		if (isValid) {
			console.log("--- SUBMITTING REGISTER FORM ---");
			const res = await fetch("http://localhost:3001/users", {
				method: 'post',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify({
					userName: register.userName,
					password: register.password,
					firstName: register.firstName,
					lastName: register.lastName,
					email: register.email,
				}), 
			});
			console.log(res)
			if (res.status === 400) {
				alert('Unable to register!');
				openRegisterModal();
			} else if (res.status === 500) {
				alert('User or Email already registered. Please try again.')
				openRegisterModal();
				resetRegisterError();
			} else {
				alert('User registered!');
				e.target.reset();
				openSignInModal();
			}
			res.text();
			resetRegister();
		} else {
			console.log("### SOMETHING IS WRONG ###");
		}
	};
	
	const resetRegister = () => {
		setRegister({
			firstName: "",
			lastName: "",
			email: "",
			userName: "",
			password: "",
			firstNameError: null,
			lastNameError: null,
			emailError: null,
			userNameError: null,
			passwordError: null
		});
	};

	const resetRegisterError = () => {
		setRegister({
			firstNameError: null,
			lastNameError: null,
			emailError: null,
			userNameError: null,
			passwordError: null
		});
	}

	const openRegisterModal = () => {
		setRegisterDisplay("flex");
		setSignInDisplay("none");
		onOpacity(true);
	}

	const closeRegisterModal = () => {
		setRegisterDisplay("none");
		onOpacity(false);
	}


	/* HANDLING EDIT PROFILE */
	const [ editUser, setEditUser ] = useState({
		firstNameError: null,
		lastNameError: null,
		emailError: null,
		userNameError: null,
		passwordError: null,
		streetError: null,
		cityError: null,
		stateError: null,
		zipError: null
	});
	const [ editUserDisplay, setEditUserDisplay] = useState("none");
 
	const validateEdit = () => {
		let firstNameErrorEdit = user.firstName.length < 3 ?
			"minimum 3 characters required" : null;
		let lastNameErrorEdit = user.lastName.length < 3 ?
			"minimum 3 characters required" : null;
		let streetErrorEdit = user.street.length < 3 ?
		"minimum 6 characters required" : null;
		let cityErrorEdit = user.city.length < 3 ?
			"minimum 3 characters required" : null;
		let stateErrorEdit = user.state.length < 2 ?
			"minimum 2 characters required" : null;
		let zipErrorEdit = user.zip.match(new RegExp(/[0-9]/g)) ?
			null : "only number are accepted";
		let passwordErrorEdit = user.password.length < 6 ?
			"minimum 6 characters required" : null;
		
		if (firstNameErrorEdit || lastNameErrorEdit || streetErrorEdit || cityErrorEdit || stateErrorEdit || zipErrorEdit || passwordErrorEdit) {
			setEditUser({
				firstNameError: firstNameErrorEdit,
				lastNameError: lastNameErrorEdit,
				streetError: streetErrorEdit,
				cityError: cityErrorEdit,
				stateError: stateErrorEdit,
				zipError: zipErrorEdit,
				passwordError: passwordErrorEdit
			});
			return false;
		}
		return true;
	}

	const onSubmitEdit = async (e) => {
		e.preventDefault();
		const isValid = validateEdit();
		if (isValid) {
			console.log("--- SUBMITTING EDIT PROFILE FORM ---");
			const res = await fetch("http://localhost:3001/users", {
				method: 'put',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify({
					userName: user.userName,
					firstName: user.firstName,
					lastName: user.lastName,
					password: user.password,
					street: user.street,
					city: user.city,
					state: user.state,
					zip: user.zip
				}), 
			});
			console.log(res)
			if (res.status === 400) {
				alert('Unable to edit!');
				openEditModal();
				resetEditUserError();
			} else {
				alert('User information edited!');
				e.target.reset();
			}
			res.text();
		} else {
			console.log("### SOMETHING IS WRONG ###");
		}
	};

	const resetEditUserError = () => {
		setEditUser({
			firstNameError: null,
			lastNameError: null,
			emailError: null,
			userNameError: null,
			passwordError: null,
			streetError: null,
			cityError: null,
			stateError: null,
			zipError: null
		});
	}

	const openEditModal = () => {
		setEditUserDisplay("flex");
		onOpacity(true);
	}

	const closeEditModal = () => {
		setEditUserDisplay("none");
		onOpacity(false);
	}


	/* HANDLING DELETE ACCOUNT */
	const onSubmitDelete = async (e) => {
		e.preventDefault();
		let confirmation = window.confirm("Are you sure you want to delete your account?");
		if (confirmation) {
			console.log("--- SUBMITTING DELETE PROFILE FORM ---");
			const res = await fetch("http://localhost:3001/users", {
				method: 'delete',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify({
					userName: user.userName,
				}), 
			});
			console.log(res)
			if (res.status === 400) {
				alert('Unable to delete!');
				openEditModal();
			} else {
				alert('User account deleted!');
				closeEditModal();
				onSignOut();
			}
			res.text();
		} else {
			openEditModal();
		}
	};


	return (
		<div>
			<div className='navbar__container' id='nav'>
				<nav className='navbar__items'>
					<div className="navbar__logo">
						<a href="/"><img src={MLDB_logo} alt='logo'/></a>
					</div>
					<div className="navbar__form">
						<form>
							<input className='navbar__moviesearch' type='text' placeholder='Movies Search 🔍' onChange={ onSearch }></input>
						</form>
					</div>
					{ !isSignedIn ?
						<ul>
							<li><button className="navbar__signout" onClick={ openSignInModal }>Sign In</button></li>
							<li><button className="navbar__signout" onClick={ openRegisterModal }>Sign Up</button></li>
						</ul>
						:
						<ul>
							<li><button className="navbar__signout" onClick={ openEditModal }>Edit Profile</button></li>
							<li><button onClick={ onSignOut } className="navbar__signout" >Sign Out</button></li>
						</ul>
					}
				</nav>
			</div>


			{/* SIGN IN MODAL */}
			<div style={{display: signInDisplay}} className="signinreg__container">
				<div className="signinreg__form__container">
					<h1>Sign In</h1>
					<form className="signinreg__form" onSubmit={ onSubmitSignIn }>
						<input 
							className={ signIn.userNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="userName"
							placeholder="Username" 
							onChange={ (e) => {
								setSignIn({
									...signIn, 
									userName: e.target.value,
									userNameError: null
								});
							}}
						/>
						<span>{ signIn.userNameError }</span>
						<br/>
						<input 
							className={ signIn.passwordError === null ? "" : "signinreg__error" }
							type="password" 
							name="password"
							placeholder="Password"
							onChange={ (e) => {
								setSignIn({ 
									...signIn,
									password: e.target.value,
									passwordError: null
								});
							}}
						/>
						<span>{ signIn.passwordError }</span>
						<br/>
						<button 
							className="signinreg__submit"
							type='submit' 
						>Sign In</button>
					</form>
					<div className="create__account">
						<hr/>
						<h3>New to MLDB?</h3>
						<button className="signinreg__submit" onClick={ openRegisterModal }>Create an Account</button>
						<hr/>
						<button className="signinreg__submit" onClick={ closeSignInModal }>Back to Home</button>
					</div>
				</div>
			</div>


			{/* REGISTER MODAL */}
			<div style={{display: registerDisplay}} className="signinreg__container">
				<div className="signinreg__form__container">
					<h1>Sign Up</h1>
					<form className="signinreg__form" onSubmit={ onSubmitRegister }>
						<input 
							className={ register.firstNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="firstName"
							placeholder="Firstname" 
							onChange={ (e) => {
								setRegister({ 
									...register,
									firstName: e.target.value,
									firstNameError: null
								});
							} }
						/>
						<span>{ register.firstNameError }</span>
						<input 
							className={ register.lastNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="lastName"
							placeholder="Lastname" 
							onChange={ (e) => {
								setRegister({ 
									...register,
									lastName: e.target.value,
									lastNameError: null
								});
							} }
						/>
						<span>{ register.lastNameError }</span>
						<input 
							className={ register.emailError === null ? "" : "signinreg__error" }
							type="text" 
							name="email"
							placeholder="Email"
							onChange={ (e) => {
								setRegister({ 
									...register,
									email: e.target.value,
									emailError: null
								});
							} }
						/>
						<span>{ register.emailError }</span>
						<input 
							className={ register.userNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="userName"
							placeholder="Username" 
							onChange={ (e) => {
								setRegister({ 
									...register,
									userName: e.target.value,
									userNameError: null
								});
							} }
						/>
						<span>{ register.userNameError }</span>
						<input 
							className={ register.passwordError === null ? "" : "signinreg__error" }
							type="password" 
							name="password"
							placeholder="Password"
							onChange={ (e) => {
								setRegister({ 
									...register,
									password: e.target.value,
									passwordError: null
								});
							} }
						/>
						<span>{ register.passwordError }</span>
						<button 
							className="signinreg__submit"
							type='submit' 
						>Sign Up</button>
						<hr style={{border: "1px solid whitesmoke"}}/>
						<button className="signinreg__submit" onClick={ closeRegisterModal }>Back to Home</button>
					</form>
				</div>
			</div>


			{/* EDIT INFORMATION MODAL */}
			<div style={{display: editUserDisplay}} className="signinreg__container">
				<div className="signinreg__form__container">
					<h1>Edit Information</h1>
					<form className="signinreg__form" onSubmit={ onSubmitEdit }>
						<input 
							value={ user.userName }
							name="username"
							readOnly
						/>
						<input 
							className={ editUser.firstNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="firstName"
							placeholder="Firstname" 
							value={ user.firstName }
							onChange={ (e) => {
								setUser({ 
									...user,
									firstName: e.target.value,
								});
								setEditUser({
									...editUser,
									firstNameError: null
								});
							} }
						/>
						<span>{ user.firstNameError }</span>
						<input 
							className={ editUser.lastNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="lastName"
							placeholder="Lastname" 
							value={ user.lastName }
							onChange={ (e) => {
								setUser({ 
									...user,
									lastName: e.target.value,
								});
								setEditUser({
									...editUser,
									lastNameError: null
								});
							} }
						/>
						<span>{ editUser.lastNameError }</span>
						<input 
							value={ user.email }
							name="email"
							readOnly
						/>
						<input 
							className={ editUser.passwordError === null ? "" : "signinreg__error" }
							type="password" 
							name="password"
							placeholder="Password" 
							value={ user.password }
							onChange={ (e) => {
								setUser({ 
									...user,
									password: e.target.value,
								});
								setEditUser({
									...editUser,
									passwordError: null
								});
							} }
						/>
						<span>{ editUser.passwordError }</span>
						<input 
							className={ editUser.streetError === null ? "" : "signinreg__error" }
							type="text" 
							name="street"
							placeholder="Street" 
							value={ user.street }
							onChange={ (e) => {
								setUser({ 
									...user,
									street: e.target.value,
								});
								setEditUser({
									...editUser,
									streetError: null
								});
							} }
						/>
						<span>{ editUser.streetError }</span>
						<input 
							className={ editUser.cityError === null ? "" : "signinreg__error" }
							type="text" 
							name="city"
							placeholder="City" 
							value={ user.city }
							onChange={ (e) => {
								setUser({ 
									...user,
									city: e.target.value,
								});
								setEditUser({
									...editUser,
									cityError: null
								});
							} }
						/>
						<span>{ editUser.cityError }</span>
						<input 
							className={ editUser.stateError === null ? "" : "signinreg__error" }
							type="text" 
							name="state"
							placeholder="State" 
							value={ user.state }
							onChange={ (e) => {
								setUser({ 
									...user,
									state: e.target.value,
								});
								setEditUser({
									...editUser,
									stateError: null
								});
							} }
						/>
						<span>{ editUser.stateError }</span>
						<input 
							className={ editUser.zipError === null ? "" : "signinreg__error" }
							type="text" 
							name="zipCode"
							placeholder="Zip" 
							value={ user.zipCode }
							onChange={ (e) => {
								setUser({ 
									...user,
									zipCode: e.target.value,
								});
								setEditUser({
									...editUser,
									zipError: null
								});
							} }
						/>
						<span>{ editUser.zipError }</span>
						<button 
							className="signinreg__submit"
							type='submit' 
						>Edit Profile</button>
					</form>
					<hr style={{border: "1px solid whitesmoke"}}/>
					<button className="signinreg__submit" onClick={ onSubmitDelete }>Delete Account?</button>
					<button className="signinreg__submit" onClick={ closeEditModal }>Back to Home</button>
				</div>
			</div>
		</div>
	)
}

export default NavBar;
