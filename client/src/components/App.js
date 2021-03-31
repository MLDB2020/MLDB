import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import NavBar from './NavBar';
import Movies from './Movies';
import Footer from './Footer';

const API_Key = process.env.REACT_APP_TMDB_API_KEY;
const API_NowPlaying = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_Key}&language=en-US`;
const API_Query = `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&language=en-US&query=`;

function App() {
  const [ nowPlaying, setNowPlaying ] = useState([]);
  const [ search, setSearch ] = useState([]);
  const [ isQuery, setIsQuery ] = useState(false);
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  const [ user, setUser ] = useState({
    firstName: "",
		lastName: "",
		email: "",
		userName: "",
		password: "",
		street: "",
		city: "",
		state: "",
		zip: "",
  });
  
  const getNowPlaying = async () => {
    const res = await fetch(API_NowPlaying);
    const data = await res.json(); 
    setNowPlaying(data.results);
    console.log(data.results);
  };

  const getSearch = async (query) => {
    const res = await fetch(API_Query + query);
    const data = await res.json();
    setSearch(data.results);
  };

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

  useEffect((onSearch) => {
    getNowPlaying();
    getSearch(onSearch); 
  }, []);

  return (
    <div className="app">
      <NavBar 
        onSearch={ onSearch } 
        isSignedIn={ isSignedIn } 
        setIsSignedIn={ setIsSignedIn } 
        setUser={ setUser } 
        user={ user } 
      />
      <Movies 
        movies={ isQuery ? search : nowPlaying } 
      />
      <Footer 
        isSignedIn={ isSignedIn } 
        user={ user }
      />
    </div>
  );
};

export default App;
