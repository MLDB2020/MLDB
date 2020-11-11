import React, { useState } from "react";
import "../styles/SignInRegister.css";
import MLDB_logo from "../MLDB_logo.png";

function SignIn() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onSubmitSignIn = (e) => {
        e.preventDefault();
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
                e.target.reset();
            } else {
                alert('Wrong credentials. Try again.');
            }
        })
        .catch(err => {
            console.log('Something is wrong');
            console.log(err);
        });
    };

    return (
        <div className="app__signin" id="signin">
            <img id="img-signin" src={ MLDB_logo } alt="logo"/>
            <div className="signin__container">
                <h1>Sign-In</h1>
                <form className="signin__form" onSubmit={ onSubmitSignIn }>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="userName" 
                        onChange={ onUserNameChange }
                    />
                    <br/>
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={ onPasswordChange }
                    />
                    <br/>
                    <button 
                        id="submit"
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
