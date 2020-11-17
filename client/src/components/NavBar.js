import React from 'react';
import '../styles/NavBar.css';
import MLDB_logo from '../MLDB_logo.png';

function NavBar() {
    //const API_Key = "75b3642a675e32542dd19345003dcb05";
    //const API_Query = `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&language=en-US&query=`;

    return (
        <div className='app__navbar'>
            <nav className='navbar__items'>
                <div className="image">
                    <a href="/"><img src={MLDB_logo} alt='logo'/></a>
                </div>
                <div className="search__bar">
                    <form>
                        <input id='search' type='text' placeholder='Movie Search'></input>
                        <input id='input' type='submit' value='Search'></input>
                    </form>
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
