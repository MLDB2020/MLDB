import React from 'react';
import MLDB_logo from '../MLDB_logo.png';

function NavBar({ onSearch, isSignedIn, setIsSignedIn }) {
	const signOut = (e) => {
		setIsSignedIn(false);
	}

	return (
		<div className='navbar__container'>
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
						<li><a href="/signin">Sign In</a></li>
						<li><a href="/register">Sign Up</a></li>
						{/*<li><a href="/tickets">Tickets</a></li>*/}
					</ul>
					:
					<ul>
						<li><a href="/edit">Edit Profile</a></li>
						{/*<li><a href="/tickets">Tickets</a></li>*/}
						<li><button className="navbar__signout" onClick={ signOut }><a href="/">Sign Out</a></button></li>
					</ul>
				}
			</nav>
		</div>
	)
}

export default NavBar;
