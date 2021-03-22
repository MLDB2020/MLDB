// import axios from "axios";
import React, { useState } from "react";
import validator from 'validator';
import MLDB_logo from '../MLDB_logo.png';

function NavBar({ onSearch }) {

	/* HANDLING SIGN IN */
	const [ signIn, setSignIn ] = useState({
		userName: "",
		password: "",
		userNameError: null,
		passwordError: null
	});
	const [ signInDisplay, setSignInDisplay] = useState("none");
	const [ isSignedIn, setIsSignedIn ] = useState(false);	

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
			console.log("--- SUBMITTING FORM ---",
						"\nuserName: " + signIn.userName, 
						"\npassword: xxxxxx");
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
				alert('Sucessful login');
				setEditUser({
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					userName: data.userName,
					password: data.password,
					street: data.street,
					city: data.city,
					state: data.state,
					zip: data.zipCode
				})
				setIsSignedIn(true);
				e.target.reset();
				closeSignInModal();
			} else {
				alert('Wrong credentials. Try again.');
				e.target.reset();
				openSignInModal();
			}
		} else {
			console.log("### SOMETHING IS WRONG WITH: ###",
						"\nuserName: " + signIn.userName, 
						"\npassword: xxxxxx");
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
		resetEditUser();
		setIsSignedIn(!isSignedIn);
	};

	const openSignInModal = () => {
		setSignInDisplay("flex");
		setRegisterDisplay("none");
		opacityOn();
	}

	const closeSignInModal = () => {
		setSignInDisplay("none");
		opacityOff();
	}


	/* HANDLING REGISTER */
	// const [ userID, setUserID ] = useState(1);
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

	// const getUserID = async () => {
	// 	const response = await axios("http://localhost:3001/get");
	// 	const data = await response.data;
	// 	if (data.length === 0) {
	// 		setUserID(1);
	// 	} else {
	// 		let userID = data[data.length-1].userID + 1;
	// 		setUserID(userID);
	// 	}
	// };

	// useEffect(() => {
	// 	getUserID();
	// }, []);
 
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
			console.log("--- SUBMITTING FORM ---",
						"\nfirstName: " + register.firstName, 
						"\nlastName: " + register.lastName,
						"\nemail: " + register.email,
						"\nuserName: " + register.userName,
						"\npassword: xxxxxx",
						"\nfirstNameError: " + register.firstNameError, 
						"\nlastNameError: " + register.lastNameError,
						"\nemailError: " + register.emailError,
						"\nuserNameError: " + register.userNameError,
						"\npasswordError: " + register.passwordError);
			const res = await fetch("http://localhost:3001/register", {
				method: 'post',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify({
					// userID: userID,
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
			// getUserID();
		} else {
			console.log("### SOMETHING IS WRONG ###",
						"\nfirstName: " + register.firstName, 
						"\nlastName: " + register.lastName,
						"\nemail: " + register.email,
						"\nuserName: " + register.userName,
						"\npassword: xxxxxx",
						"\nfirstNameError: " + register.firstNameError, 
						"\nlastNameError: " + register.lastNameError,
						"\nemailError: " + register.emailError,
						"\nuserNameError: " + register.userNameError,
						"\npasswordError: " + register.passwordError);
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
		opacityOn();
	}

	const closeRegisterModal = () => {
		setRegisterDisplay("none");
		opacityOff();
	}

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


	/* HANDLING EDIT PROFILE */
	const [ editUser, setEditUser ] = useState({
		firstName: "",
		lastName: "",
		email: "",
		userName: "",
		password: "",
		street: "",
		city: "",
		state: "",
		zip: "",
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
		let firstNameErrorEdit = editUser.firstName.length < 3 ?
			"minimum 3 characters required" : null;
		let lastNameErrorEdit = editUser.lastName.length < 3 ?
			"minimum 3 characters required" : null;
		let streetErrorEdit = editUser.street.length < 3 ?
		"minimum 6 characters required" : null;
		let cityErrorEdit = editUser.city.length < 3 ?
			"minimum 3 characters required" : null;
		let stateErrorEdit = editUser.state.length < 2 ?
			"minimum 2 characters required" : null;
		let zipErrorEdit = editUser.zip.match(new RegExp(/[0-9]/g)) ?
			null : "only number are accepted";
		let passwordErrorEdit = editUser.password.length < 6 ?
			"minimum 6 characters required" : null;
		
		if (firstNameErrorEdit || lastNameErrorEdit || streetErrorEdit || cityErrorEdit || stateErrorEdit || zipErrorEdit || passwordErrorEdit) {
			setEditUser({
				...editUser,
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
			console.log("--- SUBMITTING FORM ---",
						"\nfirstName: " + editUser.firstName, 
						"\nlastName: " + editUser.lastName,
						"\nuserName: " + editUser.userName,
						"\nstreet: " + editUser.street,
						"\ncity: " + editUser.city,
						"\nstate: " + editUser.state,
						"\nzip: " + editUser.zip,
						"\npassword: xxxxxx",
						"\nfirstNameError: " + editUser.firstNameError, 
						"\nlastNameError: " + editUser.lastNameError,
						"\nstreetError: " + editUser.streetError,
						"\ncityError: " + editUser.cityError,
						"\nstateError: " + editUser.stateError,
						"\nzipError: " + editUser.zipError,
						"\npasswordError: " + editUser.passwordError);
			const res = await fetch("http://localhost:3001/edit", {
				method: 'put',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify({
					userName: editUser.userName,
					firstName: editUser.firstName,
					lastName: editUser.lastName,
					password: editUser.password,
					street: editUser.street,
					city: editUser.city,
					state: editUser.state,
					zip: editUser.zip
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
			console.log("### SOMETHING IS WRONG ###",
				"\nfirstName: " + editUser.firstName, 
				"\nlastName: " + editUser.lastName,
				"\nemail: " + editUser.email,
				"\nuserName: " + editUser.userName,
				"\nstreet: " + editUser.street,
				"\ncity: " + editUser.city,
				"\nstate: " + editUser.state,
				"\nzip: " + editUser.zip,
				"\npassword: xxxxxx",
				"\nfirstNameError: " + editUser.firstNameError, 
				"\nlastNameError: " + editUser.lastNameError,
				"\nstreetError: " + editUser.streetError,
				"\ncityError: " + editUser.cityError,
				"\nstateError: " + editUser.stateError,
				"\nzipError: " + editUser.zipError,
				"\npasswordError: " + editUser.passwordError);
		}
	};
	
	const resetEditUser = () => {
		setEditUser({
			firstName: "",
			lastName: "",
			email: "",
			userName: "",
			password: "",
			street: "",
			city: "",
			state: "",
			zip: "",
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
	};

	const resetEditUserError = () => {
		setEditUser({
			firstNameError: null,
			lastNameError: null,
			emailError: null,
			userNameError: null,
			passwordError: null
		});
	}

	const openEditModal = () => {
		setEditUserDisplay("flex");
		opacityOn();
	}

	const closeEditModal = () => {
		setEditUserDisplay("none");
		opacityOff();
	}


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
							{/* <li><a href="https://www.amctheatres.com/movies?availability=NOW_PLAYING" target="_blank" rel="noreferrer" className="navbar__signout">Tickets</a></li> */}
						</ul>
						:
						<ul>
							<li><button className="navbar__signout" onClick={ openEditModal }>Edit Profile</button></li>
							{/* <li><a href="https://www.amctheatres.com/movies?availability=NOW_PLAYING" target="_blank" rel="noreferrer" className="navbar__signout">Tickets</a></li> */}
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
							value={ editUser.userName }
							name="username"
							readOnly
						/>
						<input 
							className={ editUser.firstNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="firstName"
							placeholder="Firstname" 
							value={ editUser.firstName }
							onChange={ (e) => {
								setEditUser({ 
									...editUser,
									firstName: e.target.value,
									firstNameError: null
								});
							} }
						/>
						<span>{ editUser.firstNameError }</span>
						<input 
							className={ editUser.lastNameError === null ? "" : "signinreg__error" }
							type="text" 
							name="lastName"
							placeholder="Lastname" 
							value={ editUser.lastName }
							onChange={ (e) => {
								setEditUser({ 
									...editUser,
									lastName: e.target.value,
									lastNameError: null
								});
							} }
						/>
						<span>{ editUser.lastNameError }</span>
						<input 
							value={ editUser.email }
							name="email"
							readOnly
						/>
						<input 
							className={ editUser.passwordError === null ? "" : "signinreg__error" }
							type="password" 
							name="password"
							placeholder="Password" 
							value={ editUser.password }
							onChange={ (e) => {
								setEditUser({ 
									...editUser,
									password: e.target.value,
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
							value={ editUser.street }
							onChange={ (e) => {
								setEditUser({ 
									...editUser,
									street: e.target.value,
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
							value={ editUser.city }
							onChange={ (e) => {
								setEditUser({ 
									...editUser,
									city: e.target.value,
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
							value={ editUser.state }
							onChange={ (e) => {
								setEditUser({ 
									...editUser,
									state: e.target.value,
									stateError: null
								});
							} }
						/>
						<span>{ editUser.stateError }</span>
						<input 
							className={ editUser.zipError === null ? "" : "signinreg__error" }
							type="text" 
							name="zip"
							placeholder="Zip" 
							value={ editUser.zip }
							onChange={ (e) => {
								setEditUser({ 
									...editUser,
									zip: e.target.value,
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
					<button className="signinreg__submit" onClick={ closeEditModal }>Back to Home</button>
				</div>
			</div>
		</div>
	)
}

export default NavBar;
