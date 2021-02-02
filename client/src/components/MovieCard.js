import React, { useState, useEffect, useRef } from 'react';
import default_banner from "./../default_banner.png";
	
const MovieCard = ({ id, title, poster_path, vote_average, overview }) => {
	const [display, setDisplay] = useState("none");
	const [videoId, setVideoId] = useState("");
	const myRef = useRef();

	const API_Key = process.env.REACT_APP_TMDB_API_KEY;
	const API_Images = 'https://image.tmdb.org/t/p/original';
	const API_Video = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_Key}&language=en-US`;

	const getVideo = async () => {
		await fetch(API_Video)
		.then(res => res.json())
		.then(data => {
			setVideoId((data.results.length !== 0) ? data.results[0].key : "1");
		});
	};

	useEffect(() => {
		getVideo();
		// document.addEventListener('mousedown', handleClickOutside);
		// 	return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	const openModal = () => {
		setDisplay("flex");
	}

	const closeModal = () => {
		setDisplay("none");
	}

	// const handleClickOutside = e => {
	// 	if (!myRef.current.contains(e.target)) {
	// 		setDisplay("none");

	// 	}
	// };

	return (
		<div className="movies__card">
			<div key={ id }>
				<img src={ poster_path == null ? default_banner : API_Images+poster_path } alt={ title }/>
			</div>
			<span className="movies__rating"> ⭐: { vote_average }</span>
			<div className="movies__description">
				<h3>Overview:</h3>
				<p> { overview } </p>
				<button onClick={ openModal }>Trailer</button>
			</div>

			<div style={{display: display}} className="movies__modal">
				<div className="movies__modal__container">
					<span>🎥 MOVIE TRAILER 🎬</span>
					<iframe 
						title={ title }
						width="650"
						height="370"
						src={`https://www.youtube.com/embed/${videoId}`}
						sandbox="allow-scripts allow-same-origin"
					></iframe>
					<button className="movies__modal__close" onClick={ closeModal } ref={ myRef }>Back to Movies</button>
				</div>
			</div>
		</div>
	)
}

export default MovieCard;
