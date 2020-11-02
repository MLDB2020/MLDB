import React from 'react';
import '../styles/NavBar.css';
import MLDB from '../MLDB.png';

function NavBar() {
    return (
        <div className='app__navbar'>
            <nav>
                <ul className='nav__items'>
                    <li><a href=''><img src={MLDB} alt='logo'/></a></li>
                    <div className='vl'></div>
                    <li className='nav__searchbar'>
                        <input type='text' placeholder='Movie Search'></input>
                        <button>Search</button>
                    </li>
                    <div className='vl'></div>
                    <li><a href='' onClick=''>Sign in</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
