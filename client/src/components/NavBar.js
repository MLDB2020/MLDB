import React from 'react';
import '../styles/NavBar.css';
import MLDB from '../MLDB.png';

function NavBar() {
    return (
        <div className='app__navbar'>
            <nav>
                <ul className='nav__items'>
                    <li><img src={MLDB} alt='logo'/></li>
                    <li><div className='vl'></div></li>
                    <li className='nav__searchbar'>
                        <input type='text' placeholder='Movie Search'></input>
                        <input id='input' type='submit' value='Search'></input>
                    </li>
                    <li><div className='vl'></div></li>
                    <div className="signinregister">
                        <li className='nav__signin'><a href="#signin">Sign In</a></li>
                        <li className='nav__signin'><a href="#register">Register</a></li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
