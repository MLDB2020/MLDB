import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Register.css";
import MLDB from "../MLDB.png";

function Register() {
    const [userID, setUserID] = useState(0);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setStat] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [preferableGenre, setGenre] = useState("");
    
    const onUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const onLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const onStreetChange = (e) => {
        setStreet(e.target.value);
    };

    const onCityChange = (e) => {
        setCity(e.target.value);
    };

    const onStateChange = (e) => {
        setStat(e.target.value);
    };

    const onZipCodeChange = (e) => {
        setZipCode(e.target.value);
    };

    const onGenreChange = (e) => {
        setGenre(e.target.value);
    };

    useEffect(() => {
        async function getUsedID() {
            const response = await axios("http://localhost:3001/get");
            const data = response.data;
            const userID = data[data.length-1].userID + 1;
            setUserID(userID);
        }
        getUsedID();
    }, []);

    const onSubmitRegister = (e) => {
        e.preventDefault();
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
                phone: phone,
                street: street,
                city: city,
                state: state,
                zipCode: zipCode,
                preferableGenre: preferableGenre
            }), 
        })
        .then(res => {
            console.log(res)
            if (res.status === 400) {
                alert('Unable to register!');
            } else if (res.status === 500) {
                alert('User or email already registered. Please try again.')
            } else {
                alert('User registered!');
                e.target.reset();
            }
            res.text();
        })
        .then(text => console.log(text))
        .catch(err => {
            console.log('Something is wrong');
            console.log(err);
        });
    };

    return (
        <div className="app__signin" id="register">
            <img id="img-signin" src={ MLDB } alt="logo"/>
            <div className="signin__container">
                <h1>Register</h1>
                <form className="signin__form" onSubmit={ onSubmitRegister }>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="password" 
                        onChange={ onUserNameChange }
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={ onPasswordChange }
                    />
                    <label>FirstName</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        onChange={ onFirstNameChange }
                    />
                    <label>LastName</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        onChange={ onLastNameChange }
                    />
                    <label>Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        onChange={ onEmailChange }
                    />
                    <label>Phone</label>
                    <input 
                        type="text" 
                        name="phone" 
                        onChange={ onPhoneChange }
                    />
                    <label>Street</label>
                    <input 
                        type="text" 
                        name="street" 
                        onChange={ onStreetChange }
                    />
                    <label>City</label>
                    <input 
                        type="text" 
                        name="city" 
                        onChange={ onCityChange }
                    />
                    <label>State</label>
                    <input 
                        type="text" 
                        name="state" 
                        onChange={ onStateChange }
                    />
                    <label>ZipCode</label>
                    <input 
                        type="text" 
                        name="zipCode" 
                        onChange={ onZipCodeChange }
                    />
                    <label>Preferable Genre: </label>
                    <select 
                        className="select__genre"
                        name="preferableGenre"
                        onChange={ onGenreChange }
                    >
                        <option></option>
                        <option>Horror</option>
                        <option>Action</option>
                        <option>Drama</option>
                        <option>Science Fiction</option>
                        <option>Romance</option>
                        <option>Comedy</option>
                        <option>Western</option>
                        <option>Thriller</option>
                        <option>Animation</option>
                        <option>Adventure</option>
                        <option>Musical</option>
                        <option>Crime</option>
                        <option>Historical</option>
                        <option>Fantasy</option>
                    </select>
                    <br/>
                    <button 
                        id="submit"
                        type='submit' 
                    >Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
