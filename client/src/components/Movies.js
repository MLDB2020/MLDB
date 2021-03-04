import React from 'react';
import MovieCard from './MovieCard';

function Movies({ movies, videos }) {
	return (
		<div id="movies">
			<h2 className="movies__header">🎬 Movies</h2>
			<div className="movies__container">
				{ movies.length > 0 && movies.map(movie => {
					return (
						<div key={movie.id}>
							<MovieCard { ...movie } { ...videos } />
						</div>
					);
				})}
			</div>
		</div>
	)
}

export default Movies;
