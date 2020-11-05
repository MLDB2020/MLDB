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
                    <li className='nav__signin'>Sign In</li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
