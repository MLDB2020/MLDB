import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles/App.css';
import SignIn from './SignIn';
import Register from './Register';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Footer from './Footer';
import Movies from './Movies';

const API_Key = "75b3642a675e32542dd19345003dcb05";
const API_NowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_Key}&language=en-US`;
const API_Query = `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&language=en-US&query=`;

function App() {
    const [ nowPlaying, setNowPlaying ] = useState([]);
    const [ search, setSearch ] = useState([]);
    const [ isQuery, setIsQuery ] = useState(false);
    
    const getNowPlaying = () => {
        fetch(API_NowPlaying)
        .then(res => res.json())
        .then(data => {
            setNowPlaying(data.results);
        });
    }

    const getSearch = (query) => {
        fetch(API_Query + query)
        .then(res => res.json())
        .then(data => {
            setSearch(data.results);
        });
    }

    useEffect((onSearch) => {
        getNowPlaying();
        getSearch(onSearch);
    }, []);

    const onSearch = e => {
        e.preventDefault();
        const query = e.target.value;
        if (query) {
            setIsQuery(true);
            getSearch(query);
        } else {
            setIsQuery(false);
        }
    };

    return (
        <div className='app'>
            <NavBar onSearch={ onSearch }/>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Movies movies={ isQuery ? search : nowPlaying } />
                    </Route>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/nomatch">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
