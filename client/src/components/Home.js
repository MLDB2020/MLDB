import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const API_Key = "75b3642a675e32542dd19345003dcb05";
const API_Home = `https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}&language=en-US`;

const Home = () => {
    const [ movies, setMovies ] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const response = await fetch(API_Home);
            const json_res = await response.json();
            const data = json_res.results;
            console.log(data);
            setMovies(data);
        }
        getMovies();
    }, []);

    return (
        <div className="home">
            { movies.map(movie => (
                <div className="movies__card" key={ movie.id }>
                    <img src={ `https://image.tmdb.org/t/p/original${movie.poster_path}` } alt="movie"/>
                    <h4> {movie.title} </h4>
                    <p className="movie_card_rating"> ⭐: { movie.vote_average }</p>
                    <p> { movie.overview.length > 180 ? movie.overview.slice(0, 180) + "..." : movie.overview } </p>    
                </div>
            )) }
        </div>
    )
}

export default Home;
