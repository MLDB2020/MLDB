import React from 'react';
import '../styles/NavBar.css';
import MLDB_logo from '../MLDB_logo.png';

function NavBar() {
    return (
        <div className='app__navbar'>
            <nav className='navbar__items'>
                <div className="image">
                    <img src={MLDB_logo} alt='logo'/>
                </div>
                <div className="search__bar">
                    <input id='search' type='text' placeholder='Movie Search'></input>
                    <input id='input' type='submit' value='Search'></input>
                </div>
                <ul>
                    <li><a href="/signin">Sign In</a></li>
                    <li><a href="/register">Register</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
