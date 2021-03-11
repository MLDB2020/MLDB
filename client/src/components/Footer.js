import React from 'react'

function Footer() {
	const year = new Date().getFullYear();

	return (
		<div className="footer__container" id="footer">
			<p>&#169;Copyright - MLDB { year }</p>
		</div>
	)
}

export default Footer;
