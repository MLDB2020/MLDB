import React, { useState } from "react";
import axios from "axios";
import "../styles/SignIn.css";
import MLDB from "../MLDB.png";

function SignIn() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    //const [userList, setUserList] = useState([]);

    const getUserName = (e) => {
        e.preventDefault();
        setUserName(e.target.value);
    };

    const getPassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/signin", 
        {
            userName: userName,
            password: password
        }, 
        {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => {
            console.log('Something is wrong');
            console.log(err);
        });
    };
/*
    useEffect(() => {
        axios.get("http://localhost:3001/get").then((res) => {
            console.log(res.data);
            setUserList(res.data);
        });
    }, []);
*/
    return (
        <div className="app__signin">
            <img id="img-signin" src={ MLDB } alt="logo"/>
            <div className="signin__container">
                <h1>Sign-In</h1>
                <form className="signin__form" onSubmit={login}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="userName" 
                        onChange={ getUserName }
                    />
                    <br/>
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={ getPassword }
                    />
                    <br/>
                    <button 
                        id="submit"
                        type='submit' 
                    >Submit</button>
                </form>
                <div className="create__account">
                    <hr/>
                    <h3>New to MLDB?</h3>
                    <button>Create an Account</button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

/*
{ userList.map((val, index) => {
                    return ( 
                    <h1 key={index}>
                        UserName: { val.userName } | 
                        Password: { val.password }
                    </h1>
                    );
                })};
*/