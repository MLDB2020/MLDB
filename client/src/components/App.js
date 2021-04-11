import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import NavBar from './NavBar';
import Movies from './Movies';
import Footer from './Footer';
import Ads from './Ads';

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
		zipCode: "",
  });
  const [ companies, setCompanies ] = useState([]);
  
  const getCompanies = async () => {
    const res = await fetch("http://localhost:3001/ads");
    const data = await res.json(); 
    setCompanies(data);
    console.log(data);
  };

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

  const resetUser = () => {
		setUser({
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
	};

  useEffect((onSearch) => {
    getNowPlaying();
    getSearch(onSearch); 
    getCompanies();
  }, []);

  const onOpacity = (hasOpacity) => {
    if (hasOpacity) {
      let nav = document.getElementById("nav");
      let movies = document.getElementById("movies");
      let footer = document.getElementById("footer");
      nav.style.opacity = "10%";
      movies.style.opacity = "10%";
      footer.style.opacity = "10%";
    } else {
      let nav = document.getElementById("nav");
      let movies = document.getElementById("movies");
      let footer = document.getElementById("footer");
      nav.style.opacity = "100%";
      movies.style.opacity = "100%";
      footer.style.opacity = "100%";
    }
	};


  return (
    <div className="app">
      <NavBar 
        onSearch={ onSearch } 
        isSignedIn={ isSignedIn } 
        setIsSignedIn={ setIsSignedIn } 
        setUser={ setUser } 
        user={ user } 
        resetUser= { resetUser }
        onOpacity= { onOpacity }
      />
      <Ads companies={ companies } />
      <Movies 
        movies={ isQuery ? search : nowPlaying } 
      />
      <Footer 
        isSignedIn={ isSignedIn } 
        user={ user }
        onOpacity= { onOpacity }
      />
    </div>
  );
};

export default App;
