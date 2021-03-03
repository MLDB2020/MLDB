import React, { useState, useEffect, useRef } from 'react';
import default_banner from "./../default_banner.png";
import {Link} from "react-router-dom";
	
const MovieCard = ({ id, title, poster_path, vote_average, overview }) => {
	
	const API_Images = 'https://image.tmdb.org/t/p/original';

	return (
		<div className="movies__card">
			<Link to={`/${id}`}>
			<div key={ id }>
			
				<img src={ poster_path == null ? default_banner : API_Images+poster_path } alt={ title }/>
			

			</div>
			<span className="movies__rating"> ⭐: { vote_average }</span>
			<div className="movies__description">
				<h3>Overview:</h3>
				<p> { overview } </p>
			</div>
			</Link>
		</div>
	)
}

export default MovieCard;
