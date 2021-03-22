import React, { useState, useEffect } from 'react';
import default_banner from "./../default_banner.png";
import YouTube from 'react-youtube';
	
const MovieCard = ({ id, title, poster_path, vote_average, overview }) => {
	const [display, setDisplay] = useState("none");
	const [videoId, setVideoId] = useState("");
	const [like, setLike] = useState(true);
	const [voteAvg, setVoteAvg] = useState(vote_average);

	const API_Key = process.env.REACT_APP_TMDB_API_KEY;
	const API_Images = 'https://image.tmdb.org/t/p/original';
	const API_Video = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_Key}&language=en-US`;

	const getVideo = () => {
		fetch(API_Video)
		.then(res => res.json())
		.then(data => {
			setVideoId((data.results.length !== 0) ? data.results[0].key : "1");
		});
	};

	useEffect(() => {
		getVideo();
	});

	const openModal = () => {
		setDisplay("flex");
	}

	const closeModal = (e) => {
		setDisplay("none");
	}

	const onLike = (e) => {
		setLike(!like);
		if (like) {
			e.target.style.backgroundColor = "rgb(2, 33, 78)";
			setVoteAvg(voteAvg + .1);
		} else {
			e.target.style.backgroundColor = "rgb(44, 65, 139)";
			setVoteAvg(voteAvg - .1);
		}
	}

	return (
		<div className="movies__card">
			<div key={ id }>
				<img src={ poster_path == null ? default_banner : API_Images+poster_path } alt={ title }/>
			</div>
			<span className="movies__rating"> ⭐: { voteAvg }</span>
			<div className="movies__description">
				<h3><i>{ title }</i></h3>
				<h4>Overview:</h4>
				<p> { overview } </p>
				<button onClick={ openModal }>Trailer</button>
				<button>
					<a className="movies__tickets" href={"https://www.amctheatres.com/search?q="+ title} target="_blank" rel="noreferrer">
						Tickets
					</a>
				</button>
				<button id="like" onClick={ onLike }>👍</button>
			</div>

			<div style={{display: display}} className="movies__modal">
				<div className="movies__modal__container">
					<span>🎥 MOVIE TRAILER 🎬</span>
					<YouTube 
						videoId={ videoId }
						opts= {{width: "500px", height: "330px"}}
					></YouTube>
					<button className="movies__modal__close" onClick={ closeModal }>Back to Movies</button>
				</div>
			</div>
		</div>
	)
}

export default MovieCard;
