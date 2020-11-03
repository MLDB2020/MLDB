import React from 'react';
import '../styles/SignIn.css';
import MLDB from '../MLDB.png';

function SignIn() {
    return (
        <div className='app__signin'>
            <img id='img-signin' src={ MLDB } alt='logo'/>
            <div className='signin__container'>
                <h1>Sign-In</h1>
                <form className='signin__form'>
                    <p>Username</p>
                    <input type='text'></input><br/>
                    <p>Password</p>
                    <input type='password'></input><br/>
                    <input id='submit' type='submit' value='Submit'></input>
                </form>
                <div className='create__account'>
                    <hr/>
                    <h3>New to MLDB?</h3>
                    <button>Create an Account</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn;
