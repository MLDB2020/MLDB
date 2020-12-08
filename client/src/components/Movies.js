import React from 'react';
import MovieCard from './MovieCard';

function Movies({ movies }) {
    return (
        <div>
            <h2 className="movies__header">Movies</h2>
            <div className="movies__container">
                { movies.length > 0 && movies.map(movie => {
                    return (
                        <div key={movie.id}>
                            <MovieCard { ...movie } />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Movies;
